/** Homepage content (hero, ticker, boards, gallery, students, testimonials, teaser). */

export const heroStats: string[] = [
  "9+ Years Experience",
  "3,000+ Students Mentored",
  "Author of O Level Bengali Book Series",
  "98% A* & A Success Rate",
];

export const heroTypewriter: string[] = [
  "Master O Level Bengali with Rofsan Sir",
  "Score A* with a Cambridge Examiner",
  "Loved by 3,000+ English-medium students",
  "Author of the O Level Bengali Book Series",
];

export const tickerItems: string[] = [
  "A*",
  "99 marks",
  "3,000+ students",
  "Cambridge Examiner",
  "Author of the O Level Bengali Book Series",
  "9+ years",
];

export const boards: { name: string; logo: string }[] = [
  { name: "Cambridge (CAIE)", logo: "/logos/cambridge-logo.png" },
  { name: "Pearson Edexcel", logo: "/logos/edexcellogo.png" },
  { name: "Elites", logo: "/logos/ELITES.png" },
];

/** Hall of Fame   top achievers. */
export type Achiever = {
  name: string;
  meta: string;
  grade: string;
  image: string;
};

export const achievers: Achiever[] = [
  { name: "Prioman", meta: "World Heights · 2023", grade: "A*", image: "/assets/students/prioman.jpg" },
  { name: "Apurva Sahil", meta: "O Level · 2021", grade: "A*", image: "/assets/students/apurva.jpg" },
  { name: "Maida Naz", meta: "O Level · 2023", grade: "A*", image: "/assets/students/maida.jpg" },
  { name: "Farhan Ahmad", meta: "99 marks · 2023", grade: "A*", image: "/assets/students/farhan.jpeg" },
  { name: "Raiyat Karim", meta: "O Level · 2025", grade: "A*", image: "/assets/students/Raiyat.jpg" },
  { name: "Akib Azwad", meta: "O Level · 2025", grade: "A*", image: "/assets/students/Akib.png" },
  { name: "Ayoka Paul", meta: "O Level · 2023", grade: "A", image: "/assets/students/ayoka.jpg" },
  { name: "Suprova Barua", meta: "O Level · 2025", grade: "89%", image: "/assets/students/suprova.png" },
];

export type Testimonial = {
  name: string;
  grade: string;
  year: string;
  quote: string;
  image: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Prioman",
    grade: "A*",
    year: "O Level 2023",
    image: "/assets/students/prioman.jpg",
    quote:
      "Rofsan Sir's detailed feedback and targeted mock exams gave me the clarity I needed. His positive, interactive environment motivated me to reach my full potential.",
  },
  {
    name: "Ayoka Paul",
    grade: "A",
    year: "O Level 2023",
    image: "/assets/students/ayoka.jpg",
    quote:
      "Joined for only 6 months before O Levels and still scored an A. Sir's concise notes and cheat sheets made all the difference.",
  },
  {
    name: "Apurva Sahil",
    grade: "A*",
    year: "O Level 2021",
    image: "/assets/students/apurva.jpg",
    quote:
      "Rofsan Sir's deep understanding of marking schemes and exam strategies sets him apart. Essay writing became my strength within a year.",
  },
  {
    name: "Maida Naz",
    grade: "A*",
    year: "O Level 2023",
    image: "/assets/students/maida.jpg",
    quote:
      "Regular mock tests and constructive feedback helped me improve exactly where needed. His structured approach builds real confidence.",
  },
  {
    name: "Raiyat Karim",
    grade: "A*",
    year: "O Level 2025",
    image: "/assets/students/Raiyat.jpg",
    quote:
      "Teaching through stories helped me remember concepts naturally. His honest feedback helped me organize my ideas effectively.",
  },
  {
    name: "Akib Azwad",
    grade: "A*",
    year: "O Level 2025",
    image: "/assets/students/Akib.png",
    quote:
      "Even with moderate attention, his notes covered everything. Classes felt like engaging stories   he truly simplifies complex topics.",
  },
  {
    name: "Suprova Barua",
    grade: "89%",
    year: "O Level 2025",
    image: "/assets/students/suprova.png",
    quote:
      "Bangla changed from my most feared subject to favorite. His calming classes and cultural stories made learning enjoyable.",
  },
  {
    name: "Farhan Ahmad",
    grade: "A* · 99 marks",
    year: "CAIE O Level 2023",
    image: "/assets/students/farhan.jpeg",
    quote:
      "Achieved 99 marks with Sir's guidance. Regular mocks and past-paper discussions improved my understanding consistently.",
  },
];

/** Gallery carousel   alternating class banners and classroom shots. */
export const gallery: { src: string; alt: string }[] = [
  { src: "/assets/class-banner/ClassVIII.jpg", alt: "Class VIII batch at Rofsan Sir" },
  { src: "/assets/teacher/2.jpg", alt: "Classroom session with Rofsan Sir" },
  { src: "/assets/class-banner/ClassIX.jpg", alt: "Class IX batch at Rofsan Sir" },
  { src: "/assets/teacher/3.jpg", alt: "Rofsan Sir teaching O Level Bengali" },
  { src: "/assets/class-banner/ClassX.jpg", alt: "Class X batch at Rofsan Sir" },
  { src: "/assets/teacher/5.jpg", alt: "Exam-focused classroom at Rofsan Sir" },
];

/** "Meet your teacher" video teaser. (Swap videoId anytime.) */
export const aboutTeaser = {
  eyebrow: "Meet Your Teacher",
  title: "Learn from the examiner's lens",
  body:
    "Rofsan Sir is a CAIE-trained educator and CAIE-approved O Level Bengali Examiner with 9+ years guiding English-medium students to A* and A.",
  videoId: "tAlxNZrj7xU", // "Why do students miss the A* in O Level Bangla?"
  poster: "/assets/teacher/intro-poster.png",
};
