import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.legalName,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f3ede1",
    theme_color: "#382033",
    icons: [
      { src: "/logos/web-app-manifest-192.png", sizes: "192x192", type: "image/png" },
      { src: "/logos/web-app-manifest-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
