import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Terms of Service";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    ogCard({
      eyebrow: "Legal",
      title: "Terms of Service",
      description: "The terms governing your use of rofsansir.com and our coaching services.",
    }),
    OG_SIZE,
  );
}
