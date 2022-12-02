/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {

    extend: {
      colors: {
        indicative: {
          success: 'green',
          danger: 'red',
          info: 'blue',
          warning: 'yellow'
        },

        dark: {
          accent: {
            0: 'purple'
          },
          shade: {
            0: 'hsl(222, 14% 90%)',
            1: 'hsl(222, 5% 62%)',
            2: 'hsl(222, 5% 52%)',
            3: 'hsl(222, 6% 30%)',
            4: 'hsl(222, 7% 30%)',
            5: 'hsl(222, 9% 23%)',
            6: 'hsl(222, 10% 17%)',
            7: 'hsl(222, 14% 11%)',
            8: 'hsl(222, 19% 9%)',
            9: 'hsl(222, 20% 7%)',
            10: 'hsl(222, 33% 4%)',
            11: 'hsl(222, 20% 8%)',
          },
          border: 'hsl(246, 11%, 22%)',
          header: '#121216',
          bgMain: 'hsl(250, 24%, 9%)',
          bgSecondary: 'hsl(250, 21%, 11%)',
          bgThird: 'rgb(29, 29, 31)',
          button: {
            main: '#1f87e7'
          }
        },

        muted: {
          light: 'rgba(255,255,255,30%)'
        }
      },
    },
  },  
  plugins: [],
};
