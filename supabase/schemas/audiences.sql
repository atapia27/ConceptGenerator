-- Audiences table schema
create table "public"."audiences" (
  "id" uuid primary key default gen_random_uuid(),
  "name" text not null,
  "age" text not null,
  "profession" text not null,
  "location" text not null,
  "interests" text[] not null default '{}',
  "income" text not null,
  "education" text not null,
  "created_at" timestamptz default now(),
  "updated_at" timestamptz default now()
);

-- Create index for better performance
create index "idx_audiences_created_at" on "public"."audiences" ("created_at");

-- Enable Row Level Security
alter table "public"."audiences" enable row level security;

-- Create policy for public access (you may want to restrict this based on your auth setup)
create policy "Allow all operations on audiences" on "public"."audiences"
  for all using (true) with check (true);
