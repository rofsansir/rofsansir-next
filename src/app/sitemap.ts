import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { books } from "@/data/books";
import { getPastPapers, getTipArticles } from "@/lib/remote-content";

/**
 * Auto sitemap. Static routes + past-paper detail pages (SSG via
 * generateStaticParams). Book/tip detail pages appended as those land.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pastPapers = await getPastPapers();
  const articles = await getTipArticles();
  const now = new Date();
  const staticRoutes = [
    "/",
    "/about",
    "/courses",
    "/books",
    "/examiner-tips",
    "/video",
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

  const bookEntries: MetadataRoute.Sitemap = books.map((b) => ({
    url: `${site.url}/books/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${site.url}/examiner-tips/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...bookEntries, ...articleEntries, ...paperEntries];
}
