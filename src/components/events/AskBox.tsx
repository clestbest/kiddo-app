import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAskEvents } from '../../hooks/useAskEvents'
import { EventCard } from './EventCard'

const stripBold = (text: string) => text.replace(/\*\*/g, '')

// Turns [Event name](/events/slug) into links. Only links to our own event
// pages become links; anything else stays plain text.
function renderInline(text: string) {
  const parts: React.ReactNode[] = []
  let last = 0
  for (const match of text.matchAll(/\[([^\]]+)\]\(([^)\s]+)\)/g)) {
    const [whole, label, href] = match
    parts.push(stripBold(text.slice(last, match.index)))
    parts.push(
      href.startsWith('/events/') ? (
        <Link key={match.index} to={href} className="text-primary font-semibold hover:text-primary-dark">
          {stripBold(label)}
        </Link>
      ) : (
        stripBold(label)
      ),
    )
    last = match.index + whole.length
  }
  parts.push(stripBold(text.slice(last)))
  return parts
}

// Claude answers with a sentence and a bulleted list. Show those as
// paragraphs and lists.
function AnswerText({ text }: { text: string }) {
  const blocks: { type: 'p' | 'ul'; lines: string[] }[] = []
  for (const raw of text.split('\n')) {
    const line = raw.trim()
    if (!line) continue
    const bullet = line.match(/^[-*•]\s+(.*)/)
    const prev = blocks[blocks.length - 1]
    if (bullet && prev?.type === 'ul') prev.lines.push(bullet[1])
    else if (bullet) blocks.push({ type: 'ul', lines: [bullet[1]] })
    else blocks.push({ type: 'p', lines: [line] })
  }

  return (
    <div className="flex flex-col gap-2 text-[14px] text-ink leading-relaxed">
      {blocks.map((block, i) =>
        block.type === 'ul' ? (
          <ul key={i} className="list-disc pl-5 flex flex-col gap-1">
            {block.lines.map((line, j) => (
              <li key={j}>{renderInline(line)}</li>
            ))}
          </ul>
        ) : (
          <p key={i}>{renderInline(block.lines[0])}</p>
        ),
      )}
    </div>
  )
}

export function AskBox() {
  const [question, setQuestion] = useState('')
  const ask = useAskEvents()
  const navigate = useNavigate()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = question.trim()
    if (q) ask.mutate(q)
  }

  // Show cards for the events Claude recommended. If Claude couldn't answer,
  // show every event search found.
  const result = ask.data
  const shownEvents = !result
    ? []
    : result.answer
      ? result.events.filter((ev) => result.answer!.includes(`/events/${ev.slug}`))
      : result.events

  return (
    <section className="bg-primary-light rounded-card p-6 mb-10">
      <h2 className="font-fraunces text-2xl font-bold text-ink tracking-[-0.5px] mb-1">
        Ask Kiddo
      </h2>
      <p className="text-[13px] text-muted mb-4">
        Ask in your own words. We find the closest events, then AI answers using only those events.
      </p>

      <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          maxLength={500}
          aria-label="Ask about events"
          placeholder="e.g. free things for a 4-year-old in Meridian this weekend"
          className="flex-1 min-w-[220px] px-[14px] py-[10px] rounded-btn border-[1.5px] border-border bg-warm-white text-[14px] font-sans text-ink outline-none focus:border-primary"
        />
        <button
          type="submit"
          disabled={ask.isPending || !question.trim()}
          className="bg-primary text-white border-none px-5 py-[10px] rounded-btn text-[13px] font-bold font-sans cursor-pointer transition-colors hover:bg-primary-dark disabled:opacity-60 disabled:cursor-default"
        >
          {ask.isPending ? 'Thinking…' : 'Ask'}
        </button>
      </form>
      <p className="text-[12px] text-muted mt-2">Answers are based on sample events.</p>

      {ask.isError && (
        <p className="text-[13px] text-muted mt-4">Sorry, something went wrong. Please try again.</p>
      )}

      {result && (
        <div className="mt-5">
          {result.answer ? (
            <AnswerText text={result.answer} />
          ) : (
            <p className="text-[13px] text-muted">
              We couldn't write an answer right now, but these are the closest matches.
            </p>
          )}

          {shownEvents.length > 0 && (
            <div
              className="grid gap-4 mt-5"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
            >
              {shownEvents.map((ev) => (
                <EventCard key={ev.id} event={ev} onClick={() => navigate(`/events/${ev.slug}`)} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
