"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { HoverCard, HoverIcon, iconHoverVariants } from "@/components/ui/hover-card";

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

/** Featured glow: stays hidden through the flip, then pulses once it settles. */
const flipGlowVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: [0, 0, 0.9, 0],
    scale: [0.5, 0.5, 1.2, 0.9],
    transition: { duration: 1.5, times: [0, 0.6, 0.8, 1], ease: "easeOut" as const },
  },
  hover: { opacity: 1, scale: 1 },
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
  const body = (
    <div className="relative min-w-0">
      <p className="font-display text-sm font-bold leading-snug text-ink">
        {title}
      </p>
      {subtitle && (
        <p className="mt-0.5 text-xs leading-snug text-muted">{subtitle}</p>
      )}
      {meta && <p className="mt-0.5 text-xs leading-snug text-muted/80">{meta}</p>}
    </div>
  );

  if (!featured) {
    return (
      <HoverCard className="flex items-start gap-3 p-4">
        <HoverIcon className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-marigold/10 text-marigold-deep transition-colors duration-300 group-hover:bg-marigold/20">
          {icon}
        </HoverIcon>
        {body}
      </HoverCard>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-80px" }}
      variants={flipVariants}
      style={{ transformPerspective: 1200, backfaceVisibility: "hidden" }}
      className="group relative flex h-full items-start gap-3 overflow-hidden rounded-2xl border border-marigold/40 bg-marigold/[0.07] p-4 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-marigold/70 hover:shadow-luxe"
    >
      <motion.span
        aria-hidden
        variants={flipGlowVariants}
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-marigold/20 blur-2xl"
      />
      <HoverIcon
        variants={iconHoverVariants}
        className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-marigold text-plum transition-colors duration-300"
      >
        {icon}
      </HoverIcon>
      {body}
    </motion.div>
  );
}
