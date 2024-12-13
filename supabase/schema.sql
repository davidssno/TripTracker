-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text,
  email text not null,
  avatar_url text,
  bio text,
  cover_photo_url text,
  travel_style text,
  total_points integer default 0,
  total_cities integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create cities table
create table public.cities (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  country text not null,
  latitude double precision not null,
  longitude double precision not null,
  visit_date timestamp with time zone not null,
  rating integer check (rating >= 1 and rating <= 5),
  notes text,
  photos text[],
  is_favorite boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security
alter table public.profiles enable row level security;
alter table public.cities enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Public profiles are viewable by everyone" on public.profiles;
drop policy if exists "Users can insert their own profile" on public.profiles;
drop policy if exists "Users can update their own profile" on public.profiles;
drop policy if exists "Users can view their own cities" on public.cities;
drop policy if exists "Users can insert their own cities" on public.cities;
drop policy if exists "Users can update their own cities" on public.cities;
drop policy if exists "Users can delete their own cities" on public.cities;

-- Create updated policies
create policy "Enable read access for all users"
  on public.profiles for select
  using (true);

create policy "Enable insert for authenticated users only"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Enable update for users based on id"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Enable read access for authenticated users"
  on public.cities for select
  using (auth.uid() = user_id);

create policy "Enable insert for authenticated users only"
  on public.cities for insert
  with check (auth.uid() = user_id);

create policy "Enable update for users based on user_id"
  on public.cities for update
  using (auth.uid() = user_id);

create policy "Enable delete for users based on user_id"
  on public.cities for delete
  using (auth.uid() = user_id);

-- Create or replace the trigger function
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, username, total_points, total_cities)
  values (
    new.id,
    new.email,
    split_part(new.email, '@', 1),
    0,
    0
  );
  return new;
end;
$$;

-- Recreate the trigger
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();