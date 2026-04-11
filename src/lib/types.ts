export type EventCategory =
  | 'outdoors'
  | 'arts'
  | 'performance'
  | 'sports'
  | 'stem'
  | 'learning'
  | 'food'
  | 'other'

export type Event = {
  id: string
<<<<<<< HEAD
=======
  slug: string
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
  title: string
  description: string
  location_name: string
  address: string
  lat: number
  lng: number
  starts_at: string // ISO datetime
  ends_at: string
  price_cents: number // 0 = free
  age_min: number | null
  age_max: number | null
  category: EventCategory
  is_featured: boolean
  is_approved: boolean
  organizer_id: string
  created_at: string
<<<<<<< HEAD
=======
  source_url: string | null
  image_url: string | null
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
}

export type SavedEvent = {
  id: string
  user_id: string
  event_id: string
  created_at: string
}

export type Organizer = {
  id: string
  name: string
  email: string
  website: string | null
  is_verified: boolean
}

export type FilterOption =
  | 'this-weekend'
  | 'outdoors'
  | 'arts'
  | 'performances'
  | 'sports'
  | 'free'
  | 'toddlers'
  | 'ages-5-10'
  | 'tweens'
