"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { RotateCw, Eye, X } from "lucide-react";
import type { Book } from "@/data/books";

/** Book cover that flips to the back cover on click, with a full-size lightbox view. */
export function BookCoverFlip({ book }: { book: Book }) {
  const [flipped, setFlipped] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  const activeSrc = flipped ? book.backImage : book.image;
  const activeLabel = flipped ? "back" : "front";

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <button
          type="button"
          onClick={() => setFlipped((v) => !v)}
          aria-label={`Flip to see the ${flipped ? "front" : "back"} cover of ${book.title}`}
          aria-pressed={flipped}
          className="relative block aspect-[3/4] w-56 cursor-pointer [perspective:1600px]"
        >
          <motion.div
            className="relative h-full w-full [transform-style:preserve-3d]"
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] bg-cream shadow-luxe [backface-visibility:hidden]">
              <Image
                src={book.image}
                alt={`${book.title} front cover`}
                fill
                sizes="224px"
                priority
                draggable={false}
                className="object-contain p-4"
              />
            </div>
            <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] bg-cream shadow-luxe [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <Image
                src={book.backImage}
                alt={`${book.title} back cover`}
                fill
                sizes="224px"
                draggable={false}
                className="object-contain p-4"
              />
            </div>
          </motion.div>
        </button>

        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label={`View the ${activeLabel} cover of ${book.title} in full size`}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink/70 text-cream shadow-card backdrop-blur transition-colors hover:bg-ink"
        >
          <Eye className="h-4 w-4" />
        </button>
      </div>

      <span className="flex items-center gap-1.5 text-xs font-medium text-muted">
        <RotateCw className="h-3.5 w-3.5" />
        Tap the cover to see the back
      </span>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/85 p-6 backdrop-blur-sm"
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-[3/4] max-h-[85vh] w-[85vw] max-w-md overflow-hidden rounded-[1.75rem] bg-cream shadow-luxe"
            >
              <Image
                src={activeSrc}
                alt={`${book.title} ${activeLabel} cover, full size`}
                fill
                sizes="(max-width: 640px) 90vw, 448px"
                className="object-contain p-4"
              />
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                aria-label="Close full-size cover"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink/70 text-cream transition-colors hover:bg-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
