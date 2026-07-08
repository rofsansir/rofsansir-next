import { Container, Eyebrow, SectionNumber } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { aboutTeaser } from "@/data/home";

export function AboutTeaser() {
  return (
    <section id="video" className="px-4 py-16 md:py-24">
      <Container>
        <div className="flex flex-col gap-3">
          <Eyebrow>{aboutTeaser.eyebrow}</Eyebrow>
          <div className="flex items-center gap-4">
            <SectionNumber>01</SectionNumber>
            <h2 className="text-2xl font-extrabold leading-tight tracking-tight md:text-5xl">
              {aboutTeaser.title}
            </h2>
          </div>
        </div>

        <Reveal className="relative mt-8">
          <div className="pointer-events-none absolute -inset-10 -z-10 bg-gradient-to-tr from-marigold/25 via-transparent to-plum/25 blur-3xl" />
          <div className="relative mx-auto aspect-video max-w-4xl overflow-hidden rounded-[2rem] border-4 border-paper bg-ink shadow-luxe">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${aboutTeaser.videoId}?rel=0`}
              title={aboutTeaser.title}
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </Reveal>

        <div className="mt-6 flex justify-center">
          <Button href="#admission" variant="dark">
            Book a Free Consultation
          </Button>
        </div>
      </Container>
    </section>
  );
}
