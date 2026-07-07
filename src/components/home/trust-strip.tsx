import Image from "next/image";
import { Container } from "@/components/ui/primitives";
import { boards } from "@/data/home";

export function TrustStrip() {
  return (
    <div className="border-y border-ink/10 bg-paper/50">
      <Container className="flex flex-col items-center gap-5 py-6 md:flex-row md:justify-center md:gap-10">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Trusted Curriculum &amp; Boards
        </span>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {boards.map((b) => (
            <Image
              key={b.name}
              src={b.logo}
              alt={b.name}
              width={140}
              height={48}
              className="h-8 w-auto opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:h-10"
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
