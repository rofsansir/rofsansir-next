"use client";

import { useMemo, useState } from "react";
import { Download, FileText, Search } from "lucide-react";
import { cn } from "@/lib/cn";
import { HoverCard } from "@/components/ui/hover-card";
import { formatBytes, paperTypes, type PastPaper } from "@/data/past-papers";

const typeTone: Record<string, string> = {
  "Paper 1": "bg-marigold/15 text-marigold-deep",
  "Paper 2": "bg-teal/10 text-teal",
  "Mark Scheme": "bg-plum/10 text-plum",
  General: "bg-ink/5 text-muted",
};

export function PastPaperBrowser({
  papers,
  years,
}: {
  papers: PastPaper[];
  years: number[];
}) {
  const [year, setYear] = useState<number | "all">("all");
  const [type, setType] = useState<string>("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return papers.filter((p) => {
      if (year !== "all" && p.year !== year) return false;
      if (type !== "all" && p.paperType !== type) return false;
      if (query && !p.title.toLowerCase().includes(query)) return false;
      return true;
    });
  }, [papers, year, type, q]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search papers..."
            className="w-full rounded-full border border-ink/15 bg-paper py-2.5 pl-9 pr-4 text-sm text-ink outline-none focus:border-marigold"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {["all", ...paperTypes].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
                type === t
                  ? "bg-ink text-cream"
                  : "bg-ink/5 text-ink/70 hover:bg-ink/10",
              )}
            >
              {t === "all" ? "All types" : t}
            </button>
          ))}
        </div>

        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          <button
            type="button"
            onClick={() => setYear("all")}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
              year === "all"
                ? "bg-marigold text-ink"
                : "bg-ink/5 text-ink/70 hover:bg-ink/10",
            )}
          >
            All years
          </button>
          {years.map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => setYear(y)}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                year === y
                  ? "bg-marigold text-ink"
                  : "bg-ink/5 text-ink/70 hover:bg-ink/10",
              )}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted">
        {filtered.length} paper{filtered.length !== 1 ? "s" : ""}
        {year !== "all" ? ` · ${year}` : ""}
        {type !== "all" ? ` · ${type}` : ""}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-muted">
          No papers match your filters.
        </p>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <HoverCard
              key={p.slug}
              href={`/past-papers/${p.slug}`}
              className="flex flex-col p-5"
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
                    typeTone[p.paperType] ?? typeTone.General,
                  )}
                >
                  {p.paperType}
                </span>
                <span className="text-xs font-bold text-muted">{p.year}</span>
              </div>
              <h3 className="mt-3 font-semibold leading-snug text-ink">
                {p.title}
              </h3>
              <div className="mt-auto flex items-center justify-between pt-4 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5" />
                  {formatBytes(p.fileSize) || "PDF"}
                </span>
                <span className="flex items-center gap-1 font-semibold text-marigold-deep opacity-0 transition-opacity group-hover:opacity-100">
                  <Download className="h-3.5 w-3.5" />
                  View
                </span>
              </div>
            </HoverCard>
          ))}
        </div>
      )}
    </div>
  );
}
