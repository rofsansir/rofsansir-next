import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { pastPapers } from "@/data/past-papers";

/**
 * Auto sitemap. Static routes + past-paper detail pages (SSG via
 * generateStaticParams). Book/tip detail pages appended as those land.
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
    "/past-papers",
    "/contact",
    "/class/8",
    "/class/9",
    "/class/10",
    "/privacy-policy",
    "/terms-of-service",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const paperEntries: MetadataRoute.Sitemap = pastPapers.map((p) => ({
    url: `${site.url}/past-papers/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...paperEntries];
}
