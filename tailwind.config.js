/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: 'var(--color-cream)',
        'warm-white': 'var(--color-warm-white)',
        ink: 'var(--color-ink)',
        bark: 'var(--color-bark)',
        primary: 'var(--color-primary)',
        'primary-light': 'var(--color-primary-light)',
        'primary-dark': 'var(--color-primary-dark)',
        accent: 'var(--color-accent)',
        sage: 'var(--color-sage)',
        'sage-light': 'var(--color-sage-light)',
        sky: 'var(--color-sky)',
        'sky-light': 'var(--color-sky-light)',
        gold: 'var(--color-gold)',
        'gold-light': 'var(--color-gold-light)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
      },
      fontFamily: {
        fraunces: ['Fraunces', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
        'grand-hotel': ['Grand Hotel', 'cursive'],
      },
      borderRadius: {
        card: '16px',
        btn: '10px',
        chip: '100px',
        featured: '20px',
      },
      boxShadow: {
        card: '0 8px 24px var(--color-shadow)',
        hero: '0 8px 32px rgba(0,0,0,0.3)',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.4s ease both',
      },
    },
  },
  plugins: [],
}
