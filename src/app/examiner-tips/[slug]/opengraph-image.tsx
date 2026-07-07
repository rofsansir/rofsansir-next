import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";
import { getArticle } from "@/data/tip-articles";

export const alt = "Examiner tip — Rofsan Sir";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  return new ImageResponse(
    ogCard({
      eyebrow: article?.category ?? "Examiner Insight",
      title: article?.ogTitle ?? "Examiner Tips",
      description: article?.subtitle,
    }),
    OG_SIZE,
  );
}
