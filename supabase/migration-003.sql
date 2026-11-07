-- True Plumb: tester invite links. Run once in Supabase: SQL Editor -> New query -> paste -> Run.
-- Safe to run more than once.

create table if not exists public.invite_links (
  code text primary key,
  label text not null,
  max_uses integer not null check (max_uses > 0),
  used integer not null default 0,
  expires_at timestamptz,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.invite_links enable row level security; -- server (service key) only

alter table public.profiles add column if not exists source text;
alter table public.profiles add column if not exists purpose text; -- new starter, stepping up, refresher or exploring

-- Takes one place on a link, only if it's active, in date and not full. Returns the link, or nothing.
create or replace function public.claim_invite(p_code text) returns setof public.invite_links
language sql security definer set search_path = public as $$
  update public.invite_links set used = used + 1
  where code = p_code and active and used < max_uses and (expires_at is null or expires_at > now())
  returning *;
$$;

-- Gives a place back if sending the invite email failed.
create or replace function public.release_invite(p_code text) returns void
language sql security definer set search_path = public as $$
  update public.invite_links set used = greatest(used - 1, 0) where code = p_code;
$$;

revoke all on function public.claim_invite(text) from public, anon, authenticated;
revoke all on function public.release_invite(text) from public, anon, authenticated;
grant execute on function public.claim_invite(text) to service_role;
grant execute on function public.release_invite(text) to service_role;
