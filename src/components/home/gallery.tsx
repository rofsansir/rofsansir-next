"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container, Eyebrow, SectionNumber } from "@/components/ui/primitives";
import { gallery } from "@/data/home";

export function Gallery() {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section id="gallery" className="py-16 md:py-24">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-3">
            <Eyebrow>Snapshots from Class</Eyebrow>
            <div className="flex items-center gap-4">
              <SectionNumber>03</SectionNumber>
              <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
                Gallery
              </h2>
            </div>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Previous"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-paper/70 text-ink backdrop-blur transition-colors hover:bg-paper"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Next"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-paper/70 text-ink backdrop-blur transition-colors hover:bg-paper"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>

      <div className="edge-fade mt-8">
        <div
          ref={ref}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 md:px-6"
        >
          {gallery.map((g) => (
            <figure
              key={g.src}
              className="relative aspect-[4/3] w-[80vw] shrink-0 snap-start overflow-hidden rounded-3xl border border-ink/10 shadow-card sm:w-[26rem]"
            >
              <Image
                src={g.src}
                alt={g.alt}
                fill
                sizes="(max-width: 640px) 80vw, 26rem"
                className="object-cover"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
