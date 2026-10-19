import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'

// Must be the same model embed-events uses, or the numbers won't line up.
const model = new Supabase.ai.Session('gte-small')

// Lets the website call this function from the browser.
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

type SearchRequest = {
  question?: string
  free?: boolean
  age?: number
  city?: string
  startsAfter?: string // ISO date-time
  startsBefore?: string // ISO date-time
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

// Takes a question (plus optional filters) and returns the 5 closest events.
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Use POST' }, 405)

  let body: SearchRequest
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Body must be JSON' }, 400)
  }

  const question = body.question?.trim().slice(0, 500)
  if (!question) return json({ error: 'question is required' }, 400)

  // 1. Turn the question into numbers.
  const embedding = await model.run(question, { mean_pool: true, normalize: true })

  // 2. Ask the database for the closest approved events that pass the filters.
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )
  const { data, error } = await supabase.rpc('match_events', {
    query_embedding: embedding,
    match_count: 5,
    free_only: body.free ?? false,
    child_age: body.age ?? null,
    city: body.city ?? null,
    starts_after: body.startsAfter ?? null,
    starts_before: body.startsBefore ?? null,
  })
  if (error) return json({ error: error.message }, 500)

  return json({ events: data })
})
