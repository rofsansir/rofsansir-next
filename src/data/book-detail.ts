import rawData from "./book-detail.json";

export type BookSection = { heading: string; content: string[] };

export type BookDetail = {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  author: string;
  sections: BookSection[];
};

const details = rawData as BookDetail[];

export const getBookDetail = (slug: string) =>
  details.find((b) => b.id === slug);
