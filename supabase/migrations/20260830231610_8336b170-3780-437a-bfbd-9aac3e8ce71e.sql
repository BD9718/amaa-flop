create type public.app_role as enum ('admin', 'editor');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
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

create policy "Users can read their own roles"
  on public.user_roles for select to authenticated
  using (auth.uid() = user_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  status text not null default 'upcoming' check (status in ('done', 'upcoming')),
  is_published boolean not null default true,
  sort_order integer not null default 0,
  cover_url text,
  cover_alt jsonb not null default '{}'::jsonb,
  title jsonb not null default '{}'::jsonb,
  summary jsonb not null default '{}'::jsonb,
  location jsonb not null default '{}'::jsonb,
  period jsonb not null default '{}'::jsonb,
  context jsonb not null default '{}'::jsonb,
  problem jsonb not null default '{}'::jsonb,
  objectives jsonb not null default '{}'::jsonb,
  beneficiaries jsonb not null default '{}'::jsonb,
  activities jsonb not null default '{}'::jsonb,
  results jsonb not null default '{}'::jsonb,
  partners jsonb not null default '{}'::jsonb,
  gallery jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.projects to anon;
grant select, insert, update, delete on public.projects to authenticated;
grant all on public.projects to service_role;
alter table public.projects enable row level security;
create policy "Public can read published projects"
  on public.projects for select to anon, authenticated
  using (is_published or public.has_role(auth.uid(), 'admin'));
create policy "Admins can manage projects"
  on public.projects for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));
create trigger projects_updated_at before update on public.projects
  for each row execute function public.set_updated_at();

create table public.news (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category text not null default 'institutionnel' check (category in ('institutionnel', 'terrain', 'formation')),
  published_on date not null default current_date,
  is_published boolean not null default true,
  cover_url text,
  title jsonb not null default '{}'::jsonb,
  excerpt jsonb not null default '{}'::jsonb,
  body jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.news to anon;
grant select, insert, update, delete on public.news to authenticated;
grant all on public.news to service_role;
alter table public.news enable row level security;
create policy "Public can read published news"
  on public.news for select to anon, authenticated
  using (is_published or public.has_role(auth.uid(), 'admin'));
create policy "Admins can manage news"
  on public.news for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));
create trigger news_updated_at before update on public.news
  for each row execute function public.set_updated_at();

create table public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  category text not null default 'assainissement' check (category in ('assainissement', 'sensibilisation', 'environnement')),
  caption jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);
grant select on public.gallery_items to anon;
grant select, insert, update, delete on public.gallery_items to authenticated;
grant all on public.gallery_items to service_role;
alter table public.gallery_items enable row level security;
create policy "Public can read gallery"
  on public.gallery_items for select to anon, authenticated
  using (true);
create policy "Admins can manage gallery"
  on public.gallery_items for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create table public.partners (
  id uuid primary key default gen_random_uuid(),
  name jsonb not null default '{}'::jsonb,
  type jsonb not null default '{}'::jsonb,
  logo_url text,
  website text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);
grant select on public.partners to anon;
grant select, insert, update, delete on public.partners to authenticated;
grant all on public.partners to service_role;
alter table public.partners enable row level security;
create policy "Public can read partners"
  on public.partners for select to anon, authenticated
  using (true);
create policy "Admins can manage partners"
  on public.partners for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create table public.key_figures (
  id uuid primary key default gen_random_uuid(),
  value text not null,
  label jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);
grant select on public.key_figures to anon;
grant select, insert, update, delete on public.key_figures to authenticated;
grant all on public.key_figures to service_role;
alter table public.key_figures enable row level security;
create policy "Public can read key figures"
  on public.key_figures for select to anon, authenticated
  using (true);
create policy "Admins can manage key figures"
  on public.key_figures for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);
grant insert on public.contact_messages to anon;
grant select, insert, update, delete on public.contact_messages to authenticated;
grant all on public.contact_messages to service_role;
alter table public.contact_messages enable row level security;
create policy "Anyone can send a message"
  on public.contact_messages for insert to anon, authenticated
  with check (true);
create policy "Admins can read and manage messages"
  on public.contact_messages for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));