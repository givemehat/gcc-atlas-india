/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'Cambria', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        paper: {
          50: '#FDFCFB',
          100: '#F9F8F6',
          200: '#F2EFEB',
          300: '#E7E3DC',
        },
        navy: {
          900: '#0B132B',
          800: '#1C2541',
          700: '#2A3B5C',
        },
        brand: {
          primary: '#0B192C',
          accent: '#1E3E62',
          highlight: '#B8860B',
          subtle: '#64748B',
        }
      }
    },
  },
  plugins: [],
}
