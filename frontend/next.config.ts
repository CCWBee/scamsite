import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker builds
  // This creates a self-contained build that includes only necessary dependencies,
  // significantly reducing the Docker image size and improving container startup time
  output: "standalone",
};

export default nextConfig;
