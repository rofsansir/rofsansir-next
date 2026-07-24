import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";

export const alt = "O Level Bengali Courses & Admission";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    ogCard({
      eyebrow: "Courses",
      title: "O Level Bengali Courses",
      description:
        "Batches for Class VIII, IX and X - online & offline, aligned with syllabus 3204.",
    }),
    OG_SIZE,
  );
}
