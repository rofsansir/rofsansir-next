import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "Rofsan Sir - Hall of Fame";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    ogCard({
      eyebrow: "Hall of Fame",
      title: "Real students, real grades",
      description:
        "Meet the A* and A achievers who mastered O Level Bengali with Rofsan Sir.",
    }),
    OG_SIZE,
  );
}
