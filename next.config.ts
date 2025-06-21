import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prg-menu-images.s3.ap-south-1.amazonaws.com',
        port: '',
        pathname: '/**', // This allows all image paths from this bucket
      },
    ],
  },
};

export default nextConfig;
