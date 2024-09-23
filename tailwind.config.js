/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Poppins, sans-serif',
      },

      colors: {
        blue: {
          300: '#4995c1',
          500: '#001f3e',
          700: '#000d29',
        },

        yellow: {
          300: '#e1fc73',
        },

        gray: {
          400: '#718ca6',
          700: '#2d2f44',
        },

        white: '#fff',
      },
    },
  },
  plugins: [],
}
