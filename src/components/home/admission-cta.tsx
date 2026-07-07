import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Container, ShimmerText } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function AdmissionCta() {
  return (
    <section id="admission" className="px-4 py-16 md:py-24">
      <Container>
        <Reveal>
          <div className="noise relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-plum via-plum-2 to-ink px-6 py-14 text-center shadow-luxe md:px-16 md:py-20">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute -left-10 -top-10 h-60 w-60 rounded-full bg-marigold/20 blur-3xl" />
              <div className="absolute -bottom-10 -right-10 h-60 w-60 rounded-full bg-plum-3/40 blur-3xl" />
            </div>

            <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5 text-cream">
              <span className="rounded-full border border-cream/20 bg-cream/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-marigold-soft backdrop-blur">
                Admission Open
              </span>
              <h2 className="text-balance text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
                Ready to aim for <ShimmerText>A&#42;</ShimmerText>?
              </h2>
              <p className="max-w-xl text-cream/70 md:text-lg">
                Book a free consultation with Rofsan Sir and find the right batch for
                your child.
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                <Button href={site.contact.whatsapp} external size="lg">
                  <FaWhatsapp className="h-4 w-4" /> WhatsApp Rofsan Sir
                </Button>
                <Button
                  href={`tel:${site.contact.phonePrimaryTel}`}
                  variant="outline"
                  size="lg"
                  className="border-cream/20 bg-cream/5 text-cream hover:bg-cream/10"
                >
                  <Phone className="h-4 w-4" /> Call {site.contact.phonePrimary}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
