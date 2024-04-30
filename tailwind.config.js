/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{svelte,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        "lobster": ["'Lobster'", "sans-serif"]
      },
      backgroundColor: {
        "ArrowBtnR": "url('./src/assets/ArrowRight.svg')",
        "BigSaleBan": "url('./src/assets/BannerBeta.png')"
      }
    },
  },
  plugins: [],
}

