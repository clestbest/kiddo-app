// Shown on every page so visitors know the listings aren't real.
// Fixed heights (two lines on phones, one line on wider screens) let the map
// page subtract this bar from its height.
export function DemoNotice() {
  return (
    <div className="bg-primary-light text-ink text-[12px] leading-tight text-center px-4 h-[44px] sm:h-[32px] flex items-center justify-center border-b border-border">
      Demo site. The events shown are sample data and are not affiliated with the venues listed.
    </div>
  )
}
