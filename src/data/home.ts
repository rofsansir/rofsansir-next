/** Homepage content (hero, ticker, boards, gallery, students, testimonials, teaser). */

export const heroStats: string[] = [
  "9+ Years Experience",
  "2,200+ Students Mentored",
  "Author of O Level Bengali Book Series",
  "98% A* & A Success Rate",
];

export const heroTypewriter: string[] = [
  "Learn from a CAIE O Level Bengali Examiner",
  "Trusted by 2,200+ English-medium students",
  "Author of the O Level Bengali Book Series",
  "Making A* achievable through the right guidance",
];

export const tickerItems: string[] = [
  "A*",
  "99 marks",
  "2,200+ students",
  "Cambridge Examiner",
  "Author of the O Level Bengali Book Series",
  "9+ years",
  "Cambridge Assessment Specialist"
];

export const boards: { name: string; logo: string }[] = [
  { name: "Cambridge (CAIE)", logo: "/logos/cambridge-logo.png" },
  { name: "Elites", logo: "/logos/ELITES.png" },
];

/** Hall of Fame   top achievers. */
export type Achiever = {
  name: string;
  meta: string;
  grade: string;
  image: string;
};

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

export type GalleryItem = { src: string; alt: string; title: string };

/**
 * "Meet your teacher" video teaser. (Swap videoId anytime.) Poster is YouTube's own
 * auto-generated thumbnail (see YouTubeThumbnail) - no image to keep in sync here.
 */
export const aboutTeaser = {
  eyebrow: "Examiners perspective",
  title: "What examiners look for",
  videoId: "Iv5xhoq6cAk",
};
