"use client";

import React, { Fragment, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Infinite, drag-scrollable track. Items are duplicated for a seamless loop;
 * the track auto-scrolls forever and can be click-dragged (pointer events),
 * resuming auto-scroll on release. The wrap unit is measured from the DOM
 * (offset of the first duplicated item) so the loop is gap-accurate.
 */
export function InfiniteTrack({
  children,
  speed = 0.5,
  className,
  trackClassName,
  edgeFade = true,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  trackClassName?: string;
  edgeFade?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const raf = useRef<ReturnType<typeof requestAnimationFrame>>(0);

  const items = React.Children.toArray(children);
  const count = items.length;
  const doubled = [
    ...items.map((el, i) => (
      <Fragment key={`a-${i}`}>{el}</Fragment>
    )),
    ...items.map((el, i) => (
      <Fragment key={`b-${i}`}>{el}</Fragment>
    )),
  ];

  useEffect(() => {
    const track = trackRef.current;
    if (!track || count === 0) return;

    const unit = () => {
      const child = track.children[count] as HTMLElement | undefined;
      return child ? child.offsetLeft : track.scrollWidth / 2;
    };
    const tick = () => {
      const u = unit();
      if (!dragging.current && u > 0) {
        offset.current -= speed;
        while (offset.current <= -u) offset.current += u;
        while (offset.current > 0) offset.current -= u;
        track.style.transform = `translate3d(${offset.current}px,0,0)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [count, speed]);

  const apply = () => {
    const t = trackRef.current;
    if (t) t.style.transform = `translate3d(${offset.current}px,0,0)`;
  };
  const wrap = () => {
    const t = trackRef.current;
    if (!t) return;
    const child = t.children[count] as HTMLElement | undefined;
    const u = child ? child.offsetLeft : t.scrollWidth / 2;
    if (u <= 0) return;
    while (offset.current <= -u) offset.current += u;
    while (offset.current > 0) offset.current -= u;
  };
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    lastX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    offset.current += e.clientX - lastX.current;
    lastX.current = e.clientX;
    wrap();
    apply();
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  return (
    <div
      className={cn(
        "cursor-grab select-none overflow-hidden active:cursor-grabbing [touch-action:pan-y]",
        edgeFade && "edge-fade",
        className,
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div
        ref={trackRef}
        className={cn("relative flex w-max will-change-transform", trackClassName)}
      >
        {doubled}
      </div>
    </div>
  );
}
