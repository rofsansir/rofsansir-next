import type { Metadata } from "next";
import {
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Laptop,
  MapPin,
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Container, SectionHeading, ShimmerText } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverIcon } from "@/components/ui/hover-card";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { classModes, curriculum, courses } from "@/data/courses";

export const metadata: Metadata = {
  title: "Courses & Admission",
  description:
    "O Level Bengali batches for Class VIII (Foundation), IX (Regular) and X (Exam Focused), online & offline at Lalmatia, Dhaka. Aligned with syllabus 3204.",
  alternates: { canonical: "/courses" },
  openGraph: {
    title: "Courses & Admission · Rofsan Sir",
    description:
      "O Level Bengali batches for Class VIII, IX and X, online & offline, aligned with syllabus 3204.",
    url: `${site.url}/courses`,
  },
};

const accentRing: Record<string, string> = {
  marigold: "text-marigold-deep bg-marigold/15",
  plum: "text-marigold-soft bg-cream/10",
  teal: "text-teal bg-teal/10",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "O Level Bengali (3204)",
  description:
    "Specialised Cambridge O Level Bengali (3204) preparation for English-medium students.",
  provider: {
    "@type": "EducationalOrganization",
    name: site.legalName,
    url: site.url,
  },
  inLanguage: ["en", "bn"],
  teaches: "Cambridge O Level Bengali 3204",
};

export default function CoursesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Programs"
        title={
          <>
            O Level Bengali <ShimmerText>Courses</ShimmerText>
          </>
        }
        subtitle="Examiner-led O Level Bengali (3204). Class VIII, IX and X, online or at our Lalmatia, Dhaka campus."
        image={{
          src: "/assets/courses/classroom-exam.jpg",
          alt: "Students writing an exam in the Lalmatia classroom",
        }}
      />

      {/* Programs */}
      <section id="programs" className="px-4 py-16 md:py-24">
        <Container>
          <SectionHeading eyebrow="Our Programs" title="A batch for every stage" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {courses.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <HoverCard className="flex flex-col rounded-[1.75rem] p-6">
                  <HoverIcon
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-2xl",
                      accentRing[p.accent],
                    )}
                  >
                    <GraduationCap className="h-5 w-5" />
                  </HoverIcon>
                  <h3 className="mt-5 font-display text-xl font-bold text-ink">
                    {p.title}
                  </h3>
                  <p className="text-sm font-semibold text-marigold-deep">
                    {p.batch} · {p.type}
                  </p>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-sm text-ink/80"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-marigold" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-2">
                    <Button
                      href={`${site.contact.whatsapp}?text=${encodeURIComponent(
                        `Hi Rofsan Sir, I'd like to know more about the ${p.title} (${p.batch}).`,
                      )}`}
                      external
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      Enquire about this batch
                    </Button>
                  </div>
                </HoverCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Curriculum */}
      <section className="bg-paper/60 px-4 py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Curriculum"
            title={
              <>
                Structured for <ShimmerText>exam success</ShimmerText>
              </>
            }
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {curriculum.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06}>
                <HoverCard className="flex flex-col rounded-[1.75rem] bg-cream p-6">
                  <h3 className="font-display text-lg font-bold text-ink">{c.title}</h3>
                  <ul className="mt-4 flex flex-1 flex-col gap-2.5">
                    {c.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-start gap-2.5 text-sm text-ink/80"
                      >
                        <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-marigold-deep" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-[11px] font-bold uppercase tracking-widest text-muted">
                    Code · {c.code}
                  </p>
                </HoverCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Class modes */}
      <section className="px-4 py-16 md:py-24">
        <Container>
          <SectionHeading eyebrow="How You Learn" title="Offline or online" />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {classModes.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.06}>
                <HoverCard className="flex flex-col rounded-[1.75rem] p-6">
                  <div className="flex items-center gap-3">
                    <HoverIcon className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-marigold/15 text-marigold-deep">
                      {m.title === "Offline" ? (
                        <MapPin className="h-5 w-5" />
                      ) : (
                        <Laptop className="h-5 w-5" />
                      )}
                    </HoverIcon>
                    <div>
                      <h3 className="font-display text-lg font-bold text-ink">
                        {m.title}
                      </h3>
                      <p className="text-sm text-muted">{m.subtitle}</p>
                    </div>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {m.points.map((pt) => (
                      <li
                        key={pt}
                        className="rounded-full bg-ink/5 px-3 py-1 text-xs font-medium text-ink/70"
                      >
                        {pt}
                      </li>
                    ))}
                  </ul>
                </HoverCard>
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
              Secure your <ShimmerText>spot</ShimmerText>
            </h2>
            <p className="max-w-xl text-muted">
              Book a free consultation to find the right batch.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button href={site.contact.whatsapp} external size="lg">
                WhatsApp Rofsan Sir
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Visit the Campus
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
