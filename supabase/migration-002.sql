-- True Plumb: version 2 update. Run once in Supabase: SQL Editor -> New query -> paste -> Run.
-- Safe to run more than once.

-- Lets each person switch follow-up emails off from their course page.
alter table public.profiles add column if not exists emails_opt_out boolean not null default false;

-- Record of follow-up emails already sent, so nobody gets the same one twice.
create table if not exists public.followups (
  user_id uuid not null references public.profiles (id) on delete cascade,
  track text not null,
  kind text not null,
  sent_at timestamptz not null default now(),
  primary key (user_id, track, kind)
);

-- Only the server (service key) touches this table; no browser access.
alter table public.followups enable row level security;
