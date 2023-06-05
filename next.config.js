/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  pageExtensions: ["ts", "tsx", "mdx"],
};

const withMDX = require("./mdx-loader")();
module.exports = withMDX(nextConfig);
