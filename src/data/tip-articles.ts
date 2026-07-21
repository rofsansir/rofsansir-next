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

export const getArticle = <T extends { slug: string }>(articles: T[], slug: string) =>
  articles.find((a) => a.slug === slug);

export const relatedArticles = <T extends { slug: string }>(
  articles: T[],
  article: T,
  limit = 3,
) => articles.filter((a) => a.slug !== article.slug).slice(0, limit);
