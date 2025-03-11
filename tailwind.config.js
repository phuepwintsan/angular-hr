/** @type {import('tailwindcss').Config} */
const primeui = require("tailwindcss-primeui");
const { extend } = require("tailwindcss-primeui/src/theme");
module.exports = {
  darkMode: ["selector", '[class="app-dark"]'],
  content: ["./src/**/*.{html,ts,scss,css}", "./index.html"],
  plugins: [primeui],
  theme: {
    extend: {
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1920px",
      },
      fontSize: {
        sm: "10px",
      },
      colors: {
        primary: {
          100: "#18181b",
          200: "#27272a",
        },
        secondary: {
          100: "#f1f5f9",
        },
      },
    },
  },
};
