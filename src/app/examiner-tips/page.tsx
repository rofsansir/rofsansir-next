import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock, Play } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Container, SectionHeading, ShimmerText } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { videos, videoThumb, videoUrl } from "@/data/videos";
import { articles } from "@/data/tip-articles";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Examiner Tips & Videos",
  description:
    "O Level Bengali examiner insights, paper strategies and last-minute tips from Rofsan Sir. Watch the videos and read the guidance.",
  alternates: { canonical: "/examiner-tips" },
  openGraph: {
    title: "Examiner Tips & Videos · Rofsan Sir",
    description:
      "Examiner-led O Level Bengali tips, paper strategies and video lessons.",
    url: `${site.url}/examiner-tips`,
  },
};

export default function ExaminerTipsPage() {
  return (
    <>
      <PageHero
        eyebrow="Examiner Insights"
        title={
          <>
            Tips from the <ShimmerText>examiner's desk</ShimmerText>
          </>
        }
        subtitle="Step behind the marking scheme. Watch Rofsan Sir break down papers, strategy and the mistakes that cost grades."
      />

      {/* Featured video */}
      <section className="px-4 py-6">
        <Container>
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border-4 border-paper bg-ink shadow-luxe">
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src="https://www.youtube-nocookie.com/embed/tAlxNZrj7xU?rel=0"
                title="Why do students miss the A* in O Level Bangla?"
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Video grid */}
      <section className="px-4 py-12 md:py-16">
        <Container>
          <SectionHeading
            eyebrow="Watch"
            title="Examiner video lessons"
            description="Paper-by-paper strategy, comprehension technique and exam-day tips."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v, i) => (
              <Reveal key={v.id} delay={(i % 3) * 0.06}>
                <a
                  href={videoUrl(v.videoId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-[1.5rem] border border-ink/10 bg-paper/70 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-card"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-ink">
                    <Image
                      src={videoThumb(v.videoId)}
                      alt={v.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-ink/30 transition-colors group-hover:bg-ink/10">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-marigold text-ink shadow-luxe transition-transform group-hover:scale-110">
                        <Play className="ml-0.5 h-6 w-6" fill="currentColor" />
                      </span>
                    </div>
                    <span className="absolute right-2 top-2 rounded-full bg-ink/80 px-2 py-0.5 text-[10px] font-semibold text-cream backdrop-blur">
                      {v.duration}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-marigold-deep">
                      {v.category}
                    </p>
                    <h3 className="mt-1.5 line-clamp-2 font-semibold leading-snug text-ink">
                      {v.title}
                    </h3>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Topics we cover */}
      <section className="bg-paper/60 px-4 py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="On the Blog"
            title={
              <>
                Topics we <ShimmerText>cover</ShimmerText>
              </>
            }
            description="In-depth articles by Rofsan Sir - exam strategy, paper guides and the parent perspective."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
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
