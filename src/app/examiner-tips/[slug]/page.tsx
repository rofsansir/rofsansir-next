import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight, Clock } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { getArticle, relatedArticles } from "@/data/tip-articles";
import { getTipArticles } from "@/lib/remote-content";
import { sanitizeHtml } from "@/lib/sanitize-html";
import { stripHtml } from "@/lib/text";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  const articles = await getTipArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const articles = await getTipArticles();
  const article = getArticle(articles, slug);
  if (!article) return { title: "Not found" };
  const description =
    article.subtitle || stripHtml(article.contentHtml).slice(0, 155) || article.title;
  return {
    title: article.title,
    description,
    alternates: { canonical: `/examiner-tips/${slug}` },
    openGraph: {
      title: `${article.title} · Rofsan Sir`,
      description,
      url: `${site.url}/examiner-tips/${slug}`,
      type: "article",
    },
  };
}

export default async function TipArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articles = await getTipArticles();
  const article = getArticle(articles, slug);
  if (!article) notFound();

  const related = relatedArticles(articles, article);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.subtitle,
    inLanguage: ["en", "bn"],
    author: { "@type": "Person", name: site.author.fullName, url: site.url },
    publisher: { "@type": "Organization", name: site.legalName, url: site.url },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Examiner Tips", item: `${site.url}/examiner-tips` },
      { "@type": "ListItem", position: 2, name: article.title, item: `${site.url}/examiner-tips/${slug}` },
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
            <Link href="/examiner-tips" className="hover:text-marigold-deep">
              Examiner Tips
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="line-clamp-1 text-ink/70">{article.title}</span>
          </nav>
        </Container>
      </section>

      {/* Header */}
      <section className="px-4 py-8 md:py-12">
        <Container className="max-w-3xl">
          <div className="flex items-center gap-3">
            <Eyebrow>{article.category}</Eyebrow>
            <span className="flex items-center gap-1 text-xs text-muted">
              <Clock className="h-3.5 w-3.5" />
              {article.readTime}
            </span>
          </div>
          <h1 className="mt-4 text-balance text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
            {article.title}
          </h1>
          {article.subtitle && (
            <p className="mt-3 text-lg leading-relaxed text-muted">
              {article.subtitle}
            </p>
          )}
          <div className="mt-5 flex items-center gap-3 border-t border-ink/5 pt-4 text-sm text-muted">
            <span className="font-semibold text-ink">Rofsan Sir</span>
            <span>·</span>
            <span>CAIE O Level Bengali Examiner</span>
          </div>
        </Container>
      </section>

      {/* Body */}
      <section className="px-4 pb-6">
        <Container className="max-w-3xl">
          <div className="overflow-hidden rounded-[1.5rem] border border-ink/10 shadow-card">
            <Image
              src={article.thumb}
              alt={article.title}
              width={1200}
              height={675}
              sizes="(max-width: 768px) 100vw, 768px"
              className="h-auto w-full object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="px-4 pb-14 md:pb-20">
        <Container className="max-w-3xl">
          <div
            className="tips-content flex flex-col gap-5 text-[1.02rem] leading-[1.85] text-ink/85"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.contentHtml) }}
          />

          <div className="mt-10 rounded-[1.5rem] border border-ink/10 bg-paper/70 p-6 text-center">
            <p className="font-display text-lg font-bold text-ink">
              Have a question about this?
            </p>
            <p className="mt-1 text-sm text-muted">
              WhatsApp Rofsan Sir for personalised guidance.
            </p>
            <Button href={site.contact.whatsapp} external size="md" className="mt-4">
              Ask Rofsan Sir
            </Button>
          </div>
        </Container>
      </section>

      {/* Related */}
      <section className="bg-paper/60 px-4 py-14 md:py-20">
        <Container>
          <div className="mb-6 flex items-end justify-between">
            <Eyebrow>Keep Reading</Eyebrow>
            <Link
              href="/examiner-tips"
              className="flex items-center gap-1 text-sm font-semibold text-marigold-deep hover:underline"
            >
              All tips <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={(i % 3) * 0.05}>
                <Link
                  href={`/examiner-tips/${r.slug}`}
                  className="group flex h-full items-start gap-4 rounded-2xl border border-ink/10 bg-cream p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-card"
                >
                  <Image
                    src={r.thumb}
                    alt=""
                    width={56}
                    height={56}
                    className="h-14 w-14 shrink-0 rounded-xl object-cover"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-marigold-deep">
                      {r.category}
                    </span>
                    <h3 className="mt-1 line-clamp-2 font-semibold leading-snug text-ink">
                      {r.title}
                    </h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
