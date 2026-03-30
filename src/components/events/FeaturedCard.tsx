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
  const hasImage = !!event.image_url

  return (
    <div
      onClick={onClick}
      className="rounded-featured mb-8 relative overflow-hidden cursor-pointer transition-transform duration-200 hover:-translate-y-0.5"
      style={hasImage ? {} : { background: 'var(--color-primary-light)' }}
    >
      {/* Background image + gradient overlay */}
      {hasImage && (
        <div className="absolute inset-0">
          <img
            src={event.image_url!}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(18,13,30,0.88) 0%, rgba(18,13,30,0.35) 55%, transparent 100%)',
            }}
          />
        </div>
      )}

      {/* Content */}
      <div
        className="relative z-10 p-7 grid gap-5 items-end"
        style={{ gridTemplateColumns: '1fr auto', minHeight: hasImage ? 200 : 'auto' }}
      >
        {/* Left content */}
        <div>
          <h2
            className="font-fraunces text-[26px] font-bold tracking-[-0.5px] mb-[10px] leading-[1.2]"
            style={{ color: hasImage ? '#fff' : 'var(--color-ink)' }}
          >
            {event.title}
          </h2>
          <div className="flex flex-col gap-[5px]">
            <div
              className="flex items-center gap-[6px] text-[13px]"
              style={{ color: hasImage ? 'rgba(255,255,255,0.8)' : 'var(--color-muted)' }}
            >
              <span>📅</span>
              <span>{formatEventDate(event.starts_at, event.ends_at)}</span>
            </div>
            <div
              className="flex items-center gap-[6px] text-[13px]"
              style={{ color: hasImage ? 'rgba(255,255,255,0.8)' : 'var(--color-muted)' }}
            >
              <span>📍</span>
              <span>{event.location_name}</span>
            </div>
            <div
              className="flex items-center gap-[6px] text-[13px]"
              style={{ color: hasImage ? 'rgba(255,255,255,0.8)' : 'var(--color-muted)' }}
            >
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
        <div className="flex flex-col items-end gap-3">
          <SaveButton eventId={event.id} variant={hasImage ? 'dark' : 'light'} />
          <AgeBadge min={event.age_min} max={event.age_max} />
          <span
            className={`font-fraunces text-[28px] ${isFree ? 'font-normal' : 'font-black'}`}
            style={{ color: hasImage ? '#fff' : 'var(--color-primary)' }}
          >
            {isFree ? 'Free' : formatPrice(event.price_cents)}
          </span>
        </div>
      </div>
    </div>
  )
}
