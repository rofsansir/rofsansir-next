import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "O Level Bengali FAQ";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    ogCard({
      eyebrow: "FAQ",
      title: "Questions, answered",
      description:
        "O Level Bengali FAQs for students and parents — difficulty, timing, memorization and more.",
    }),
    OG_SIZE,
  );
}
