import { useLocation, useNavigate } from 'react-router-dom'

const NAV_ITEMS = [
  { path: '/', icon: '🏠', label: 'Home' },
  { path: '/map', icon: '🗺️', label: 'Map' },
  { path: '/saved', icon: '🔖', label: 'Saved' },
  { path: '/profile', icon: '👤', label: 'Profile' },
]

export function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-warm-white border-t-[1.5px] border-border flex justify-around pt-[10px] pb-4 z-[100]">
      {NAV_ITEMS.map((item) => {
        const isActive = location.pathname === item.path
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center gap-[3px] cursor-pointer px-4 py-[2px] bg-transparent border-none"
          >
            <span className="text-xl leading-none">{item.icon}</span>
            <span
              className="text-[10px] font-semibold"
              style={{ color: isActive ? 'var(--color-primary)' : 'var(--color-muted)' }}
            >
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
