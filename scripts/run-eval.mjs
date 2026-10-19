// Sends every question in eval/questions.json to the search-events function
// and counts how many found all the events they should (in the top 5).
//
// Run:  node --env-file=.env.local scripts/run-eval.mjs

import { readFile } from 'node:fs/promises'

const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL
const key = process.env.SUPABASE_ANON_KEY ?? process.env.VITE_SUPABASE_ANON_KEY
if (!url || !key) {
  console.error('Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (for example in .env.local).')
  process.exit(1)
}

const questions = JSON.parse(await readFile(new URL('../eval/questions.json', import.meta.url), 'utf8'))

// "thisWeekend": true becomes the coming Saturday and Sunday. The sample
// events roll forward every week, so fixed dates would go stale.
function expandFilters({ thisWeekend, ...filters } = {}) {
  if (!thisWeekend) return filters
  const now = new Date()
  const sat = new Date(now)
  sat.setUTCDate(now.getUTCDate() + ((6 - now.getUTCDay() + 7) % 7))
  const sun = new Date(sat)
  sun.setUTCDate(sat.getUTCDate() + 1)
  const day = (d) => d.toISOString().slice(0, 10)
  // -06:00 and -07:00 cover Boise's summer and winter time.
  return { ...filters, startsAfter: `${day(sat)}T00:00:00-06:00`, startsBefore: `${day(sun)}T23:59:59-07:00` }
}

let right = 0
for (const q of questions) {
  const res = await fetch(`${url}/functions/v1/search-events`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, apikey: key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ question: q.question, ...expandFilters(q.filters) }),
  })
  const body = await res.json()
  if (!res.ok) {
    console.log(`ERROR  ${q.question}: ${body.error ?? res.status}`)
    continue
  }

  const foundIds = body.events.map((e) => e.id)
  const missing = q.expected.filter((id) => !foundIds.includes(id))
  if (missing.length === 0) {
    right++
    console.log(`RIGHT  ${q.question}`)
  } else {
    console.log(`WRONG  ${q.question}`)
    console.log(`       missing ${missing.length} of ${q.expected.length}. Got: ${body.events.map((e) => e.title).join(' | ')}`)
  }
}

console.log(`\n${right} of ${questions.length} right`)
