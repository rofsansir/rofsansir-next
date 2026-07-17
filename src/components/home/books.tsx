import Image from "next/image";
import { Container, Eyebrow, SectionNumber } from "@/components/ui/primitives";
import { InfiniteTrack } from "@/components/ui/infinite-track";
import { books } from "@/data/books";

/** Infinite, drag-scrollable bookshelf. */
export function Books() {
  return (
    <section id="books" className="noise relative overflow-hidden bg-plum text-cream">
      <Container className="py-16 md:py-24">
        <div className="flex flex-col gap-3">
          <Eyebrow dark>Author of the</Eyebrow>
          <div className="flex items-center gap-4">
            <SectionNumber dark>05</SectionNumber>
            <h2 className="text-2xl font-extrabold tracking-tight md:text-5xl">
              The O Level Bengali Book Series
            </h2>
          </div>
        </div>
      </Container>

      <InfiniteTrack className="py-6" trackClassName="gap-6" speed={0.4}>
        {books.map((b) => (
          <article
            key={b.slug}
            className="group relative w-64 shrink-0 overflow-hidden rounded-3xl border border-cream/10 bg-cream/5 p-4 ring-1 ring-cream/10 backdrop-blur"
          >
            <div className="relative mx-auto aspect-[3/4] w-full overflow-hidden rounded-2xl bg-cream shadow-luxe">
              <Image
                src={b.image}
                alt={b.title}
                fill
                sizes="224px"
                draggable={false}
                className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </article>
        ))}
      </InfiniteTrack>

      <Container>
        <p className="pb-16 text-center text-sm text-cream/60 md:pb-24">
          Part of the O Level Bengali Plus series   written by Rofsan Sir.
        </p>
      </Container>
    </section>
  );
}
