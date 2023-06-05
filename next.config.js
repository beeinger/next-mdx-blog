/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  experimental: {
    appDir: true,
  },
  pageExtensions: ["ts", "tsx", "mdx"],
};

const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
