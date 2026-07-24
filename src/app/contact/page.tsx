import type { Metadata } from "next";
import { Mail, MapPin, Navigation, Phone } from "lucide-react";
import { HoverCard, HoverIcon } from "@/components/ui/hover-card";
import { PageHero } from "@/components/ui/page-hero";
import { Container, SectionHeading, ShimmerText } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Rofsan Sir   O Level Bengali coaching at 8/12, Block B, Lalmatia, Dhaka-1207. Call, WhatsApp or email for admission.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact · Rofsan Sir",
    description:
      "O Level Bengali coaching in Lalmatia, Dhaka. Call, WhatsApp or email.",
    url: `${site.url}/contact`,
  },
};

const directions = [
  "From Dhanmondi: 10 minutes via Satmasjid Road",
  "From Mirpur: 15 minutes via Ring Road",
  "Nearest landmark: Lalmatia Women College",
];

const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.740188939236!2d90.36837849999999!3d23.7566426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bffb92e1cb8d%3A0x86f96d5f0f18ee33!2sRofsan%20Sir%20-%20O%20Level%20Bengali!5e0!3m2!1sen!2sbd!4v1773096642522!5m2!1sen!2sbd";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: site.legalName,
  url: site.url,
  telephone: site.contact.phonePrimaryTel,
  email: site.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.area,
    addressRegion: site.address.city,
    postalCode: site.address.postal,
    addressCountry: "BD",
  },
  openingHours: "Sa-Th 10:00-21:00",
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Contact & Support"
        title={
          <>
            Get in touch with <ShimmerText>Rofsan Sir</ShimmerText>
          </>
        }
        subtitle="Questions about O Level Bengali classes or admission? Reach out by phone, WhatsApp or email   we're here to help."
      >
        <div className="flex flex-wrap gap-3 pt-2">
          <Button href={site.contact.whatsapp} external size="lg">
            WhatsApp Rofsan Sir
          </Button>
          <Button href={`tel:${site.contact.phonePrimaryTel}`} variant="outline" size="lg">
            Call {site.contact.phonePrimary}
          </Button>
        </div>
      </PageHero>

      {/* Contact cards */}
      <section className="px-4 py-6 md:py-10">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal>
              <HoverCard className="flex flex-col gap-2 p-5">
                <HoverIcon className="flex h-10 w-10 items-center justify-center rounded-2xl bg-marigold/15 text-marigold-deep transition-colors duration-300 group-hover:bg-marigold group-hover:text-ink">
                  <Phone className="h-5 w-5" />
                </HoverIcon>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Phone
                </p>
                <a
                  href={`tel:${site.contact.phonePrimaryTel}`}
                  className="relative z-10 font-semibold text-ink hover:text-marigold-deep"
                >
                  {site.contact.phonePrimary}
                </a>
                <a
                  href={`tel:${site.contact.phoneSecondaryTel}`}
                  className="relative z-10 text-sm text-muted hover:text-marigold-deep"
                >
                  {site.contact.phoneSecondary}
                </a>
              </HoverCard>
            </Reveal>

            <Reveal delay={0.05}>
              <HoverCard className="flex flex-col gap-2 p-5">
                <HoverIcon className="flex h-10 w-10 items-center justify-center rounded-2xl bg-marigold/15 text-marigold-deep transition-colors duration-300 group-hover:bg-marigold group-hover:text-ink">
                  <Mail className="h-5 w-5" />
                </HoverIcon>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Email
                </p>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="relative z-10 font-semibold text-ink hover:text-marigold-deep"
                >
                  {site.contact.email}
                </a>
              </HoverCard>
            </Reveal>

            <Reveal delay={0.1}>
              <HoverCard className="flex flex-col gap-2 p-5">
                <HoverIcon className="flex h-10 w-10 items-center justify-center rounded-2xl bg-marigold/15 text-marigold-deep transition-colors duration-300 group-hover:bg-marigold group-hover:text-ink">
                  <MapPin className="h-5 w-5" />
                </HoverIcon>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Campus
                </p>
                <p className="font-semibold text-ink">{site.address.lines[0]}</p>
                <p className="text-sm text-muted">{site.address.lines[1]}</p>
              </HoverCard>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Map + directions */}
      <section className="px-4 py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Visit Us"
            title="Find the campus"
            description="Located in Lalmatia, Dhaka. Reach out by phone, email or WhatsApp for admission inquiries."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Reveal>
              <div className="overflow-hidden rounded-[1.75rem] border-4 border-paper shadow-luxe">
                <iframe
                  title="Rofsan Sir   Lalmatia, Dhaka"
                  src={MAP_EMBED}
                  className="h-[22rem] w-full lg:h-full"
                  style={{ border: 0, minHeight: "22rem" }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex h-full flex-col gap-4 rounded-[1.75rem] border border-ink/10 bg-paper/70 p-6 shadow-sm">
                <div className="flex items-center gap-2 text-marigold-deep">
                  <Navigation className="h-5 w-5" />
                  <h3 className="font-display text-lg font-bold text-ink">
                    Directions
                  </h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {directions.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-2.5 text-sm text-ink/80"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-marigold" />
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-4">
                  <Button
                    href="https://maps.app.goo.gl/xGKVnJx2nLUxaEmQ8"
                    external
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    Open in Google Maps
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
