import { cn } from "@/lib/cn";

/** Drifting, blurred color blobs for section backgrounds. Decorative. */
export function BlobField({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <div className="absolute -left-24 -top-24 h-[26rem] w-[26rem] rounded-full bg-marigold/30 blur-3xl animate-blob" />
      <div className="absolute top-1/3 -right-24 h-[30rem] w-[30rem] rounded-full bg-plum/30 blur-3xl animate-blob [animation-delay:-8s]" />
      <div className="absolute -bottom-24 left-1/4 h-[24rem] w-[24rem] rounded-full bg-rose/20 blur-3xl animate-blob [animation-delay:-14s]" />
    </div>
  );
}
