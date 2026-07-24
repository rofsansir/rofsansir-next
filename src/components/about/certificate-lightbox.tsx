"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { BadgeCheck, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { cardHoverVariants, glowHoverVariants } from "@/components/ui/hover-card";

export type Certificate = {
  src: string;
  width: number;
  height: number;
  title: string;
  issuer: string;
  /** Pulled out into its own spotlight card above the grid. */
  featured?: boolean;
};

/** Grid of certificate thumbnails (plus an optional featured spotlight) that open a full-size lightbox on click. */
export function CertificateGallery({ certificates }: { certificates: Certificate[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex !== null ? certificates[openIndex] : null;
  const count = certificates.length;

  const featuredIndex = certificates.findIndex((c) => c.featured);
  const featured = featuredIndex !== -1 ? certificates[featuredIndex] : null;

  const goPrev = () => setOpenIndex((i) => (i === null ? null : (i - 1 + count) % count));
  const goNext = () => setOpenIndex((i) => (i === null ? null : (i + 1) % count));

  useEffect(() => {
    if (openIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex]);

  return (
    <>
      {featured && (
        <motion.button
          type="button"
          onClick={() => setOpenIndex(featuredIndex)}
          aria-label={`View ${featured.title} in full size`}
          initial="rest"
          animate="rest"
          whileHover="hover"
          variants={cardHoverVariants}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="group relative mx-auto mb-6 flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-marigold/40 bg-marigold/[0.06] p-5 text-left shadow-luxe transition-[border-color,box-shadow] duration-300 hover:border-marigold/70 hover:shadow-card sm:flex-row sm:items-center sm:gap-8 sm:p-6"
        >
          <motion.span
            aria-hidden
            variants={glowHoverVariants}
            className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-marigold/20 blur-2xl"
          />
          <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl bg-cream sm:w-96">
            <Image
              src={featured.src}
              alt={featured.title}
              fill
              sizes="(max-width: 640px) 90vw, 420px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-ink/70 text-cream opacity-80">
              <Maximize2 className="h-3.5 w-3.5" />
            </span>
          </div>
          <div className="relative mt-4 sm:mt-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-marigold/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-marigold-deep">
              <BadgeCheck className="h-3.5 w-3.5" />
              Official Examiner Credential
            </span>
            <p className="mt-3 font-display text-lg font-bold leading-snug text-ink">
              {featured.title}
            </p>
            <p className="mt-1 text-sm text-muted">{featured.issuer}</p>
          </div>
        </motion.button>
      )}

      <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
        {certificates.map((c, i) => {
          if (c.featured) return null;
          return (
            <motion.button
              key={c.src}
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`View ${c.title} in full size`}
              initial="rest"
              animate="rest"
              whileHover="hover"
              variants={cardHoverVariants}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-paper/70 p-4 text-left shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-marigold/40 hover:shadow-card"
            >
              <motion.span
                aria-hidden
                variants={glowHoverVariants}
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-marigold/20 blur-2xl"
              />
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-cream">
                <Image
                  src={c.src}
                  alt={c.title}
                  fill
                  sizes="(max-width: 640px) 90vw, 480px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-ink/70 text-cream opacity-80">
                  <Maximize2 className="h-3.5 w-3.5" />
                </span>
              </div>
              <div className="relative px-1 pt-3">
                <p className="font-display text-sm font-bold leading-snug text-ink">
                  {c.title}
                </p>
                <p className="mt-0.5 text-xs text-muted">{c.issuer}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink p-4 sm:p-8"
            onClick={() => setOpenIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[92vh] max-w-[95vw] flex-col items-center"
            >
              <div
                style={{
                  width: `min(95vw, calc(80vh * ${open.width} / ${open.height}))`,
                  height: `min(80vh, calc(95vw * ${open.height} / ${open.width}))`,
                }}
                className="relative overflow-hidden rounded-2xl shadow-luxe"
              >
                <Image
                  src={open.src}
                  alt={open.title}
                  fill
                  sizes="95vw"
                  priority
                  className="object-contain"
                />
              </div>
              <div className="mt-4 max-w-[95vw] text-center">
                <p className="font-display flex min-h-[2.6rem] items-center justify-center text-sm font-bold text-cream sm:min-h-[3rem] sm:text-base">
                  {open.title}
                </p>
                <p className="mt-0.5 text-xs text-cream/70 sm:text-sm">
                  {open.issuer}
                </p>
              </div>
            </motion.div>
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink/60 text-cream transition-colors hover:bg-ink sm:right-6 sm:top-6"
            >
              <X className="h-5 w-5" />
            </button>
            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  aria-label="Previous certificate"
                  className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/60 text-cream transition-colors hover:bg-ink sm:left-6"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  aria-label="Next certificate"
                  className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/60 text-cream transition-colors hover:bg-ink sm:right-6"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
