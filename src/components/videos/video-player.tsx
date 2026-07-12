"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";
import { videoThumb, type Video } from "@/data/videos";

/** Inline YouTube player - clicking a thumbnail swaps the featured embed instead of leaving the site. */
export function VideoPlayer({ videos }: { videos: Video[] }) {
  const [active, setActive] = useState<Video | undefined>(videos[0]);
  const [autoplay, setAutoplay] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  function play(v: Video) {
    setActive(v);
    setAutoplay(true);
    playerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (!active) return null;

  return (
    <>
      <div
        ref={playerRef}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border-4 border-paper bg-ink shadow-luxe"
      >
        <div className="aspect-video w-full">
          <iframe
            key={active.id}
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${active.videoId}?rel=0${autoplay ? "&autoplay=1" : ""}`}
            title={active.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v, i) => (
          <Reveal key={v.id} delay={(i % 3) * 0.06}>
            <button
              type="button"
              onClick={() => play(v)}
              className={cn(
                "group block w-full overflow-hidden rounded-[1.5rem] border bg-paper/70 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-card",
                active.id === v.id ? "border-marigold" : "border-ink/10",
              )}
            >
              <div className="relative aspect-video w-full overflow-hidden bg-ink">
                <Image
                  src={videoThumb(v.videoId)}
                  alt={v.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-ink/30 transition-colors group-hover:bg-ink/10">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-marigold text-ink shadow-luxe transition-transform group-hover:scale-110">
                    <Play className="ml-0.5 h-6 w-6" fill="currentColor" />
                  </span>
                </div>
                <span className="absolute right-2 top-2 rounded-full bg-ink/80 px-2 py-0.5 text-[10px] font-semibold text-cream backdrop-blur">
                  {v.duration}
                </span>
                {active.id === v.id && (
                  <span className="absolute left-2 top-2 rounded-full bg-marigold px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink">
                    Now playing
                  </span>
                )}
              </div>
              <div className="p-4">
                <p className="text-[11px] font-bold uppercase tracking-widest text-marigold-deep">
                  {v.category}
                </p>
                <h3 className="mt-1.5 line-clamp-2 font-semibold leading-snug text-ink">
                  {v.title}
                </h3>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
    </>
  );
}
