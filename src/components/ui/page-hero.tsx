import Image from "next/image";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { BlobField } from "@/components/ui/blob-field";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

/** Reusable inner-page hero: eyebrow + title + subtitle over the blob field.
 *  Pass `image` to switch to a two-column layout with a photo alongside the copy. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  image,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  image?: { src: string; alt: string };
}) {
  return (
    <section className="relative overflow-hidden px-4 pb-10 pt-28 md:pb-14 md:pt-36">
      <BlobField />
      <Container
        className={cn(
          "relative",
          image
            ? "grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12"
            : "flex flex-col items-start gap-4",
        )}
      >
        <div className="flex flex-col items-start gap-4">
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
        </div>

        {image && (
          <Reveal className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border-4 border-paper bg-paper shadow-luxe">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 40rem"
                className="object-cover"
              />
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
