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
      'max-730':{'max':'730px'},
      'max-700':{'max':'700px'},
      'min-730':{'min':'730px'},
      'max-550':{'max':'550px'},
      'max-370':{'max':'370px'}
    }
  },
  plugins: [],
}

