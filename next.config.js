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
  // Add static page generation configuration
  generateStaticParams: async () => {
    return {
      // Add any dynamic paths that need to be pre-rendered
      '/': { revalidate: 3600 }, // Revalidate every hour
    };
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
}

module.exports = nextConfig 