/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#080B12',
        surface: '#0E1420',
        elevated: '#131B2E',
        border: '#1E2D4A',
        phosphor: '#00D68F',
        'phosphor-dim': '#00D68F18',
        glow: '#B8F0D8',
        sequence: '#8B5CF6',
        white: '#E2E8F0',
        muted: '#64748B',
        'mutation-red': '#F87171',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Instrument Serif"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.03em',
        tight: '-0.02em',
        widest: '0.12em',
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
