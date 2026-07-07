import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Contact Rofsan Sir";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    ogCard({
      eyebrow: "Contact",
      title: "Get in touch with Rofsan Sir",
      description:
        "O Level Bengali coaching in Lalmatia, Dhaka. Call, WhatsApp or email for admission.",
    }),
    OG_SIZE,
  );
}
