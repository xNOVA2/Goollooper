/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'goollooper2.s3.us-east-2.amazonaws.com',
              port: '',
              pathname: '/uploads/**',
            },
          ],
    },
};

export default nextConfig;
