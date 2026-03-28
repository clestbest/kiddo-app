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
