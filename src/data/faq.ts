/** FAQs (migrated from faq.json). Parent answers are Bengali with an English summary. */

export type Faq = {
  q: string;
  a: string;
  enSummary?: string;
};

export const studentFaqs: Faq[] = [
  {
    q: "Is O Level Bengali very difficult?",
    a: "No. O Level Bengali becomes difficult only when it is approached with fear or memorization. With clear explanations, structured practice, and regular feedback, Bengali becomes manageable and confidence-building.",
  },
  {
    q: "I study in English-medium. Can I still do well in Bengali?",
    a: "Yes. Cambridge O Level Bengali is designed with English-medium learners in mind. Many English-medium students achieve strong results when Bengali is taught clearly, step by step, and in an exam-focused way.",
  },
  {
    q: "When is the best time to start preparing for O Level Bengali?",
    a: "The earlier, the better.\n• Class VIII: Ideal for building strong foundations without pressure\n• Class IX: Best time to develop writing skills and exam understanding\n• Class X: Focused revision and exam practice\nStudents who start earlier usually feel less stress, write better answers, and perform more consistently in exams.",
  },
  {
    q: "Can I improve if I start late?",
    a: "Yes, improvement is possible even for late starters. Students who start earlier benefit from better writing confidence, fewer repeated mistakes and stronger exam awareness. Late starters need structured planning and regular mock tests, but progress is achievable with the right guidance.",
  },
  {
    q: "Do I need to memorize essays, letters, or answers?",
    a: "No. Memorization is not recommended. Cambridge exams reward clear ideas, logical structure and appropriate language use. Understanding how to write is far more important than memorizing what to write.",
  },
];

export const parentFaqs: Faq[] = [
  {
    q: "Is O Level Bangla compulsory for English-medium students?",
    a: "O Level Bangla বাধ্যতামূলক না হলেও এটি একটি অত্যন্ত গুরুত্বপূর্ণ ও ভবিষ্যৎবান্ধব বিষয়। Cambridge O Level Bangla শিক্ষার্থীদের ভাষাগত দক্ষতা, চিন্তার গভীরতা এবং একাডেমিক লেখার সক্ষমতা উন্নত করে, যা পরবর্তী AS/A Level ও বিশ্ববিদ্যালয় পর্যায়ে সরাসরি কাজে লাগে।",
    enSummary:
      "Not compulsory, but highly valuable. It strengthens language skills, depth of thought and academic writing that directly help at AS/A Level and university.",
  },
  {
    q: "Will studying Bangla affect my child's English performance?",
    a: "না। বরং গবেষণা ও Cambridge syllabus অনুযায়ী দেখা যায় মাতৃভাষায় সুগঠিত চিন্তার সক্ষমতা দ্বিতীয় ভাষার (English) academic writing ও critical thinking আরও শক্তিশালী করে। সঠিকভাবে পড়ানো O Level Bangla English-এর জন্য সহায়ক ভূমিকা রাখে।",
    enSummary:
      "No. Strong first-language thinking actually strengthens English academic writing and critical thinking.",
  },
  {
    q: "Is O Level Bangla based on memorization?",
    a: "না। Cambridge O Level Bangla সম্পূর্ণভাবে understanding, interpretation, and expression-ভিত্তিক। মুখস্থ উত্তর দিলে বরং নম্বর কমে যায়।",
    enSummary:
      "No. It is understanding, interpretation and expression based. Comprehension needs own-word responses and composition rewards clear idea organisation.",
  },
  {
    q: "My child is weak in Bangla. Can they still do well?",
    a: "হ্যাঁ। English-medium শিক্ষার্থীদের জন্য Bangla challenging হলেও সঠিক guidance, structured practice এবং step-by-step approach থাকলে উন্নতি সম্ভব। syllabus-এ ব্যবহৃত ভাষা ও task structure English-medium learners মাথায় রেখেই তৈরি।",
    enSummary:
      "Yes. With the right guidance and a step-by-step approach, English-medium learners can improve — the syllabus is designed with them in mind.",
  },
  {
    q: "How much daily time is required for Bangla preparation?",
    a: "প্রতিদিন ২৫–৪৫ মিনিট নিয়মিত পড়াশোনা করলেই যথেষ্ট। Bangla-র ক্ষেত্রে consistency বেশি গুরুত্বপূর্ণ, দীর্ঘ সময় একসাথে পড়া নয়।",
    enSummary:
      "25–45 minutes of consistent daily study is enough; consistency matters more than long single sessions.",
  },
];
