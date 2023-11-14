/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cloudprojectfinal2k23.s3.amazonaws.com',
            },
        ],
    },
}
module.exports = nextConfig

