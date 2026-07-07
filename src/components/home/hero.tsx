"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  type Variants,
} from "motion/react";
import { ArrowRight, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Starburst } from "@/components/ui/primitives";
import { BlobField } from "@/components/ui/blob-field";
import { useTypewriter } from "@/hooks/use-typewriter";
import { useCountUp } from "@/hooks/use-count-up";
import { heroStats, heroTypewriter } from "@/data/home";

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const WORDS = ["Your", "route", "to", "A*", "in", "O", "Level", "Bengali"];

export function Hero() {
  const tagline = useTypewriter(heroTypewriter);
  const { ref: countRef, value } = useCountUp<HTMLSpanElement>(3000);

  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 12);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 12);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <section id="home" className="relative overflow-hidden px-4 pb-12 pt-28 md:pb-20 md:pt-36">
      <BlobField />
      <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left — copy */}
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-paper/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted shadow-sm backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping-soft rounded-full bg-marigold" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-marigold-deep" />
            </span>
            CAIE Examiner · 8+ Years
          </span>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={{
              show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
            }}
            className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
          >
            {WORDS.map((w, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className="mr-[0.25em] inline-block"
              >
                {w === "A*" ? (
                  <span className="text-shimmer">A&#42;</span>
                ) : (
                  w
                )}
              </motion.span>
            ))}
          </motion.h1>

          <div className="flex min-h-[4.2rem] items-center gap-1 sm:min-h-[2.9rem]">
            <span className="font-display text-xl font-bold text-marigold-deep sm:text-2xl md:text-[1.9rem]">
              {tagline}
              <span className="caret" aria-hidden />
            </span>
          </div>

          <ul className="grid w-full max-w-lg grid-cols-1 gap-2.5 sm:grid-cols-2">
            {heroStats.map((s) => (
              <li
                key={s}
                className="flex items-start gap-2.5 text-sm font-medium text-ink/80"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-marigold/20 text-marigold-deep">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {s}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button href="#admission" size="lg">
              Start Learning <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="#books" variant="outline" size="lg">
              View Books
            </Button>
          </div>
        </div>

        {/* Right — portrait cluster */}
        <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <Starburst className="absolute -right-8 -top-8 h-24 w-24 text-marigold/30" />

          <motion.div
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2.4rem] border-4 border-paper shadow-luxe"
          >
            <Image
              src="/assets/teacher/1.jpg"
              alt="Rofsan Sir, CAIE O Level Bengali Examiner"
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 30rem"
              className="object-cover"
            />
          </motion.div>

          {/* floating chip: success rate */}
          <div className="absolute -left-4 top-6 flex animate-floaty items-center gap-2 rounded-2xl border border-ink/10 bg-paper/95 px-3 py-2 shadow-card backdrop-blur">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-marigold text-ink">
              <Star className="h-4 w-4" fill="currentColor" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold text-ink">98% A&#42; &amp; A</span>
              <span className="block text-[10px] font-semibold uppercase tracking-widest text-muted">
                Success Rate
              </span>
            </span>
          </div>

          {/* floating chip: students count */}
          <div className="absolute -bottom-5 -right-3 flex animate-floaty-slow items-center gap-2 rounded-2xl border border-ink/10 bg-paper/95 px-3 py-2 shadow-card backdrop-blur">
            <div className="flex -space-x-2">
              {["prioman.jpg", "apurva.jpg", "maida.jpg"].map((f) => (
                <span
                  key={f}
                  className="relative h-7 w-7 overflow-hidden rounded-full border-2 border-paper"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/assets/students/${f}`}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </span>
              ))}
            </div>
            <span ref={countRef} className="text-sm font-bold text-ink">
              {Math.round(value).toLocaleString()}+
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">
              students
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
