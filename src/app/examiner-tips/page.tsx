import type { Metadata } from "next";
import Image from "next/image";
import { Clock } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Container, ShimmerText } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { HoverCard } from "@/components/ui/hover-card";
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
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 0.06}>
                <HoverCard
                  href={`/examiner-tips/${a.slug}`}
                  className="flex flex-col rounded-[1.5rem] bg-cream"
                >
                  <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden">
                    <Image
                      src={a.thumb}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-marigold/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-plum shadow-sm">
                      {a.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5 p-5">
                    <span className="flex items-center gap-1 text-[11px] text-muted">
                      <Clock className="h-3 w-3" />
                      {a.readTime}
                    </span>
                    <h3 className="font-display text-base font-bold leading-snug text-ink">
                      {a.title}
                    </h3>
                    {a.subtitle && (
                      <p className="line-clamp-2 text-sm text-muted">
                        {a.subtitle}
                      </p>
                    )}
                  </div>
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
