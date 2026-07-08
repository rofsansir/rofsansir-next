import rawData from "./past-papers.json";
import { assetUrl } from "@/lib/assets";

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

export const pastPapers: PastPaper[] = (rawData as PastPaper[])
  .filter((p) => p.isActive === 1)
  .map((p) => ({ ...p, url: assetUrl(p.filePath) }))
  .sort((a, b) => b.year - a.year || a.paperType.localeCompare(b.paperType));

/** Distinct years, newest first. */
export const years: number[] = [...new Set(pastPapers.map((p) => p.year))].sort(
  (a, b) => b - a,
);

export const paperTypes: string[] = [
  "Paper 1",
  "Paper 2",
  "Mark Scheme",
  "General",
];

export const getPaper = (slug: string) =>
  pastPapers.find((p) => p.slug === slug);

export const relatedByYear = (paper: PastPaper, limit = 6) =>
  pastPapers.filter((p) => p.year === paper.year && p.slug !== paper.slug).slice(0, limit);

export const formatBytes = (bytes: number) => {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
};
