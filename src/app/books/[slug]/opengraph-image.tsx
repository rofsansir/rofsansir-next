import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from "@/lib/og";
import { books } from "@/data/books";

export const alt = "Rofsan Sir - O Level Bengali guidebook";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = books.find((b) => b.slug === slug);
  return new ImageResponse(
    ogCard({
      eyebrow: "Book Series",
      title: book?.title ?? "O Level Bengali",
      description: book?.summary,
    }),
    OG_SIZE,
  );
}
