import { formatAgeRange } from '../../lib/eventUtils'

interface AgeBadgeProps {
  min: number | null
  max: number | null
  variant?: 'light' | 'dark'
}

export function AgeBadge({ min, max, variant = 'light' }: AgeBadgeProps) {
  const label = formatAgeRange(min, max)
  if (variant === 'dark') {
    return (
      <span className="text-xs font-semibold px-3 py-[5px] rounded-chip bg-white/10 border border-white/15 text-warm-white">
        {label}
      </span>
    )
  }
  return (
    <span className="text-xs font-medium px-[10px] py-1 rounded-chip text-muted bg-cream">
      {label}
    </span>
  )
}
