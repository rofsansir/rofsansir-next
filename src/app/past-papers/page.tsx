import type { Metadata } from "next";
import { FileStack } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Container, ShimmerText } from "@/components/ui/primitives";
import { PastPaperBrowser } from "@/components/past-papers/browser";
import { getYears } from "@/data/past-papers";
import { getPastPapers } from "@/lib/remote-content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Past Papers - CAIE O Level Bengali (3204)",
  description:
    "Free CAIE O Level Bengali (3204) past papers, 2004–2025. Download question papers and mark schemes with examiner guidance from Rofsan Sir.",
  alternates: { canonical: "/past-papers" },
  openGraph: {
    title: "O Level Bengali Past Papers (CAIE 3204) · Rofsan Sir",
    description:
      "Free CAIE 3204 past papers 2004–2025 - question papers and mark schemes.",
    url: `${site.url}/past-papers`,
  },
};

export default async function PastPapersPage() {
  const pastPapers = await getPastPapers();
  const years = getYears(pastPapers);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  return (
    <>
      <PageHero
        eyebrow="Free Library"
        title={
          <>
            O Level Bengali <ShimmerText>past papers</ShimmerText>
          </>
        }
        subtitle={`Every CAIE O Level Bengali (3204) paper we could gather - ${pastPapers.length} papers from ${minYear} to ${maxYear}. Question papers, mark schemes and examiner materials, free to download.`}
      />

      <section className="px-4 py-10 md:py-14">
        <Container>
          <div className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl border border-ink/10 bg-paper/70 p-4 text-sm shadow-sm">
            <span className="flex items-center gap-2 font-semibold text-ink">
              <FileStack className="h-4 w-4 text-marigold-deep" />
              {pastPapers.length} papers
            </span>
            <span className="text-muted">Subject code 3204 · Cambridge CAIE</span>
            <span className="ml-auto text-muted">
              {minYear}–{maxYear}
            </span>
          </div>

          <PastPaperBrowser papers={pastPapers} years={years} />
        </Container>
      </section>
    </>
  );
}
