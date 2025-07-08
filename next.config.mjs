/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000', 
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'mycdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'db-jewelry.onrender.com',
        pathname: '/media/**',
      },
      {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          pathname: '/dpsgcq2lm/image/upload/**',
        },
    ],
  },
};

export default nextConfig;
