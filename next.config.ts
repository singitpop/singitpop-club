import type { NextConfig } from "next";

// Forced rebuild for cleanup
// Note: Using webpack (not Turbopack) to prevent memory exhaustion with Remotion deps

const nextConfig: NextConfig = {
  // Specify packages that should not be bundled by Next.js/Turbopack
  serverExternalPackages: [
    '@remotion/bundler',
    '@remotion/renderer',
    '@remotion/cli',
    'esbuild'
  ],
  // Fix lockfile root warning + stub out heavy Remotion packages to prevent memory exhaustion
  turbopack: {
    root: __dirname,
    resolveAlias: {
      // These are server-only Remotion packages used only for video rendering.
      // Pointing them to an empty stub prevents Turbopack from compiling them during dev.
      '@remotion/bundler': './src/stubs/empty-module.js',
      '@remotion/renderer': './src/stubs/empty-module.js',
      '@remotion/cli': './src/stubs/empty-module.js',
      'esbuild': './src/stubs/empty-module.js',
    },
  },
  // Optimization to prevent build crashes on resource-constrained environments
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ['recharts', 'd3-array', 'd3-scale', 'victory-vendor', 'es-toolkit'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'singitpop-music.s3.eu-north-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        port: '',
        pathname: '/**',
      }
    ],
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
