import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/primitives";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Rofsan Sir collects, uses and protects your information when you use rofsansir.com.",
  alternates: { canonical: "/privacy-policy" },
};

const sections = [
  {
    h: "Information we collect",
    p: "We only collect the information you choose to share with us - for example, your name, phone number or message when you contact us via WhatsApp, phone, email or an admission enquiry form. We do not require you to create an account to browse this website.",
  },
  {
    h: "How we use your information",
    p: "Your information is used solely to respond to your enquiries, discuss admission and coaching, and provide the support you request. We never sell or rent your personal information to third parties.",
  },
  {
    h: "Cookies and analytics",
    p: "This site may use privacy-friendly analytics to understand aggregate traffic and improve content. We do not use advertising trackers. Any cookies used are limited to site functionality and anonymised measurement.",
  },
  {
    h: "Third-party services",
    p: "Some features link to or embed third-party services - including WhatsApp, YouTube (video lessons) and Google Maps (campus location). These services have their own privacy policies and may set their own cookies when you interact with them.",
  },
  {
    h: "Data security",
    p: "We take reasonable measures to protect the information you share. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
  },
  {
    h: "Your rights",
    p: "You may request access to, correction of, or deletion of any personal information you have shared with us by contacting us using the details below.",
  },
  {
    h: "Changes to this policy",
    p: "We may update this policy from time to time. Any changes will be posted on this page with a revised date.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle={`Last updated: July 2026. This policy explains how ${site.legalName} handles your information.`}
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
                Questions about this policy? Email{" "}
                <a
                  href={`mailto:${site.contact.email}`}
                  className="font-semibold text-marigold-deep hover:underline"
                >
                  {site.contact.email}
                </a>{" "}
                or call{" "}
                <a
                  href={`tel:${site.contact.phonePrimaryTel}`}
                  className="font-semibold text-marigold-deep hover:underline"
                >
                  {site.contact.phonePrimary}
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
