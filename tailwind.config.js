/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
      green: "#00FF00",
      red: "#FF0000",
      'purple': {
        '100': '#F806CC',
        '200': '#A91079',
        '300': '#570A57',
        '400': '#2E0249',
      },
      'pastelpink': {
        '50': '#fff1f4',
        '100': '#ffe4e9',
        '200': '#feccd8',
        '300': '#fda4b9',
        '400': '#fb7195',
        '500': '#f43f73',
        '600': '#e11d5f',
        '700': '#be1250',
        '800': '#9f124a',
        '900': '#881345',
    },

    },
  
    extend: {},
  },
  plugins: [],
}
