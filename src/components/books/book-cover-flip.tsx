"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { RotateCw } from "lucide-react";
import type { Book } from "@/data/books";

/** Book cover that flips to the back cover on click. */
export function BookCoverFlip({ book }: { book: Book }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
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
      <span className="flex items-center gap-1.5 text-xs font-medium text-muted">
        <RotateCw className="h-3.5 w-3.5" />
        Tap the cover to see the back
      </span>
    </div>
  );
}
