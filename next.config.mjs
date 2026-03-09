/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // No remote images yet — all local placeholders.
    // When adding real photos from /public/images/, no config needed.
    // If you later use an external CDN, add remotePatterns here.
    remotePatterns: [],
  },
};

export default nextConfig;
