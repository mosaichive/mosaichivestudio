
-- =========================================================
-- ENUMS
-- =========================================================
create type public.app_role as enum ('admin', 'editor');

-- =========================================================
-- UTILITY: updated_at trigger
-- =========================================================
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =========================================================
-- PROFILES
-- =========================================================
create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  email text,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create policy "Profiles viewable by authenticated"
  on public.profiles for select
  to authenticated
  using (true);

create policy "Users update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = user_id);

create policy "Users insert own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = user_id);

create trigger trg_profiles_updated
  before update on public.profiles
  for each row execute function public.update_updated_at_column();

-- =========================================================
-- USER ROLES
-- =========================================================
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

-- Security-definer role check (avoids RLS recursion)
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create policy "Users view own roles"
  on public.user_roles for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Admins view all roles"
  on public.user_roles for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins manage roles"
  on public.user_roles for all
  to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- ADMIN INVITES
-- =========================================================
create table public.admin_invites (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  role public.app_role not null default 'admin',
  invited_by uuid references auth.users(id) on delete set null,
  accepted_at timestamptz,
  created_at timestamptz not null default now()
);
alter table public.admin_invites enable row level security;

create policy "Admins manage invites"
  on public.admin_invites for all
  to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- HANDLE NEW USER: create profile + auto-promote first user
-- and consume any matching invite
-- =========================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_invite record;
  v_user_count int;
begin
  insert into public.profiles (user_id, email, display_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)))
  on conflict (user_id) do nothing;

  -- Bootstrap: if no users yet (this is the first), make them admin
  select count(*) into v_user_count from auth.users;
  if v_user_count <= 1 then
    insert into public.user_roles (user_id, role)
    values (new.id, 'admin')
    on conflict do nothing;
    return new;
  end if;

  -- Otherwise, consume invite if email matches
  select * into v_invite from public.admin_invites
    where lower(email) = lower(new.email) and accepted_at is null
    limit 1;

  if v_invite.id is not null then
    insert into public.user_roles (user_id, role)
    values (new.id, v_invite.role)
    on conflict do nothing;

    update public.admin_invites
      set accepted_at = now()
      where id = v_invite.id;
  end if;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =========================================================
-- PROJECTS / CASE STUDIES
-- =========================================================
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  client text not null,
  industry text,
  year text,
  cover_url text,
  categories text[] not null default '{}',
  excerpt text,
  challenge text,
  solution text,
  services text[] not null default '{}',
  tools text[] not null default '{}',
  results jsonb not null default '[]'::jsonb,
  gallery text[] not null default '{}',
  featured boolean not null default false,
  published boolean not null default true,
  position int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.projects enable row level security;
create index idx_projects_position on public.projects(position);
create index idx_projects_featured on public.projects(featured);
create index idx_projects_published on public.projects(published);

create policy "Public reads published projects"
  on public.projects for select
  to anon, authenticated
  using (published = true);

create policy "Admins read all projects"
  on public.projects for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'editor'));

create policy "Admins manage projects"
  on public.projects for all
  to authenticated
  using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'editor'))
  with check (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'editor'));

create trigger trg_projects_updated
  before update on public.projects
  for each row execute function public.update_updated_at_column();

-- =========================================================
-- TESTIMONIALS
-- =========================================================
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  author text not null,
  role text,
  company text,
  avatar_url text,
  rating int not null default 5,
  published boolean not null default true,
  position int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.testimonials enable row level security;

create policy "Public reads published testimonials"
  on public.testimonials for select
  to anon, authenticated
  using (published = true);

create policy "Admins read all testimonials"
  on public.testimonials for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'editor'));

create policy "Admins manage testimonials"
  on public.testimonials for all
  to authenticated
  using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'editor'))
  with check (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'editor'));

create trigger trg_testimonials_updated
  before update on public.testimonials
  for each row execute function public.update_updated_at_column();

-- =========================================================
-- CLIENT LOGOS
-- =========================================================
create table public.client_logos (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  link_url text,
  featured boolean not null default false,
  published boolean not null default true,
  position int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.client_logos enable row level security;

create policy "Public reads published logos"
  on public.client_logos for select
  to anon, authenticated
  using (published = true);

create policy "Admins read all logos"
  on public.client_logos for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'editor'));

create policy "Admins manage logos"
  on public.client_logos for all
  to authenticated
  using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'editor'))
  with check (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'editor'));

create trigger trg_logos_updated
  before update on public.client_logos
  for each row execute function public.update_updated_at_column();

-- =========================================================
-- SITE SETTINGS (single row)
-- =========================================================
create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  hero_eyebrow text,
  hero_headline text,
  hero_subheadline text,
  hero_cta_primary_label text,
  hero_cta_primary_link text,
  hero_cta_secondary_label text,
  hero_cta_secondary_link text,
  about_eyebrow text,
  about_headline text,
  about_body text,
  counter_projects int default 0,
  counter_clients int default 0,
  counter_years int default 0,
  counter_brands int default 0,
  contact_email text,
  contact_phone text,
  contact_address text,
  cta_headline text,
  cta_subheadline text,
  cta_button_label text,
  cta_button_link text,
  updated_at timestamptz not null default now()
);
alter table public.site_settings enable row level security;

create policy "Public reads site settings"
  on public.site_settings for select
  to anon, authenticated
  using (true);

create policy "Admins manage site settings"
  on public.site_settings for all
  to authenticated
  using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'editor'))
  with check (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'editor'));

create trigger trg_site_settings_updated
  before update on public.site_settings
  for each row execute function public.update_updated_at_column();

-- =========================================================
-- STORAGE BUCKET: studio-assets (public read)
-- =========================================================
insert into storage.buckets (id, name, public)
values ('studio-assets', 'studio-assets', true)
on conflict (id) do nothing;

create policy "Public read studio-assets"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'studio-assets');

create policy "Admins upload studio-assets"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'studio-assets'
    and (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'editor'))
  );

create policy "Admins update studio-assets"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'studio-assets'
    and (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'editor'))
  );

create policy "Admins delete studio-assets"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'studio-assets'
    and (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'editor'))
  );

-- =========================================================
-- REALTIME
-- =========================================================
alter publication supabase_realtime add table public.projects;
alter publication supabase_realtime add table public.testimonials;
alter publication supabase_realtime add table public.client_logos;
alter publication supabase_realtime add table public.site_settings;
