/** The O Level Bengali bookshelf (5 guidebooks). Reused by homepage + /books. */
export type Book = {
  slug: string;
  title: string;
  badge: string;
  /** "gold" uses the marigold badge; "emerald" for the "New" release. */
  badgeTone: "gold" | "emerald";
  subtitle: string;
  code: string;
  summary: string;
  image: string;
};

export const books: Book[] = [
  {
    slug: "o-level-bengali-basic-plus",
    title: "O Level Bengali Basic Plus",
    badge: "Essential",
    badgeTone: "gold",
    subtitle: "A Complete Guide to O Level Bengali",
    code: "3204/02",
    summary:
      "A structured guide to CAIE O Level Bengali Paper 02 — foundational grammar and core concepts, built for English-medium students.",
    image: "/assets/books/1.png",
  },
  {
    slug: "o-level-bengali-composition-plus",
    title: "O Level Bengali Composition Plus",
    badge: "Bestseller",
    badgeTone: "gold",
    subtitle: "A Complete Guide to Composition Writing",
    code: "3204/01",
    summary:
      "An exam-focused guide to Paper 01 — Letter, Report, Dialogue, Speech and Composition writing with marking-scheme insight.",
    image: "/assets/books/2.png",
  },
  {
    slug: "o-level-bengali-practice-plus",
    title: "O Level Bengali Practice Plus",
    badge: "Exam Prep",
    badgeTone: "gold",
    subtitle: "Intensive Preparation for CAIE 3204",
    code: "3204",
    summary:
      "Intensive, exam-focused practice across both Paper 01 and Paper 02 for complete CAIE preparation.",
    image: "/assets/books/3.png",
  },
  {
    slug: "o-level-bengali-revision-plus",
    title: "O Level Bengali Revision Plus",
    badge: "Bestseller",
    badgeTone: "gold",
    subtitle: "Topic-wise Past Paper Practice",
    code: "3204",
    summary:
      "Topic-wise past-paper practice for CAIE O Level Bengali 3204 with detailed solutions.",
    image: "/assets/books/4.png",
  },
  {
    slug: "o-level-bengali-foundation-plus",
    title: "O Level Bengali Foundation Plus",
    badge: "New",
    badgeTone: "emerald",
    subtitle: "Building Strong Basics in Bengali",
    code: "Class VIII",
    summary:
      "A step-by-step integrated approach to building strong Bengali basics for beginners and Class VIII starters.",
    image: "/assets/books/5.png",
  },
];
