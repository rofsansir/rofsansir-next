"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Container, Eyebrow, SectionNumber } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { YouTubeThumbnail } from "@/components/ui/youtube-thumbnail";
import { aboutTeaser } from "@/data/home";

/**
 * YouTube auto-thumbnail + click-to-play, same pattern as
 * components/videos/video-player.tsx - a raw always-embedded iframe shows YouTube's
 * own paused-state thumbnail (logo, suggested-video overlay, "Watch on YouTube"
 * chrome) before the visitor does anything; deferring the iframe until clicked keeps
 * that off the page entirely.
 */
export function AboutTeaser() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="video" className="px-4 py-16 md:py-24">
      <Container>
        <div className="flex flex-col gap-3">
          <Eyebrow>{aboutTeaser.eyebrow}</Eyebrow>
          <div className="flex items-center gap-4">
            <SectionNumber>01</SectionNumber>
            <h2 className="text-2xl font-extrabold leading-tight tracking-tight md:text-5xl">
              {aboutTeaser.title}
            </h2>
          </div>
        </div>

        <Reveal className="relative mt-8">
          <div className="pointer-events-none absolute -inset-10 -z-10 bg-gradient-to-tr from-marigold/25 via-transparent to-plum/25 blur-3xl" />
          <div className="relative mx-auto aspect-video max-w-4xl overflow-hidden rounded-[2rem] border-4 border-paper bg-ink shadow-luxe">
            {playing ? (
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${aboutTeaser.videoId}?rel=0&autoplay=1`}
                title={aboutTeaser.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="group relative block h-full w-full"
                aria-label={`Play: ${aboutTeaser.title}`}
              >
                <YouTubeThumbnail
                  videoId={aboutTeaser.videoId}
                  alt={aboutTeaser.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 56rem"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 flex items-center justify-center bg-ink/30 transition-colors group-hover:bg-ink/10">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-marigold text-ink shadow-luxe transition-transform group-hover:scale-110">
                    <Play className="ml-0.5 h-7 w-7" fill="currentColor" />
                  </span>
                </div>
              </button>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
