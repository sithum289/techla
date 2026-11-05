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
        techla: {
          50: '#eef8ff',
          100: '#d9f0ff',
          200: '#bce4ff',
          300: '#8ed2ff',
          400: '#57b7ff',
          500: '#0072ff',
          600: '#0059e6',
          700: '#0047cc',
          800: '#003db3',
          900: '#0a1d4a',
          950: '#040b1e',
        },
        cyanGlow: '#00f0ff',
        darkNavy: '#070c18',
        cardNavy: '#0d1527',
        borderNavy: '#1b2a4a'
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        heading: ['"Outfit"', 'sans-serif'],
        tech: ['"Space Grotesk"', 'monospace']
      }
    },
  },
  plugins: [],
}

