import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'

type Mode = 'idle' | 'login' | 'signup' | 'forgot'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { user, loading } = useAuth()
  const [mode, setMode] = useState<Mode>('idle')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  function reset() {
    setEmail('')
    setPassword('')
    setError(null)
    setMessage(null)
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    setSubmitting(false)
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin },
    })
    if (error) {
      setError(error.message)
    } else {
      reset()
      setMessage('Check your email to confirm your account.')
      setMode('idle')
    }
    setSubmitting(false)
  }

  async function handleForgot(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    })
    if (error) {
      setError(error.message)
    } else {
      setMessage('Password reset email sent.')
      reset()
      setMode('idle')
    }
    setSubmitting(false)
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  // Logged-in state
  if (user) {
    return (
      <div className="flex flex-col items-center px-6 pt-10 pb-28 gap-6 max-w-sm mx-auto">
        <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center text-primary text-2xl font-bold font-fraunces">
          {user.email?.[0].toUpperCase() ?? '?'}
        </div>
        <div className="text-center">
          <p className="font-semibold text-ink">{user.email}</p>
          <p className="text-sm text-muted mt-1">Member since {new Date(user.created_at).getFullYear()}</p>
        </div>
        <div className="w-full border border-border rounded-card divide-y divide-border">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-ink hover:bg-primary-light transition-colors">
            <span className="text-base">🔔</span> Notification preferences
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-ink hover:bg-primary-light transition-colors">
            <span className="text-base">📍</span> Location settings
          </button>
          <button
            onClick={() => navigate('/submit')}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-ink hover:bg-primary-light transition-colors"
          >
            <span className="text-base">📅</span> Submit an event
          </button>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full py-[10px] rounded-btn border border-border text-sm text-muted hover:text-ink hover:border-ink transition-colors"
        >
          Sign out
        </button>
      </div>
    )
  }

  // Idle — not logged in, no form open
  if (mode === 'idle') {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4 px-6 max-w-sm mx-auto">
        <div className="text-6xl">👤</div>
        <h2 className="font-fraunces text-2xl font-bold text-ink">Your Profile</h2>
        <p className="text-muted text-center text-sm">
          Sign in to save events, manage preferences, and get the weekly digest.
        </p>
        {message && (
          <p className="text-sm text-center" style={{ color: 'var(--color-sage)' }}>{message}</p>
        )}
        <button
          onClick={() => { reset(); setMode('login') }}
          className="w-full bg-primary text-white py-[10px] rounded-btn text-sm font-semibold hover:bg-primary-dark transition-colors"
        >
          Sign in
        </button>
        <button
          onClick={() => { reset(); setMode('signup') }}
          className="w-full border border-border text-ink py-[10px] rounded-btn text-sm font-semibold hover:border-primary hover:text-primary transition-colors"
        >
          Create account
        </button>
      </div>
    )
  }

  // Login / Signup / Forgot forms
  const isLogin = mode === 'login'
  const isForgot = mode === 'forgot'

  return (
    <div className="flex flex-col px-6 pt-10 pb-28 gap-5 max-w-sm mx-auto">
      <button
        onClick={() => { reset(); setMode('idle') }}
        className="self-start text-sm text-muted hover:text-ink transition-colors"
      >
        ← Back
      </button>

      <h2 className="font-fraunces text-2xl font-bold text-ink">
        {isLogin ? 'Welcome back' : isForgot ? 'Reset password' : 'Create account'}
      </h2>

      <form
        onSubmit={isLogin ? handleLogin : isForgot ? handleForgot : handleSignup}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-bark uppercase tracking-wide">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="border border-border rounded-[10px] px-4 py-[10px] text-sm text-ink bg-warm-white placeholder:text-muted focus:outline-none focus:border-primary"
          />
        </div>

        {!isForgot && (
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-bark uppercase tracking-wide">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              minLength={6}
              className="border border-border rounded-[10px] px-4 py-[10px] text-sm text-ink bg-warm-white placeholder:text-muted focus:outline-none focus:border-primary"
            />
          </div>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="bg-primary text-white py-[10px] rounded-btn text-sm font-semibold hover:bg-primary-dark transition-colors disabled:opacity-60"
        >
          {submitting
            ? 'Please wait…'
            : isLogin
            ? 'Sign in'
            : isForgot
            ? 'Send reset email'
            : 'Create account'}
        </button>
      </form>

      <div className="flex flex-col items-center gap-2 text-sm text-muted">
        {isLogin && (
          <>
            <button onClick={() => { reset(); setMode('forgot') }} className="hover:text-ink transition-colors">
              Forgot password?
            </button>
            <span>
              New here?{' '}
              <button onClick={() => { reset(); setMode('signup') }} className="text-primary font-semibold hover:text-primary-dark transition-colors">
                Create account
              </button>
            </span>
          </>
        )}
        {mode === 'signup' && (
          <span>
            Already have an account?{' '}
            <button onClick={() => { reset(); setMode('login') }} className="text-primary font-semibold hover:text-primary-dark transition-colors">
              Sign in
            </button>
          </span>
        )}
        {isForgot && (
          <button onClick={() => { reset(); setMode('login') }} className="hover:text-ink transition-colors">
            Back to sign in
          </button>
        )}
      </div>
    </div>
  )
}
