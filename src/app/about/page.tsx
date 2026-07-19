import type { Metadata } from "next";
import { BadgeCheck, GraduationCap, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import {
  Container,
  SectionHeading,
  SectionNumber,
  ShimmerText,
} from "@/components/ui/primitives";
import { AboutHero } from "@/components/about/about-hero";
import { ExperienceCard } from "@/components/about/experience-card";
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

const experience = [
  {
    Icon: BadgeCheck,
    title: "Cambridge Approved Examiner of Bengali 3204",
    meta: "Cambridge Assessment International Education",
    featured: true,
  },
  {
    Icon: School,
    title: "Oxford International School (OIS)",
    subtitle: "Main Campus, Dhanmondi, Dhaka",
    meta: "Senior Faculty of Bengali",
  },
  {
    Icon: School,
    title: "European Standard School (ESS)",
    subtitle: "Main Campus, Dhanmondi, Dhaka",
    meta: "Lead Teacher, Bengali Department",
  },
];

const education = [
  {
    Icon: GraduationCap,
    title: "Master of Arts (M.A.) in Bengali",
    subtitle: "University of Chittagong",
  },
  {
    Icon: GraduationCap,
    title: "Bachelor of Arts (Honours) in Bengali",
    subtitle: "University of Chittagong",
  },
];

const certificates: Certificate[] = [
  {
    src: "/assets/about/cambridge-caie-certificate.jpg",
    width: 848,
    height: 1200,
    title: "Cambridge Approved Examiner of Bengali 3204",
    issuer: "Cambridge Assessment International Education",
    featured: true,
  },
  {
    src: "/assets/about/bangla-olympiad-coordinator-certificate.jpg",
    width: 1200,
    height: 871,
    title: "Bangla Olympiad Coordinator's Certificate",
    issuer: "Oxford International School",
  },
  {
    src: "/assets/about/oxford-international-efficiency-award.jpg",
    width: 1200,
    height: 886,
    title: "High-Efficiency Award",
    issuer: "Oxford International School",
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

      {/* Background: Teaching Experience + Educational Background */}
      <section className="px-4 py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Background"
            title="Teaching experience"
            align="center"
            className="mx-auto items-center"
          />
          <div className="mx-auto mt-10 max-w-3xl">
            {experience
              .filter((e) => e.featured)
              .map(({ Icon, title, subtitle, meta, featured }) => (
                <Reveal key={title} className="mx-auto mb-4 w-full max-w-full sm:w-fit">
                  <ExperienceCard
                    icon={<Icon className="h-4 w-4" />}
                    title={title}
                    subtitle={subtitle}
                    meta={meta}
                    featured={featured}
                  />
                </Reveal>
              ))}
            <div className="grid gap-4 sm:grid-cols-2">
              {experience
                .filter((e) => !e.featured)
                .map(({ Icon, title, subtitle, meta }, i) => (
                  <Reveal key={title} delay={(i % 3) * 0.06}>
                    <ExperienceCard
                      icon={<Icon className="h-4 w-4" />}
                      title={title}
                      subtitle={subtitle}
                      meta={meta}
                    />
                  </Reveal>
                ))}
            </div>
          </div>

          <SectionHeading
            title="Educational background"
            align="center"
            className="mx-auto mt-14 items-center md:mt-20"
          />
          <div className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-2">
            {education.map(({ Icon, title, subtitle }, i) => (
              <Reveal key={title} delay={(i % 3) * 0.06}>
                <div className="flex h-full items-start gap-3 rounded-2xl border border-ink/10 bg-paper/70 p-4 shadow-sm transition-shadow hover:shadow-card">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-marigold/10 text-marigold-deep">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-sm font-bold leading-snug text-ink">
                      {title}
                    </p>
                    <p className="mt-0.5 text-xs leading-snug text-muted">
                      {subtitle}
                    </p>
                  </div>
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
                Why Rofsan Sir&rsquo;s Students{" "}
                <ShimmerText>Stand Out</ShimmerText>
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
