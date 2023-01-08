/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {

    extend: {
      keyframes: {
      },

      animation: {
      },

      colors: {
        dark: {
          shade: {
            900: '#13131a',
            800: '#16161e',
            700: '#181821',
            600: '#1b1b25',
            500: '#23232c',
            400: '#32323b',
            300: '#8a949e',
            200: '#6c7285',
            100: '#e6eaf0'
          }
        },
        indicative: {
          success: '#198754',
          danger: '#dc3545',
          info: '#0dcaf0',
          warning: '#ffc107'
        },
      },
    },
  },  
  plugins: [],
};
