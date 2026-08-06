import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    experimental: {
        serverMinification: false,
        turbopackMinify: false,
    },
};

export default nextConfig;
