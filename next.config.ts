import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/monitoring",
        permanent: true,
      },
    ];
  }
}

export default nextConfig;
