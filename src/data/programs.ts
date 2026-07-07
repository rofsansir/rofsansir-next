/** Courses / programs / curriculum content (migrated from static site). */

export type Program = {
  title: string;
  batch: string;
  type: string;
  duration: string;
  features: string[];
  accent: "marigold" | "plum" | "teal";
};

export const programs: Program[] = [
  {
    title: "Foundation Batch",
    batch: "Class VIII",
    type: "Small Batch",
    duration: "1 Year",
    accent: "teal",
    features: [
      "Basic sentence structure",
      "Vocabulary building",
      "Composition writing basics",
      "Comprehension basics",
    ],
  },
  {
    title: "Regular Program",
    batch: "Class IX",
    type: "Focused Groups",
    duration: "1 Year",
    accent: "marigold",
    features: [
      "Composition writing skills",
      "Vocabulary expansion",
      "CAIE assessment prep",
      "Comprehension development",
    ],
  },
  {
    title: "Exam Focused",
    batch: "Class X",
    type: "Exam Ready",
    duration: "1 Year",
    accent: "plum",
    features: [
      "Advanced composition techniques",
      "Time management strategies",
      "Full syllabus coverage",
      "Comprehension mastery",
    ],
  },
];

export const academicAdvantage = [
  {
    title: "Certified Teacher",
    desc: "Expert teacher with 8+ years of experience in leading institutions.",
  },
  {
    title: "Small Batches",
    desc: "Strictly limited students per batch for personalized, interactive learning.",
  },
  {
    title: "International Curriculum Aligned",
    desc: "Aligned with Cambridge (CAIE) and Pearson Edexcel global standards.",
  },
  {
    title: "High-Tech Classroom",
    desc: "Tracks student progress, performance, and analytical reports.",
  },
];

export const classModes = [
  {
    title: "Offline",
    subtitle: "Lalmatia Campus",
    desc: "In-person classroom at Lalmatia, Dhaka with printed materials and face-to-face mentoring.",
    points: ["Physical classroom", "Printed materials", "Face-to-face mentoring"],
  },
  {
    title: "Online",
    subtitle: "Virtual Classroom",
    desc: "Live sessions with recorded modules and Google Classroom integration.",
    points: ["Live Zoom / Google Meet", "Recorded sessions", "Google Classroom integration"],
  },
];

export const curriculum = [
  {
    title: "Paper 01: Writing",
    code: "3204/01",
    points: [
      "Formal & Personal Letter Writing",
      "Creative & Descriptive Composition",
      "Exam Structure & Marking Strategy",
    ],
  },
  {
    title: "Paper 02: Language",
    code: "3204/02",
    points: [
      "Vocabulary & Sentence Precision",
      "Grammar Logic & Application",
      "Comprehension & Answer Writing",
    ],
  },
  {
    title: "Mock System",
    code: "Exam Ready",
    points: [
      "Real-Time Mock Assessments",
      "Examiner-Style Corrections",
      "Personalised Feedback & Improvement Plan",
    ],
  },
];

export const eliteSupport = [
  { title: "Weekly Script Checks", desc: "Detailed corrections based on CAIE grade boundaries." },
  { title: "A* Grade Vocabulary", desc: "Exclusive word banks that impress Cambridge markers." },
  { title: "Mock Marathons", desc: "Time-bound simulations to build exam-day stamina." },
  { title: "Interactive Portal", desc: "Access notes and recorded modules 24/7." },
  { title: "Parent Connect", desc: "Transparent progress reporting and monthly briefings." },
  { title: "One-to-One Solve", desc: "Dedicated slots for complex grammar resolution." },
];
