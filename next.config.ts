import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        protocol: "https",
        port: "3000",
      },
      {
        hostname: "localhost",
        protocol: "http",
        port: "3000",
      },
      {
        hostname: "payload-test-gold.vercel.app",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
