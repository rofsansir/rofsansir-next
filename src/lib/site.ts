/**
 * Single source of truth for site-wide config used across SEO metadata,
 * structured data, nav, footer, and CTAs.
 */
export const site = {
  name: "Rofsan Sir",
  legalName: "Rofsan Sir O Level Bengali",
  url: "https://rofsansir.com",
  tagline: "O Level Bengali with a CAIE Examiner",
  description:
    "Master O Level Bengali with CAIE Examiner Rofsan Sir. Hall of Fame, examiner tips, free CAIE 3204 past papers, and the O Level Bengali guidebook series   built for English-medium students aiming for A*.",
  subject: "Cambridge CAIE & Pearson Edexcel O Level Bengali (3204)",
  locale: "en_US",
  defaultOgImage: "/opengraph-image",

  author: {
    name: "Rofsan Khan",
    fullName: "Rofsan Almasum Khan",
    role: "CAIE O Level Bengali Examiner · Author · Educator",
  },

  address: {
    street: "House 8/12, Block B",
    area: "Lalmatia",
    city: "Dhaka",
    postal: "1207",
    country: "Bangladesh",
    lines: ["8/12, Block B, Lalmatia", "Dhaka-1207, Bangladesh"],
  },

  contact: {
    phonePrimary: "+880 1948-116595",
    phonePrimaryTel: "+8801948116595",
    phoneSecondary: "+880 1711-772662",
    email: "rofsankhan@gmail.com",
    whatsapp: "https://wa.me/8801948116595",
    hours: "Saturday–Thursday, 10:00 AM – 9:00 PM · Friday by appointment",
  },

  /** External admission form (legacy, used by "Start Learning" CTAs). */
  admissionUrl:
    "https://edutechs.app/s-online-admission?key=odLPMK4oh4Mus2Y8hXjis4YjTUX2",

  social: {
    facebook: "https://www.facebook.com/share/1BC8aNJyJx/",
    instagram: "https://www.instagram.com/rofsansirbengali",
    linkedin: "https://www.linkedin.com/in/rofsankhan",
    youtube: "https://www.youtube.com/@olevelbengali",
  },

  /** Site developer credit (footer). */
  craft: {
    name: "Revolop Technologies",
    url: "https://revolop.com",
  },
} as const;

/** Primary site navigation. Section pages are added as routes land. */
export const mainNav: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Results", href: "/results" },
  { label: "Books", href: "/books" },
  { label: "Examiner Tips", href: "/examiner-tips" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];
