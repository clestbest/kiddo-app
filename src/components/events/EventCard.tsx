import type { Event } from '../../lib/types'
import { categoryStyles, formatEventDate } from '../../lib/eventUtils'
import { Tag } from '../ui/Tag'
import { PriceTag } from '../ui/PriceTag'
import { AgeBadge } from '../ui/AgeBadge'
import { SaveButton } from '../ui/SaveButton'

interface EventCardProps {
  event: Event
  style?: React.CSSProperties
  onClick?: () => void
}

export function EventCard({ event, style, onClick }: EventCardProps) {
  const cat = categoryStyles[event.category]

  return (
    <div
      onClick={onClick}
      style={style}
      className="bg-warm-white rounded-card border-[1.5px] border-border overflow-hidden cursor-pointer transition-all duration-200 hover:border-primary hover:shadow-card hover:-translate-y-0.5"
    >
      {/* Color bar */}
      <div
        className="h-[6px] w-full"
        style={{ background: cat.colorBar }}
      />

      <div className="p-4">
        {/* Tags */}
        <div className="flex gap-[6px] mb-[10px] flex-wrap">
          <Tag
            label={cat.label}
            emoji={cat.emoji}
            bg={cat.tagBg}
            textColor={cat.tagText}
          />
          {event.price_cents === 0 && (
            <Tag label="Free" bg="var(--color-sage-light)" textColor="var(--color-sage)" />
          )}
        </div>

        {/* Title */}
        <h3 className="font-fraunces text-[17px] font-bold text-ink tracking-[-0.3px] mb-2 leading-[1.25]">
          {event.title}
        </h3>

        {/* Meta */}
        <div className="flex flex-col gap-1 mb-[14px]">
          <div className="flex items-center gap-[5px] text-[12px] text-muted">
            <span>📅</span>
            <span>{formatEventDate(event.starts_at, event.ends_at)}</span>
          </div>
          <div className="flex items-center gap-[5px] text-[12px] text-muted">
            <span>📍</span>
            <span>{event.location_name}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <PriceTag priceCents={event.price_cents} />
          <div className="flex items-center gap-2">
            <AgeBadge min={event.age_min} max={event.age_max} />
            <SaveButton eventId={event.id} variant="light" />
          </div>
        </div>
      </div>
    </div>
  )
}
