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
        "inline-flex items-center text-xs font-semibold uppercase tracking-[0.2em]",
        dark ? "text-marigold-soft" : "text-marigold-deep",
        className,
      )}
    >
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
        {numeral && <SectionNumber dark={dark}>{numeral}</SectionNumber>}
        <h2
          className={cn(
            "text-balance text-2xl font-extrabold leading-tight tracking-tight md:text-5xl",
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
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "select-none font-display text-5xl font-extrabold leading-none md:text-7xl",
        dark ? "text-outline-dark" : "text-outline",
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

/** Slowly rotating decorative sparkle (matches prototype: 8 perimeter dashes). */
export function Starburst({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      fill="none"
      className={cn("animate-spin-slow", className)}
    >
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="50" y1="2" x2="50" y2="18" />
        <line x1="50" y1="82" x2="50" y2="98" />
        <line x1="2" y1="50" x2="18" y2="50" />
        <line x1="82" y1="50" x2="98" y2="50" />
        <line x1="14" y1="14" x2="26" y2="26" />
        <line x1="74" y1="74" x2="86" y2="86" />
        <line x1="86" y1="14" x2="74" y2="26" />
        <line x1="26" y1="74" x2="14" y2="86" />
      </g>
    </svg>
  );
}
