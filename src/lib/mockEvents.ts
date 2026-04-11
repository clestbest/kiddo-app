import type { Event } from './types'
<<<<<<< HEAD
import { isUpcoming } from './eventUtils'

// Dates set to next weekend: Apr 12–13, 2026
export const mockEvents: Event[] = [
  {
    id: '1',
=======

export const mockEvents: Event[] = [
  {
    id: '1',
    slug: 'boise-farmers-market-spring-kickoff',
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
    title: 'Boise Farmers Market Spring Kickoff',
    description:
      'The beloved Boise Farmers Market returns for spring! Local produce, artisan goods, live music, and kid-friendly activities throughout the market.',
    location_name: 'Capitol Blvd',
    address: '400 S Capitol Blvd, Boise, ID 83702',
    lat: 43.6024,
    lng: -116.2022,
<<<<<<< HEAD
    starts_at: '2026-04-12T09:00:00-07:00',
    ends_at: '2026-04-12T13:00:00-07:00',
=======
    starts_at: '2026-03-29T09:00:00-07:00',
    ends_at: '2026-03-29T13:00:00-07:00',
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
    price_cents: 0,
    age_min: null,
    age_max: null,
    category: 'outdoors',
    is_featured: true,
    is_approved: true,
    organizer_id: 'org-1',
<<<<<<< HEAD
=======
    source_url: null,
    image_url: 'https://picsum.photos/seed/farmersmarket/800/450',
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
    created_at: '2026-03-01T00:00:00Z',
  },
  {
    id: '2',
<<<<<<< HEAD
=======
    slug: 'junior-naturalists-spring-birds',
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
    title: 'Junior Naturalists: Spring Birds',
    description:
      'Join a guided walk to spot and identify early spring migratory birds along the Boise River greenbelt. Binoculars provided.',
    location_name: 'Boise WMA',
    address: 'Warm Springs Ave, Boise, ID 83712',
    lat: 43.6057,
    lng: -116.1742,
<<<<<<< HEAD
    starts_at: '2026-04-12T10:00:00-07:00',
    ends_at: '2026-04-12T11:30:00-07:00',
=======
    starts_at: '2026-03-29T10:00:00-07:00',
    ends_at: '2026-03-29T11:30:00-07:00',
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
    price_cents: 0,
    age_min: 4,
    age_max: 10,
    category: 'outdoors',
    is_featured: false,
    is_approved: true,
    organizer_id: 'org-2',
<<<<<<< HEAD
=======
    source_url: null,
    image_url: 'https://picsum.photos/seed/springbirds/800/450',
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
    created_at: '2026-03-02T00:00:00Z',
  },
  {
    id: '3',
<<<<<<< HEAD
=======
    slug: 'kids-pottery-drop-in-morning',
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
    title: 'Kids Pottery Drop-In Morning',
    description:
      'Drop in for a hands-on pottery session. Kids will work with real clay and take home their creation after it fires.',
    location_name: 'Clay Studio Boise',
    address: '123 N Milwaukee St, Boise, ID 83704',
    lat: 43.6281,
    lng: -116.2451,
<<<<<<< HEAD
    starts_at: '2026-04-13T11:00:00-07:00',
    ends_at: '2026-04-13T13:00:00-07:00',
=======
    starts_at: '2026-03-30T11:00:00-07:00',
    ends_at: '2026-03-30T13:00:00-07:00',
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
    price_cents: 1200,
    age_min: 5,
    age_max: 12,
    category: 'arts',
    is_featured: false,
    is_approved: true,
    organizer_id: 'org-3',
<<<<<<< HEAD
=======
    source_url: null,
    image_url: 'https://picsum.photos/seed/kidspottery/800/450',
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
    created_at: '2026-03-03T00:00:00Z',
  },
  {
    id: '4',
<<<<<<< HEAD
=======
    slug: 'the-very-hungry-caterpillar-live',
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
    title: 'The Very Hungry Caterpillar — Live!',
    description:
      'A beloved picture book comes to life in this colorful 45-minute theatrical production. Perfect for little ones.',
    location_name: 'Treefort Stage',
    address: '180 W Idaho St, Boise, ID 83702',
    lat: 43.6163,
    lng: -116.2028,
<<<<<<< HEAD
    starts_at: '2026-04-12T14:00:00-07:00',
    ends_at: '2026-04-12T16:00:00-07:00',
=======
    starts_at: '2026-03-29T14:00:00-07:00',
    ends_at: '2026-03-29T16:00:00-07:00',
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
    price_cents: 800,
    age_min: 2,
    age_max: 7,
    category: 'performance',
    is_featured: false,
    is_approved: true,
    organizer_id: 'org-4',
<<<<<<< HEAD
=======
    source_url: null,
    image_url: 'https://picsum.photos/seed/kidtheater/800/450',
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
    created_at: '2026-03-04T00:00:00Z',
  },
  {
    id: '5',
<<<<<<< HEAD
=======
    slug: 'open-swim-family-play-hour',
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
    title: 'Open Swim & Family Play Hour',
    description:
      'Join us every Saturday morning for open family swim at the Boise YMCA. Lane and leisure pool open.',
    location_name: 'Boise YMCA',
    address: '1050 W State St, Boise, ID 83702',
    lat: 43.6178,
    lng: -116.2143,
<<<<<<< HEAD
    starts_at: '2026-04-12T09:00:00-07:00',
    ends_at: '2026-04-12T10:00:00-07:00',
=======
    starts_at: '2026-03-29T09:00:00-07:00',
    ends_at: '2026-03-29T10:00:00-07:00',
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
    price_cents: 0,
    age_min: null,
    age_max: null,
    category: 'sports',
    is_featured: false,
    is_approved: true,
    organizer_id: 'org-5',
<<<<<<< HEAD
=======
    source_url: null,
    image_url: 'https://picsum.photos/seed/familyswim/800/450',
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
    created_at: '2026-03-05T00:00:00Z',
  },
  {
    id: '6',
<<<<<<< HEAD
=======
    slug: 'story-time-craft-earth-day',
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
    title: 'Story Time + Craft: Earth Day Edition',
    description:
      'Join us for stories about nature and the environment, followed by a recycled-material craft project kids can take home.',
    location_name: 'Boise Public Library',
    address: '715 S Capitol Blvd, Boise, ID 83702',
    lat: 43.5988,
    lng: -116.2018,
<<<<<<< HEAD
    starts_at: '2026-04-13T10:30:00-07:00',
    ends_at: '2026-04-13T11:30:00-07:00',
=======
    starts_at: '2026-03-30T10:30:00-07:00',
    ends_at: '2026-03-30T11:30:00-07:00',
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
    price_cents: 0,
    age_min: 2,
    age_max: 6,
    category: 'learning',
    is_featured: false,
    is_approved: true,
    organizer_id: 'org-6',
<<<<<<< HEAD
=======
    source_url: null,
    image_url: 'https://picsum.photos/seed/storytime/800/450',
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
    created_at: '2026-03-06T00:00:00Z',
  },
  {
    id: '7',
<<<<<<< HEAD
=======
    slug: 'intro-to-coding-for-kids',
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
    title: 'Intro to Coding for Kids (Ages 7–11)',
    description:
      'A beginner-friendly two-hour workshop where kids learn basic programming concepts through games and hands-on projects.',
    location_name: 'Boise Makerspace',
    address: '700 W Orchard St, Boise, ID 83706',
    lat: 43.6098,
    lng: -116.2198,
<<<<<<< HEAD
    starts_at: '2026-04-12T13:00:00-07:00',
    ends_at: '2026-04-12T15:00:00-07:00',
=======
    starts_at: '2026-03-29T13:00:00-07:00',
    ends_at: '2026-03-29T15:00:00-07:00',
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
    price_cents: 1500,
    age_min: 7,
    age_max: 11,
    category: 'stem',
    is_featured: false,
    is_approved: true,
    organizer_id: 'org-7',
<<<<<<< HEAD
=======
    source_url: null,
    image_url: 'https://picsum.photos/seed/kidscoding/800/450',
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
    created_at: '2026-03-07T00:00:00Z',
  },
]

<<<<<<< HEAD
// Only events whose end time hasn't passed yet
export const upcomingEvents = mockEvents.filter(isUpcoming)

export const featuredEvent =
  upcomingEvents.find((e) => e.is_featured) ?? upcomingEvents[0]

export const regularEvents = upcomingEvents.filter((e) => !e.is_featured)
=======
export const featuredEvent = mockEvents.find((e) => e.is_featured) ?? mockEvents[0]
export const regularEvents = mockEvents.filter((e) => !e.is_featured)
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
