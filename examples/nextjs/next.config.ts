import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@drjoshcsimmons/scl'],
  typescript: {
    // TODO: Fix ButtonProps type export from library
    ignoreBuildErrors: true,
  },
}

export default nextConfig
