import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/ui/brand-icons";
import { mainNav, site } from "@/lib/site";

const socials = [
  { Icon: FacebookIcon, href: site.social.facebook, label: "Facebook" },
  { Icon: InstagramIcon, href: site.social.instagram, label: "Instagram" },
  { Icon: LinkedinIcon, href: site.social.linkedin, label: "LinkedIn" },
  { Icon: YoutubeIcon, href: site.social.youtube, label: "YouTube" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-cream/70">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-16 text-center md:px-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/brand-logo-white.svg"
          alt="Rofsan Sir"
          className="h-14 w-auto"
        />

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-cream/60 transition-colors hover:text-cream"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-1.5 text-sm">
          <span className="text-cream/60">{site.address.lines.join(", ")}</span>
          <a
            href={`tel:${site.contact.phonePrimaryTel}`}
            className="text-cream/70 transition-colors hover:text-cream"
          >
            {site.contact.phonePrimary}
          </a>
          <a
            href={`mailto:${site.contact.email}`}
            className="text-cream/70 transition-colors hover:text-cream"
          >
            {site.contact.email}
          </a>
        </div>

        <div className="flex items-center gap-3">
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

        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-cream/50">
          <Link href="/faq" className="transition-colors hover:text-cream">
            FAQ
          </Link>
          <Link
            href="/privacy-policy"
            className="transition-colors hover:text-cream"
          >
            Privacy
          </Link>
          <Link
            href="/terms-of-service"
            className="transition-colors hover:text-cream"
          >
            Terms
          </Link>
        </nav>

        <p className="max-w-md text-xs leading-relaxed text-cream/40">
          © {year} {site.legalName}. {site.address.area}, {site.address.city}. ·
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
    </footer>
  );
}
