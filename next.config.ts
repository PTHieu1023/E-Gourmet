import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    output: 'standalone',
    images: {
        minimumCacheTTL: 60
    }
};

export default withNextIntl(nextConfig);
