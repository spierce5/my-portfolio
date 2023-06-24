module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.pdf$/i,
      type: "asset/source",
    });
    config.resolve.fallback = { fs: false, path: false };

    return config;
  },
};
