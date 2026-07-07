import { Container, Eyebrow } from "@/components/ui/primitives";
import { BlobField } from "@/components/ui/blob-field";

/** Reusable inner-page hero: eyebrow + title + subtitle over the blob field. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden px-4 pb-10 pt-28 md:pb-14 md:pt-36">
      <BlobField />
      <Container className="relative flex flex-col items-start gap-4">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {subtitle}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}
