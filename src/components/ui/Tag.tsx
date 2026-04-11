interface TagProps {
  label: string
  emoji?: string
  bg: string
  textColor: string
}

export function Tag({ label, emoji, bg, textColor }: TagProps) {
  return (
    <span
      style={{ backgroundColor: bg, color: textColor }}
      className="text-[11px] font-semibold tracking-[0.3px] px-2 py-[3px] rounded-chip"
    >
      {emoji} {label}
    </span>
  )
}
