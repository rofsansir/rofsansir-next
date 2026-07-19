"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { ShieldCheck } from "lucide-react";
import { Container, ShimmerText, Starburst } from "@/components/ui/primitives";
import { BlobField } from "@/components/ui/blob-field";
import { useCountUp } from "@/hooks/use-count-up";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

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
    <div className="rounded-2xl border border-ink/10 bg-paper/70 p-3 text-center shadow-sm">
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
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-paper/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted shadow-sm backdrop-blur"
          >
            <ShieldCheck className="h-4 w-4 text-marigold-deep" />
            Expert O Level Bengali Educator
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl"
          >
            Meet your <ShimmerText>Bengali</ShimmerText> Teacher
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-display text-lg font-bold text-plum md:text-xl"
          >
            Rofsan Khan
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-base leading-relaxed text-muted md:text-lg"
          >
            With 9+ years of classroom experience teaching English-medium
            students, he has helped thousands build confidence in Bengali and
            achieve consistent examination success through a structured,
            exam-focused approach.
          </motion.p>

          <motion.div variants={fadeUp} className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </motion.div>
        </motion.div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative mx-auto w-full max-w-sm lg:max-w-md"
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
