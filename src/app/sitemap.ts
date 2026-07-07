import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Auto sitemap. Static routes listed here; dynamic routes (books, tips,
 * past-papers) are appended in Phase 4 via generateStaticParams.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "/",
    "/about",
    "/courses",
    "/results",
    "/books",
    "/examiner-tips",
    "/resources",
    "/faq",
    "/contact",
    "/class/8",
    "/class/9",
    "/class/10",
    "/privacy-policy",
    "/terms-of-service",
  ];

  return staticRoutes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
