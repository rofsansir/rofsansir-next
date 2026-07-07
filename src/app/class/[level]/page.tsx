import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, GraduationCap, Laptop, MapPin } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Container, ShimmerText } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { classModes, programs, type Program } from "@/data/programs";

const LEVELS = ["8", "9", "10"] as const;
type Level = (typeof LEVELS)[number];

const levelMap: Record<Level, Program> = {
  "8": programs[0],
  "9": programs[1],
  "10": programs[2],
};

const levelName: Record<Level, string> = {
  "8": "Class VIII",
  "9": "Class IX",
  "10": "Class X",
};

export function generateStaticParams() {
  return LEVELS.map((level) => ({ level }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ level: string }>;
}): Promise<Metadata> {
  return (async () => {
    const { level } = await params;
    const prog = levelMap[level as Level];
    if (!prog) return { title: "Not found" };
    return {
      title: `${prog.title} — ${levelName[level as Level]}`,
      description: `${prog.title} (${levelName[level as Level]}): ${prog.features.join(", ")}. ${prog.type}, ${prog.duration}.`,
      alternates: { canonical: `/class/${level}` },
      openGraph: {
        title: `${prog.title} (${levelName[level as Level]}) · Rofsan Sir`,
        description: `${prog.type} · ${prog.duration}. ${prog.features.join(", ")}.`,
        url: `${site.url}/class/${level}`,
      },
    };
  })();
}

const accentRing: Record<Program["accent"], string> = {
  marigold: "bg-marigold/15 text-marigold-deep",
  plum: "bg-cream/10 text-marigold-soft",
  teal: "bg-teal/10 text-teal",
};

export default async function ClassPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  const prog = levelMap[level as Level];
  if (!prog) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${prog.title} — ${levelName[level as Level]}`,
    description: prog.features.join(", "),
    provider: { "@type": "EducationalOrganization", name: site.legalName, url: site.url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow={`${levelName[level as Level]} · ${prog.type}`}
        title={
          <>
            {prog.title} <ShimmerText>program</ShimmerText>
          </>
        }
        subtitle={`A ${prog.duration.toLowerCase()}, ${prog.type.toLowerCase()} program designed for ${levelName[level as Level]} students preparing for Cambridge & Edexcel O Level Bengali.`}
      >
        <div className="flex flex-wrap gap-3 pt-2">
          <Button href={site.contact.whatsapp} external size="lg">
            Enquire about this batch
          </Button>
          <Button href="/courses" variant="outline" size="lg">
            All Courses
          </Button>
        </div>
      </PageHero>

      <section className="px-4 py-10 md:py-16">
        <Container className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <Reveal>
            <div className="rounded-[1.75rem] border border-ink/10 bg-paper/70 p-6 shadow-sm md:p-8">
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-2xl",
                    accentRing[prog.accent],
                  )}
                >
                  <GraduationCap className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="font-display text-xl font-bold text-ink">
                    What you&apos;ll learn
                  </h2>
                  <p className="text-sm text-muted">
                    {levelName[level as Level]} · {prog.type} · {prog.duration}
                  </p>
                </div>
              </div>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {prog.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 rounded-xl bg-cream p-3 text-sm text-ink/80"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-marigold" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col gap-4 rounded-[1.75rem] border border-ink/10 bg-paper/70 p-6 shadow-sm">
              <h3 className="font-display text-lg font-bold text-ink">
                Choose your mode
              </h3>
              {classModes.map((m) => (
                <div key={m.title} className="rounded-xl bg-cream p-4">
                  <div className="flex items-center gap-2 text-ink">
                    {m.title === "Offline" ? (
                      <MapPin className="h-4 w-4 text-marigold-deep" />
                    ) : (
                      <Laptop className="h-4 w-4 text-marigold-deep" />
                    )}
                    <span className="font-semibold">{m.title}</span>
                    <span className="text-xs text-muted">· {m.subtitle}</span>
                  </div>
                  <p className="mt-1.5 text-xs text-muted">{m.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="px-4 pb-16 md:pb-24">
        <Container>
          <div className="flex flex-col items-center gap-5 rounded-[2rem] bg-gradient-to-br from-plum via-plum-2 to-ink p-8 text-center text-cream shadow-luxe md:p-12">
            <h2 className="text-balance text-2xl font-extrabold tracking-tight md:text-3xl">
              Join the {levelName[level as Level]} batch
            </h2>
            <p className="max-w-xl text-cream/70">
              Book a free consultation with Rofsan Sir to secure your place.
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
