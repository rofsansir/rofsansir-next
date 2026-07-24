/** Courses / batches / curriculum content (migrated from static site). */

export type Course = {
  title: string;
  batch: string;
  type: string;
  duration: string;
  features: string[];
  accent: "marigold" | "plum" | "teal";
};

export const courses: Course[] = [
  {
    title: "Foundation Batch",
    batch: "Grade VIII",
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
    batch: "Grade IX",
    type: "Focused Groups",
    duration: "1 Year",
    accent: "marigold",
    features: [
      "Composition writing skills",
      "Vocabulary expansion",
      "Exam assessment prep",
      "Comprehension development",
    ],
  },
  {
    title: "Exam Focused",
    batch: "Grade X",
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
