/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{svelte,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        "lobster": ["'Lobster'", "sans-serif"],
        'Lexend': ['Lexend Deca', 'sans-serif']
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}
