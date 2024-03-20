/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'v5.airtableusercontent.com',
          },
        ],
      },
      async rewrites() {
        return [
          {
            source: '/api/auth/sign-in',
            destination: 'https://movie-connect.up.railway.app/auth/sign-in',
          },
        ]
      },
};

export default nextConfig;
