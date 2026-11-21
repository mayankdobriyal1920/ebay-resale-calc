import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  // Static export for the strictest no-backend deployment (per spec).
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;