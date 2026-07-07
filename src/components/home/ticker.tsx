import { Marquee } from "@/components/ui/marquee";
import { tickerItems } from "@/data/home";

export function Ticker() {
  return (
    <section
      aria-hidden
      className="overflow-hidden border-y border-plum-3/30 bg-plum text-cream"
    >
      <Marquee speed="normal" className="py-4" itemClassName="gap-10 pr-10">
        {tickerItems.map((t) => (
          <span
            key={t}
            className="flex items-center gap-10 text-sm font-semibold uppercase tracking-[0.2em] text-cream/90"
          >
            {t}
            <span className="text-marigold">✦</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
