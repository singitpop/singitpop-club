import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // VERCEL_TRIGGER: FORCE UPDATE 3 (Login Page)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
