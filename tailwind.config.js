/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f4f7f5',
          100: '#e5eee9',
          200: '#c8dcd2',
          300: '#a3c3b4',
          400: '#7da896',
          500: '#5f8f7c', // Brand Eucalyptus Sage from logo
          600: '#4b7464',
          700: '#3e5d51',
          800: '#334a41',
          900: '#283a34',
        },
        blush: {
          50: '#fdf8f7',
          100: '#faeee9',
          200: '#f5dad2',
          300: '#eebbb0',
          400: '#e39485',
          500: '#d76f5d',
        },
        gold: {
          50: '#fbf9f2',
          100: '#f5f0df',
          200: '#ebdcb9',
          300: '#dec48d',
          400: '#d4b065',
          500: '#c69943',
          600: '#a87930',
        },
        cream: {
          50: '#fdfcf9',
          100: '#faf7f0',
          200: '#f4ede0',
          300: '#eae0cd',
        },
        charcoal: {
          800: '#2d3748',
          900: '#1a202c',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-sage': '0 0 25px -5px rgba(95, 143, 124, 0.3)',
        'glow-gold': '0 0 25px -5px rgba(212, 176, 101, 0.35)',
        'glow-blush': '0 0 25px -5px rgba(245, 218, 210, 0.4)',
        'soft': '0 10px 30px -5px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 20px -2px rgba(62, 93, 81, 0.06)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
