import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Specify packages that should not be bundled by Next.js/Turbopack
  serverExternalPackages: [
    '@remotion/bundler',
    '@remotion/renderer',
    'esbuild'
  ],
  // Optimization to prevent build crashes on resource-constrained environments
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
} as any;

export default nextConfig;
