const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.js", "./components/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        peach: "#FA949D",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeInUp: {
          "0%": {
            transform: "translate3d(0,30px,0)",
            opacity: 0,
          },
          "100%": {
            transform: "translate3d(0,0,0)",
            opacity: 1,
          },
        },
      },
      animation: {
        fadeIn: "fadeIn ease-in 0.5s",
        fadeInUp: "fadeInUp 0.75s",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
