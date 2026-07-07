import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";
import { getPaper } from "@/data/past-papers";

export const alt = "O Level Bengali past paper (CAIE 3204)";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const paper = getPaper(slug);
  return new ImageResponse(
    ogCard({
      eyebrow: paper ? `CAIE 3204 · ${paper.year}` : "CAIE 3204",
      title: paper?.title ?? "O Level Bengali Past Paper",
      description: paper?.description,
    }),
    OG_SIZE,
  );
}
