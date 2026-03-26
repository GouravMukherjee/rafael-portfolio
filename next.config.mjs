/** @type {import('next').NextConfig} */
const nextConfig = {
  // Serve hero + gallery images as WebP/AVIF automatically
  images: {
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
