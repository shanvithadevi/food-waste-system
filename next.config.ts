import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Vercel Deployment Optimizations */
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
  // Disable Turbopack to avoid build issues
  experimental: {
    turbopack: false,
  },
};

export default nextConfig;
