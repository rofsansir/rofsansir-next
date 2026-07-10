"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
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

const WORDS = ["From", "fear", "to", "A*", "in", "O", "Level", "Bengali"];

export function Hero() {
  const tagline = useTypewriter(heroTypewriter);
  const { ref: countRef, value } = useCountUp<HTMLSpanElement>(3000);

  // Section-level mouse parallax (matches prototype: move mouse anywhere in hero).
  const mx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const my = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const tiltX = useTransform(my, [-1, 1], [6, -6]); // rotateX = -my * 6deg
  const tiltY = useTransform(mx, [-1, 1], [-8, 8]); // rotateY = mx * 8deg
  const chip1X = useTransform(mx, [-1, 1], [-22, 22]);
  const chip1Y = useTransform(my, [-1, 1], [-16, 16]);
  const chip2X = useTransform(mx, [-1, 1], [-30, 30]);
  const chip2Y = useTransform(my, [-1, 1], [-20, 20]);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const onMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      id="home"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative overflow-hidden px-4 pb-12 pt-28 md:pb-20 md:pt-36"
    >
      <BlobField />
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
        {/* Left   copy */}
        <div className="flex min-w-0 flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-paper/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted shadow-sm backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping-soft rounded-full bg-marigold" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-marigold-deep" />
            </span>
            Cambridge Examiner of Bengali
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
                  <span className="relative inline-block text-shimmer">
                    A&#42;
                    <svg
                      aria-hidden
                      className="absolute -bottom-2 left-0 w-full"
                      height="9"
                      viewBox="0 0 200 9"
                      preserveAspectRatio="none"
                      fill="none"
                    >
                      <path
                        d="M2 6C40 2 80 2 120 4s60 2 78 1"
                        stroke="#e2a039"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                ) : (
                  w
                )}
              </motion.span>
            ))}
          </motion.h1>

          <div className="flex min-h-[4.2rem] items-center gap-1 sm:min-h-[3.9rem] md:min-h-[4.8rem]">
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
          </div>
        </div>

        {/* Right   portrait cluster (tilt + parallax on mouse-move) */}
        <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <Starburst className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 text-marigold/60" />

          {/* rotated gradient backdrop */}
          <div
            aria-hidden
            className="absolute -inset-2 rotate-2 rounded-[2.6rem] bg-gradient-to-tr from-marigold/40 to-plum/15"
          />

          {/* portrait (3D tilt) */}
          <motion.div
            style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1000 }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2.4rem] border-[5px] border-paper shadow-luxe"
          >
            <Image
              src="/assets/teacher/1.jpg"
              alt="Rofsan Sir, CAIE O Level Bengali Examiner"
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 30rem"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/50 to-transparent"
            />
          </motion.div>

          {/* floating chip: success rate (parallax depth 22/16) */}
          <motion.div
            style={{ x: chip1X, y: chip1Y }}
            className="absolute -left-3 -top-4 md:-left-7"
          >
            <div className="flex animate-floaty items-center gap-2 rounded-2xl border border-ink/5 bg-paper/95 p-3 pr-5 shadow-luxe backdrop-blur">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-marigold text-ink">
                <Star className="h-4 w-4" fill="currentColor" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-bold text-ink">
                  98% A&#42; &amp; A
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-widest text-muted">
                  Success Rate
                </span>
              </span>
            </div>
          </motion.div>

          {/* floating chip: students count (parallax depth 30/20) */}
          <motion.div
            style={{ x: chip2X, y: chip2Y }}
            className="absolute -bottom-5 right-2"
          >
            <div className="flex animate-floaty-slow items-center gap-2 rounded-full border border-ink/5 bg-paper/95 py-1.5 pl-1.5 pr-4 shadow-card backdrop-blur">
              <div className="flex -space-x-2">
                {["prioman.jpg", "farhan.jpeg", "maida.jpg"].map((f) => (
                  <span
                    key={f}
                    className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-paper"
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
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
