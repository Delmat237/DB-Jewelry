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
        port: '8000', // si ton backend Django tourne sur ce port
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'mycdn.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
