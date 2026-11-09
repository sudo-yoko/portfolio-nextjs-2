import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    transpilePackages: ['@my/env', '@my/logger', '@my/client'],
};

export default nextConfig;
