import { formatPrice } from '../../lib/eventUtils'

interface PriceTagProps {
  priceCents: number
  className?: string
}

export function PriceTag({ priceCents, className = '' }: PriceTagProps) {
  const isFree = priceCents === 0
  return (
    <span
      className={`text-sm font-bold ${isFree ? 'text-sage' : 'text-ink'} ${className}`}
    >
      {formatPrice(priceCents)}
    </span>
  )
}
