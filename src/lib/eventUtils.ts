import type { EventCategory } from './types'

export function formatPrice(priceCents: number): string {
  if (priceCents === 0) return 'Free'
  const dollars = priceCents / 100
  return `$${dollars % 1 === 0 ? dollars : dollars.toFixed(2)}/person`
}

export function formatAgeRange(min: number | null, max: number | null): string {
  if (min === null && max === null) return 'All ages'
  if (min === null) return `Up to ${max}`
  if (max === null) return `Ages ${min}+`
  return `Ages ${min}–${max}`
}

export function formatEventDate(startsAt: string, endsAt: string): string {
  const start = new Date(startsAt)
  const end = new Date(endsAt)

  const dateStr = start.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

  const startTime = start.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  const endTime = end.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  return `${dateStr} · ${startTime}–${endTime}`
}

export type CategoryStyle = {
  label: string
  emoji: string
  colorBar: string
  tagBg: string
  tagText: string
}

export const categoryStyles: Record<EventCategory, CategoryStyle> = {
  outdoors: {
    label: 'Outdoors',
    emoji: '🌿',
    colorBar: 'linear-gradient(90deg, #5C7A5E, #88B08A)',
    tagBg: 'var(--color-sage-light)',
    tagText: 'var(--color-sage)',
  },
  arts: {
    label: 'Arts',
    emoji: '🎨',
    colorBar: 'linear-gradient(90deg, #3B7DD8, #6BA3E8)',
    tagBg: 'var(--color-sky-light)',
    tagText: 'var(--color-sky)',
  },
  performance: {
    label: 'Performance',
    emoji: '🎭',
    colorBar: 'linear-gradient(90deg, #E8A020, #F2C060)',
    tagBg: 'var(--color-gold-light)',
    tagText: 'var(--color-gold)',
  },
  sports: {
    label: 'Sports',
    emoji: '🏊',
    colorBar: 'linear-gradient(90deg, #6B5FA6, #8B7EC8)',
    tagBg: 'var(--color-primary-light)',
    tagText: 'var(--color-primary)',
  },
  stem: {
    label: 'STEM',
    emoji: '🧪',
    colorBar: 'linear-gradient(90deg, #3B7DD8, #6BA3E8)',
    tagBg: 'var(--color-sky-light)',
    tagText: 'var(--color-sky)',
  },
  learning: {
    label: 'Learning',
    emoji: '📚',
    colorBar: 'linear-gradient(90deg, #5C7A5E, #88B08A)',
    tagBg: 'var(--color-sage-light)',
    tagText: 'var(--color-sage)',
  },
  food: {
    label: 'Food',
    emoji: '🍕',
    colorBar: 'linear-gradient(90deg, #E8A020, #F2C060)',
    tagBg: 'var(--color-gold-light)',
    tagText: 'var(--color-gold)',
  },
  other: {
    label: 'Other',
    emoji: '✨',
    colorBar: 'linear-gradient(90deg, #6B5FA6, #8B7EC8)',
    tagBg: 'var(--color-primary-light)',
    tagText: 'var(--color-primary)',
  },
}
