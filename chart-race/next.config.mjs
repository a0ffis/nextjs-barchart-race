/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    API_ENDPOINT: process.env.API_ENDPOINT,
    API_PORT: process.env.API_PORT,
  },
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: `http://${process.env.API_ENDPOINT}:${process.env.API_PORT}/:path*`,
      },
    ];
  },
};

export default nextConfig;
