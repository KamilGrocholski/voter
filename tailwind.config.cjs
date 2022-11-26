/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {

    extend: {
      colors: {
        dark: {
          border: 'hsl(246, 11%, 22%)',
          header: '#121216',
          bgMain: 'hsl(250, 24%, 9%)',
          bgSecondary: 'hsl(250, 21%, 11%)',
          bgThird: 'rgb(29, 29, 31)'
        },
        muted: {
          light: 'rgba(255,255,255,30%)'
        }
      },
    },
  },  
  plugins: [],
};
