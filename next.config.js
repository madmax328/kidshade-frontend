const path = require("path");

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(process.cwd(), "src"),
      "@lib": path.resolve(process.cwd(), "src/lib"),
      "@components": path.resolve(process.cwd(), "src/components"),
    };

    return config;
  },
};

module.exports = nextConfig;
