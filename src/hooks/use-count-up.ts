"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

/**
 * Counts up to `target` once the element scrolls into view.
 */
export function useCountUp<T extends HTMLElement>(
  target: number,
  duration = 1800,
  start = false,
) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  const shouldRun = start || inView;

  useEffect(() => {
    if (!shouldRun) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shouldRun, target, duration]);

  return { ref, value };
}
