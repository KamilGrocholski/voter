/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {

    extend: {
      colors: {
        dark: {
          bgMain: 'hsl(250, 24%, 9%)',
          bgSecondary: 'hsl(250, 21%, 11%)'
        }
      },
    },
  },
  plugins: [],
};
