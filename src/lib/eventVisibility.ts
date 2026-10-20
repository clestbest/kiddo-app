// While permission to use real event listings is pending, the site only shows
// the made-up sample events (supabase/sample_events.sql).
// To show every approved event again, set VITE_SHOW_REAL_EVENTS=true
// (for example in Cloudflare Pages settings) and redeploy.
export const SHOW_REAL_EVENTS = import.meta.env.VITE_SHOW_REAL_EVENTS === 'true'

// The "Kiddo Sample Events" organizer.
export const SAMPLE_ORGANIZER_ID = 'aaaaaaaa-0000-0000-0000-000000000002'

// Adds the "sample events only" rule to an events query while the switch is off.
export function onlyShownEvents<Q extends { eq(column: string, value: string): Q }>(query: Q): Q {
  return SHOW_REAL_EVENTS ? query : query.eq('organizer_id', SAMPLE_ORGANIZER_ID)
}
