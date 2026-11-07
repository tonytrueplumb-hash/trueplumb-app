-- True Plumb Execution Sprint: database setup.
-- Run once in Supabase: SQL Editor -> New query -> paste all of this -> Run.

-- People who can log in. One row per auth user.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'learner' check (role in ('learner', 'manager', 'admin')),
  track text,
  setting text,
  role_length text,
  focus_note text,
  org_id uuid,
  created_at timestamptz not null default now()
);

-- A firm that bought a team licence.
create table if not exists public.orgs (
  id uuid primary key default gen_random_uuid(),
  name text,
  manager_id uuid references public.profiles (id) on delete set null,
  seats int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.profiles
  drop constraint if exists profiles_org_fk,
  add constraint profiles_org_fk foreign key (org_id) references public.orgs (id) on delete set null;

-- Participants a manager has added (before and after they log in).
create table if not exists public.org_members (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.orgs (id) on delete cascade,
  user_id uuid references public.profiles (id) on delete set null,
  email text not null,
  full_name text,
  invited_at timestamptz not null default now(),
  unique (org_id, email)
);

-- Every Stripe payment, written only by the webhook.
create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text unique not null,
  email text not null,
  kind text not null check (kind in ('individual', 'team', 'other')),
  seats int not null default 1,
  amount_total int,
  currency text,
  user_id uuid references public.profiles (id) on delete set null,
  org_id uuid references public.orgs (id) on delete set null,
  created_at timestamptz not null default now()
);

-- Course progress: one row per person per course.
create table if not exists public.progress (
  user_id uuid not null references public.profiles (id) on delete cascade,
  track text not null,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, track)
);

alter table public.profiles enable row level security;
alter table public.orgs enable row level security;
alter table public.org_members enable row level security;
alter table public.purchases enable row level security;
alter table public.progress enable row level security;

-- Helper: is the current user the manager of this org?
create or replace function public.manages_org(o uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.orgs where id = o and manager_id = auth.uid());
$$;

-- Profiles: read and edit your own; managers can read their team's.
drop policy if exists "own profile read" on public.profiles;
create policy "own profile read" on public.profiles for select
  using (id = auth.uid() or (org_id is not null and public.manages_org(org_id)));
drop policy if exists "own profile update" on public.profiles;
create policy "own profile update" on public.profiles for update
  using (id = auth.uid()) with check (id = auth.uid());

-- Stop people promoting themselves: role and org can only be changed by the server.
create or replace function public.protect_profile_fields() returns trigger
language plpgsql as $$
begin
  if auth.role() = 'authenticated' then
    new.role := old.role;
    new.org_id := old.org_id;
    new.email := old.email;
  end if;
  return new;
end $$;
drop trigger if exists protect_profile_fields on public.profiles;
create trigger protect_profile_fields before update on public.profiles
  for each row execute function public.protect_profile_fields();

-- Orgs and members: managers read their own.
drop policy if exists "manager reads org" on public.orgs;
create policy "manager reads org" on public.orgs for select using (manager_id = auth.uid());
drop policy if exists "manager reads members" on public.org_members;
create policy "manager reads members" on public.org_members for select using (public.manages_org(org_id));

-- Progress: read and write your own; managers read their team's.
drop policy if exists "own progress" on public.progress;
create policy "own progress" on public.progress for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());
-- Managers never read progress directly (it holds private notes). The team page
-- works out scores on the server and only shows the summary.
drop policy if exists "manager reads team progress" on public.progress;

-- Purchases: no direct access from the browser (server only).
