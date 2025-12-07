import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents : true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      // … other domains if you need
    ],
    // If you want back‑compat for older Next.js versions, you could also use `domains`:
    // domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
