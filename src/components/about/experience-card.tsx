"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const cardVariants = {
  rest: { y: 0 },
  hover: { y: -6 },
};

/** Featured card flips face-up into view, then behaves like the rest on hover. */
const flipVariants = {
  hidden: { opacity: 0, rotateY: -110 },
  visible: {
    opacity: 1,
    rotateY: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
  hover: { y: -6 },
};

const glowVariants = {
  rest: { opacity: 0, scale: 0.5 },
  hover: { opacity: 1, scale: 1 },
};

const iconVariants = {
  rest: { rotate: 0, scale: 1 },
  hover: { rotate: -8, scale: 1.14 },
};

/** Teaching-experience card: lifts, glows and its icon tilts on hover. */
export function ExperienceCard({
  icon,
  title,
  subtitle,
  meta,
  featured = false,
}: {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  meta?: string;
  featured?: boolean;
}) {
  return (
    <motion.div
      initial={featured ? "hidden" : "rest"}
      animate={featured ? undefined : "rest"}
      whileInView={featured ? "visible" : undefined}
      whileHover="hover"
      viewport={featured ? { once: true, margin: "-80px" } : undefined}
      variants={featured ? flipVariants : cardVariants}
      transition={featured ? undefined : { type: "spring", stiffness: 300, damping: 20 }}
      style={featured ? { transformPerspective: 1200, backfaceVisibility: "hidden" } : undefined}
      className={cn(
        "group relative flex h-full items-start gap-3 overflow-hidden rounded-2xl border p-4 shadow-sm transition-[border-color,box-shadow] duration-300 hover:shadow-luxe",
        featured
          ? "border-marigold/40 bg-marigold/[0.07] hover:border-marigold/70"
          : "border-ink/10 bg-paper/70 hover:border-marigold/40",
      )}
    >
      <motion.span
        aria-hidden
        variants={glowVariants}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-marigold/20 blur-2xl"
      />
      <motion.span
        variants={iconVariants}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className={cn(
          "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
          featured
            ? "bg-marigold text-plum"
            : "bg-marigold/10 text-marigold-deep group-hover:bg-marigold/20",
        )}
      >
        {icon}
      </motion.span>
      <div className="relative min-w-0">
        <p className="font-display text-sm font-bold leading-snug text-ink">
          {title}
        </p>
        {subtitle && (
          <p className="mt-0.5 text-xs leading-snug text-muted">{subtitle}</p>
        )}
        {meta && <p className="mt-0.5 text-xs leading-snug text-muted/80">{meta}</p>}
      </div>
    </motion.div>
  );
}
