import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading, Container, Card } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/CtaBanner";
import { wave1Locations, wave2Locations } from "@/lib/locations";
import { branchen } from "@/lib/branchen";

export const metadata: Metadata = {
  title: "Webdesign Dresden & Sachsen – Festpreis-Websites ab 990 €",
  description:
    "Webdesign aus Dresden für ganz Sachsen: schnelle, barrierearme Festpreis-Websites ab 990 €. Lokale Landingpages für Pirna, Radebeul, Meißen, Bautzen, Görlitz & mehr.",
  alternates: { canonical: "/webdesign" },
};

export default function WebdesignHubPage() {
  return (
    <>
      <PageHero
        eyebrow="Webdesign in Sachsen"
        title="Webdesign aus Dresden – für ganz Sachsen"
        intro="Wir bauen Festpreis-Websites für lokale Unternehmen in Dresden und der Region: ab 990 €, blitzschnell (Next.js, Top Core Web Vitals), barrierearm und lokal auffindbar. Wähle deinen Ort oder deine Branche – oder starte direkt das Briefing mit Lumi."
        breadcrumbs={[{ name: "Webdesign in Sachsen", path: "/webdesign" }]}
      />

      {/* Vorteil-Block */}
      <Section>
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "euro", t: "Festpreis ab 990 €", d: "Transparent statt Angebotschaos." },
              { icon: "rocket", t: "Schnellste Technik", d: "Next.js, Top Core Web Vitals." },
              { icon: "pin", t: "Lokal in Sachsen", d: "Dresden & Umland, persönlich." },
              { icon: "shieldCheck", t: "Barrierearm", d: "WCAG-orientiert, ohne Overlay." },
            ].map((x) => (
              <Card key={x.t}>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name={x.icon} className="h-5 w-5" />
                </span>
                <h2 className="mt-4 text-base font-semibold text-slate-900">{x.t}</h2>
                <p className="prose-text mt-1 text-sm">{x.d}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Städte */}
      <Section muted>
        <Container>
          <SectionHeading
            eyebrow="Standorte"
            title="Webdesign in deiner Stadt"
            intro="Lokale Seiten mit echtem Bezug zu deinem Ort – inkl. lokalem SEO für bessere Sichtbarkeit in deiner Region."
          />
          <div className="mt-8">
            <p className="text-sm font-semibold text-slate-500">Region Dresden & direktes Umland</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {wave1Locations.map((l) => (
                <Link
                  key={l.slug}
                  href={`/webdesign/${l.slug}`}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700"
                >
                  Webdesign {l.name}
                </Link>
              ))}
            </div>
            <p className="mt-6 text-sm font-semibold text-slate-500">Weitere Regionen in Sachsen</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {wave2Locations.map((l) => (
                <Link
                  key={l.slug}
                  href={`/webdesign/${l.slug}`}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700"
                >
                  Webdesign {l.name}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Branchen */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Branchen"
            title="Webdesign für deine Branche"
            intro="Auf deine Branche zugeschnittene Websites mit den richtigen Funktionen und Inhalten."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {branchen.map((b) => (
              <Link key={b.slug} href={`/branchen/${b.slug}`}>
                <Card className="h-full">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon name={b.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">
                    Website für {b.name}
                  </h3>
                  <p className="prose-text mt-2 text-sm">{b.metaDescription}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                    Mehr erfahren <Icon name="arrowRight" className="h-4 w-4" />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="!pt-0">
        <CtaBanner />
      </Section>
    </>
  );
}
