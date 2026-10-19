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

let right = 0
for (const q of questions) {
  const res = await fetch(`${url}/functions/v1/search-events`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, apikey: key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ question: q.question, ...q.filters }),
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
