import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import type { SavedEvent } from '../lib/types'

async function fetchSavedEvents(userId: string): Promise<SavedEvent[]> {
  const { data, error } = await supabase
    .from('saved_events')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as SavedEvent[]
}

export function useSavedEvents(userId: string | null) {
  return useQuery({
    queryKey: ['saved_events', userId],
    queryFn: () => fetchSavedEvents(userId!),
    enabled: !!userId,
  })
}

export function useIsEventSaved(userId: string | null, eventId: string) {
  const { data: savedEvents } = useSavedEvents(userId)
  return savedEvents?.some((s) => s.event_id === eventId) ?? false
}

export function useSaveEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ userId, eventId }: { userId: string; eventId: string }) => {
      const { data, error } = await supabase
        .from('saved_events')
        .insert({ user_id: userId, event_id: eventId })
        .select()
        .single()
      if (error) throw error
      return data as SavedEvent
    },
    onSuccess: (_data, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['saved_events', userId] })
    },
  })
}

export function useUnsaveEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ userId, eventId }: { userId: string; eventId: string }) => {
      const { error } = await supabase
        .from('saved_events')
        .delete()
        .eq('user_id', userId)
        .eq('event_id', eventId)
      if (error) throw error
    },
    onSuccess: (_data, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['saved_events', userId] })
    },
  })
}
