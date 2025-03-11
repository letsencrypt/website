/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./themes/le-2025/layouts/**/*.html",
      "./themes/le-2025/assets/js/**/*.js",
      "./themes/le-2025/assets/css/components/**/*.css",
      "./content/**/*.{html,md}",
      "./layouts/**/*.html"
    ],
    theme: {
      extend: {
        colors: {
          'isrg-blue': '#c2e9e9',
          'prossimo-bg-blue': '#dce0e9',
          'divviup-dark-blue': '#0015a7',
          'le-yellow': '#FFA300',
          'le-blue': '#003A70',
          'le-blue-green': '#5F868E',
          'le-light-blue': '#9ADBE8',
          'primary-button': '#003A70',
          'primary-button-hover': '#002b54',
          'primary-button-active': '#001f3d',
          'link': '#003A70',
          'link-hover': '#002b54',
          'link-active': '#001f3d',
          'link-on-dark': {
            DEFAULT: '#ffffff',
            hover: '#e5e5e5',
            active: '#cccccc'
          }
        }
      },
    },
    plugins: [],
  }