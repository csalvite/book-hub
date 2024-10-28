/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://booking-hub.onrender.com/:path*', // Cambia esto por la URL de tu API
      },
    ];
  },
};

export default nextConfig;
