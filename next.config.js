/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Change from 'export' to 'standalone' if you need middleware
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
    // Keep your specific domains if needed
    domains: [
      'media.dev.eduley.com',
      'backend-dev.eduley.com',
      'images.unsplash.com',
      // Add your logo domain here if it's different
    ],
    unoptimized: true,
  },
  experimental: {
    // Remove optimizeCss if installing critters doesn't work
    // optimizeCss: true,
    scrollRestoration: true,
  },
}

module.exports = nextConfig 