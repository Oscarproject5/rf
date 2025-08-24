/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', '@paper-design/shaders-react', 'three', '@react-three/fiber', '@react-three/drei', 'lottie-react'],
    webpackBuildWorker: true,
    optimizeServerReact: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
    removeConsole: process.env.NODE_ENV === 'production',
    reactRemoveProperties: process.env.NODE_ENV === 'production'
  },
  webpack: (config, { isServer, dev }) => {
    // Handle Three.js and WebGL dependencies
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
        buffer: false
      }
    }

    // Optimize bundle splitting for better caching
    if (config.optimization && config.optimization.splitChunks) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        // Three.js and related 3D libraries
        three: {
          name: 'three',
          test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
          chunks: 'all',
          priority: 30,
          enforce: true
        },
        // Animation libraries
        animations: {
          name: 'animations',
          test: /[\\/]node_modules[\\/](framer-motion|lottie-react)[\\/]/,
          chunks: 'all',
          priority: 20,
          enforce: true
        },
        // Shader libraries
        shaders: {
          name: 'shaders',
          test: /[\\/]node_modules[\\/]@paper-design[\\/]/,
          chunks: 'all',
          priority: 25,
          enforce: true
        },
        // Common utilities
        utils: {
          name: 'utils',
          test: /[\\/]node_modules[\\/](clsx|zod|next-seo)[\\/]/,
          chunks: 'all',
          priority: 15,
          enforce: true
        }
      }
    }

    // Tree shaking optimizations
    if (!dev) {
      config.optimization.usedExports = true
      config.optimization.sideEffects = false
    }

    return config
  },
  // Performance and security headers
  poweredByHeader: false,
  compress: true,
  trailingSlash: false,
  reactStrictMode: true,
  
  // Enhanced caching and performance
  onDemandEntries: {
    maxInactiveAge: 60 * 1000, // 1 minute
    pagesBufferLength: 5
  },
  
  // Custom headers for performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      },
      {
        source: '/(.*)\\.(js|css|woff|woff2|eot|ttf|otf|svg|png|jpg|jpeg|gif|webp|avif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  }
}

export default nextConfig