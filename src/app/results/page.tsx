import type { Metadata } from "next";
import Image from "next/image";
import { Award, Quote, Star } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Container, SectionHeading, ShimmerText } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { achievers, testimonials } from "@/data/home";

export const metadata: Metadata = {
  title: "Results   Hall of Fame",
  description:
    "Real students, real grades. Meet the A* and A achievers who mastered O Level Bengali with Rofsan Sir.",
  alternates: { canonical: "/results" },
  openGraph: {
    title: "Hall of Fame · Rofsan Sir",
    description:
      "Real students, real results   the A* and A achievers of Rofsan Sir.",
    url: `${site.url}/results`,
  },
};

const stats = [
  { value: "3,000+", label: "Students mentored" },
  { value: "8+", label: "Years teaching" },
  { value: "98%", label: "A* & A success" },
  { value: "5", label: "Published books" },
];

export default function ResultsPage() {
  const featured = testimonials.slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow="Hall of Fame"
        title={
          <>
            Real students, <ShimmerText>real grades</ShimmerText>
          </>
        }
        subtitle="The faces behind the results. Every name below is a student who sat the CAIE or Edexcel O Level Bengali exam under Rofsan Sir's guidance."
      />

      {/* Stats */}
      <section className="px-4 pb-4">
        <Container>
          <div className="grid grid-cols-2 gap-3 rounded-[1.75rem] border border-ink/10 bg-paper/70 p-6 shadow-sm md:grid-cols-4 md:p-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl font-extrabold text-ink md:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Achievers grid */}
      <section className="px-4 py-12 md:py-16">
        <Container>
          <SectionHeading
            eyebrow="A* Achievers"
            title="The faces behind the grades"
            description="Grades shown are as reported by each student for their O Level Bengali examination."
          />
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {achievers.map((a, i) => (
              <Reveal key={a.name} delay={(i % 4) * 0.05}>
                <figure className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-ink/10 shadow-card">
                  <Image
                    src={a.image}
                    alt={a.name}
                    fill
                    sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 22vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
                  <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-marigold px-2.5 py-1 text-xs font-bold text-ink shadow-card">
                    <Award className="h-3.5 w-3.5" />
                    {a.grade}
                  </span>
                  <figcaption className="absolute inset-x-0 bottom-0 p-4">
                    <p className="font-display text-base font-bold text-cream">
                      {a.name}
                    </p>
                    <p className="text-xs text-cream/70">{a.meta}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured voices */}
      <section className="bg-paper/60 px-4 py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="In Their Words"
            title={
              <>
                Loved by students &amp; <ShimmerText>parents</ShimmerText>
              </>
            }
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {featured.map((t, i) => (
              <Reveal key={t.name} delay={(i % 2) * 0.06}>
                <figure className="flex h-full flex-col rounded-[1.5rem] border border-ink/10 bg-cream p-6 shadow-sm">
                  <Quote className="h-7 w-7 text-marigold/40" />
                  <blockquote className="mt-3 flex-1 text-ink/85">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-ink/5 pt-4">
                    <span className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-paper">
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-ink">{t.name}</p>
                      <p className="text-xs text-muted">
                        {t.grade} · {t.year}
                      </p>
                    </div>
                    <div className="ml-auto flex gap-0.5 text-marigold">
                      {Array.from({ length: 5 }).map((_, k) => (
                        <Star key={k} className="h-3.5 w-3.5" fill="currentColor" />
                      ))}
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 md:py-24">
        <Container>
          <div className="flex flex-col items-center gap-5 rounded-[2rem] bg-gradient-to-br from-plum via-plum-2 to-ink p-8 text-center text-cream shadow-luxe md:p-12">
            <h2 className="text-balance text-2xl font-extrabold tracking-tight md:text-3xl">
              Ready to add your name here?
            </h2>
            <p className="max-w-xl text-cream/70">
              Book a free consultation and start your path to A* in O Level
              Bengali.
            </p>
            <Button href={site.contact.whatsapp} external size="lg">
              WhatsApp Rofsan Sir
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
