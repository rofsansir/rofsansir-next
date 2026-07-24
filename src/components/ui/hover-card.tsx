"use client";

import { motion, type Variants } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const MotionLink = motion.create(Link);

export const cardHoverVariants: Variants = {
  rest: { y: 0 },
  hover: { y: -6 },
};

export const glowHoverVariants: Variants = {
  rest: { opacity: 0, scale: 0.5 },
  hover: { opacity: 1, scale: 1 },
};

export const iconHoverVariants: Variants = {
  rest: { rotate: 0, scale: 1 },
  hover: { rotate: -8, scale: 1.14 },
};

/** Lifts, glows on hover; used for every card on the About page. Pass `href` to render as a link. */
export function HoverCard({
  children,
  className,
  glowClassName,
  href,
}: {
  children: ReactNode;
  className?: string;
  glowClassName?: string;
  href?: string;
}) {
  const glow = (
    <motion.span
      aria-hidden
      variants={glowHoverVariants}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-marigold/20 blur-2xl",
        glowClassName,
      )}
    />
  );

  const sharedClassName = cn(
    "group relative block h-full overflow-hidden rounded-2xl border border-ink/10 bg-paper/70 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-marigold/40 hover:shadow-luxe",
    className,
  );

  if (href) {
    return (
      <MotionLink
        href={href}
        initial="rest"
        animate="rest"
        whileHover="hover"
        variants={cardHoverVariants}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={sharedClassName}
      >
        {glow}
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      variants={cardHoverVariants}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={sharedClassName}
    >
      {glow}
      {children}
    </motion.div>
  );
}

/** Tilts and scales up on hover; must be nested inside a HoverCard. */
export function HoverIcon({
  children,
  className,
  variants = iconHoverVariants,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}) {
  return (
    <motion.span
      variants={variants}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
