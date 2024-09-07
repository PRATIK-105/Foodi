/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        greenish: "#39DB4A",
        redish: "#FF6868",
        BG: "#FCFCFC",
      },
      // fontFamily : {
      //   "primary" : ['Inter' , 'sans-serif']
      // }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"], // Set the default theme to light
  },
};
