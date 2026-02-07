/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.mahmoudbey-oc.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mahmoudbey-oc.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.mahmoudbey-oc.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'mahmoudbey-oc.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
