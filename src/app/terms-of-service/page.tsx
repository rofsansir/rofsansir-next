import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/primitives";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing your use of rofsansir.com and Rofsan Sir's O Level Bengali coaching services.",
  alternates: { canonical: "/terms-of-service" },
};

const sections = [
  {
    h: "Acceptance of terms",
    p: `By accessing this website or enrolling in any program with ${site.legalName}, you agree to these terms. If you do not agree, please do not use the site or services.`,
  },
  {
    h: "Use of this website",
    p: "You may use this site for personal, non-commercial purposes. You agree not to misuse the site, attempt to gain unauthorised access, or disrupt its operation. Free study resources are provided for your learning and may not be redistributed commercially.",
  },
  {
    h: "Intellectual property",
    p: "All content on this site - including text, lessons, guidebooks, study materials, photographs and the Rofsan Sir brand - is owned by or licensed to us and protected by copyright. You may not reproduce it without permission.",
  },
  {
    h: "Courses and enrollment",
    p: "Program details, schedules, availability and any fees are provided at the time of enquiry and are subject to change. Enrollment is confirmed only upon direct agreement with Rofsan Sir. Batch sizes are limited.",
  },
  {
    h: "External links",
    p: "This site links to third-party services such as WhatsApp, YouTube and Google Maps. We are not responsible for the content or practices of those services.",
  },
  {
    h: "No guarantee of results",
    p: "While our students have achieved excellent grades, examination outcomes depend on each student's individual effort and circumstances. We do not guarantee any specific grade.",
  },
  {
    h: "Limitation of liability",
    p: "This site and its materials are provided 'as is'. To the fullest extent permitted by law, we are not liable for any indirect or consequential loss arising from the use of this site or services.",
  },
  {
    h: "Changes to these terms",
    p: "We may update these terms from time to time. Continued use of the site after changes constitutes acceptance of the revised terms.",
  },
];

export default function TermsOfServicePage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        subtitle={`Last updated: July 2026. These terms govern your use of ${site.url} and our coaching services.`}
      />
      <section className="px-4 pb-20 md:pb-28">
        <Container className="max-w-3xl">
          <div className="flex flex-col gap-8">
            {sections.map((s) => (
              <div key={s.h}>
                <h2 className="font-display text-xl font-bold text-ink">{s.h}</h2>
                <p className="mt-2 leading-relaxed text-muted">{s.p}</p>
              </div>
            ))}
            <div className="rounded-2xl border border-ink/10 bg-paper/70 p-5">
              <h2 className="font-display text-xl font-bold text-ink">Contact</h2>
              <p className="mt-2 leading-relaxed text-muted">
                Questions about these terms? Email{" "}
                <a
                  href={`mailto:${site.contact.email}`}
                  className="font-semibold text-marigold-deep hover:underline"
                >
                  {site.contact.email}
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
