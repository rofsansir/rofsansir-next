"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

/**
 * maxresdefault.jpg doesn't 404 for a video without a true high-res
 * thumbnail - YouTube silently serves a 120x90 grey placeholder instead.
 * Every real thumbnail is wider than that, so checking naturalWidth on
 * load is how you detect the placeholder and fall back to hqdefault.jpg,
 * which YouTube generates for every public video.
 */
const PLACEHOLDER_WIDTH = 120;

type YouTubeThumbnailProps = { videoId: string } & Omit<ImageProps, "src">;

export function YouTubeThumbnail({ videoId, alt, ...imageProps }: YouTubeThumbnailProps) {
  const [src, setSrc] = useState(
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
  );

  return (
    <Image
      {...imageProps}
      src={src}
      alt={alt}
      onLoad={(e) => {
        if (e.currentTarget.naturalWidth <= PLACEHOLDER_WIDTH) {
          setSrc(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
        }
      }}
    />
  );
}
