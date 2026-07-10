import { Hero } from "@/components/home/hero";
import { Ticker } from "@/components/home/ticker";
import { AboutTeaser } from "@/components/home/about-teaser";
import { HallOfFame } from "@/components/home/hall-of-fame";
import { Gallery } from "@/components/home/gallery";
import { Testimonials } from "@/components/home/testimonials";
import { Books } from "@/components/home/books";
import { AdmissionCta } from "@/components/home/admission-cta";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${site.url}/#org`,
      name: site.legalName,
      alternateName: site.name,
      url: site.url,
      description: site.description,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.area,
        addressRegion: site.address.city,
        postalCode: site.address.postal,
        addressCountry: "BD",
      },
      telephone: site.contact.phonePrimaryTel,
      email: site.contact.email,
      founder: { "@id": `${site.url}/#person` },
      sameAs: [
        site.social.facebook,
        site.social.instagram,
        site.social.linkedin,
        site.social.youtube,
      ],
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.author.fullName,
      jobTitle: site.author.role,
      url: site.url,
      worksFor: { "@id": `${site.url}/#org` },
      knowsAbout: ["O Level Bengali", "Cambridge CAIE", "CAIE Subject 3204"],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: site.url,
      publisher: { "@id": `${site.url}/#org` },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Ticker />
      <AboutTeaser />
      <HallOfFame />
      <Gallery />
      <Testimonials />
      <Books />
      <AdmissionCta />
    </>
  );
}
