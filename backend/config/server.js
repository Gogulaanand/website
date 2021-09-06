module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: "https://7fd5-13-234-188-229.ngrok.io",
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "c2dd3cf65c31e3ba6583aaed3857ec4c"),
    },
  },
});
