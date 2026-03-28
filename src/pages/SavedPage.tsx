import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useSavedEvents } from '../hooks/useSavedEvents'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { EventGrid } from '../components/events/EventGrid'
import type { Event } from '../lib/types'

export default function SavedPage() {
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()
  const { data: savedEvents, isLoading: savedLoading } = useSavedEvents(user?.id ?? null)

  const eventIds = savedEvents?.map((s) => s.event_id) ?? []

  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ['saved_event_details', eventIds],
    queryFn: async () => {
      if (eventIds.length === 0) return []
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .in('id', eventIds)
        .order('starts_at', { ascending: true })
      if (error) throw error
      return data as Event[]
    },
    enabled: eventIds.length > 0,
  })

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4 px-6">
        <div className="text-6xl">🔖</div>
        <h2 className="font-fraunces text-2xl font-bold text-ink">Saved Events</h2>
        <p className="text-muted text-center max-w-sm">
          Sign in to save your favorite events and access them here anytime.
        </p>
        <button
          onClick={() => navigate('/profile')}
          className="bg-primary text-white px-6 py-[10px] rounded-btn text-sm font-semibold hover:bg-primary-dark transition-colors"
        >
          Sign in to continue
        </button>
        <div className="h-20" />
      </div>
    )
  }

  const isLoading = savedLoading || eventsLoading

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-8">
      <h2 className="font-fraunces text-2xl font-bold text-ink tracking-[-0.5px] mb-5">
        Saved Events
      </h2>

      {isLoading ? (
        <div className="h-48 rounded-card bg-primary-light animate-pulse" />
      ) : !events || events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="text-5xl">🔖</div>
          <p className="text-muted text-center">No saved events yet. Tap the heart on any event to save it.</p>
        </div>
      ) : (
        <EventGrid events={events} />
      )}

      <div className="h-20" />
    </div>
  )
}
