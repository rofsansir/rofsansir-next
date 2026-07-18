import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, ChevronRight, CheckCircle2 } from "lucide-react";
import { Container, Eyebrow, ShimmerText } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { BookCoverFlip } from "@/components/books/book-cover-flip";
import { books } from "@/data/books";
import { getBookDetail } from "@/data/book-detail";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = books.find((b) => b.slug === slug);
  if (!book) return { title: "Not found" };
  return {
    title: book.title,
    description: book.summary,
    alternates: { canonical: `/books/${slug}` },
    openGraph: {
      title: `${book.title} · Rofsan Sir`,
      description: book.summary,
      url: `${site.url}/books/${slug}`,
      type: "article",
    },
  };
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = books.find((b) => b.slug === slug);
  const detail = getBookDetail(slug);
  if (!book) notFound();

  const related = books.filter((b) => b.slug !== slug).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    description: book.summary,
    author: { "@type": "Person", name: site.author.fullName },
    bookFormat: "https://schema.org/Paperback",
    inLanguage: "bn",
    publisher: { "@type": "Organization", name: site.legalName },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Books", item: `${site.url}/books` },
      { "@type": "ListItem", position: 2, name: book.title, item: `${site.url}/books/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* Breadcrumb */}
      <section className="px-4 pt-28 md:pt-32">
        <Container>
          <nav className="flex flex-wrap items-center gap-1 text-xs text-muted">
            <Link href="/books" className="hover:text-marigold-deep">
              Books
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-ink/70">{book.title}</span>
          </nav>
        </Container>
      </section>

      {/* Hero */}
      <section className="px-4 py-10 md:py-14">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          {/* Cover */}
          <Reveal>
            <BookCoverFlip book={book} />
          </Reveal>

          {/* Copy */}
          <div className="flex flex-col gap-4">
            <Eyebrow>Code · {book.code}</Eyebrow>
            <h1 className="text-balance text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
              {book.title}
            </h1>
            <p className="text-lg font-semibold text-marigold-deep">
              {book.subtitle}
            </p>
            {detail && (
              <p className="text-sm font-medium text-muted">{detail.author}</p>
            )}
            <p className="leading-relaxed text-ink/80">
              {detail?.code ?? book.summary}
            </p>

            <div className="mt-2 flex flex-wrap gap-3">
              <Button href="/courses" size="lg">
                Learn with these books
              </Button>
              <Button href={site.contact.whatsapp} external variant="outline" size="lg">
                Ask on WhatsApp
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Sections */}
      {detail && detail.sections.length > 0 && (
        <section className="bg-paper/60 px-4 py-14 md:py-20">
          <Container className="max-w-3xl">
            <div className="flex flex-col gap-10">
              {detail.sections.map((s, i) => (
                <Reveal key={s.heading} delay={(i % 3) * 0.04}>
                  <div>
                    <div className="flex items-center gap-2 text-marigold-deep">
                      <BookOpen className="h-5 w-5" />
                      <h2 className="font-display text-xl font-bold text-ink md:text-2xl">
                        {s.heading}
                      </h2>
                    </div>
                    <div className="mt-3 flex flex-col gap-3">
                      {s.content.map((p, k) => (
                        <p key={k} className="flex gap-2.5 leading-relaxed text-muted">
                          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-marigold/60" />
                          <span>{p}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Related */}
      <section className="px-4 py-14 md:py-20">
        <Container>
          <div className="mb-6 flex items-end justify-between">
            <Eyebrow>More Books</Eyebrow>
            <Link
              href="/books"
              className="flex items-center gap-1 text-sm font-semibold text-marigold-deep hover:underline"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((b) => (
              <Link
                key={b.slug}
                href={`/books/${b.slug}`}
                className="group flex flex-col rounded-2xl border border-ink/10 bg-paper/70 p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-card"
              >
                <div className="relative mx-auto aspect-[3/4] w-28 overflow-hidden rounded-xl bg-cream p-2">
                  <div className="relative h-full w-full">
                    <Image
                      src={b.image}
                      alt={b.title}
                      fill
                      sizes="112px"
                      className="object-contain"
                    />
                  </div>
                </div>
                <h3 className="mt-3 text-center text-sm font-semibold leading-snug text-ink">
                  {b.title}
                </h3>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16 md:pb-24">
        <Container>
          <div className="flex flex-col items-center gap-5 rounded-[2rem] bg-gradient-to-br from-plum via-plum-2 to-ink p-8 text-center text-cream shadow-luxe md:p-12">
            <h2 className="text-balance text-2xl font-extrabold tracking-tight md:text-3xl">
              Get the full <ShimmerText>series</ShimmerText>
            </h2>
            <p className="max-w-xl text-cream/70">
              Build your complete O Level Bengali toolkit with all five
              guidebooks by Rofsan Sir.
            </p>
            <Button href="/books" variant="primary" size="lg">
              Browse the Bookshelf
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
