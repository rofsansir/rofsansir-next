import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  BookOpenCheck,
  ClipboardList,
  Layers,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { BlobField } from "@/components/ui/blob-field";
import {
  Container,
  Eyebrow,
  SectionHeading,
  ShimmerText,
  Starburst,
} from "@/components/ui/primitives";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Rofsan Sir",
  description:
    "Meet Rofsan Khan — a CAIE-approved O Level Bengali Examiner, published author and educator with 8+ years guiding English-medium students to A* and A in Cambridge & Edexcel Bengali.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Rofsan Sir",
    description:
      "Meet Rofsan Khan — CAIE-approved O Level Bengali Examiner, published author, and educator with 8+ years of experience.",
    url: `${site.url}/about`,
    type: "website",
  },
};

const stats = [
  { value: "8+", label: "Years teaching" },
  { value: "3,000+", label: "Students mentored" },
  { value: "98%", label: "A* & A success" },
  { value: "5", label: "Published books" },
];

const roleBadges = ["Bengali Educator", "Examiner", "Published Author", "CAIE-Certified"];

const method = [
  { Icon: Layers, text: "Strong foundations before exam-focused preparation" },
  { Icon: ClipboardList, text: "Most practice completed during class" },
  { Icon: Users, text: "Specially designed for English-medium students" },
  { Icon: BookOpen, text: "Concept-based learning, not memorisation" },
  { Icon: TrendingUp, text: "Confidence-building that removes the fear of Bengali" },
  { Icon: BookOpenCheck, text: "Exam-focused guidance on real marking standards" },
];

const authorityChips = [
  "CAIE Specialist",
  "Assessment Specialist",
  "Examiner Insight",
  "Result Focused",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.author.fullName,
  jobTitle: site.author.role,
  url: `${site.url}/about`,
  image: `${site.url}/assets/teacher/1.jpg`,
  worksFor: { "@type": "EducationalOrganization", name: site.legalName },
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of Dhaka" },
  knowsAbout: ["O Level Bengali", "Cambridge CAIE", "CAIE Subject 3204", "Pearson Edexcel"],
  award: "CAIE-Approved O Level Bengali Examiner",
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

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-12 pt-28 md:pb-20 md:pt-36">
        <BlobField />
        <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-paper/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted shadow-sm backdrop-blur">
              <ShieldCheck className="h-4 w-4 text-marigold-deep" />
              Expert O Level Bengali Educator
            </span>

            <h1 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              Meet your <ShimmerText>Bengali</ShimmerText> Teacher
            </h1>

            <p className="text-base font-semibold text-plum md:text-lg">
              Bengali Educator · Examiner · Published Author
            </p>

            <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg">
              Rofsan Sir is a CAIE-trained educator and CAIE-approved O Level
              Bengali Examiner with over eight years of experience teaching O
              Level Bengali in English-medium academic settings. He is widely
              respected for his clear, structured, and student-friendly teaching
              approach — helping learners, especially those who struggle or feel
              anxious about Bengali, build confidence and achieve consistent
              examination success.
            </p>

            <div className="flex flex-wrap gap-2">
              {roleBadges.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-ink/10 bg-paper px-3 py-1.5 text-xs font-semibold text-ink/80"
                >
                  {b}
                </span>
              ))}
            </div>

            <div className="grid w-full max-w-lg grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-ink/10 bg-paper/70 p-3 text-center shadow-sm"
                >
                  <p className="font-display text-2xl font-extrabold text-ink">
                    {s.value}
                  </p>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Portrait */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
            <Starburst className="absolute -right-6 -top-6 h-20 w-20 text-marigold/30" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.4rem] border-4 border-paper shadow-luxe">
              <Image
                src="/assets/teacher/1.jpg"
                alt="Rofsan Sir, CAIE O Level Bengali Examiner"
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 30rem"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-ink/10 bg-paper/95 px-4 py-2 shadow-card backdrop-blur">
              <Star className="h-4 w-4 fill-marigold text-marigold" />
              <span className="text-sm font-bold text-ink">
                CAIE-Approved Examiner
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* The method */}
      <section className="px-4 py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="The Method"
            title={
              <>
                Why students score <ShimmerText>A&#42;</ShimmerText> with Rofsan
                Sir
              </>
            }
            description="Six principles behind the consistent results — a philosophy built for English-medium learners aiming for the top grades."
            align="center"
            className="mx-auto items-center"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {method.map(({ Icon, text }, i) => (
              <Reveal key={text} delay={(i % 3) * 0.06}>
                <div className="flex h-full items-start gap-4 rounded-3xl border border-ink/10 bg-paper/70 p-5 shadow-sm transition-shadow hover:shadow-card">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-marigold/15 text-marigold-deep">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="font-medium leading-snug text-ink/90">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Academic authority (dark band) */}
      <section className="noise relative overflow-hidden bg-plum text-cream">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 top-0 h-72 w-72 rounded-full bg-marigold/15 blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-plum-3/40 blur-3xl" />
        </div>
        <Container className="relative py-16 md:py-24">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <Eyebrow dark>Academic Authority</Eyebrow>
            <h2 className="text-balance text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
              Examiner-led mentorship
            </h2>
            <p className="text-base leading-relaxed text-cream/70 md:text-lg">
              Learn from an experienced O Level examiner who teaches Bengali
              using simple explanations and modern techniques to help
              English-medium students achieve{" "}
              <span className="font-semibold text-marigold-soft">
                A&#42; &amp; A in O Level Bengali
              </span>
              .
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {authorityChips.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-cream/15 bg-cream/5 px-4 py-2 text-sm font-semibold text-cream/90"
                >
                  {c}
                </span>
              ))}
            </div>
            <Button href="/courses" variant="primary" size="lg" className="mt-2">
              Discover the courses <ArrowRight className="h-4 w-4" />
            </Button>
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
