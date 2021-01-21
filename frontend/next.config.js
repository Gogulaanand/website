const withImages = require("next-images");

module.exports = withImages({
  images: {
    domains: ["source.unsplash.com", "localhost"],
  },
});
