/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg0: "#031022",
        bg1: "#071426",
        card: "#0f1724",
        accent1: "#4aa3ff",
        accent2: "#2b85ff"
      }
    }
  },
  plugins: []
}
