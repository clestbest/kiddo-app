-- Keeps the made-up sample events (supabase/sample_events.sql) upcoming.
-- Once a sample event ends, it moves forward by whole weeks, so it lands on
-- the same weekday and local Boise time in the coming week.
create or replace function public.roll_sample_events_forward()
returns void
language sql
set search_path = public
as $$
  update events e
  set
    starts_at = ((e.starts_at at time zone 'America/Boise') + late.weeks * interval '7 days') at time zone 'America/Boise',
    ends_at = ((e.ends_at at time zone 'America/Boise') + late.weeks * interval '7 days') at time zone 'America/Boise'
  from (
    select id, ceil(extract(epoch from now() - ends_at) / 604800)::int as weeks
    from events
    where organizer_id = 'aaaaaaaa-0000-0000-0000-000000000002'
      and ends_at < now()
  ) late
  where e.id = late.id;
$$;

revoke execute on function public.roll_sample_events_forward from public, anon, authenticated;

-- Run it every night at about 1am Boise time.
select cron.schedule('roll-sample-events-forward', '15 7 * * *', 'select public.roll_sample_events_forward()');
