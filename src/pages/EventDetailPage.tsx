<<<<<<< HEAD
import { useParams, useNavigate } from 'react-router-dom'
import { mockEvents } from '../lib/mockEvents'
import { categoryStyles, formatEventDate, formatPrice, formatAgeRange } from '../lib/eventUtils'
import { SaveButton } from '../components/ui/SaveButton'
import { Tag } from '../components/ui/Tag'

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const event = mockEvents.find((e) => e.id === id)

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4 px-6">
        <div className="text-6xl">😕</div>
        <h2 className="font-fraunces text-2xl font-bold text-ink">Event not found</h2>
        <button
          onClick={() => navigate('/')}
=======
import { useParams, useNavigate } from "react-router-dom";
import { useEvent } from "../hooks/useEvents";
import {
  categoryStyles,
  formatEventDate,
  formatPrice,
  formatAgeRange,
} from "../lib/eventUtils";
import { SaveButton } from "../components/ui/SaveButton";
import { Tag } from "../components/ui/Tag";

export default function EventDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: event, isLoading, isError } = useEvent(slug!);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (isError || !event) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4 px-6">
        <div className="text-6xl">😕</div>
        <h2 className="font-fraunces text-2xl font-bold text-ink">
          Event not found
        </h2>
        <button
          onClick={() => navigate("/")}
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
          className="bg-primary text-white px-6 py-[10px] rounded-btn text-sm font-semibold hover:bg-primary-dark transition-colors"
        >
          Back to home
        </button>
      </div>
<<<<<<< HEAD
    )
  }

  const cat = categoryStyles[event.category]
=======
    );
  }

  const cat = categoryStyles[event.category];
  const hasImage = !!event.image_url;
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-muted mb-6 hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
      >
        ← Back
      </button>

<<<<<<< HEAD
      <div
        className="h-2 w-full rounded-t-card mb-0"
        style={{ background: cat.colorBar }}
      />

      <div className="bg-warm-white rounded-b-card rounded-tr-card border-[1.5px] border-t-0 border-border p-6 mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex gap-2 mb-3">
              <Tag label={cat.label} emoji={cat.emoji} bg={cat.tagBg} textColor={cat.tagText} />
=======
      {/* Hero image or color bar */}
      {hasImage ? (
        <div className="h-56 rounded-t-card overflow-hidden">
          <img
            src={event.image_url!}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div
          className="h-2 w-full rounded-t-card"
          style={{ background: cat.colorBar }}
        />
      )}

      <div
        className={`bg-warm-white border-[1.5px] border-border p-6 mb-6 ${
          hasImage
            ? 'rounded-b-card border-t-0'
            : 'rounded-b-card rounded-tr-card border-t-0'
        }`}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex gap-2 mb-3">
              <Tag
                label={cat.label}
                emoji={cat.emoji}
                bg={cat.tagBg}
                textColor={cat.tagText}
              />
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
            </div>
            <h1 className="font-fraunces text-3xl font-bold text-ink leading-tight tracking-tight">
              {event.title}
            </h1>
          </div>
<<<<<<< HEAD
          <SaveButton variant="light" />
        </div>

        <p className="text-muted text-sm leading-relaxed mb-6">{event.description}</p>
=======
          <SaveButton eventId={event.id} variant="light" />
        </div>

        <p className="text-muted text-sm leading-relaxed mb-6">
          {event.description}
        </p>
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4

        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-center gap-3 text-sm text-bark">
            <span className="text-base">📅</span>
            <span>{formatEventDate(event.starts_at, event.ends_at)}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-bark">
            <span className="text-base">📍</span>
<<<<<<< HEAD
            <span>{event.location_name} — {event.address}</span>
=======
            <span>
              {event.location_name} — {event.address}
            </span>
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
          </div>
          <div className="flex items-center gap-3 text-sm text-bark">
            <span className="text-base">👶</span>
            <span>{formatAgeRange(event.age_min, event.age_max)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
<<<<<<< HEAD
          <div className="font-fraunces text-3xl font-black" style={{ color: event.price_cents === 0 ? 'var(--color-sage)' : 'var(--color-ink)' }}>
            {event.price_cents === 0 ? 'Free' : formatPrice(event.price_cents)}
          </div>
          <button className="bg-primary text-white px-6 py-[10px] rounded-btn text-sm font-semibold hover:bg-primary-dark transition-colors">
            Get tickets
          </button>
=======
          <div className={`font-fraunces text-3xl text-ink ${event.price_cents === 0 ? 'font-normal' : 'font-black'}`}>
            {event.price_cents === 0 ? "Free" : formatPrice(event.price_cents)}
          </div>
          {event.source_url && (
            <a
              href={event.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-6 py-[10px] rounded-btn text-sm font-semibold hover:bg-primary-dark transition-colors"
            >
              Go to site
            </a>
          )}
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
        </div>
      </div>

      <div className="h-20" />
    </div>
<<<<<<< HEAD
  )
=======
  );
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
}
