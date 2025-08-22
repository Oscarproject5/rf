/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['motion', '@paper-design/shaders-react', 'three']
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fonts.googleapis.com'
      },
      {
        protocol: 'https',
        hostname: 'fonts.gstatic.com'
      }
    ]
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  webpack: (config, { isServer }) => {
    // Handle Three.js and WebGL dependencies
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false
      }
    }

    // Optimize bundle splitting
    if (config.optimization && config.optimization.splitChunks) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        animations: {
          name: 'animations',
          test: /[\\/]node_modules[\\/](framer-motion|lottie-react|three|@react-three)[\\/]/,
          chunks: 'all',
          priority: 10
        },
        shaders: {
          name: 'shaders',
          test: /[\\/]node_modules[\\/]@paper-design[\\/]/,
          chunks: 'all',
          priority: 10
        }
      }
    }

    return config
  },
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  trailingSlash: false,
  reactStrictMode: true
}

export default nextConfig