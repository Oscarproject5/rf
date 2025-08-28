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
    deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920, 2048], // Added 320 for small mobile
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

    // Optimize bundle splitting for better caching and mobile performance
    if (config.optimization && config.optimization.splitChunks) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        // Three.js and related 3D libraries - load async on mobile
        three: {
          name: 'three',
          test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
          chunks: 'async', // Changed to async for mobile
          priority: 30,
          enforce: true,
          reuseExistingChunk: true
        },
        // Animation libraries
        animations: {
          name: 'animations',
          test: /[\\/]node_modules[\\/](framer-motion|lottie-react)[\\/]/,
          chunks: 'all',
          priority: 20,
          enforce: true,
          reuseExistingChunk: true
        },
        // Shader libraries - load async on mobile
        shaders: {
          name: 'shaders',
          test: /[\\/]node_modules[\\/]@paper-design[\\/]/,
          chunks: 'async', // Changed to async for mobile
          priority: 25,
          enforce: true,
          reuseExistingChunk: true
        },
        // Common utilities
        utils: {
          name: 'utils',
          test: /[\\/]node_modules[\\/](clsx|zod|next-seo)[\\/]/,
          chunks: 'all',
          priority: 15,
          enforce: true,
          reuseExistingChunk: true
        },
        // Mobile-specific chunks
        mobile: {
          name: 'mobile',
          test: /[\\/](components|hooks)[\\/]Mobile/,
          chunks: 'all',
          priority: 35,
          enforce: true,
          reuseExistingChunk: true
        }
      }
    }

    // Tree shaking and minification optimizations
    if (!dev) {
      config.optimization.usedExports = true
      config.optimization.sideEffects = false
      config.optimization.minimize = true
      config.optimization.concatenateModules = true // Module concatenation for smaller bundles
    }

    return config
  },
  // Performance and security headers
  poweredByHeader: false,
  compress: true,
  trailingSlash: false,
  reactStrictMode: true,
  
  // Enhanced caching and performance for mobile
  onDemandEntries: {
    maxInactiveAge: 30 * 1000, // 30 seconds for mobile memory optimization
    pagesBufferLength: 3 // Reduced for mobile memory
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
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(self), microphone=(), camera=()'
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