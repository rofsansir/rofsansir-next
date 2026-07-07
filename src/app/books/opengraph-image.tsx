import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "The O Level Bengali Book Series";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    ogCard({
      eyebrow: "Book Series",
      title: "The O Level Bengali Bookshelf",
      description:
        "Five guidebooks by Rofsan Sir, built around the CAIE 3204 marking scheme.",
    }),
    OG_SIZE,
  );
}
