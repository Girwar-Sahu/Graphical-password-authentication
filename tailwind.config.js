/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/*.{html,js}",
    "./views/**/*.ejs",
    "./public/**/*.{html,js}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

