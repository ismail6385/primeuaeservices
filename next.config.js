/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed `output: 'export'` to allow dynamic routes (e.g., /blog/[slug])
  // If you need static export, you must rebuild after adding posts and only visit generated slugs.
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
