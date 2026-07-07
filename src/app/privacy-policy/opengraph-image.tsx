import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Privacy Policy";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    ogCard({
      eyebrow: "Legal",
      title: "Privacy Policy",
      description: "How Rofsan Sir collects, uses and protects your information.",
    }),
    OG_SIZE,
  );
}
