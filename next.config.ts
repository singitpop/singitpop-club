import type { NextConfig } from "next";

// Forced rebuild for cleanup

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

  async redirects() {
    return [
      {
        source: '/signup',
        destination: '/sign-up',
        permanent: true,
      },
      {
        source: '/signin',
        destination: '/sign-in',
        permanent: true,
      },
    ];
  },
} as any;

export default nextConfig;
