const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
  images: {
    domains: ["kitwind.io", "images.pexels.com", "res.cloudinary.com"],
  },
};

const SentryWebpackPluginOptions = {
  silent: true,
};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
