import type { Metadata } from "next";
import Image from "next/image";
import { Play } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Container, SectionHeading, ShimmerText } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { videoThumb, videoUrl } from "@/data/videos";
import { getVideos } from "@/lib/remote-content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Examiner Tip Videos",
  description:
    "Watch Rofsan Sir, a CAIE O Level Bengali examiner, break down paper strategy, comprehension technique and exam-day tips on video.",
  alternates: { canonical: "/video" },
  openGraph: {
    title: "Examiner Tip Videos · Rofsan Sir",
    description:
      "Examiner-led O Level Bengali video lessons - paper strategy, technique and exam-day tips.",
    url: `${site.url}/video`,
  },
};

export default async function VideoPage() {
  const videos = await getVideos();
  const [featured, ...rest] = videos;

  const jsonLd = featured && {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: videos.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "VideoObject",
        name: v.title,
        description: v.title,
        thumbnailUrl: videoThumb(v.videoId),
        embedUrl: `https://www.youtube-nocookie.com/embed/${v.videoId}`,
      },
    })),
  };

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <PageHero
        eyebrow="Watch & Learn"
        title={
          <>
            Examiner tip <ShimmerText>videos</ShimmerText>
          </>
        }
        subtitle="Step behind the marking scheme. Watch Rofsan Sir break down papers, strategy and the mistakes that cost grades."
      />

      {featured && (
        <section className="px-4 py-6">
          <Container>
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border-4 border-paper bg-ink shadow-luxe">
              <div className="aspect-video w-full">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${featured.videoId}?rel=0`}
                  title={featured.title}
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>
          </Container>
        </section>
      )}

      <section className="px-4 py-12 md:py-16">
        <Container>
          <SectionHeading
            eyebrow="Watch"
            title="All examiner video lessons"
            description="Paper-by-paper strategy, comprehension technique and exam-day tips."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((v, i) => (
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
    </>
  );
}
