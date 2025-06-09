module.exports = {
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
  webpack: (config:any, { isServer }:any) => {
    if (!isServer) {
      // Exclude 'child_process' and 'fs' in the client-side build
      config.node = {
        ...config.node,
        fs: 'empty',  // Mock 'fs' for the client-side
        child_process: 'empty',  // Mock 'child_process' for the client-side
      };
    }

    return config;
  },
};

