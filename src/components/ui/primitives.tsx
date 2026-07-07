import { cn } from "@/lib/cn";

/** Centered max-width page container. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 md:px-6", className)}>
      {children}
    </div>
  );
}

/** Uppercase tracking eyebrow with a short rule. */
export function Eyebrow({
  children,
  className,
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em]",
        dark ? "text-marigold-soft" : "text-marigold-deep",
        className,
      )}
    >
      <span
        className={cn("h-px w-8", dark ? "bg-marigold-soft/50" : "bg-marigold/70")}
      />
      {children}
    </span>
  );
}

/** Section heading with optional outline numeral. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  numeral,
  dark = false,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  numeral?: string;
  dark?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <div className="flex items-start gap-4">
        {numeral && <SectionNumber>{numeral}</SectionNumber>}
        <h2
          className={cn(
            "text-balance text-3xl font-extrabold leading-tight tracking-tight md:text-5xl",
            dark ? "text-cream" : "text-ink",
          )}
        >
          {title}
        </h2>
      </div>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed md:text-lg",
            dark ? "text-cream/70" : "text-muted",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/** Large outline numeral ("01"–"05"). */
export function SectionNumber({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "select-none font-display text-5xl font-extrabold leading-none text-outline md:text-7xl",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Shimmering gold text (the "A*"). */
export function ShimmerText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={cn("text-shimmer", className)}>{children}</span>;
}

/** Slowly rotating decorative starburst. */
export function Starburst({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      className={cn("animate-spin-slow", className)}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={i}
          x1="50"
          y1="50"
          x2="50"
          y2="6"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          transform={`rotate(${i * 30} 50 50)`}
        />
      ))}
    </svg>
  );
}
