import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "purepacbd.s3.ap-southeast-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "germanbutcher.s3.ap-southeast-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;