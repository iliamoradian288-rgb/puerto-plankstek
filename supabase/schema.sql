-- ============================================================
-- PLANKSTEK multi-tenant — Ejecutar en Supabase (SQL Editor)
-- Un restaurante = un clients.id. Todas las queries filtran por client_id.
-- ============================================================

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  domain text,
  created_at timestamptz not null default now()
);

create table if not exists client_users (
  user_id uuid not null references auth.users(id) on delete cascade,
  client_id uuid not null references clients(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, client_id)
);

create table if not exists food_items (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  title text not null,
  description text,
  price numeric(10,2) not null check (price >= 0),
  category text not null default 'principales'
    check (category in ('entrantes','principales','postres')),
  image_url text,
  created_at timestamptz not null default now()
);
create index if not exists food_items_client_idx on food_items(client_id);

create table if not exists drink_items (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  title text not null,
  description text,
  price numeric(10,2) not null check (price >= 0),
  category text not null default 'cocteles'
    check (category in ('vinos','cocteles','cervezas','refrescos','cafes')),
  image_url text,
  created_at timestamptz not null default now()
);
create index if not exists drink_items_client_idx on drink_items(client_id);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  title text not null,
  description text,
  event_date timestamptz not null,
  image_url text,
  created_at timestamptz not null default now()
);
create index if not exists events_client_idx on events(client_id);

create table if not exists event_inquiries (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  name text not null,
  email text not null,
  phone text not null,
  event_type text not null default 'otro'
    check (event_type in ('cumpleanos','empresa','grupo','otro')),
  guests_count int not null check (guests_count >= 1),
  target_date timestamptz not null,
  comments text,
  status text not null default 'pendiente'
    check (status in ('pendiente','confirmada','cancelada')),
  created_at timestamptz not null default now()
);
create index if not exists event_inquiries_client_idx on event_inquiries(client_id);

create table if not exists gallery_photos (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  title text,
  image_url text not null,
  category text not null default 'local'
    check (category in ('local','ambiente','comida','eventos')),
  created_at timestamptz not null default now()
);
create index if not exists gallery_photos_client_idx on gallery_photos(client_id);

create table if not exists offers (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  title text not null,
  description text,
  discount_tag text not null default 'Especial'
    check (discount_tag in ('2x1','50%','Especial')),
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists offers_client_idx on offers(client_id);

-- RLS
alter table clients enable row level security;
alter table client_users enable row level security;
alter table food_items enable row level security;
alter table drink_items enable row level security;
alter table events enable row level security;
alter table event_inquiries enable row level security;
alter table gallery_photos enable row level security;
alter table offers enable row level security;

-- Public read
create policy "Public read food" on food_items for select using (true);
create policy "Public read drinks" on drink_items for select using (true);
create policy "Public read events" on events for select using (true);
create policy "Public read gallery" on gallery_photos for select using (true);
create policy "Public read offers" on offers for select using (is_active = true);
create policy "Public insert inquiries" on event_inquiries for insert with check (true);

-- Member write (client_users auth.uid() check)
create policy "Member food" on food_items for all to authenticated
  using (exists (select 1 from client_users where user_id = auth.uid() and client_id = food_items.client_id))
  with check (exists (select 1 from client_users where user_id = auth.uid() and client_id = food_items.client_id));
create policy "Member drinks" on drink_items for all to authenticated
  using (exists (select 1 from client_users where user_id = auth.uid() and client_id = drink_items.client_id))
  with check (exists (select 1 from client_users where user_id = auth.uid() and client_id = drink_items.client_id));
create policy "Member events" on events for all to authenticated
  using (exists (select 1 from client_users where user_id = auth.uid() and client_id = events.client_id))
  with check (exists (select 1 from client_users where user_id = auth.uid() and client_id = events.client_id));
create policy "Member gallery" on gallery_photos for all to authenticated
  using (exists (select 1 from client_users where user_id = auth.uid() and client_id = gallery_photos.client_id))
  with check (exists (select 1 from client_users where user_id = auth.uid() and client_id = gallery_photos.client_id));
create policy "Member offers" on offers for all to authenticated
  using (exists (select 1 from client_users where user_id = auth.uid() and client_id = offers.client_id))
  with check (exists (select 1 from client_users where user_id = auth.uid() and client_id = offers.client_id));
create policy "Member inquiries" on event_inquiries for all to authenticated
  using (exists (select 1 from client_users where user_id = auth.uid() and client_id = event_inquiries.client_id))
  with check (exists (select 1 from client_users where user_id = auth.uid() and client_id = event_inquiries.client_id));
create policy "Member clients" on clients for select to authenticated
  using (exists (select 1 from client_users where user_id = auth.uid() and client_id = clients.id));
create policy "Own links" on client_users for select to authenticated using (user_id = auth.uid());

-- Storage
insert into storage.buckets (id, name, public)
values ('restaurant-images','restaurant-images', true) on conflict (id) do nothing;
create policy "Public read images" on storage.objects for select using (bucket_id = 'restaurant-images');
create policy "Member write images" on storage.objects for all to authenticated using (bucket_id = 'restaurant-images');
