"use client";

import { useEffect, useState } from "react";

/**
 * Typewriter that types → holds → deletes → pauses → next phrase.
 * Defaults match the prototype exactly: 52ms type, 1900ms hold, 26ms delete,
 * 420ms end-pause.
 */
export function useTypewriter(
  words: string[],
  {
    typeMs = 52,
    deleteMs = 26,
    holdMs = 1900,
    endMs = 420,
  }: { typeMs?: number; deleteMs?: number; holdMs?: number; endMs?: number } = {},
) {
  const [text, setText] = useState("");

  useEffect(() => {
    let pi = 0; // phrase index
    let ci = 0; // char index
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const phrase = words[pi] ?? "";
      if (!deleting) {
        ci++;
        setText(phrase.slice(0, ci));
        if (ci >= phrase.length) {
          deleting = true;
          timer = setTimeout(tick, holdMs);
          return;
        }
        timer = setTimeout(tick, typeMs);
      } else {
        ci--;
        setText(phrase.slice(0, ci));
        if (ci <= 0) {
          deleting = false;
          pi = (pi + 1) % words.length;
          timer = setTimeout(tick, endMs);
          return;
        }
        timer = setTimeout(tick, deleteMs);
      }
    };

    timer = setTimeout(tick, typeMs);
    return () => clearTimeout(timer);
  }, [words, typeMs, deleteMs, holdMs, endMs]);

  return text;
}
