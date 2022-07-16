/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    screens: {
      mobile: '320px',
      laptop: '640px',
      desktop: '1024px',
    },
    extend: {
      fontFamily: {
        sans: 'Inter, sans-serif',
      },
      colors: {
        blue: {
          500: '#2242ab',
        },
        green: {
          500: '#3a9c32',
        },
        white: {
          300: '#fff',
          500: '#f2f3f5',
        }
      }
    },
  },
  plugins: [],
}
