import { useState } from 'react'

interface SaveButtonProps {
  variant?: 'dark' | 'light'
  onToggle?: (saved: boolean) => void
}

export function SaveButton({ variant = 'dark', onToggle }: SaveButtonProps) {
  const [saved, setSaved] = useState(false)

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation()
    const next = !saved
    setSaved(next)
    onToggle?.(next)
  }

  if (variant === 'dark') {
    return (
      <button
        onClick={handleClick}
        className="w-9 h-9 rounded-full bg-white/[0.08] border border-white/15 flex items-center justify-center text-base transition-all hover:bg-white/15 cursor-pointer"
        aria-label={saved ? 'Unsave event' : 'Save event'}
      >
        {saved ? '❤️' : '🤍'}
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      className="w-8 h-8 rounded-full bg-cream border border-border flex items-center justify-center text-sm transition-all hover:border-primary cursor-pointer"
      aria-label={saved ? 'Unsave event' : 'Save event'}
    >
      {saved ? '❤️' : '🤍'}
    </button>
  )
}
