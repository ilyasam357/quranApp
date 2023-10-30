/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.{html,js}'],
  theme: {
    extend: {
      lineHeight: {
        'arabic': '60px',
      }
    },
  },
  plugins: [],
}

