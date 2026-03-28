import { useNavigate } from 'react-router-dom'
import type { Event } from '../../lib/types'
import { EventCard } from './EventCard'

interface EventGridProps {
  events: Event[]
}

export function EventGrid({ events }: EventGridProps) {
  const navigate = useNavigate()

  return (
    <div className="grid gap-4 mb-10"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
    >
      {events.map((event, i) => (
        <EventCard
          key={event.id}
          event={event}
          style={{ animationDelay: `${(i + 1) * 0.05}s` }}
          onClick={() => navigate(`/events/${event.slug}`)}
        />
      ))}
    </div>
  )
}
