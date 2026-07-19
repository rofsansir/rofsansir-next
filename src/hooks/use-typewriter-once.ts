"use client";

import { useEffect, useState } from "react";

/** Types out a fixed string once, character by character, then stops. */
export function useTypewriterOnce(text: string, typeMs = 18) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= text.length) return;
    const id = setTimeout(() => setCount((c) => c + 1), typeMs);
    return () => clearTimeout(id);
  }, [count, text, typeMs]);

  return text.slice(0, count);
}
