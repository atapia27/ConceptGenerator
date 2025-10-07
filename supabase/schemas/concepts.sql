-- Concepts table schema
create table "public"."concepts" (
  "id" uuid primary key default gen_random_uuid(),
  "audience_id" uuid not null references "public"."audiences"("id") on delete cascade,
  "title" text not null,
  "description" text not null,
  "category" text not null,
  "target_audience" text not null,
  "key_message" text not null,
  "visual_elements" text[] not null default '{}',
  "call_to_action" text not null,
  "estimated_reach" integer not null default 0,
  "estimated_engagement" integer not null default 0,
  "created_at" timestamptz default now(),
  "updated_at" timestamptz default now()
);

-- Create indexes for better performance
create index "idx_concepts_audience_id" on "public"."concepts" ("audience_id");
create index "idx_concepts_created_at" on "public"."concepts" ("created_at");

-- Enable Row Level Security
alter table "public"."concepts" enable row level security;

-- Create policy for public access (you may want to restrict this based on your auth setup)
create policy "Allow all operations on concepts" on "public"."concepts"
  for all using (true) with check (true);
