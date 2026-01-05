/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class", // ← IMPORTANT

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Cela remplace la police sans-serif par défaut par Oswald
        sans: ['var(--font-oswald)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
