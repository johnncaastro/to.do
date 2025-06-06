/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      screens: {
        mobile: '350px',
        laptop: '640px',
        'laptop-large': '900px',
        desktop: '1190px',
      },
      fontFamily: {
        sans: 'Poppins, sans-serif',
      },

      colors: {
        blue: {
          100: '#d1e4ef',
          300: '#4995c1',
          500: '#001f3e',
          700: '#000d29',
        },

        red: {
          300: '#f75a68',
          500: '#aa2834',
        },

        yellow: {
          300: '#e1fc73',
        },

        gray: {
          100: '#f1f2f3',
          400: '#718ca6',
          700: '#2d2f44',
        },

        white: '#fff',
      },
    },
  },
  plugins: [],
}
