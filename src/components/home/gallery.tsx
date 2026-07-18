import Image from "next/image";
import { Container, Eyebrow, SectionNumber } from "@/components/ui/primitives";
import { InfiniteTrack } from "@/components/ui/infinite-track";
import { getGalleryItems } from "@/lib/remote-content";

function GalleryCard({ g }: { g: { src: string; alt: string; title: string } }) {
  return (
    <figure className="group relative aspect-[4/3] w-[80vw] shrink-0 overflow-hidden rounded-3xl border border-ink/10 shadow-card sm:w-[26rem]">
      <Image
        src={g.src}
        alt={g.alt}
        fill
        sizes="(max-width: 640px) 80vw, 26rem"
        draggable={false}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 p-4 md:p-5">
        <p className="font-display text-sm font-bold text-cream md:text-base">
          {g.title}
        </p>
      </figcaption>
    </figure>
  );
}

/** Infinite, drag-scrollable gallery - two rows scrolling in opposite directions, same pattern as Hall of Fame. */
export async function Gallery() {
  const gallery = await getGalleryItems();
  const mid = Math.ceil(gallery.length / 2);
  const rowOne = gallery.slice(0, mid);
  const rowTwo = gallery.slice(mid);

  return (
    <section id="gallery" className="overflow-hidden py-16 md:py-24">
      <Container>
        <div className="flex flex-col gap-3">
          <Eyebrow>Snapshots</Eyebrow>
          <div className="flex items-center gap-4">
            <SectionNumber>03</SectionNumber>
            <h2 className="text-2xl font-extrabold tracking-tight md:text-5xl">
              Gallery
            </h2>
          </div>
        </div>
      </Container>

      <div className="mt-8 flex flex-col gap-4 md:gap-6">
        <div className="-mx-4 md:-mx-6">
          <InfiniteTrack trackClassName="gap-4" speed={-0.5}>
            {rowOne.map((g, i) => (
              <GalleryCard key={i} g={g} />
            ))}
          </InfiniteTrack>
        </div>
        <div className="-mx-4 md:-mx-6">
          <InfiniteTrack trackClassName="gap-4" speed={0.5}>
            {rowTwo.map((g, i) => (
              <GalleryCard key={i} g={g} />
            ))}
          </InfiniteTrack>
        </div>
      </div>
    </section>
  );
}
