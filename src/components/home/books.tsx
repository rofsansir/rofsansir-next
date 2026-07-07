import Image from "next/image";
import { Container, Eyebrow, SectionNumber } from "@/components/ui/primitives";
import { InfiniteTrack } from "@/components/ui/infinite-track";
import { cn } from "@/lib/cn";
import { books } from "@/data/books";

/** Infinite, drag-scrollable bookshelf. */
export function Books() {
  return (
    <section id="books" className="noise relative overflow-hidden bg-plum text-cream">
      <Container className="py-16 md:py-24">
        <div className="flex flex-col gap-3">
          <Eyebrow dark>Author of 5 Guidebooks</Eyebrow>
          <div className="flex items-center gap-4">
            <SectionNumber>05</SectionNumber>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
              The O Level Bengali bookshelf
            </h2>
          </div>
        </div>
      </Container>

      <InfiniteTrack className="py-6" trackClassName="gap-6" speed={0.4}>
        {books.map((b) => (
          <article
            key={b.slug}
            className="group relative w-56 shrink-0 overflow-hidden rounded-3xl border border-cream/10 bg-cream/5 p-4 ring-1 ring-cream/10 backdrop-blur"
          >
            <div className="relative mx-auto aspect-[3/4] w-40 overflow-hidden rounded-2xl bg-cream shadow-luxe">
              <Image
                src={b.image}
                alt={b.title}
                fill
                sizes="160px"
                draggable={false}
                className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <span
              className={cn(
                "absolute left-5 top-5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
                b.badgeTone === "emerald"
                  ? "bg-emerald-300 text-emerald-950"
                  : "bg-marigold text-ink",
              )}
            >
              {b.badge}
            </span>
            <h3 className="mt-4 font-display text-sm font-bold leading-snug text-cream">
              {b.title}
            </h3>
            <p className="mt-1 text-xs text-cream/60">{b.subtitle}</p>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-marigold-soft">
              Code · {b.code}
            </p>
          </article>
        ))}
      </InfiniteTrack>

      <Container>
        <p className="pb-16 text-center text-sm text-cream/60 md:pb-24">
          Part of the O Level Bengali Plus series — written by Rofsan Sir.
        </p>
      </Container>
    </section>
  );
}
