import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Container, ShimmerText } from "@/components/ui/primitives";
import { VideoPlayer } from "@/components/videos/video-player";
import { videoThumb } from "@/data/videos";
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

  const jsonLd = videos.length > 0 && {
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
            Video <ShimmerText>Library</ShimmerText>
          </>
        }
        subtitle="Browse lessons, examiner insights, study techniques, and preparation resources, all in one place."
      />

      <section className="px-4 pb-16">
        <Container>
          <VideoPlayer videos={videos} />
        </Container>
      </section>
    </>
  );
}
