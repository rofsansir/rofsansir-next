import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
          <Link
            key={b.slug}
            href={`/books/${b.slug}`}
            className="group relative block w-64 shrink-0 overflow-hidden rounded-3xl border border-ink/10 bg-cream p-5 shadow-luxe"
          >
            <div className="relative mx-auto aspect-[3/4] w-full">
              <Image
                src={b.image}
                alt={b.title}
                fill
                sizes="224px"
                draggable={false}
                className="object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-ink/75 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cream backdrop-blur">
                {b.classLevel}
              </span>
              <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-ink/60 text-cream opacity-70 transition-opacity group-hover:opacity-100">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
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
