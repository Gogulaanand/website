const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "home-fabric": "url('/media/curtain.webp')",
      }),
      colors: {
        peach: "#FA949D",
      },
      keyframes: {
        zoomIn: {
          "0%, 100%": { transform: "scale(1.05)" },
          "50%": { transform: "scale(1)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        zoomIn: "zoomIn ease-in 3s",
        fadeIn: "fadeIn ease-in 0.5s",
      },
      transitionDuration: {
        2000: "2000ms",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
