/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'yellow': '#fbc500',
        'whiet': '#fff',
        'primaire-white': '#c6c8cd',
        'second-white':'#8a8d98',
        'black': '#000',
      }
    },
    screens: {
      'max-430':{'max': '430px'},
      'max-600':{'max': '600px'},
      'max-730':{'max':'730px'}
    }
  },
  plugins: [],
}

