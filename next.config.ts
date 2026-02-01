import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Specify packages that should not be bundled by Next.js/Turbopack
  serverExternalPackages: [
    '@remotion/bundler',
    '@remotion/renderer',
    'esbuild'
  ],
  // Ensure we don't have lingering ESLint config
};

export default nextConfig;
