/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'crafatar.com'
            },
            {
                protocol: 'https',
                hostname: 'static.wikia.nocookie.net'
            },
        ]
    }
}

export default nextConfig
