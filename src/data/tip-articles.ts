import rawData from "./tip-articles.json";

export type TipArticle = {
  id: number;
  slug: string;
  title: string;
  ogTitle: string;
  subtitle: string;
  content: string[];
  category: string;
  readTime: string;
  thumb: string;
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

export const articles: TipArticle[] = (rawData as Raw[]).map((a) => ({
  id: a.id,
  slug: slugById[a.id] ?? `article-${a.id}`,
  title: a.title,
  ogTitle: ogTitleById[a.id] ?? a.title,
  subtitle: a.subtitle,
  content: a.content,
  category: categoryById[a.id] ?? "General",
  readTime: `${Math.max(4, Math.round(a.content.length / 12))} min read`,
  thumb: `/assets/tips/${a.id}.jpg`,
}));

export const getArticle = (slug: string) =>
  articles.find((a) => a.slug === slug);

export const relatedArticles = (article: TipArticle, limit = 3) =>
  articles.filter((a) => a.slug !== article.slug).slice(0, limit);
