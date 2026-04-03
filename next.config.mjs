/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "utfs.io" },
      { protocol: "https", hostname: "6buicux79t.ufs.sh" },
      { protocol: "https", hostname: "v8gv75m9qo.ufs.sh" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "img.clerk.com" },
      { protocol: "https", hostname: "images.clerk.dev" },
    ],
  },
};

export default nextConfig;
