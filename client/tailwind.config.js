/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'colour1': '#ffffff',
        'colour2': '#524C42',
        'colour3': '#E2DFD0',
        'colour4': '#F97300',
        'colour5': '#5AB2FF',
      },
    }
  },
   plugins: [require("daisyui")],
  daisyui:{
    themes:["light"],
  }
}
