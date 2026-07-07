import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Free O Level Bengali Resources";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    ogCard({
      eyebrow: "Free Resources",
      title: "Download & learn",
      description:
        "Free O Level Bengali study PDFs — letter formats, essays, idioms, shor shondhi formulas and comprehension.",
    }),
    OG_SIZE,
  );
}
