"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Maximize2, X } from "lucide-react";

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

  useEffect(() => {
    if (openIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/85 p-6 backdrop-blur-sm"
            onClick={() => setOpenIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-w-2xl flex-col overflow-hidden rounded-[1.75rem] bg-cream shadow-luxe"
            >
              <Image
                src={open.src}
                alt={open.title}
                width={open.width}
                height={open.height}
                sizes="(max-width: 768px) 90vw, 672px"
                className="h-auto max-h-[70vh] w-auto max-w-full object-contain"
              />
              <div className="px-6 py-4">
                <p className="font-display text-base font-bold text-ink">
                  {open.title}
                </p>
                <p className="mt-0.5 text-sm text-muted">
                  {open.issuer} · {open.date}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                aria-label="Close"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink/70 text-cream transition-colors hover:bg-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
