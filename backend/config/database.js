module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "mongoose",
      settings: {
        database: "strapi",
        uri: env("DATABASE_URI"),
      },
      options: {
        ssl: true,
      },
    },
  },
});
