const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.js", "./components/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        peach: "#FA949D",
        purple: "#472ECD",
        ash: "#F4F4F8",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeInUp: {
          "0%": {
            opacity: 0,
            transform: "translate3d(0,30px,0)",
            "-webkit-transform": "translate3d(0,30px,0)",
          },
          "100%": {
            opacity: 1,
            "-webkit-transform": "translate3d(0,0,0)",
            transform: "translate3d(0,0,0)",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn ease-in 0.5s",
        fadeInUp: "fadeInUp ease-out 0.5s",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
