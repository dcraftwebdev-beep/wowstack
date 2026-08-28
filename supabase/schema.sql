-- ============================================================================
-- Wow Stack — projects / case-studies schema
-- Run this in Supabase → SQL Editor (once).
-- ============================================================================

create table if not exists public.projects (
  id            text primary key,
  slug          text unique not null,
  name          text not null,
  client        text,
  category      text,
  industry      text,
  year          text,
  status        text not null default 'draft',   -- draft | published | archived
  featured      boolean not null default false,
  accent        text default '#f59e0b',
  url           text,
  short_desc    text,
  positioning   text,
  preview_image text,                              -- homepage "Selected Work" card image
  hero_image    text,                              -- case-study page hero image
  gallery       jsonb default '[]'::jsonb,        -- array of image URLs
  services      jsonb default '[]'::jsonb,        -- array of strings
  technologies  jsonb default '[]'::jsonb,        -- array of strings
  deliverables  jsonb default '[]'::jsonb,        -- array of strings
  timeline      text,
  challenge     text,
  approach      text,
  solution      text,
  metrics       jsonb default '[]'::jsonb,        -- [{ value, label }]
  sort_order    int default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at before update on public.projects
  for each row execute function public.set_updated_at();

-- ── Row Level Security ──────────────────────────────────────────────────────
alter table public.projects enable row level security;

-- anyone (the public website) can read PUBLISHED projects
drop policy if exists "public read published" on public.projects;
create policy "public read published" on public.projects
  for select using (status = 'published');

-- signed-in admins can read everything (drafts/archived) and write
drop policy if exists "auth read all" on public.projects;
create policy "auth read all" on public.projects
  for select to authenticated using (true);

drop policy if exists "auth write" on public.projects;
create policy "auth write" on public.projects
  for all to authenticated using (true) with check (true);

-- ── Storage bucket for project images (optional but recommended) ────────────
insert into storage.buckets (id, name, public)
values ('project-media', 'project-media', true)
on conflict (id) do nothing;

drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects
  for select using (bucket_id = 'project-media');

drop policy if exists "auth upload media" on storage.objects;
create policy "auth upload media" on storage.objects
  for insert to authenticated with check (bucket_id = 'project-media');

drop policy if exists "auth manage media" on storage.objects;
create policy "auth manage media" on storage.objects
  for all to authenticated using (bucket_id = 'project-media') with check (bucket_id = 'project-media');

-- ── Case-study view counter ─────────────────────────────────────────────────
-- Adds a views column and a public function to increment it. The function is
-- SECURITY DEFINER so anonymous visitors can bump the counter without being
-- able to write to the projects table directly.
alter table public.projects add column if not exists views bigint not null default 0;

-- separate homepage preview image (added after initial launch)
alter table public.projects add column if not exists preview_image text;

create or replace function public.increment_project_views(p_slug text)
returns void
language sql
security definer
set search_path = public
as $$
  update public.projects set views = views + 1
  where slug = p_slug and status = 'published';
$$;

grant execute on function public.increment_project_views(text) to anon, authenticated;

-- ── Create your admin user ──────────────────────────────────────────────────
-- Supabase → Authentication → Users → "Add user" (email + password).
-- Then sign in at /dashboard with those credentials.
