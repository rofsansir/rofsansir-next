/** Examiner-tip article topics (index; full article bodies arrive in Phase 4). */

export type Tip = {
  slug: string;
  title: string;
  category: "Students" | "Parents" | "Paper 1" | "Paper 2" | "General";
  excerpt: string;
  readTime: string;
  thumb: string;
};

export const tips: Tip[] = [
  {
    slug: "why-students-lose-marks",
    title: "Why Students Lose Marks in O Level Bangla",
    category: "Examiner Insight",
    excerpt:
      "The marking-scheme mistakes that quietly cost grades — and how to avoid them.",
    readTime: "8 min read",
    thumb: "/assets/tips/1.jpg",
  },
  {
    slug: "paper-01-preparation",
    title: "How to Prepare for O Level Bengali Paper 01",
    category: "Paper 1",
    excerpt: "Composition and letter writing, structured around the examiner's lens.",
    readTime: "7 min read",
    thumb: "/assets/tips/2.jpg",
  },
  {
    slug: "paper-02-preparation",
    title: "How to Prepare for O Level Bengali Paper 02",
    category: "Paper 2",
    excerpt: "Language, grammar and comprehension — where the marks really live.",
    readTime: "7 min read",
    thumb: "/assets/tips/3.jpg",
  },
  {
    slug: "when-to-start",
    title: "When Should a Student Start O Level Bangla?",
    category: "Students",
    excerpt: "Class VIII, IX or X — what each starting point means for your grade.",
    readTime: "6 min read",
    thumb: "/assets/tips/4.jpg",
  },
  {
    slug: "english-medium-bengali",
    title: "Can English-Medium Students Score A* in Bengali?",
    category: "Students",
    excerpt: "Yes — here's how Bengali is taught for English-medium learners.",
    readTime: "6 min read",
    thumb: "/assets/tips/5.jpg",
  },
  {
    slug: "memorisation-myth",
    title: "Stop Memorising — Start Understanding",
    category: "General",
    excerpt: "Why Cambridge rewards clear thinking over memorised answers.",
    readTime: "5 min read",
    thumb: "/assets/tips/6.jpg",
  },
  {
    slug: "parent-guide",
    title: "A Parent's Guide to O Level Bengali",
    category: "Parents",
    excerpt: "What to expect, how much time it takes, and how to support your child.",
    readTime: "6 min read",
    thumb: "/assets/tips/7.jpg",
  },
  {
    slug: "exam-day-strategy",
    title: "Exam-Day Strategy for O Level Bengali",
    category: "General",
    excerpt: "Time management and answer order to maximise your marks.",
    readTime: "5 min read",
    thumb: "/assets/tips/8.jpg",
  },
];
