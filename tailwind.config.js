/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#DC2626",
        secondary: "#022E4B",
      },
      fontFamily: {
        primary: "'Roboto Slab', serif",
        satisfy: "'Satisfy', cursive",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
