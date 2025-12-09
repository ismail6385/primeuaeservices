-- Create admin_settings table
create table if not exists public.admin_settings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  full_name text,
  email text,
  notifications jsonb default '{"email": true, "push": false, "tickets": true, "updates": true}'::jsonb,
  theme text default 'light' check (theme in ('light', 'dark', 'system')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id)
);

-- Enable Row Level Security (RLS)
alter table public.admin_settings enable row level security;

-- Create policy to allow authenticated users to manage their own settings
create policy "Users can manage their own settings"
on public.admin_settings for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Create function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create trigger to automatically update updated_at
create trigger update_admin_settings_updated_at
  before update on public.admin_settings
  for each row
  execute function update_updated_at_column();

