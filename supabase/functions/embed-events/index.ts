import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'

// Supabase's built-in text-to-numbers model. It runs inside this function,
// so event text never leaves Supabase. It gives back 384 numbers per text.
const MODEL = 'gte-small'
const model = new Supabase.ai.Session(MODEL)

type EventRow = {
  id: string
  title: string
  description: string
  location_name: string
  address: string
  category: string
  age_min: number | null
  age_max: number | null
  price_cents: number
}

// The text we turn into numbers for each event. Price and ages are written
// out in words so questions like "free" or "toddler" land near the right events.
function eventText(e: EventRow): string {
  const price = e.price_cents === 0 ? 'Free' : `$${(e.price_cents / 100).toFixed(2)}`
  let ages = 'All ages'
  if (e.age_min != null && e.age_max != null) ages = `Ages ${e.age_min} to ${e.age_max}`
  else if (e.age_min != null) ages = `Ages ${e.age_min} and up`
  else if (e.age_max != null) ages = `Ages ${e.age_max} and under`

  return [
    e.title,
    e.description,
    `${e.location_name}, ${e.address}`,
    `Category: ${e.category}`,
    ages,
    price,
  ].join('\n')
}

async function sha256(text: string): Promise<string> {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, '0')).join('')
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

// Makes embeddings for events that don't have one yet, or whose text changed.
// Safe to run again and again (for example after each scrape).
Deno.serve(async (req) => {
  // Only someone holding the service role key can run this.
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  if (req.headers.get('Authorization') !== `Bearer ${serviceKey}`) {
    return json({ error: 'Unauthorized' }, 401)
  }

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, serviceKey)

  // 1. Load every event, and the fingerprints of the ones already done.
  const { data: events, error: eventsError } = await supabase
    .from('events')
    .select('id, title, description, location_name, address, category, age_min, age_max, price_cents')
  if (eventsError) return json({ error: eventsError.message }, 500)

  const { data: existing, error: existingError } = await supabase
    .from('event_embeddings')
    .select('event_id, content_hash')
  if (existingError) return json({ error: existingError.message }, 500)

  const doneHashes = new Map(existing.map((row) => [row.event_id, row.content_hash]))
  const results = { embedded: 0, unchanged: 0, errors: [] as string[] }

  for (const event of events as EventRow[]) {
    // 2. Skip events whose text hasn't changed since last time.
    const text = eventText(event)
    const hash = await sha256(`${MODEL}\n${text}`)
    if (doneHashes.get(event.id) === hash) {
      results.unchanged++
      continue
    }

    // 3. Turn the text into numbers and save them.
    try {
      const embedding = await model.run(text, { mean_pool: true, normalize: true })
      const { error } = await supabase.from('event_embeddings').upsert({
        event_id: event.id,
        embedding,
        model: MODEL,
        content_hash: hash,
        updated_at: new Date().toISOString(),
      })
      if (error) results.errors.push(`${event.id}: ${error.message}`)
      else results.embedded++
    } catch (err) {
      results.errors.push(`${event.id}: ${(err as Error).message}`)
    }
  }

  return json(results)
})
