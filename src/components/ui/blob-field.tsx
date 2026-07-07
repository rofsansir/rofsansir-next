import { cn } from "@/lib/cn";

/** Drifting, blurred color blobs   matches prototype hero (gold top-right, faint plum bottom-left). */
export function BlobField({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <div className="absolute -right-24 -top-32 h-[30rem] w-[30rem] rounded-full bg-marigold/20 blur-3xl animate-blob" />
      <div className="absolute -bottom-40 -left-32 h-[30rem] w-[30rem] rounded-full bg-plum/10 blur-3xl animate-blob [animation-direction:reverse] [animation-duration:24s]" />
    </div>
  );
}
