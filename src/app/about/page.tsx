import type { Metadata } from "next";
import {
  Award,
  BadgeCheck,
  Briefcase,
  Building2,
  GraduationCap,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import {
  Container,
  SectionHeading,
  SectionNumber,
  ShimmerText,
} from "@/components/ui/primitives";
import { AboutHero } from "@/components/about/about-hero";
import {
  CertificateGallery,
  type Certificate,
} from "@/components/about/certificate-lightbox";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Rofsan Sir",
  description:
    "Meet Rofsan Khan   a CAIE-approved O Level Bengali Examiner, published author and educator with 9+ years guiding English-medium students to A* and A in Cambridge & Edexcel Bengali.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Rofsan Sir",
    description:
      "Meet Rofsan Khan   CAIE-approved O Level Bengali Examiner, published author, and educator with 9+ years of experience.",
    url: `${site.url}/about`,
    type: "website",
  },
};

const method = [
  {
    label: "Foundations before drills",
    text: "Grammar and sentence structure are locked in first; exam-timed practice only starts once the basics are solid.",
  },
  {
    label: "Practice happens in class",
    text: "Most exercises are worked through together in session, not left as unsupervised homework.",
  },
  {
    label: "Built for English-medium thinking",
    text: "Concepts are taught in English first, the way EM students actually process Bengali, not translated from a Bengali-medium textbook.",
  },
  {
    label: "Logic over memorisation",
    text: "Students learn why an answer is correct, so they can handle a question phrased differently, not just one they've seen before.",
  },
  {
    label: "Confidence before speed",
    text: "Low-pressure practice comes first; timed, exam-condition drills are introduced only once a concept feels natural.",
  },
  {
    label: "Marked against the real scheme",
    text: 'Every practice answer is checked against the actual CAIE marking criteria Rofsan Sir uses as an examiner, not a guess at what "sounds right."',
  },
];

/** Real, checkable facts - not marketing chips. */
const background = [
  { Icon: BadgeCheck, text: "CAIE O Level Bengali Examiner & Assessment Specialist (current)" },
  { Icon: GraduationCap, text: "Honours & Master's, Bengali Language and Literature, University of Chittagong" },
  { Icon: Award, text: "Cambridge Assessment International Education - O Level Bengali (3204) assessment training, Oct 2023" },
  { Icon: Briefcase, text: "Former Senior Faculty of Bengali, Oxford International School (2019-2024)" },
  { Icon: Building2, text: "Former Lead Teacher, Bengali Department, European Standard School" },
  { Icon: Trophy, text: "Bangla Olympiad Coordinator, Oxford International School - guided and accompanied students at the 12th Inter-School Bangla Olympiad, Feb 2023" },
];

const certificates: Certificate[] = [
  {
    src: "/assets/about/cambridge-caie-certificate.jpg",
    width: 848,
    height: 1200,
    title: "Certificate of Participation",
    issuer: "Cambridge Assessment International Education",
    date: "Oct 2023",
  },
  {
    src: "/assets/about/bangla-olympiad-coordinator-certificate.jpg",
    width: 1200,
    height: 871,
    title: "Bangla Olympiad Coordinator's Certificate",
    issuer: "Oxford International School",
    date: "Feb 2023",
  },
  {
    src: "/assets/about/oxford-international-efficiency-award.jpg",
    width: 1200,
    height: 886,
    title: "High-Efficiency Award",
    issuer: "Oxford International School",
    date: "2020-2021",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.author.fullName,
  jobTitle: site.author.role,
  url: `${site.url}/about`,
  image: `${site.url}/assets/teacher/1.jpg`,
  worksFor: { "@type": "EducationalOrganization", name: site.legalName },
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of Chittagong" },
  knowsAbout: ["O Level Bengali", "Cambridge CAIE", "CAIE Subject 3204", "Pearson Edexcel"],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certificate",
      name: "Cambridge O Level Bengali (3204) Assessment Training",
      recognizedBy: {
        "@type": "Organization",
        name: "Cambridge Assessment International Education",
      },
      dateCreated: "2023-10-31",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "award",
      name: "Bangla Olympiad Coordinator's Certificate",
      recognizedBy: { "@type": "Organization", name: "Oxford International School" },
      dateCreated: "2023-02-25",
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lalmatia",
    addressRegion: "Dhaka",
    addressCountry: "BD",
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <AboutHero />

      {/* Background (dark band) */}
      <section className="noise relative overflow-hidden bg-plum text-cream">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 top-0 h-72 w-72 rounded-full bg-marigold/15 blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-plum-3/40 blur-3xl" />
        </div>
        <Container className="relative py-16 md:py-24">
          <SectionHeading
            dark
            eyebrow="Background"
            title="Education and experience"
            description="A short record of where his experience comes from."
            align="center"
            className="mx-auto items-center"
          />
          <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
            {background.map(({ Icon, text }, i) => (
              <Reveal key={text} delay={(i % 3) * 0.06}>
                <div className="flex h-full items-start gap-3 rounded-2xl border border-cream/15 bg-cream/5 p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cream/10 text-marigold-soft">
                    <Icon className="h-4 w-4" />
                  </span>
                  <p className="text-sm leading-snug text-cream/90">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Certificates & Recognition */}
      <section className="px-4 py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Certificates & Recognition"
            title="Certificates and awards"
            description="A few of the certificates from Cambridge and the schools he's worked with."
            align="center"
            className="mx-auto items-center"
          />
          <div className="mt-10">
            <CertificateGallery certificates={certificates} />
          </div>
        </Container>
      </section>

      {/* The method */}
      <section className="bg-paper/60 px-4 py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="The Method"
            title={
              <>
                Why students score <ShimmerText>A&#42;</ShimmerText> with Rofsan
                Sir
              </>
            }
            align="center"
            className="mx-auto items-center"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {method.map(({ label, text }, i) => (
              <Reveal key={label} delay={(i % 3) * 0.06}>
                <div className="flex h-full flex-col gap-2 rounded-3xl border border-ink/10 bg-paper/70 p-5 shadow-sm transition-shadow hover:shadow-card">
                  <div className="flex items-center gap-3">
                    <SectionNumber className="text-3xl leading-none md:text-4xl">
                      {String(i + 1).padStart(2, "0")}
                    </SectionNumber>
                    <p className="font-display text-base font-bold leading-snug text-ink">
                      {label}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-ink/75">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 md:py-24">
        <Container>
          <div className="flex flex-col items-center gap-5 rounded-[2rem] border border-ink/10 bg-paper/70 p-8 text-center shadow-sm md:p-12">
            <h2 className="text-balance text-2xl font-extrabold tracking-tight md:text-3xl">
              Start your journey to <ShimmerText>A&#42;</ShimmerText>
            </h2>
            <p className="max-w-xl text-muted">
              Book a free consultation with Rofsan Sir and find the right batch
              for your child.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button href={site.contact.whatsapp} external size="lg">
                WhatsApp Rofsan Sir
              </Button>
              <Button href="/courses" variant="outline" size="lg">
                View Courses
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
