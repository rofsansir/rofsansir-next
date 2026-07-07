import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight, Download, FileText } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import {
  formatBytes,
  getPaper,
  pastPapers,
  relatedByYear,
} from "@/data/past-papers";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return pastPapers.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const paper = getPaper(slug);
  if (!paper) return { title: "Not found" };

  const title = `${paper.title} (${paper.paperType})`;
  return {
    title,
    description: paper.description,
    alternates: { canonical: `/past-papers/${slug}` },
    openGraph: {
      title: `${title} · Rofsan Sir`,
      description: paper.description,
      url: `${site.url}/past-papers/${slug}`,
      type: "article",
    },
  };
}

export default async function PastPaperDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const paper = getPaper(slug);
  if (!paper) notFound();

  const related = relatedByYear(paper);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: paper.title,
    description: paper.description,
    inLanguage: "bn",
    learningResourceType: "Examination Paper",
    educationalLevel: "O Level",
    about: "Cambridge O Level Bengali 3204",
    isAccessibleForFree: true,
    provider: { "@type": "Organization", name: site.legalName, url: site.url },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Past Papers", item: `${site.url}/past-papers` },
      { "@type": "ListItem", position: 2, name: paper.title, item: `${site.url}/past-papers/${slug}` },
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
            <Link href="/past-papers" className="hover:text-marigold-deep">
              Past Papers
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-ink/70">{paper.title}</span>
          </nav>
        </Container>
      </section>

      {/* Detail */}
      <section className="px-4 py-10 md:py-14">
        <Container className="max-w-3xl">
          <Eyebrow>{paper.paperType} · {paper.year}</Eyebrow>
          <h1 className="mt-3 text-balance text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
            {paper.title}
          </h1>
          <p className="mt-4 leading-relaxed text-muted">{paper.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-marigold-deep" />
              {formatBytes(paper.fileSize) || "PDF"}
            </span>
            <span>Subject code · 3204</span>
            <span>Board · Cambridge CAIE</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={paper.url} external size="lg">
              <Download className="h-4 w-4" /> Download PDF
            </Button>
            <Button href="/past-papers" variant="outline" size="lg">
              All Past Papers
            </Button>
          </div>
        </Container>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-paper/60 px-4 py-14 md:py-20">
          <Container>
            <div className="mb-6 flex items-end justify-between">
              <Eyebrow>More from {paper.year}</Eyebrow>
              <Link
                href="/past-papers"
                className="flex items-center gap-1 text-sm font-semibold text-marigold-deep hover:underline"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => (
                <Reveal key={r.slug} delay={(i % 3) * 0.05}>
                  <Link
                    href={`/past-papers/${r.slug}`}
                    className="group flex flex-col rounded-2xl border border-ink/10 bg-cream p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-card"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-ink/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted">
                        {r.paperType}
                      </span>
                      <span className="text-xs font-bold text-muted">{r.year}</span>
                    </div>
                    <h3 className="mt-3 font-semibold leading-snug text-ink">
                      {r.title}
                    </h3>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
