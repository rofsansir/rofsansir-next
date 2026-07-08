import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "About Rofsan Sir";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    ogCard({
      eyebrow: "About",
      title: "Meet your Bengali Teacher",
      description:
        "CAIE-approved O Level Bengali Examiner, author and educator with 9+ years guiding English-medium students to A*.",
    }),
    OG_SIZE,
  );
}
