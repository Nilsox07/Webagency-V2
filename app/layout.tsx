import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LumiWidget } from "@/components/lumi/LumiWidget";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { JsonLd, organizationSchema, websiteSchema } from "@/components/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} – Webdesign zum Festpreis`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Webdesign Festpreis",
    "Website erstellen lassen",
    "Webdesign Agentur",
    "SEO",
    "Lokales SEO",
    "GEO",
  ],
  authors: [{ name: siteConfig.owner.name }],
  creator: siteConfig.owner.name,
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} – ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} – Webdesign zum Festpreis`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <a href="#main" className="skip-link">
          Zum Hauptinhalt springen
        </a>
        <SmoothScroll>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
        <LumiWidget />
      </body>
    </html>
  );
}
