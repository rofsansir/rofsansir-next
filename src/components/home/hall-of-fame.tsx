import Image from "next/image";
import {
  Container,
  SectionHeading,
  ShimmerText,
} from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { achievers } from "@/data/home";

export function HallOfFame() {
  return (
    <section id="fame" className="noise relative overflow-hidden bg-plum text-cream">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-marigold/15 blur-3xl" />
        <div className="absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-plum-3/40 blur-3xl" />
      </div>

      <Container className="relative py-16 md:py-24">
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

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {achievers.map((a, i) => (
            <Reveal key={a.name} delay={(i % 4) * 0.06}>
              <figure className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-cream/10 shadow-card">
                <Image
                  src={a.image}
                  alt={a.name}
                  fill
                  sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 22vw"
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
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
