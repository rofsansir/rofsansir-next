import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, Hind_Siliguri } from "next/font/google";
import { MotionConfig } from "motion/react";
import "./globals.css";
import { site } from "@/lib/site";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { FloatingActions } from "@/components/site/floating-actions";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bengali = Hind_Siliguri({
  variable: "--font-bengali",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.author.fullName, url: site.url }],
  creator: site.author.fullName,
  publisher: site.name,
  keywords: [
    "O Level Bengali",
    "Cambridge Bengali",
    "CAIE 3204",
    "Rofsan Sir",
    "Rofsan Khan",
    "O Level Bengali tutor",
    "English medium Bengali",
    "O Level Bengali past papers",
    "Edexcel Bengali",
    "A* Bengali",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    locale: site.locale,
    images: [
      {
        url: site.defaultOgImage,
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [site.defaultOgImage],
  },
  icons: {
    icon: [{ url: "/logos/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/logos/apple-touch-icon.png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "education",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3ede1" },
    { media: "(prefers-color-scheme: dark)", color: "#382033" },
  ],
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} ${bengali.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <MotionConfig reducedMotion="never">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingActions />
        </MotionConfig>
      </body>
    </html>
  );
}
