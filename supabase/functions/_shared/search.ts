import { createClient } from 'npm:@supabase/supabase-js@2'

// Must be the same model embed-events uses, or the numbers won't line up.
const model = new Supabase.ai.Session('gte-small')

// Lets the website call these functions from the browser.
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-retry-count',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

export function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

export type SearchRequest = {
  question?: string
  free?: boolean
  age?: number
  city?: string
  startsAfter?: string // ISO date-time
  startsBefore?: string // ISO date-time
}

export type FoundEvent = {
  id: string
  slug: string
  title: string
  description: string
  location_name: string
  address: string
  starts_at: string
  ends_at: string
  price_cents: number
  age_min: number | null
  age_max: number | null
  category: string
  image_url: string | null
  source_url: string | null
  similarity: number
}

// Turns the question into numbers, then asks the database for the closest
// approved events that pass the filters.
export async function searchEvents(question: string, filters: SearchRequest): Promise<FoundEvent[]> {
  const embedding = await model.run(question, { mean_pool: true, normalize: true })

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )
  const { data, error } = await supabase.rpc('match_events', {
    query_embedding: embedding,
    match_count: 5,
    free_only: filters.free ?? false,
    child_age: filters.age ?? null,
    city: filters.city ?? null,
    starts_after: filters.startsAfter ?? null,
    starts_before: filters.startsBefore ?? null,
  })
  if (error) throw new Error(error.message)
  return data as FoundEvent[]
}
