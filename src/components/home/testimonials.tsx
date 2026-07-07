"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Container, Eyebrow, SectionNumber } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";
import { testimonials } from "@/data/home";

export function Testimonials() {
  const [i, setI] = useState(0);
  const n = testimonials.length;
  const go = (d: number) => setI((p) => (p + d + n) % n);
  const active = testimonials[i];

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % n), 6500);
    return () => clearInterval(t);
  }, [n]);

  return (
    <section id="voices" className="px-4 py-16 md:py-24">
      <Container>
        <div className="flex flex-col gap-3">
          <Eyebrow>Student Voices</Eyebrow>
          <div className="flex items-center gap-4">
            <SectionNumber>04</SectionNumber>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
              Loved by students &amp; parents
            </h2>
          </div>
        </div>

        <div className="relative mx-auto mt-10 max-w-3xl">
          <div className="rounded-[2rem] border border-ink/10 bg-paper p-8 shadow-card md:p-12">
            <div className="flex gap-1 text-marigold">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className="h-5 w-5" fill="currentColor" />
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="mt-5"
              >
                <p className="font-display text-xl font-semibold leading-relaxed text-ink md:text-2xl">
                  &ldquo;{active.quote}&rdquo;
                </p>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-paper shadow-card">
                    <Image
                      src={active.image}
                      alt={active.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </span>
                  <span>
                    <span className="block font-bold text-ink">{active.name}</span>
                    <span className="text-sm text-muted">
                      {active.grade} · {active.year}
                    </span>
                  </span>
                </figcaption>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink/5"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setI(k)}
                  aria-label={`Go to testimonial ${k + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    k === i ? "w-6 bg-marigold" : "w-2 bg-ink/20 hover:bg-ink/40",
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink/5"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
