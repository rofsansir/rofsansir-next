"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { Container, ShimmerText, Starburst } from "@/components/ui/primitives";
import { BlobField } from "@/components/ui/blob-field";
import { useCountUp } from "@/hooks/use-count-up";
import { useTypewriterOnce } from "@/hooks/use-typewriter-once";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const statCard: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const bio =
  "With 9+ years of classroom experience teaching English-medium students, he has helped thousands build confidence in Bengali and achieve consistent examination success through a structured, exam-focused approach.";

const stats = [
  { target: 9, suffix: "+", label: "Years teaching" },
  { target: 3000, suffix: "+", label: "Students mentored" },
  { target: 98, suffix: "%", label: "A* & A success" },
  { target: 5, suffix: "", label: "Published books" },
];

function StatCard({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const { ref, value } = useCountUp<HTMLParagraphElement>(target, 1400);
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-ink/10 bg-paper/70 p-3 text-center shadow-sm">
      <p ref={ref} className="font-display text-2xl font-extrabold text-ink">
        {Math.round(value).toLocaleString()}
        {suffix}
      </p>
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
        {label}
      </p>
    </div>
  );
}

export function AboutHero() {
  const typedBio = useTypewriterOnce(bio);
  const bioDone = typedBio.length >= bio.length;

  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-28 md:pb-20 md:pt-36">
      <BlobField />
      <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } }}
          className="flex flex-col items-start gap-6"
        >
          <motion.h1
            variants={fadeUp}
            className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl"
          >
            Rofsan <ShimmerText>Khan</ShimmerText>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="min-h-[6.5rem] max-w-xl text-base leading-relaxed text-muted md:min-h-[7rem] md:text-lg"
          >
            {typedBio}
            {!bioDone && <span className="caret" aria-hidden />}
          </motion.p>

          <motion.div
            initial="hidden"
            animate={bioDone ? "show" : "hidden"}
            variants={{
              hidden: { height: 0, opacity: 0 },
              show: {
                height: "auto",
                opacity: 1,
                transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="w-full overflow-hidden"
          >
            <motion.div
              initial="hidden"
              animate={bioDone ? "show" : "hidden"}
              variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
              className="grid grid-cols-2 gap-3 pt-1 sm:grid-cols-4"
            >
              {stats.map((s) => (
                <motion.div key={s.label} variants={statCard}>
                  <StatCard {...s} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Portrait - shown first on mobile (photo builds trust before the
            text loads) so nothing below it (the typewriter bio, the stat
            cards that grow in after typing finishes) can ever push it
            around once the stacked mobile layout puts it in normal flow. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative order-first mx-auto w-full max-w-sm lg:order-none lg:max-w-md"
        >
          <Starburst className="absolute -right-6 -top-6 h-20 w-20 text-marigold/30" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.4rem] border-4 border-paper shadow-luxe">
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
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
