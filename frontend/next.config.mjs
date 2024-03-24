/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'v5.airtableusercontent.com',
          },
          {
            protocol: 'https',
            hostname: 'via.placeholder.com'
          }
        ],
      }
};

export default nextConfig;
