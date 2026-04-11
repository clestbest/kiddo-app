<<<<<<< HEAD
=======
import { useNavigate } from 'react-router-dom'
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
import type { Event } from '../../lib/types'
import { EventCard } from './EventCard'

interface EventGridProps {
  events: Event[]
<<<<<<< HEAD
  onEventClick?: (event: Event) => void
}

export function EventGrid({ events, onEventClick }: EventGridProps) {
=======
}

export function EventGrid({ events }: EventGridProps) {
  const navigate = useNavigate()

>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
  return (
    <div className="grid gap-4 mb-10"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
    >
      {events.map((event, i) => (
        <EventCard
          key={event.id}
          event={event}
          style={{ animationDelay: `${(i + 1) * 0.05}s` }}
<<<<<<< HEAD
          onClick={() => onEventClick?.(event)}
=======
          onClick={() => navigate(`/events/${event.slug}`)}
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
        />
      ))}
    </div>
  )
}
