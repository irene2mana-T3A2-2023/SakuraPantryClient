const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}", 
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: {
            50: '#F0FCFF',
            100: '#E6FAFE',
            200: '#D7F8FE',
            300: '#C3F4FD',
            400: '#A5EEFD',
            500: '#7EE7FC',
            600: '#06B7DB',
            700: '#09AACD',
            800: '#0E8AAA',
            900: '#053B48',
            DEFAULT: '#053B48',
            foreground: '#ffffff'
          },
          secondary: {
            50: '#FFEDFA',
            100: '#FFDCF5',
            200: '#FFB8EB',
            300: '#FF95E1',
            400: '#FF71D7',
            500: '#FF4ECD',
            600: '#CC3EA4',
            700: '#992F7B',
            800: '#661F52',
            900: '#331029',
            DEFAULT: '#FF71D7',
            foreground: '#ffffff'
          }
        }
      }
    }
  })]
}

