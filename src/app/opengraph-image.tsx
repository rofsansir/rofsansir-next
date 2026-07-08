import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Rofsan Sir - Your route to A* in O Level Bengali";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    ogCard({
      eyebrow: "CAIE Examiner · 9+ Years",
      title: "Your route to A* in O Level Bengali",
      description:
        "Master O Level Bengali with CAIE Examiner Rofsan Sir. Hall of Fame, examiner tips, free past papers and the O Level Bengali guidebook series.",
    }),
    OG_SIZE,
  );
}
