 import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Vercel Deployment Optimizations */
  images: {
    formats: ["image/avif", "image/webp"],
  },

  reactStrictMode: true,
  output: "standalone",
};

export default nextConfig;