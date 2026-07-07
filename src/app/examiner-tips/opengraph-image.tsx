import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Examiner Tips & Videos — Rofsan Sir";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    ogCard({
      eyebrow: "Examiner Insights",
      title: "Tips from the examiner's desk",
      description:
        "Examiner-led O Level Bengali tips, paper strategies and video lessons.",
    }),
    OG_SIZE,
  );
}
