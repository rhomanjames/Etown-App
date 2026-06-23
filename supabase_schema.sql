-- Run this in Supabase SQL editor to set up The Elizabethtown App

create table news_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text,
  body text,
  source_type text default 'news',
  published_at timestamptz default now()
);

create table events (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text,
  event_date date not null,
  description text,
  created_at timestamptz default now()
);

create table businesses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  address text,
  phone text,
  claimed_by uuid references auth.users(id),
  created_at timestamptz default now()
);

create table jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  company text not null,
  location text,
  pay text,
  description text,
  contact text,
  created_at timestamptz default now()
);

-- Row Level Security: allow public read, allow anyone to insert (free submissions)
alter table news_posts enable row level security;
alter table events enable row level security;
alter table businesses enable row level security;
alter table jobs enable row level security;

create policy "public read news" on news_posts for select using (true);
create policy "public read events" on events for select using (true);
create policy "public read businesses" on businesses for select using (true);
create policy "public read jobs" on jobs for select using (true);

create policy "anyone can submit events" on events for insert with check (true);
create policy "anyone can submit businesses" on businesses for insert with check (true);
create policy "anyone can submit jobs" on jobs for insert with check (true);

-- News posts: only you should insert (do this via Supabase dashboard or a service key in Make.com)
-- No public insert policy added for news_posts on purpose.

-- If you already ran this file before adding source_type, run just this line:
-- alter table news_posts add column source_type text default 'news';
