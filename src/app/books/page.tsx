import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Container, ShimmerText } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { books } from "@/data/books";

export const metadata: Metadata = {
  title: "Books   O Level Bengali Book Series",
  description:
    "The O Level Bengali Plus series by Rofsan Sir   Basic, Composition, Practice, Revision and Foundation Plus. Guides for CAIE 3204 Paper 01 & Paper 02.",
  alternates: { canonical: "/books" },
  openGraph: {
    title: "The O Level Bengali Book Series · Rofsan Sir",
    description:
      "Five guidebooks by Rofsan Sir covering CAIE 3204 Paper 01 & Paper 02.",
    url: `${site.url}/books`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "O Level Bengali Book Series",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  numberOfItems: books.length,
  itemListElement: books.map((b, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Book",
      name: b.title,
      author: { "@type": "Person", name: site.author.fullName },
      description: b.summary,
    },
  })),
};

export default function BooksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="The Book Series"
        title={
          <>
            The O Level Bengali <ShimmerText>bookshelf</ShimmerText>
          </>
        }
        subtitle="Five guidebooks by Rofsan Sir, built around the CAIE 3204 marking scheme   from first foundations to final revision."
      />

      <section className="px-4 pb-20 md:pb-28">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((b, i) => (
              <Reveal key={b.slug} delay={(i % 3) * 0.06}>
                <Link
                  href={`/books/${b.slug}`}
                  className="group flex h-full flex-col rounded-[1.75rem] border border-ink/10 bg-paper/70 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-marigold/40 hover:shadow-card"
                >
                  <div className="relative mx-auto aspect-[3/4] w-44 overflow-hidden rounded-2xl bg-cream shadow-luxe">
                    <Image
                      src={b.image}
                      alt={b.title}
                      fill
                      sizes="176px"
                      className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                    />
                    {b.badge && (
                      <span
                        className={cn(
                          "absolute left-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
                          b.badgeTone === "emerald"
                            ? "bg-emerald-300 text-emerald-950"
                            : "bg-marigold text-ink",
                        )}
                      >
                        {b.badge}
                      </span>
                    )}
                  </div>

                  <div className="mt-5 flex flex-1 flex-col">
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-marigold-deep">
                      <BookOpen className="h-3.5 w-3.5" />
                      Code · {b.code}
                    </div>
                    <h2 className="mt-2 font-display text-lg font-bold leading-snug text-ink">
                      {b.title}
                    </h2>
                    <p className="mt-1 text-sm font-medium text-muted">
                      {b.subtitle}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ink/75">
                      {b.summary}
                    </p>
                  </div>

                  <span className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-marigold-deep">
                    View details
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
