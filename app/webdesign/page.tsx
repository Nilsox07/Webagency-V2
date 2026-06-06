import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading, Container, Card } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/CtaBanner";
import { topCities, BUNDESLAND_SLUG, citiesByBundesland, formatPopulation } from "@/lib/cities";
import { branchen } from "@/lib/branchen";

export const metadata: Metadata = {
  title: "Webdesign Deutschland – Festpreis-Websites ab 990 €",
  description:
    "Webdesign zum Festpreis ab 990 € – deutschlandweit. Schnelle, barrierearme Websites mit lokalem SEO für tausende Städte. Finde deine Stadt oder dein Bundesland.",
  alternates: { canonical: "/webdesign" },
};

export default function WebdesignHubPage() {
  const top = topCities(24);
  const laender = Object.entries(BUNDESLAND_SLUG).map(([name, slug]) => ({
    name,
    slug,
    count: citiesByBundesland(name).length,
  }));

  return (
    <>
      <PageHero
        eyebrow="Webdesign in Deutschland"
        title="Webdesign zum Festpreis – deutschlandweit"
        intro="Wir bauen Festpreis-Websites für lokale Unternehmen in ganz Deutschland: ab 990 €, blitzschnell (Next.js, Top Core Web Vitals), barrierearm und lokal auffindbar. Wähle deine Stadt, dein Bundesland oder deine Branche – oder starte direkt das Briefing mit Lumi."
        breadcrumbs={[{ name: "Webdesign in Deutschland", path: "/webdesign" }]}
      />

      {/* Vorteile */}
      <Section>
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "euro", t: "Festpreis ab 990 €", d: "Transparent statt Angebotschaos." },
              { icon: "rocket", t: "Schnellste Technik", d: "Next.js, Top Core Web Vitals." },
              { icon: "pin", t: "Lokal auffindbar", d: "Lokales SEO für deine Stadt." },
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

      {/* Top-Städte */}
      <Section muted>
        <Container>
          <SectionHeading
            eyebrow="Beliebte Städte"
            title="Webdesign in deiner Stadt"
            intro="Lokale Seiten mit echtem Ortsbezug und lokalem SEO. Hier die größten Städte – dein Ort fehlt? Über das Bundesland findest du ihn."
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {top.map((c) => (
              <Link
                key={c.slug}
                href={`/webdesign/${c.slug}`}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700"
              >
                Webdesign {c.name}
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Bundesländer */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Nach Bundesland"
            title="Wähle deine Region"
            intro="Über das Bundesland findest du alle abgedeckten Städte in deiner Nähe."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {laender.map((l) => (
              <Link
                key={l.slug}
                href={`/webdesign/region/${l.slug}`}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
              >
                <span>{l.name}</span>
                <span className="text-xs text-slate-400">{formatPopulation(l.count)} Orte</span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Branchen */}
      <Section muted>
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
