import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Auto sitemap. Static routes listed here; dynamic routes (books, tips,
 * past-papers) are appended in Phase 4 via generateStaticParams.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["/", "/about", "/courses", "/results", "/books", "/examiner-tips", "/past-papers", "/resources", "/faq", "/contact", "/privacy-policy", "/terms-of-service"];

  return staticRoutes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
