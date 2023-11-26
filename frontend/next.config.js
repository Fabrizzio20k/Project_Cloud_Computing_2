/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cloudprojectfinal2k23.s3.amazonaws.com',
            },
        ],
    },
}
module.exports = nextConfig

