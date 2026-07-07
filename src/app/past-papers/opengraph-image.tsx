import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "O Level Bengali Past Papers (CAIE 3204)";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    ogCard({
      eyebrow: "Free Library",
      title: "O Level Bengali Past Papers",
      description:
        "Free CAIE O Level Bengali (3204) past papers, 2004–2025. Question papers and mark schemes.",
    }),
    OG_SIZE,
  );
}
