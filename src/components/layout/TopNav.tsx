import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function TopNav() {
  const navigate = useNavigate()
  const { user, loading } = useAuth()

  return (
    <nav className="bg-warm-white border-b-[1.5px] border-border px-6 h-[60px] flex items-center justify-between sticky top-0 z-[100]">
      <div className="font-fraunces text-[22px] font-black text-ink tracking-[-0.5px] flex items-center gap-[6px]">
        kiddo
        <span className="w-2 h-2 bg-primary rounded-full inline-block" />
      </div>

      <div className="flex items-center gap-3">
        <button className="text-[13px] text-muted flex items-center gap-1 cursor-pointer px-[10px] py-[6px] rounded-lg border border-border bg-cream hover:border-primary transition-all">
          📍 Boise, ID ▾
        </button>
        {!loading && (
          user ? (
            <button
              onClick={() => navigate('/profile')}
              className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary text-sm font-bold font-fraunces hover:bg-primary hover:text-white transition-colors"
            >
              {user.email?.[0].toUpperCase() ?? '?'}
            </button>
          ) : (
            <button
              onClick={() => navigate('/profile')}
              className="bg-primary text-white border-none px-4 py-2 rounded-btn text-[13px] font-semibold cursor-pointer transition-all duration-150 hover:bg-primary-dark hover:-translate-y-px"
            >
              Sign in
            </button>
          )
        )}
      </div>
    </nav>
  )
}
