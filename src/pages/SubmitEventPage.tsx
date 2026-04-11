export default function SubmitEventPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h1 className="font-fraunces text-3xl font-bold text-ink mb-2">Submit your event</h1>
      <p className="text-muted text-sm mb-8">
        List your family-friendly event for free, or pay to get featured at the top of the feed.
      </p>

      <div className="bg-warm-white rounded-card border-[1.5px] border-border p-6 flex flex-col items-center gap-4 text-center">
        <div className="text-5xl">🚧</div>
        <h2 className="font-fraunces text-xl font-bold text-ink">Coming soon</h2>
        <p className="text-muted text-sm max-w-sm">
          The organizer submission form is being built. Check back soon to list your event!
        </p>
      </div>

      <div className="h-20" />
    </div>
  )
}
