export default function SavedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4 px-6">
      <div className="text-6xl">🔖</div>
      <h2 className="font-fraunces text-2xl font-bold text-ink">Saved Events</h2>
      <p className="text-muted text-center max-w-sm">
        Sign in to save your favorite events and access them here anytime.
      </p>
      <button className="bg-primary text-white px-6 py-[10px] rounded-btn text-sm font-semibold hover:bg-primary-dark transition-colors">
        Sign in to continue
      </button>
      <div className="h-20" />
    </div>
  )
}
