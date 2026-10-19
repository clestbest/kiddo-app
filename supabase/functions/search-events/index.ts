import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { corsHeaders, json, searchEvents, type SearchRequest } from '../_shared/search.ts'

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

  try {
    return json({ events: await searchEvents(question, body) })
  } catch (err) {
    return json({ error: (err as Error).message }, 500)
  }
})
