import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "cdn.rofsansir.com" },
    ],
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
      { source: "/tips", destination: "/examiner-tips", permanent: true },
      { source: "/results", destination: "/", permanent: true },
      { source: "/class-8", destination: "/class/8", permanent: true },
      { source: "/class-viii", destination: "/class/8", permanent: true },
      { source: "/class-9", destination: "/class/9", permanent: true },
      { source: "/class-ix", destination: "/class/9", permanent: true },
      { source: "/class-10", destination: "/class/10", permanent: true },
      { source: "/class-x", destination: "/class/10", permanent: true },
    ];
  },
};

export default nextConfig;
