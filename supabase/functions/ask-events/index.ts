import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import Anthropic from 'npm:@anthropic-ai/sdk'
import { corsHeaders, json, searchEvents, type FoundEvent, type SearchRequest } from '../_shared/search.ts'

// The full RAG flow:
//   1. Retrieval:  find the 5 closest events (same as search-events).
//   2. Augmented:  paste those events into a message for Claude.
//   3. Generation: Claude writes a short answer using only those events.

const MODEL = 'claude-opus-5-5'
const anthropic = new Anthropic({ apiKey: Deno.env.get('ANTHROPIC_API_KEY') })

const SYSTEM_PROMPT = `You help parents find kids' events in the Boise, Idaho area.

Answer the parent's question using only the events listed in their message. Never mention an event that isn't in the list.
Some listed events may not fit the question (wrong age, price, city, or day). Leave those out.
If none of them fit, say so in one friendly sentence.

For each event you recommend, give its name as a Markdown link using the exact link provided, then when it is and the price.
Keep it short: one sentence, then a bulleted list of the events.`

function when(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    timeZone: 'America/Boise',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function describeEvent(e: FoundEvent, n: number): string {
  let ages = 'All ages'
  if (e.age_min != null && e.age_max != null) ages = `Ages ${e.age_min} to ${e.age_max}`
  else if (e.age_min != null) ages = `Ages ${e.age_min} and up`
  else if (e.age_max != null) ages = `Ages ${e.age_max} and under`

  return [
    `Event ${n}: ${e.title}`,
    `When: ${when(e.starts_at)} to ${when(e.ends_at)}`,
    `Where: ${e.location_name}, ${e.address}`,
    `Price: ${e.price_cents === 0 ? 'Free' : `$${(e.price_cents / 100).toFixed(2)}`}`,
    `Ages: ${ages}`,
    `About: ${e.description}`,
    `Link: /events/${e.slug}`,
  ].join('\n')
}

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

  // 1. Retrieval
  let events: FoundEvent[]
  try {
    events = await searchEvents(question, body)
  } catch (err) {
    return json({ error: (err as Error).message }, 500)
  }
  if (events.length === 0) {
    return json({ answer: "I couldn't find any events that match. Try fewer filters.", events })
  }

  // 2. Augmented: the question plus the events we found.
  const today = new Date().toLocaleDateString('en-US', {
    timeZone: 'America/Boise',
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  const message = [
    `Today is ${today}.`,
    '',
    'Events:',
    events.map((e, i) => describeEvent(e, i + 1)).join('\n\n'),
    '',
    `Question: ${question}`,
  ].join('\n')

  // 3. Generation
  try {
    const response = await anthropic.beta.messages.create({
      model: MODEL,
      max_tokens: 16000,
      output_config: { effort: 'low' },
      // If Claude's safety checks decline, the API retries on a fallback model.
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: message }],
    })

    if (response.stop_reason === 'refusal') {
      return json({ answer: "Sorry, I can't answer that one. Here are the closest events.", events })
    }

    const answer = response.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('')
    return json({ answer, events })
  } catch (err) {
    if (err instanceof Anthropic.APIError) {
      return json({ error: `Claude error ${err.status}: ${err.message}`, events }, 502)
    }
    return json({ error: (err as Error).message, events }, 500)
  }
})
