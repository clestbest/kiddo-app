import { useState } from 'react'

type Filter = {
  id: string
  label: string
  emoji: string
}

const FILTERS: Filter[] = [
  { id: 'this-weekend', label: 'This weekend', emoji: '✨' },
  { id: 'outdoors', label: 'Outdoors', emoji: '🌿' },
  { id: 'arts', label: 'Arts & crafts', emoji: '🎨' },
  { id: 'performances', label: 'Performances', emoji: '🎭' },
  { id: 'sports', label: 'Sports', emoji: '🏊' },
  { id: 'free', label: 'Free', emoji: '🆓' },
  { id: 'toddlers', label: 'Toddlers', emoji: '👶' },
  { id: 'ages-5-10', label: 'Ages 5–10', emoji: '🧒' },
  { id: 'tweens', label: 'Tweens', emoji: '🧑' },
]

interface FilterChipsProps {
  onFilterChange?: (filterId: string) => void
}

export function FilterChips({ onFilterChange }: FilterChipsProps) {
  const [active, setActive] = useState('this-weekend')

  function handleClick(id: string) {
    setActive(id)
    onFilterChange?.(id)
  }

  return (
    <div
      className="px-6 py-4 flex gap-2 overflow-x-auto scrollbar-none bg-warm-white border-b-[1.5px] border-border"
    >
      {FILTERS.map((filter) => {
        const isActive = active === filter.id
        return (
          <button
            key={filter.id}
            onClick={() => handleClick(filter.id)}
            className={`px-[14px] py-[7px] rounded-chip border-[1.5px] text-[13px] font-medium whitespace-nowrap cursor-pointer transition-all duration-150 flex items-center gap-[5px] ${
              isActive
                ? 'bg-primary border-primary text-white'
                : 'bg-white border-border text-bark hover:border-primary hover:text-primary'
            }`}
          >
            <span>{filter.emoji}</span>
            {filter.label}
          </button>
        )
      })}
    </div>
  )
}
