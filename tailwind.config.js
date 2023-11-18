/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mont: ["Montserrat", "sans - serif"],
      },
      colors: {
        theme: "var(--theme)",
        black: "var(--black)",
        white: "var(--white)",
        shadowcolor: "var(--shadowcolor)",
      },
    },
  },
  plugins: [],
};
