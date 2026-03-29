import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FilterChips } from '../components/events/FilterChips'
import { FeaturedCard } from '../components/events/FeaturedCard'
import { EventGrid } from '../components/events/EventGrid'
import { useFeaturedEvent, useEvents } from '../hooks/useEvents'

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [activeFilter, setActiveFilter] = useState('')
  const navigate = useNavigate()

  const filters = {
    category: ['outdoors', 'arts', 'performances', 'sports'].includes(activeFilter)
      ? (activeFilter === 'performances' ? 'performance' : activeFilter) as import('../lib/types').EventCategory
      : undefined,
    free: activeFilter === 'free' || undefined,
    weekendOnly: activeFilter === 'this-weekend' || undefined,
    ageMin: activeFilter === 'toddlers' ? 0 : activeFilter === 'ages-5-10' ? 5 : activeFilter === 'tweens' ? 11 : undefined,
    ageMax: activeFilter === 'toddlers' ? 3 : activeFilter === 'ages-5-10' ? 10 : activeFilter === 'tweens' ? 14 : undefined,
  }

  const { data: featuredEvent, isLoading: featuredLoading } = useFeaturedEvent()
  const { data: allEvents, isLoading: eventsLoading } = useEvents(filters)
  const regularEvents = allEvents?.filter((e) => !e.is_featured) ?? []

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
    }
  }

  return (
    <>
      <FilterChips active={activeFilter} onChange={setActiveFilter} />

      {/* Hero — hidden */}
      {/* <div
        className="px-6 py-14 text-center relative overflow-hidden"
        style={{ background: 'var(--color-primary-light)' }}
      >
        <div className="text-[12px] font-semibold tracking-[2px] uppercase text-primary mb-4 relative">
          ✦ Treasure Valley families
        </div>
        <h1
          className="font-fraunces font-black text-ink leading-none tracking-[-1.5px] mb-4 relative"
          style={{ fontSize: 'clamp(36px, 8vw, 64px)' }}
        >
          What are you
          <br />
          doing <em className="italic text-primary">this weekend?</em>
        </h1>
        <p className="text-[16px] mb-8 relative text-muted">
          Family-vetted events, no Facebook required.
        </p>

        <div
          className="flex max-w-[520px] mx-auto bg-warm-white rounded-[14px] px-4 py-[6px] gap-2 items-center relative"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
        >
          <span>🔍</span>
          <input
            type="text"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && setSearch(searchInput.trim())}
            placeholder="Search events, places, activities…"
            className="flex-1 border-none bg-transparent text-sm font-sans text-ink outline-none placeholder:text-muted"
          />
          {searchInput && (
            <button
              onClick={() => { setSearchInput(''); setSearch('') }}
              className="text-muted hover:text-ink text-lg leading-none bg-transparent border-none cursor-pointer"
            >
              ×
            </button>
          )}
          <button
            onClick={() => setSearch(searchInput.trim())}
            className="bg-primary text-white border-none rounded-btn px-5 py-[10px] text-sm font-semibold font-sans cursor-pointer whitespace-nowrap hover:bg-primary-dark transition-colors"
          >
            Search
          </button>
        </div>
      </div> */}

      {/* Main content */}
      <div className="max-w-[1100px] mx-auto px-6 py-8">

        {/* Featured section */}
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="font-fraunces text-2xl font-bold text-ink tracking-[-0.5px]">
            Featured this weekend
          </h2>
        </div>

        {featuredLoading ? (
          <div className="h-64 rounded-card bg-primary-light animate-pulse" />
        ) : featuredEvent ? (
          <FeaturedCard event={featuredEvent} onClick={() => navigate(`/events/${featuredEvent.slug}`)} />
        ) : null}

        {/* Events grid section */}
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="font-fraunces text-2xl font-bold text-ink tracking-[-0.5px]">
            Happening near you
          </h2>
          <a
            href="#"
            className="text-[13px] text-primary font-semibold cursor-pointer hover:text-primary-dark transition-colors"
          >
            See all →
          </a>
        </div>

        {eventsLoading ? (
          <div className="h-48 rounded-card bg-primary-light animate-pulse" />
        ) : (
          <EventGrid events={regularEvents} />
        )}

        {/* Digest banner */}
        <div className="bg-primary rounded-card px-7 py-6 flex items-center justify-between gap-5 mb-10 flex-wrap">
          <div>
            <h3 className="font-fraunces text-xl font-bold text-white mb-1">
              📬 Get the Friday digest
            </h3>
            <p className="text-[13px] text-white/75">
              Weekend plans, delivered every Friday morning. No spam, ever.
            </p>
          </div>
          {subscribed ? (
            <div className="text-white font-semibold text-sm">
              ✓ You're subscribed!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2 flex-shrink-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="px-[14px] py-[9px] rounded-btn border-none text-[13px] font-sans bg-white/15 text-white outline-none placeholder:text-white/50 w-[200px]"
              />
              <button
                type="submit"
                className="bg-white text-primary border-none px-4 py-[9px] rounded-btn text-[13px] font-bold font-sans cursor-pointer hover:bg-white/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

        {/* Organizer CTA */}
        <div className="bg-cream border-2 border-dashed border-border rounded-card p-7 text-center mb-10">
          <h3 className="font-fraunces text-xl font-bold text-ink mb-[6px]">
            Running an event for families?
          </h3>
          <p className="text-[13px] text-muted mb-4">
            List it free, or get featured at the top of the feed — seen by 2,000+ Treasure Valley parents.
          </p>
          <button
            onClick={() => navigate('/submit')}
            className="bg-transparent text-primary border-2 border-primary px-5 py-[9px] rounded-btn text-[13px] font-bold font-sans cursor-pointer transition-all hover:bg-primary hover:text-white"
          >
            Submit your event →
          </button>
        </div>

        {/* Bottom spacer for nav */}
        <div className="h-20" />
      </div>
    </>
  )
}
