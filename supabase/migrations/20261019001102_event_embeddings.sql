-- Smart search for events.
-- Adds things only: the events table itself is not changed.

-- 1. Turn on pgvector so Postgres can store lists of numbers and find the closest ones.
create extension if not exists vector with schema extensions;

-- 2. One row per event holding its "map address" (embedding).
--    gte-small (Supabase's built-in model) gives 384 numbers per text.
create table public.event_embeddings (
  event_id uuid primary key references public.events(id) on delete cascade,
  embedding extensions.vector(384) not null,
  model text not null,         -- which model made the numbers
  content_hash text not null,  -- fingerprint of the text, so we only redo changed events
  updated_at timestamptz not null default now()
);

-- Row security on with no policies: browsers can't read or write this table.
-- Only our edge functions (using the service role key) can.
alter table public.event_embeddings enable row level security;

-- 3. Find the approved events closest to a question's numbers.
--    The filters are optional; leave one as null (or false) to skip it.
create or replace function public.match_events(
  query_embedding extensions.vector(384),
  match_count int default 5,
  free_only boolean default false,
  child_age int default null,
  city text default null,
  starts_after timestamptz default null,
  starts_before timestamptz default null
)
returns table (
  id uuid,
  slug text,
  title text,
  description text,
  location_name text,
  address text,
  starts_at timestamptz,
  ends_at timestamptz,
  price_cents int,
  age_min int,
  age_max int,
  category public.event_category,
  image_url text,
  source_url text,
  similarity float
)
language sql
stable
set search_path = public, extensions
as $$
  select
    e.id, e.slug, e.title, e.description, e.location_name, e.address,
    e.starts_at, e.ends_at, e.price_cents, e.age_min, e.age_max,
    e.category, e.image_url, e.source_url,
    1 - (ee.embedding <=> query_embedding) as similarity
  from event_embeddings ee
  join events e on e.id = ee.event_id
  where e.is_approved
    and (not free_only or e.price_cents = 0)
    and (child_age is null or (
      (e.age_min is null or e.age_min <= child_age) and
      (e.age_max is null or e.age_max >= child_age)
    ))
    and (city is null or e.address ilike '%' || city || '%')
    and (starts_after is null or e.ends_at >= starts_after)
    and (starts_before is null or e.starts_at <= starts_before)
  order by ee.embedding <=> query_embedding
  limit match_count;
$$;

-- Only our edge functions may call it.
revoke execute on function public.match_events from public, anon, authenticated;
grant execute on function public.match_events to service_role;
