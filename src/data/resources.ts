/** Free downloadable study resources (PDFs offloaded to R2 under assets/pdfs/). */
import { assetUrl } from "@/lib/assets";

export type Resource = {
  title: string;
  category: "Letters & Reports" | "Essays" | "Vocabulary" | "Grammar" | "Comprehension";
  file: string; // filename in /assets/pdfs/
  bengali?: boolean;
};

export const resources: Resource[] = [
  {
    title: "Letter Writing Format",
    category: "Letters & Reports",
    file: "letter format updated.pdf",
  },
  {
    title: "Letter Format & Sample Answer",
    category: "Letters & Reports",
    file: "Letter writing format & sample answer, Bengali with Rofsan Sir.pdf",
  },
  {
    title: "Letter & Report Practice",
    category: "Letters & Reports",
    file: "O Level Bengali Letter & Report Practice.pdf",
  },
  {
    title: "Letter Practice - Historical Place",
    category: "Letters & Reports",
    file: "Letter practice ঐতিহাসিক স্থান.pdf",
    bengali: true,
  },
  {
    title: "Report Practice - Tree Plantation",
    category: "Letters & Reports",
    file: "Report Practice - বৃক্ষরোপণ.pdf",
    bengali: true,
  },
  {
    title: "Essay Examples (Science)",
    category: "Essays",
    file: "O Level Bengali Essay Examples (Science).pdf",
  },
  {
    title: "Essay - A Journey (with example)",
    category: "Essays",
    file: "Essay - Journey with example IS_ Rofsan Sir.pdf",
  },
  {
    title: "Idioms & Proverbs (প্রবাদ প্রবচন)",
    category: "Vocabulary",
    file: "প্রবাদ প্রবচন- স্বর.pdf",
    bengali: true,
  },
  {
    title: "Shor Shondhi Formula 1 (স্বর সন্ধি)",
    category: "Grammar",
    file: "স্বর সন্ধি অনুশীলন -formula 1.pdf",
    bengali: true,
  },
  {
    title: "Shor Shondhi Formula 1–6",
    category: "Grammar",
    file: "2.ShorShondhi 1-6.pdf",
  },
  {
    title: "Shor Shondhi Presentation (Formula 1–6)",
    category: "Grammar",
    file: "স্বরসন্ধি Prasantation Formula 1-6 by Rofsan Sir.pdf",
    bengali: true,
  },
  {
    title: "Shandhi Exam - 100 Marks QP",
    category: "Grammar",
    file: "QP Shandhi Exam (all) 100 Marks.pdf",
  },
  {
    title: "OE Comprehension Practice",
    category: "Comprehension",
    file: "O Level Bengali OE Comprehension Practice.pdf",
  },
  {
    title: "Sentence Transformation",
    category: "Comprehension",
    file: "O Level Bengali Sentence Transformation.pdf",
  },
];

export const resourceHref = (file: string) => assetUrl(`assets/pdfs/${file}`);
