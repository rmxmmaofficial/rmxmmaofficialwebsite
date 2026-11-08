/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        rmx: {
          red: "#E10600",
          black: "#050505",
          graphite: "#111111",
          steel: "#1A1A1A",
          soft: "#B3B3B3",
        },
      },
      fontFamily: {
        display: ["Bebas Neue", "Impact", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
