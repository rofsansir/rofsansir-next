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

/** Merged, de-duplicated differentiators (was academicAdvantage + eliteSupport).
 *  Deliberately excludes fees and class size (kept off-site by request). */
export const whyRofsan = [
  {
    icon: "examiner",
    title: "Examiner-Led Instruction",
    desc: "Coaching from a Cambridge CAIE examiner - students learn exactly what earns marks, not guesswork.",
  },
  {
    icon: "aligned",
    title: "Cambridge & Edexcel Aligned",
    desc: "Every lesson maps to the O Level Bengali 3204 assessment objectives for both boards.",
  },
  {
    icon: "scripts",
    title: "Weekly Script Checks & Mocks",
    desc: "Scripts and timed mock papers marked to real CAIE grade boundaries, each with a personalised improvement plan.",
  },
  {
    icon: "progress",
    title: "Progress You Can See",
    desc: "24/7 access to notes and recorded sessions, plus regular progress briefings for parents.",
  },
] as const;

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
