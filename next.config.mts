import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "adobe.ly",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
