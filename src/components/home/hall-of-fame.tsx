import Image from "next/image";
import {
  Container,
  SectionHeading,
  ShimmerText,
} from "@/components/ui/primitives";
import { InfiniteTrack } from "@/components/ui/infinite-track";
import { achievers, type Achiever } from "@/data/home";

function AchieverCard({ a }: { a: Achiever }) {
  return (
    <figure className="group relative aspect-[4/5] w-[45vw] shrink-0 overflow-hidden rounded-3xl border border-cream/10 shadow-card sm:w-56 md:w-64">
      <Image
        src={a.image}
        alt={a.name}
        fill
        sizes="(max-width: 640px) 45vw, 16rem"
        draggable={false}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
      <span className="absolute right-3 top-3 rounded-full bg-marigold px-2.5 py-1 text-xs font-bold text-ink shadow-card">
        {a.grade}
      </span>
      <figcaption className="absolute inset-x-0 bottom-0 p-3 md:p-4">
        <p className="font-display text-sm font-bold text-cream md:text-base">
          {a.name}
        </p>
        <p className="text-xs text-cream/70">{a.meta}</p>
      </figcaption>
    </figure>
  );
}

export function HallOfFame() {
  const mid = Math.ceil(achievers.length / 2);
  const rowOne = achievers.slice(0, mid);
  const rowTwo = achievers.slice(mid);

  return (
    <section id="fame" className="noise relative overflow-hidden bg-plum py-16 text-cream md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-marigold/15 blur-3xl" />
        <div className="absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-plum-3/40 blur-3xl" />
      </div>

      <Container className="relative">
        <SectionHeading
          dark
          eyebrow="Hall of Fame"
          numeral="02"
          title={
            <>
              Our <ShimmerText>A&#42;</ShimmerText> achievers
            </>
          }
          description="Real students, real results. The faces behind the grades that make us proud."
        />

      </Container>

      <div className="mt-10 flex flex-col gap-4 md:gap-6">
        <div className="-mx-4 md:-mx-6">
          <InfiniteTrack trackClassName="gap-4 md:gap-6" speed={-0.5} duplicate={false}>
            {rowOne.map((a) => (
              <AchieverCard key={a.name} a={a} />
            ))}
          </InfiniteTrack>
        </div>
        <div className="-mx-4 md:-mx-6">
          <InfiniteTrack trackClassName="gap-4 md:gap-6" speed={0.5} duplicate={false}>
            {rowTwo.map((a) => (
              <AchieverCard key={a.name} a={a} />
            ))}
          </InfiniteTrack>
        </div>
      </div>
    </section>
  );
}
