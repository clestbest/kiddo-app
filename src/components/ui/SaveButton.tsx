<<<<<<< HEAD
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
=======
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useIsEventSaved, useSaveEvent, useUnsaveEvent } from '../../hooks/useSavedEvents'

interface SaveButtonProps {
  eventId: string
  variant?: 'dark' | 'light'
}

export function SaveButton({ eventId, variant = 'dark' }: SaveButtonProps) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const saved = useIsEventSaved(user?.id ?? null, eventId)
  const { mutate: save } = useSaveEvent()
  const { mutate: unsave } = useUnsaveEvent()

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation()
    if (!user) {
      navigate('/profile')
      return
    }
    if (saved) {
      unsave({ userId: user.id, eventId })
    } else {
      save({ userId: user.id, eventId })
    }
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
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
<<<<<<< HEAD
      className="w-8 h-8 rounded-full bg-cream border border-border flex items-center justify-center text-sm transition-all hover:border-primary cursor-pointer"
=======
      className="w-8 h-8 shrink-0 rounded-full bg-cream border border-border flex items-center justify-center text-sm transition-all hover:border-primary cursor-pointer"
>>>>>>> d526871bb44b67ad4e3357a9444c2ded843b66b4
      aria-label={saved ? 'Unsave event' : 'Save event'}
    >
      {saved ? '❤️' : '🤍'}
    </button>
  )
}
