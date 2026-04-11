import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import type { Event, EventCategory, Organizer } from '../lib/types'

export type EventFilters = {
  category?: EventCategory
  free?: boolean
  ageMin?: number
  ageMax?: number
  weekendOnly?: boolean
  search?: string
}

async function fetchEvents(filters: EventFilters): Promise<Event[]> {
  let query = supabase
    .from('events')
    .select('*')
    .eq('is_approved', true)
    .gte('ends_at', new Date().toISOString())
    .order('starts_at', { ascending: true })

  if (filters.category) {
    query = query.eq('category', filters.category)
  }

  if (filters.free) {
    query = query.eq('price_cents', 0)
  }

  if (filters.ageMin != null) {
    query = query.or(`age_max.is.null,age_max.gte.${filters.ageMin}`)
  }

  if (filters.ageMax != null) {
    query = query.or(`age_min.is.null,age_min.lte.${filters.ageMax}`)
  }

  if (filters.weekendOnly) {
    // Saturday = 6, Sunday = 0 in JS — use Postgres date math
    const now = new Date()
    const day = now.getDay()
    const daysUntilSat = (6 - day + 7) % 7
    const sat = new Date(now)
    sat.setDate(now.getDate() + daysUntilSat)
    sat.setHours(0, 0, 0, 0)
    const sun = new Date(sat)
    sun.setDate(sat.getDate() + 1)
    sun.setHours(23, 59, 59, 999)
    query = query.gte('starts_at', sat.toISOString()).lte('starts_at', sun.toISOString())
  }

  if (filters.search) {
    query = query.textSearch('fts', filters.search, { type: 'websearch' })
  }

  const { data, error } = await query
  if (error) throw error
  return data as Event[]
}

export function useEvents(filters: EventFilters = {}) {
  return useQuery({
    queryKey: ['events', filters],
    queryFn: () => fetchEvents(filters),
  })
}

export function useFeaturedEvent() {
  return useQuery({
    queryKey: ['events', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_approved', true)
        .eq('is_featured', true)
        .gte('ends_at', new Date().toISOString())
        .order('starts_at', { ascending: true })
        .limit(1)
        .single()
      if (error) throw error
      return data as Event
    },
  })
}

export function useEvent(slug: string) {
  return useQuery({
    queryKey: ['events', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('slug', slug)
        .eq('is_approved', true)
        .single()
      if (error) throw error
      return data as Event
    },
    enabled: !!slug,
  })
}

export function useOrganizer(organizerId: string) {
  return useQuery({
    queryKey: ['organizers', organizerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('organizers')
        .select('*')
        .eq('id', organizerId)
        .single()
      if (error) throw error
      return data as Organizer
    },
    enabled: !!organizerId,
  })
}
