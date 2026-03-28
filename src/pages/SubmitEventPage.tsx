import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import type { EventCategory } from '../lib/types'

const CATEGORIES: { value: EventCategory; label: string; emoji: string }[] = [
  { value: 'outdoors',    label: 'Outdoors',    emoji: '🌿' },
  { value: 'arts',        label: 'Arts',        emoji: '🎨' },
  { value: 'performance', label: 'Performance', emoji: '🎭' },
  { value: 'sports',      label: 'Sports',      emoji: '🏊' },
  { value: 'stem',        label: 'STEM',        emoji: '🧪' },
  { value: 'learning',    label: 'Learning',    emoji: '📚' },
  { value: 'food',        label: 'Food',        emoji: '🍕' },
  { value: 'other',       label: 'Other',       emoji: '✨' },
]

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

type FormState = {
  title: string
  description: string
  location_name: string
  address: string
  date: string
  start_time: string
  end_time: string
  price: string
  age_min: string
  age_max: string
  category: EventCategory | ''
  organizer_name: string
  organizer_email: string
}

const EMPTY: FormState = {
  title: '',
  description: '',
  location_name: '',
  address: '',
  date: '',
  start_time: '',
  end_time: '',
  price: '',
  age_min: '',
  age_max: '',
  category: '',
  organizer_name: '',
  organizer_email: '',
}

export default function SubmitEventPage() {
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()
  const [form, setForm] = useState<FormState>(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.category) return
    setSubmitting(true)
    setError(null)

    const starts_at = new Date(`${form.date}T${form.start_time}`).toISOString()
    const ends_at = new Date(`${form.date}T${form.end_time}`).toISOString()
    const price_cents = form.price ? Math.round(parseFloat(form.price) * 100) : 0
    const slug = toSlug(form.title) + '-' + Date.now()

    // Upsert organizer row keyed to the signed-in user's id
    const { error: orgError } = await supabase
      .from('organizers')
      .upsert({
        id: user.id,
        name: form.organizer_name,
        email: form.organizer_email || user.email,
        is_verified: false,
      }, { onConflict: 'id' })
    if (orgError) {
      setError(orgError.message)
      setSubmitting(false)
      return
    }
    const organizer_id = user.id

    const { error: eventError } = await supabase.from('events').insert({
      slug,
      title: form.title,
      description: form.description,
      location_name: form.location_name,
      address: form.address,
      lat: 43.615,   // default Boise center — organizer can update later
      lng: -116.2023,
      starts_at,
      ends_at,
      price_cents,
      age_min: form.age_min ? parseInt(form.age_min) : null,
      age_max: form.age_max ? parseInt(form.age_max) : null,
      category: form.category,
      is_featured: false,
      is_approved: false,
      organizer_id,
    })

    if (eventError) {
      setError(eventError.message)
    } else {
      setSuccess(true)
    }
    setSubmitting(false)
  }

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4 px-6 text-center">
        <div className="text-6xl">📋</div>
        <h2 className="font-fraunces text-2xl font-bold text-ink">Sign in to submit</h2>
        <p className="text-muted text-sm max-w-sm">
          You need an account to submit events. It's free and takes 30 seconds.
        </p>
        <button
          onClick={() => navigate('/profile')}
          className="bg-primary text-white px-6 py-[10px] rounded-btn text-sm font-semibold hover:bg-primary-dark transition-colors"
        >
          Sign in or create account
        </button>
      </div>
    )
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4 px-6 text-center">
        <div className="text-6xl">🎉</div>
        <h2 className="font-fraunces text-2xl font-bold text-ink">Event submitted!</h2>
        <p className="text-muted text-sm max-w-sm">
          Your event is pending review. We'll approve it within 24 hours and it'll show up in the feed.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-primary text-white px-6 py-[10px] rounded-btn text-sm font-semibold hover:bg-primary-dark transition-colors"
        >
          Back to home
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 pb-28">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-muted mb-6 hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
      >
        ← Back
      </button>
      <h1 className="font-fraunces text-3xl font-bold text-ink mb-2">Submit your event</h1>
      <p className="text-muted text-sm mb-8">
        List your family-friendly event for free. We review all submissions within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        {/* Event details */}
        <section className="bg-warm-white rounded-card border-[1.5px] border-border p-6 flex flex-col gap-4">
          <h2 className="font-fraunces text-lg font-bold text-ink">Event details</h2>

          <Field label="Event title">
            <input
              required
              type="text"
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="e.g. Spring Kite Festival"
              className={inputClass}
            />
          </Field>

          <Field label="Description">
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="What will families experience? Include what to bring, parking notes, etc."
              className={inputClass + ' resize-none'}
            />
          </Field>

          <Field label="Category">
            <div className="grid grid-cols-4 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => set('category', cat.value)}
                  className={`flex flex-col items-center gap-1 py-3 rounded-[10px] border-[1.5px] text-xs font-semibold transition-all cursor-pointer ${
                    form.category === cat.value
                      ? 'border-primary bg-primary-light text-primary'
                      : 'border-border bg-cream text-muted hover:border-primary'
                  }`}
                >
                  <span className="text-lg">{cat.emoji}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </Field>
        </section>

        {/* Date & time */}
        <section className="bg-warm-white rounded-card border-[1.5px] border-border p-6 flex flex-col gap-4">
          <h2 className="font-fraunces text-lg font-bold text-ink">Date & time</h2>

          <Field label="Date">
            <input
              required
              type="date"
              value={form.date}
              onChange={e => set('date', e.target.value)}
              className={inputClass}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Start time">
              <input
                required
                type="time"
                value={form.start_time}
                onChange={e => set('start_time', e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="End time">
              <input
                required
                type="time"
                value={form.end_time}
                onChange={e => set('end_time', e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>
        </section>

        {/* Location */}
        <section className="bg-warm-white rounded-card border-[1.5px] border-border p-6 flex flex-col gap-4">
          <h2 className="font-fraunces text-lg font-bold text-ink">Location</h2>

          <Field label="Venue name">
            <input
              required
              type="text"
              value={form.location_name}
              onChange={e => set('location_name', e.target.value)}
              placeholder="e.g. Ann Morrison Park"
              className={inputClass}
            />
          </Field>

          <Field label="Full address">
            <input
              required
              type="text"
              value={form.address}
              onChange={e => set('address', e.target.value)}
              placeholder="e.g. 1000 American Blvd W, Boise, ID 83702"
              className={inputClass}
            />
          </Field>
        </section>

        {/* Pricing & ages */}
        <section className="bg-warm-white rounded-card border-[1.5px] border-border p-6 flex flex-col gap-4">
          <h2 className="font-fraunces text-lg font-bold text-ink">Pricing & ages</h2>

          <Field label="Price per person (leave blank if free)">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-sm">$</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={e => set('price', e.target.value)}
                placeholder="0.00"
                className={inputClass + ' pl-8'}
              />
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Min age (optional)">
              <input
                type="number"
                min="0"
                max="18"
                value={form.age_min}
                onChange={e => set('age_min', e.target.value)}
                placeholder="e.g. 3"
                className={inputClass}
              />
            </Field>
            <Field label="Max age (optional)">
              <input
                type="number"
                min="0"
                max="18"
                value={form.age_max}
                onChange={e => set('age_max', e.target.value)}
                placeholder="e.g. 12"
                className={inputClass}
              />
            </Field>
          </div>
        </section>

        {/* Organizer */}
        <section className="bg-warm-white rounded-card border-[1.5px] border-border p-6 flex flex-col gap-4">
          <h2 className="font-fraunces text-lg font-bold text-ink">Your info</h2>

          <Field label="Name or organization">
            <input
              required
              type="text"
              value={form.organizer_name}
              onChange={e => set('organizer_name', e.target.value)}
              placeholder="e.g. Boise Parks & Rec"
              className={inputClass}
            />
          </Field>

          <Field label="Contact email">
            <input
              required
              type="email"
              value={form.organizer_email || user.email || ''}
              onChange={e => set('organizer_email', e.target.value)}
              placeholder="you@example.com"
              className={inputClass}
            />
          </Field>
        </section>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting || !form.category}
          className="bg-primary text-white py-[12px] rounded-btn text-sm font-semibold hover:bg-primary-dark transition-colors disabled:opacity-60 cursor-pointer"
        >
          {submitting ? 'Submitting…' : 'Submit event for review'}
        </button>
      </form>
    </div>
  )
}

const inputClass = 'w-full border border-border rounded-[10px] px-4 py-[10px] text-sm text-ink bg-cream placeholder:text-muted focus:outline-none focus:border-primary'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-bark uppercase tracking-wide">{label}</label>
      {children}
    </div>
  )
}
