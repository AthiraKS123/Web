/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ember: {
          50: '#fff5ed',
          100: '#ffe8d5',
          200: '#ffd0aa',
          300: '#ffaf74',
          400: '#ff7f38',
          500: '#ff5500', // Core Flame Orange
          600: '#f04300',
          700: '#c73000',
          800: '#9d2706',
          900: '#7e230b',
          950: '#440e02',
        },
        crimson: {
          500: '#FF1E56',
          600: '#E00B41',
        },
        gold: {
          400: '#FFD166',
          500: '#FFB800',
          600: '#E59F00',
        },
        charcoal: {
          950: '#070709', // Deepest background
          900: '#0D0D11', // Main surface
          850: '#131318', // Card background
          800: '#1A1A22', // Card elevated
          700: '#262633', // Border / subtle divider
          600: '#3D3D4E',
        }
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        headline: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-ember': '0 0 35px -5px rgba(255, 85, 0, 0.45)',
        'glow-ember-lg': '0 0 60px -10px rgba(255, 85, 0, 0.65)',
        'glow-gold': '0 0 35px -5px rgba(255, 184, 0, 0.4)',
        'glow-crimson': '0 0 35px -5px rgba(255, 30, 86, 0.45)',
        'card-elevated': '0 20px 40px -15px rgba(0, 0, 0, 0.8)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'spin-slow': 'spin 20s linear infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
    },
  },
  plugins: [],
}
