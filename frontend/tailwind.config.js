module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "home-fabric": "url('/media/curtain.webp')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
