import Anthropic from 'https://esm.sh/@anthropic-ai/sdk@0.36.3'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// ---------------------------------------------------------------------------
// Sources — add URLs here to scrape more sites
// ---------------------------------------------------------------------------
const SOURCES = [
  'https://www.cityofboise.org/events',
  'https://library.cityofboise.org/events',
  'https://meridiancity.org/parksrec/events',
  'https://www.idahostateparks.org/events',
]

// Default coordinates for Treasure Valley (used when geocoding isn't available)
const DEFAULT_LAT = 43.615
const DEFAULT_LNG = -116.2023

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface ExtractedEvent {
  title: string
  description: string
  location_name: string
  address: string
  starts_at: string
  ends_at: string
  price_cents: number
  age_min: number | null
  age_max: number | null
  category: 'outdoors' | 'arts' | 'performance' | 'sports' | 'stem' | 'learning' | 'food' | 'other'
  source_url: string
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 15000) // Keep well within token limits
}

function generateSlug(title: string, startsAt: string): string {
  const date = startsAt.split('T')[0]
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return `${base}-${date}`
}

function extractHostname(url: string): string {
  try {
    return new URL(url).hostname
  } catch {
    return url
  }
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------
Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  let start_date: string, end_date: string
  try {
    const body = await req.json()
    start_date = body.start_date
    end_date = body.end_date
  } catch {
    return new Response(
      JSON.stringify({ error: 'Request body must be JSON with start_date and end_date' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    )
  }

  if (!start_date || !end_date) {
    return new Response(
      JSON.stringify({ error: 'start_date and end_date are required (ISO 8601 date strings)' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    )
  }

  const anthropic = new Anthropic({ apiKey: Deno.env.get('ANTHROPIC_API_KEY') })
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  const results = {
    inserted: 0,
    skipped: 0,
    errors: [] as string[],
  }

  for (const sourceUrl of SOURCES) {
    try {
      // ------------------------------------------------------------------
      // 1. Fetch and strip the page
      // ------------------------------------------------------------------
      const pageRes = await fetch(sourceUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; KiddoBot/1.0)' },
      })
      if (!pageRes.ok) {
        results.errors.push(`${sourceUrl}: HTTP ${pageRes.status}`)
        continue
      }
      const pageText = stripHtml(await pageRes.text())

      // ------------------------------------------------------------------
      // 2. Extract events via Claude
      // ------------------------------------------------------------------
      const extractionRes = await anthropic.messages.create({
        model: 'claude-opus-4-6',
        max_tokens: 4096,
        thinking: { type: 'adaptive' },
        messages: [
          {
            role: 'user',
            content: `Extract all family-friendly events from the page text below.
Only include events that occur between ${start_date} and ${end_date}.

Rules:
- You MUST include a direct URL (source_url) linking to that specific event. If you cannot find a URL for an event, omit it entirely.
- Return valid JSON matching the schema below — no markdown fences, no extra text.
- If no qualifying events are found, return { "events": [] }.

Schema:
{
  "events": [
    {
      "title": string,
      "description": string (2–3 sentence summary),
      "location_name": string (venue name),
      "address": string (full street address including city and state),
      "starts_at": string (ISO 8601 with timezone, e.g. "2026-04-05T10:00:00-07:00"),
      "ends_at": string (ISO 8601 with timezone),
      "price_cents": number (0 if free),
      "age_min": number | null,
      "age_max": number | null,
      "category": "outdoors" | "arts" | "performance" | "sports" | "stem" | "learning" | "food" | "other",
      "source_url": string (direct URL to this specific event)
    }
  ]
}

Page URL: ${sourceUrl}
Page text:
${pageText}`,
          },
        ],
      })

      const extractionBlock = extractionRes.content.find((b) => b.type === 'text')
      if (!extractionBlock || extractionBlock.type !== 'text') continue

      // Pull JSON out of the response (handles any stray whitespace/text)
      const jsonMatch = extractionBlock.text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) continue

      let events: ExtractedEvent[]
      try {
        ;({ events } = JSON.parse(jsonMatch[0]))
      } catch {
        results.errors.push(`${sourceUrl}: failed to parse extraction JSON`)
        continue
      }

      if (!events?.length) continue

      // ------------------------------------------------------------------
      // 3. Verify + insert each event
      // ------------------------------------------------------------------
      for (const event of events) {
        if (!event.source_url || !event.title || !event.starts_at || !event.ends_at) {
          results.skipped++
          continue
        }

        // Verification pass — re-fetch the event's direct URL and confirm it's real
        try {
          const verifyRes = await fetch(event.source_url, {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; KiddoBot/1.0)' },
          })
          if (!verifyRes.ok) {
            results.skipped++
            continue
          }
          const verifyText = stripHtml(await verifyRes.text()).slice(0, 5000)

          const verifyRes2 = await anthropic.messages.create({
            model: 'claude-haiku-4-5',
            max_tokens: 10,
            messages: [
              {
                role: 'user',
                content: `Does this page contain an event called "${event.title}"? Answer only "yes" or "no".\n\n${verifyText}`,
              },
            ],
          })

          const verifyBlock = verifyRes2.content.find((b) => b.type === 'text')
          if (!verifyBlock || verifyBlock.type !== 'text') {
            results.skipped++
            continue
          }
          if (!verifyBlock.text.toLowerCase().includes('yes')) {
            results.skipped++
            continue
          }
        } catch {
          results.skipped++
          continue
        }

        // Upsert organizer (keyed on website hostname)
        const hostname = extractHostname(sourceUrl)
        const { data: existingOrg } = await supabase
          .from('organizers')
          .select('id')
          .eq('website', `https://${hostname}`)
          .single()

        let organizerId: string
        if (existingOrg) {
          organizerId = existingOrg.id
        } else {
          const { data: newOrg, error: orgErr } = await supabase
            .from('organizers')
            .insert({
              name: hostname,
              email: `noreply@${hostname}`,
              website: `https://${hostname}`,
              is_verified: false,
            })
            .select('id')
            .single()

          if (orgErr || !newOrg) {
            results.errors.push(`${sourceUrl}: organizer insert failed — ${orgErr?.message}`)
            continue
          }
          organizerId = newOrg.id
        }

        // Insert event (upsert on slug to avoid duplicates across runs)
        const slug = generateSlug(event.title, event.starts_at)
        const { error: eventErr } = await supabase.from('events').upsert(
          {
            slug,
            title: event.title,
            description: event.description,
            location_name: event.location_name,
            address: event.address,
            lat: DEFAULT_LAT,
            lng: DEFAULT_LNG,
            starts_at: event.starts_at,
            ends_at: event.ends_at,
            price_cents: event.price_cents ?? 0,
            age_min: event.age_min ?? null,
            age_max: event.age_max ?? null,
            category: event.category ?? 'other',
            is_featured: false,
            is_approved: false,
            organizer_id: organizerId,
            source_url: event.source_url,
          },
          { onConflict: 'slug' },
        )

        if (eventErr) {
          results.errors.push(`${event.title}: ${eventErr.message}`)
        } else {
          results.inserted++
        }
      }
    } catch (err) {
      results.errors.push(`${sourceUrl}: ${(err as Error).message}`)
    }
  }

  return new Response(JSON.stringify(results, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  })
})
