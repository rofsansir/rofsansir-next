"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Typewriter effect cycling through `words`. Returns the current string.
 * Respects prefers-reduced-motion (shows the first word, no cycling).
 */
export function useTypewriter(
  words: string[],
  { typeMs = 65, deleteMs = 32, holdMs = 1700 } = {},
) {
  const reduce = useReducedMotion();
  const [text, setText] = useState(reduce ? words[0] ?? "" : "");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const current = words[i % words.length] ?? "";
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), holdMs);
    } else if (deleting && text === "") {
      setDeleting(false);
      setI((p) => p + 1);
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
          );
        },
        deleting ? deleteMs : typeMs,
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, i, words, reduce, typeMs, deleteMs, holdMs]);

  return text;
}
