import { cn } from "@/lib/cn";

/**
 * Infinite CSS marquee. Duplicates children for a seamless loop and pauses on
 * hover. `speed`: "normal" (32s) | "slow" (70s). Pure CSS — no JS.
 */
export function Marquee({
  children,
  speed = "normal",
  className,
  itemClassName,
}: {
  children: React.ReactNode;
  speed?: "normal" | "slow";
  className?: string;
  itemClassName?: string;
}) {
  return (
    <div className={cn("flex overflow-hidden", className)}>
      <div
        className={cn(
          "marquee-track",
          speed === "slow" ? "animate-marquee-slow" : "animate-marquee",
        )}
      >
        <div className={cn("flex shrink-0", itemClassName)}>{children}</div>
        <div className={cn("flex shrink-0", itemClassName)} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
