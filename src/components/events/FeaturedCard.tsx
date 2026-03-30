import type { Event } from '../../lib/types'
import { formatEventDate, formatPrice } from '../../lib/eventUtils'
import { AgeBadge } from '../ui/AgeBadge'
import { SaveButton } from '../ui/SaveButton'

interface FeaturedCardProps {
  event: Event
  onClick?: () => void
}

export function FeaturedCard({ event, onClick }: FeaturedCardProps) {
  const isFree = event.price_cents === 0

  return (
    <div
      onClick={onClick}
      className="rounded-featured p-7 mb-8 grid gap-5 items-center relative overflow-hidden cursor-pointer transition-transform duration-200 hover:-translate-y-0.5"
      style={{
        gridTemplateColumns: '1fr auto',
        background: 'var(--color-primary-light)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none" />

      {/* Left content */}
      <div className="relative z-10">
        <h2 className="font-fraunces text-[26px] font-bold text-ink tracking-[-0.5px] mb-[10px] leading-[1.2]">
          {event.title}
        </h2>
        <div className="flex flex-col gap-[5px]">
          <div className="flex items-center gap-[6px] text-[13px] text-muted">
            <span>📅</span>
            <span>{formatEventDate(event.starts_at, event.ends_at)}</span>
          </div>
          <div className="flex items-center gap-[6px] text-[13px] text-muted">
            <span>📍</span>
            <span>{event.location_name}</span>
          </div>
          <div className="flex items-center gap-[6px] text-[13px] text-muted">
            <span>👨‍👩‍👧‍👦</span>
            <span>
              {event.age_min === null && event.age_max === null
                ? 'Great for all ages'
                : `Ages ${event.age_min}–${event.age_max}`}
            </span>
          </div>
        </div>
      </div>

      {/* Right content */}
      <div className="flex flex-col items-end gap-3 relative z-10">
        <SaveButton eventId={event.id} variant="light" />
        <AgeBadge min={event.age_min} max={event.age_max} />
        <span className={`font-fraunces text-[28px] text-primary ${isFree ? 'font-normal' : 'font-black'}`}>
          {isFree ? 'Free' : formatPrice(event.price_cents)}
        </span>
      </div>
    </div>
  )
}
