"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

export type Certificate = {
  src: string;
  width: number;
  height: number;
  title: string;
  issuer: string;
  date: string;
};

/** Grid of certificate thumbnails that open a full-size lightbox on click. */
export function CertificateGallery({ certificates }: { certificates: Certificate[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex !== null ? certificates[openIndex] : null;
  const count = certificates.length;

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
      <div className="grid gap-5 sm:grid-cols-3">
        {certificates.map((c, i) => (
          <button
            key={c.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`View ${c.title} in full size`}
            className="group flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-paper/70 p-3 text-left shadow-sm transition-shadow hover:shadow-card"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-cream">
              <Image
                src={c.src}
                alt={c.title}
                fill
                sizes="(max-width: 640px) 90vw, 360px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-ink/70 text-cream opacity-80">
                <Maximize2 className="h-3.5 w-3.5" />
              </span>
            </div>
            <div className="px-1 pt-3">
              <p className="font-display text-sm font-bold leading-snug text-ink">
                {c.title}
              </p>
              <p className="mt-0.5 text-xs text-muted">
                {c.issuer} · {c.date}
              </p>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 sm:p-8"
            onClick={() => setOpenIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: `min(95vw, calc(92vh * ${open.width} / ${open.height}))`,
                height: `min(92vh, calc(95vw * ${open.height} / ${open.width}))`,
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
              <div className="absolute inset-x-0 bottom-0 rounded-b-2xl bg-gradient-to-t from-ink/85 via-ink/40 to-transparent p-4 sm:p-6">
                <p className="font-display text-sm font-bold text-cream sm:text-base">
                  {open.title}
                </p>
                <p className="mt-0.5 text-xs text-cream/70 sm:text-sm">
                  {open.issuer} · {open.date}
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
