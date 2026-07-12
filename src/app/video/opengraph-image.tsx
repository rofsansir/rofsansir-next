import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Examiner Tip Videos - Rofsan Sir";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    ogCard({
      eyebrow: "Watch & Learn",
      title: "Examiner tip videos",
      description:
        "Examiner-led O Level Bengali video lessons - paper strategy, technique and exam-day tips.",
    }),
    OG_SIZE,
  );
}
