import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Container, ShimmerText } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { getTipArticles } from "@/lib/remote-content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Examiner Tips",
  description:
    "O Level Bengali examiner insights, paper strategies and last-minute tips from Rofsan Sir.",
  alternates: { canonical: "/examiner-tips" },
  openGraph: {
    title: "Examiner Tips · Rofsan Sir",
    description: "Examiner-led O Level Bengali tips, paper strategies and exam guidance.",
    url: `${site.url}/examiner-tips`,
  },
};

export default async function ExaminerTipsPage() {
  const articles = await getTipArticles();

  return (
    <>
      <PageHero
        eyebrow="Examiner Insights"
        title={
          <>
            Tips from the <ShimmerText>examiner's desk</ShimmerText>
          </>
        }
        subtitle="Step behind the marking scheme. Rofsan Sir breaks down papers, strategy and the mistakes that cost grades."
      />

      {/* Articles */}
      <section className="bg-paper/60 px-4 py-16 md:py-24">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2">
            {articles.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 2) * 0.05}>
                <Link
                  href={`/examiner-tips/${a.slug}`}
                  className="group flex h-full items-start gap-4 rounded-[1.5rem] border border-ink/10 bg-cream p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-marigold/40 hover:shadow-card"
                >
                  <Image
                    src={a.thumb}
                    alt=""
                    width={64}
                    height={64}
                    className="h-16 w-16 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-marigold/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-marigold-deep">
                        {a.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-muted">
                        <Clock className="h-3 w-3" />
                        {a.readTime}
                      </span>
                    </div>
                    <h3 className="mt-2 font-semibold leading-snug text-ink">
                      {a.title}
                    </h3>
                    {a.subtitle && (
                      <p className="mt-1 line-clamp-2 text-sm text-muted">
                        {a.subtitle}
                      </p>
                    )}
                  </div>
                </Link>
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
              Have a specific question?
            </h2>
            <p className="max-w-xl text-muted">
              WhatsApp Rofsan Sir for personalized guidance on your O Level
              Bengali preparation.
            </p>
            <Button href={site.contact.whatsapp} external size="lg">
              Ask Rofsan Sir
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
