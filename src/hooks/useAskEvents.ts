import { useMutation } from '@tanstack/react-query'
import { FunctionsHttpError } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import type { Event } from '../lib/types'

// The event fields the ask-events function sends back.
export type AskEvent = Pick<
  Event,
  | 'id'
  | 'slug'
  | 'title'
  | 'description'
  | 'location_name'
  | 'address'
  | 'starts_at'
  | 'ends_at'
  | 'price_cents'
  | 'age_min'
  | 'age_max'
  | 'category'
  | 'image_url'
  | 'source_url'
>

export type AskResult = {
  answer: string | null // null when Claude couldn't answer but search still found events
  events: AskEvent[]
}

async function askEvents(question: string): Promise<AskResult> {
  const { data, error } = await supabase.functions.invoke('ask-events', {
    body: { question },
  })
  if (error) {
    // Search can still work when the answer step fails, so show what it found.
    if (error instanceof FunctionsHttpError) {
      const body = await error.context.json().catch(() => null)
      if (body?.events?.length) return { answer: null, events: body.events }
    }
    throw error
  }
  return data as AskResult
}

export function useAskEvents() {
  return useMutation({ mutationFn: askEvents })
}
