import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Container, SectionHeading, ShimmerText } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { parentFaqs, studentFaqs } from "@/data/faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ - O Level Bengali Questions Answered",
  description:
    "Answers for students and parents on O Level Bengali: difficulty, English-medium learners, when to start, memorization, daily study time and more.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ · Rofsan Sir",
    description:
      "O Level Bengali FAQs for students and parents - difficulty, timing, memorization and more.",
    url: `${site.url}/faq`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [...studentFaqs, ...parentFaqs].map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.enSummary ? `${f.a} (${f.enSummary})` : f.a,
    },
  })),
};

function FaqItem({ q, a, enSummary }: { q: string; a: string; enSummary?: string }) {
  return (
    <details className="group rounded-2xl border border-ink/10 bg-paper/70 p-5 shadow-sm transition-colors hover:border-marigold/30">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
        <span>{q}</span>
        <ChevronDown className="h-5 w-5 shrink-0 text-marigold-deep transition-transform duration-300 group-open:rotate-180" />
      </summary>
      <div className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
        <p
          lang={enSummary ? "bn" : undefined}
          className={enSummary ? "whitespace-pre-line font-bengali text-ink/85" : "whitespace-pre-line"}
        >
          {a}
        </p>
        {enSummary && (
          <p className="rounded-xl bg-cream p-3 text-ink/70">
            <span className="font-semibold text-marigold-deep">In short: </span>
            {enSummary}
          </p>
        )}
      </div>
    </details>
  );
}

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Frequently Asked"
        title={
          <>
            Questions, <ShimmerText>answered</ShimmerText>
          </>
        }
        subtitle="Everything students and parents ask about O Level Bengali - difficulty, timing, memorization and how Rofsan Sir teaches."
      />

      <section className="px-4 py-10 md:py-16">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="For Students" title="Student questions" />
            <div className="mt-8 flex flex-col gap-3">
              {studentFaqs.map((f, i) => (
                <Reveal key={f.q} delay={(i % 2) * 0.05}>
                  <FaqItem {...f} />
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="For Parents" title="Parent questions" />
            <p className="mt-3 text-sm text-muted">
              বাংলা এবং English - answers in Bengali with a short English summary.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              {parentFaqs.map((f, i) => (
                <Reveal key={f.q} delay={(i % 2) * 0.05}>
                  <FaqItem {...f} />
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="px-4 py-16 md:py-24">
        <Container>
          <div className="flex flex-col items-center gap-5 rounded-[2rem] border border-ink/10 bg-paper/70 p-8 text-center shadow-sm md:p-12">
            <h2 className="text-balance text-2xl font-extrabold tracking-tight md:text-3xl">
              Still have a question?
            </h2>
            <p className="max-w-xl text-muted">
              WhatsApp Rofsan Sir directly - happy to help you and your child
              plan the right path.
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
