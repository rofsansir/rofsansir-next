import rawData from "./tip-articles.json";

export type TipArticle = {
  id: number;
  slug: string;
  title: string;
  ogTitle: string;
  subtitle: string;
  category: string;
  contentHtml: string;
  thumb: string;
  isActive: number;
};

/** SEO-friendly slug per article (2 titles are Bengali, so slugs are assigned). */
const slugById: Record<number, string> = {
  1: "problems-without-o-level-bangla",
  2: "academic-career-impact-of-o-level-bangla",
  3: "how-o-level-bangla-improves-english",
  4: "common-parent-myths-o-level-bangla",
  5: "when-to-start-o-level-bangla",
  6: "why-students-lose-marks",
  7: "how-to-prepare-paper-01",
  8: "how-to-prepare-paper-02",
};

/** English title for OG images (2 titles are Bengali; OG font has no Bengali glyphs). */
const ogTitleById: Record<number, string> = {
  1: "What Happens If You Don't Take O Level Bangla?",
  2: "The Academic & Career Cost of Skipping O Level Bangla",
};

const categoryById: Record<number, string> = {
  1: "Parents",
  2: "Parents",
  3: "Students",
  4: "Parents",
  5: "Students",
  6: "Examiner Insight",
  7: "Paper 1",
  8: "Paper 2",
};

type Raw = { id: number; title: string; subtitle: string; content: string[] };

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Fallback data, used when the R2-hosted manifest (assets/data/tips.json) is
 * unreachable or empty - see src/lib/remote-content.ts. Paragraphs from the
 * original plain-text content are escaped and wrapped in <p> to match the
 * rich-text `contentHtml` shape the admin-authored articles use.
 */
export const fallbackTipArticles: TipArticle[] = (rawData as Raw[]).map((a) => ({
  id: a.id,
  slug: slugById[a.id] ?? `article-${a.id}`,
  title: a.title,
  ogTitle: ogTitleById[a.id] ?? a.title,
  subtitle: a.subtitle,
  category: categoryById[a.id] ?? "General",
  contentHtml: a.content.map((p) => `<p>${escapeHtml(p)}</p>`).join(""),
  thumb: `/assets/tips/${a.id}.jpg`,
  isActive: 1,
}));

export const getArticle = <T extends { slug: string }>(articles: T[], slug: string) =>
  articles.find((a) => a.slug === slug);

export const relatedArticles = <T extends { slug: string }>(
  articles: T[],
  article: T,
  limit = 3,
) => articles.filter((a) => a.slug !== article.slug).slice(0, limit);
