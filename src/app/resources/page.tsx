import type { Metadata } from "next";
import { Download, FileText } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Container, SectionHeading, ShimmerText } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { resources, resourceHref } from "@/data/resources";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resources — Free O Level Bengali Downloads",
  description:
    "Free O Level Bengali study PDFs by Rofsan Sir — letter & report formats, essays, idioms, shor shondhi formulas, comprehension and sentence transformation.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Free Resources · Rofsan Sir",
    description:
      "Download free O Level Bengali study PDFs — letters, essays, grammar, comprehension.",
    url: `${site.url}/resources`,
  },
};

const categories = [
  "Letters & Reports",
  "Essays",
  "Vocabulary",
  "Grammar",
  "Comprehension",
] as const;

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Free Resources"
        title={
          <>
            Download &amp; <ShimmerText>learn</ShimmerText>
          </>
        }
        subtitle="A growing library of free O Level Bengali study PDFs — formats, formulas, essays and practice, all written by Rofsan Sir."
      />

      {categories.map((cat) => {
        const items = resources.filter((r) => r.category === cat);
        if (!items.length) return null;
        return (
          <section key={cat} className="px-4 py-10 md:py-14">
            <Container>
              <SectionHeading eyebrow={cat} title={cat} />
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((r, i) => (
                  <Reveal key={r.file} delay={(i % 3) * 0.05}>
                    <a
                      href={resourceHref(r.file)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full items-start gap-4 rounded-[1.5rem] border border-ink/10 bg-paper/70 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-marigold/40 hover:shadow-card"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-marigold/15 text-marigold-deep transition-colors group-hover:bg-marigold group-hover:text-ink">
                        <FileText className="h-6 w-6" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3
                          className={`font-semibold leading-snug text-ink ${
                            r.bengali ? "font-bengali" : ""
                          }`}
                        >
                          {r.title}
                        </h3>
                        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted">
                          PDF · {r.category}
                        </p>
                      </div>
                      <Download className="mt-1 h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-marigold-deep" />
                    </a>
                  </Reveal>
                ))}
              </div>
            </Container>
          </section>
        );
      })}

      {/* CTA */}
      <section className="px-4 py-16 md:py-24">
        <Container>
          <div className="flex flex-col items-center gap-5 rounded-[2rem] border border-ink/10 bg-paper/70 p-8 text-center shadow-sm md:p-12">
            <h2 className="text-balance text-2xl font-extrabold tracking-tight md:text-3xl">
              Want the full <ShimmerText>guidance</ShimmerText>?
            </h2>
            <p className="max-w-xl text-muted">
              These free PDFs are a start. Join a batch for examiner-led
              mentorship, weekly script checks and mock marathons.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button href="/courses" size="lg">
                Explore Courses
              </Button>
              <Button href={site.contact.whatsapp} external variant="outline" size="lg">
                WhatsApp Rofsan Sir
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
