export type PastPaper = {
  id: number;
  title: string;
  slug: string;
  year: number;
  session: string | null;
  paperType: string;
  fileName: string;
  filePath: string;
  url: string;
  fileSize: number;
  description: string;
  metaKeywords: string;
  downloadCount: number;
  viewCount: number;
  isActive: number;
};

export const paperTypes: string[] = [
  "Paper 1",
  "Paper 2",
  "Mark Scheme",
  "General",
];

/** Distinct years present in `papers`, newest first. */
export const getYears = (papers: PastPaper[]): number[] =>
  [...new Set(papers.map((p) => p.year))].sort((a, b) => b - a);

export const getPaper = (papers: PastPaper[], slug: string) =>
  papers.find((p) => p.slug === slug);

export const relatedByYear = (
  papers: PastPaper[],
  paper: PastPaper,
  limit = 6,
) =>
  papers
    .filter((p) => p.year === paper.year && p.slug !== paper.slug)
    .slice(0, limit);

export const formatBytes = (bytes: number) => {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
};
