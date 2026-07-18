"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { RotateCw, Maximize2, X } from "lucide-react";
import type { Book } from "@/data/books";

/** Book cover that opens a full-size lightbox on click, with a flip button to see the back cover. */
export function BookCoverFlip({ book }: { book: Book }) {
  const [open, setOpen] = useState(false);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => {
          setFlipped(false);
          setOpen(true);
        }}
        aria-label={`View the cover of ${book.title} in full size`}
        className="group relative block w-56 cursor-pointer overflow-hidden rounded-[1.75rem] border border-ink/10 bg-cream p-4 shadow-luxe"
      >
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={book.image}
            alt={`${book.title} front cover`}
            fill
            sizes="224px"
            priority
            draggable={false}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-ink/70 text-cream opacity-80">
          <Maximize2 className="h-3.5 w-3.5" />
        </span>
      </button>

      <span className="flex items-center gap-1.5 text-xs font-medium text-muted">
        <Maximize2 className="h-3.5 w-3.5" />
        Tap the cover to view full size
      </span>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/85 p-6 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-[3/4] max-h-[85vh] w-[85vw] max-w-md [perspective:1600px]"
            >
              <motion.div
                className="relative h-full w-full [transform-style:preserve-3d]"
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-ink/10 bg-cream p-4 shadow-luxe [backface-visibility:hidden]">
                  <div className="relative h-full w-full">
                    <Image
                      src={book.image}
                      alt={`${book.title} front cover, full size`}
                      fill
                      sizes="(max-width: 640px) 90vw, 448px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-ink/10 bg-cream p-4 shadow-luxe [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className="relative h-full w-full">
                    <Image
                      src={book.backImage}
                      alt={`${book.title} back cover, full size`}
                      fill
                      sizes="(max-width: 640px) 90vw, 448px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>

              <button
                type="button"
                onClick={() => setFlipped((v) => !v)}
                aria-label={`Flip to see the ${flipped ? "front" : "back"} cover`}
                aria-pressed={flipped}
                className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-ink/70 text-cream shadow-card backdrop-blur transition-colors hover:bg-ink"
              >
                <RotateCw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
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
