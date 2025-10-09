import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
      },
    },
  },

  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
