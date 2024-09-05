/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary-color': '#000',
        'secondary-color': '#1E99F5',
        'tertiary-color': '#707070'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

