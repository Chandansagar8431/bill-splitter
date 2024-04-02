/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "Arial", "sans-serif"],
      },
      colors: {
        "custom-blue": "#ddda01",
        green: "#72963f",
        "black-green": "#3E7940",
        "orange-shade": "#BB834E",
        "toggle-block": "#2F2006",
        // custom color to be in the screen
      },
    },
  },
  plugins: [],
};
