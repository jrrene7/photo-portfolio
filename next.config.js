/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/photo-150434945",
      },
      {
        protocol: "https",
        hostname: "adobe.ly",
        port: "",
        pathname: "/48kLlcl"
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig
