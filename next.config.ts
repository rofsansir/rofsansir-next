import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "img.youtube.com" }],
  },
  async redirects() {
    return [
      // Old site URL migration → new routes (permanent, no SEO regression)
      { source: "/routine", destination: "/courses", permanent: true },
      {
        source: "/o-level-bengali-basic-plus",
        destination: "/books",
        permanent: true,
      },
      {
        source: "/o-level-bengali-composition-plus",
        destination: "/books",
        permanent: true,
      },
      {
        source: "/o-level-bengali-practice-plus",
        destination: "/books",
        permanent: true,
      },
      {
        source: "/o-level-bengali-revision-plus",
        destination: "/books",
        permanent: true,
      },
      {
        source: "/o-level-bengali-foundation-plus",
        destination: "/books",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
