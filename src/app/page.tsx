import { site } from "@/lib/site";

/**
 * Temporary branded hero (Phase 0). Verifies the design system renders
 * (fonts, palette, shimmer, marquee, noise). Replaced by the full prototype
 * homepage in Phase 2.
 */
export default function Home() {
  const ticker = [
    "A*",
    "99 marks",
    "3,000+ students",
    "Cambridge Examiner",
    "5 published books",
    "8+ years",
  ];

  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-28 pb-16 md:pt-40 md:pb-24">
        {/* drifting blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-marigold/30 blur-3xl animate-blob" />
          <div className="absolute top-1/3 -right-24 h-[32rem] w-[32rem] rounded-full bg-plum/30 blur-3xl animate-blob [animation-delay:-8s]" />
        </div>

        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-paper/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted shadow-sm backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping-soft rounded-full bg-marigold" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-marigold-deep" />
            </span>
            CAIE Examiner · 8+ Years
          </span>

          <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
            Your route to <span className="text-shimmer">A&#42;</span> in O Level Bengali
          </h1>

          <p className="mt-6 max-w-xl text-base text-muted md:text-lg">
            {site.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={site.contact.whatsapp}
              className="rounded-full bg-marigold px-6 py-3 text-sm font-semibold text-ink shadow-card transition-transform hover:-translate-y-0.5"
            >
              Start Learning
            </a>
            <a
              href="#ticker"
              className="rounded-full border border-ink/15 bg-paper/60 px-6 py-3 text-sm font-semibold text-ink backdrop-blur transition-colors hover:border-ink/30"
            >
              View Books
            </a>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <section id="ticker" className="overflow-hidden border-y border-ink/10 bg-plum text-cream">
        <div className="flex w-max animate-marquee gap-12 py-4 pr-12">
          {[...ticker, ...ticker, ...ticker].map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-12 text-sm font-semibold uppercase tracking-widest"
            >
              {t}
              <span className="text-marigold">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* Status note */}
      <section className="mx-auto w-full max-w-3xl px-4 py-20 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">
          Build status · Phase 0 complete
        </p>
        <p className="mt-3 text-lg text-ink">
          Foundation &amp; design system live. Full homepage landing in Phase 2.
        </p>
        <p className="mt-2 text-sm text-muted">
          Next: design-system components (Phase 1) → prototype homepage (Phase 2).
        </p>
      </section>
    </main>
  );
}
