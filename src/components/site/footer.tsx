import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/ui/brand-icons";
import { Container } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { mainNav, site } from "@/lib/site";

const socials = [
  { Icon: FacebookIcon, href: site.social.facebook, label: "Facebook" },
  { Icon: InstagramIcon, href: site.social.instagram, label: "Instagram" },
  { Icon: LinkedinIcon, href: site.social.linkedin, label: "LinkedIn" },
  { Icon: YoutubeIcon, href: site.social.youtube, label: "YouTube" },
];

const legalNav = [
  { label: "FAQ", href: "/faq" },
  { label: "Privacy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms-of-service" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="noise relative overflow-hidden bg-ink text-cream/70">
      <Container className="py-16 md:py-20">
        <div className="flex flex-col gap-12 md:grid md:grid-cols-[1.2fr_0.8fr_1fr] md:gap-10 lg:gap-16">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Link
              href="/"
              aria-label="Rofsan Sir   home"
              className="mx-auto inline-flex w-fit items-center justify-center rounded-[2rem] border border-cream/10 bg-cream/5 p-5 shadow-luxe backdrop-blur-sm transition-colors hover:border-marigold/30 md:mx-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/brand-logo-white.svg"
                alt="Rofsan Sir, O Level Bengali"
                className="h-28 w-auto md:h-32"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-cream/50">
              {site.tagline}. Examiner-led courses, books and past papers built
              for English-medium students.
            </p>
            <div className="flex items-center justify-center gap-3 md:justify-start">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-marigold hover:text-marigold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links + Contact: paired side by side below md, unwrapped into the 3-col grid at md+ */}
          <div className="grid grid-cols-2 gap-8 sm:gap-10 md:contents">
            {/* Quick links */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-cream/40">
                Explore
              </h3>
              <nav className="flex flex-col gap-2.5 text-sm">
                {mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="w-fit text-cream/60 transition-colors hover:text-cream"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-cream/40">
                Get in touch
              </h3>
              <div className="flex flex-col gap-2.5 text-sm">
                <span className="text-cream/60">
                  {site.address.lines.join(", ")}
                </span>
                <a
                  href={`tel:${site.contact.phonePrimaryTel}`}
                  className="w-fit text-cream/70 transition-colors hover:text-cream"
                >
                  {site.contact.phonePrimary}
                </a>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="w-fit text-cream/70 transition-colors hover:text-cream"
                >
                  {site.contact.email}
                </a>
              </div>
              <Button
                href={site.contact.whatsapp}
                external
                size="sm"
                className="mt-1 w-fit"
              >
                WhatsApp
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-cream/10 pt-8 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-xs leading-relaxed text-cream/40">
            © {year} {site.legalName}. {site.address.area}, {site.address.city}.
          </p>

          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-cream/50">
            {legalNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-cream"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <p className="text-xs text-cream/40">
            Developed by{" "}
            <a
              href={site.craft.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/60 underline-offset-2 transition-colors hover:text-marigold hover:underline"
            >
              {site.craft.name}
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
