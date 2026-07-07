import Image from "next/image";
import { Container, Eyebrow, SectionNumber } from "@/components/ui/primitives";
import { InfiniteTrack } from "@/components/ui/infinite-track";
import { gallery } from "@/data/home";

/** Infinite, drag-scrollable gallery. */
export function Gallery() {
  return (
    <section id="gallery" className="py-16 md:py-24">
      <Container>
        <div className="flex flex-col gap-3">
          <Eyebrow>Snapshots from Class</Eyebrow>
          <div className="flex items-center gap-4">
            <SectionNumber>03</SectionNumber>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
              Gallery
            </h2>
          </div>
        </div>
      </Container>

      <InfiniteTrack
        className="mt-8 px-4 md:px-6"
        trackClassName="gap-4"
        speed={0.5}
      >
        {gallery.map((g, i) => (
          <figure
            key={i}
            className="group relative aspect-[4/3] w-[80vw] shrink-0 overflow-hidden rounded-3xl border border-ink/10 shadow-card sm:w-[26rem]"
          >
            <Image
              src={g.src}
              alt={g.alt}
              fill
              sizes="(max-width: 640px) 80vw, 26rem"
              draggable={false}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </figure>
        ))}
      </InfiniteTrack>

      <Container>
        <p className="mt-4 text-center text-xs text-muted">
          Drag to explore · auto-scrolls continuously
        </p>
      </Container>
    </section>
  );
}
