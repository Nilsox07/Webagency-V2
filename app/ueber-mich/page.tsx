import type { Metadata } from "next";
import { Section, SectionHeading, Container, Card, Badge } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig, sameAsLinks } from "@/lib/config";

export const metadata: Metadata = {
  title: "Über mich – Webdesign persönlich & KI-unterstützt",
  description:
    "Lerne den Menschen hinter Klarweb kennen: Ein-Personen-Agentur mit über 8 Jahren Erfahrung, KI-unterstützt für schnelle, persönliche und planbare Websites.",
  alternates: { canonical: "/ueber-mich" },
};

function personSchema() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.owner.name,
    jobTitle: siteConfig.owner.role,
    worksFor: { "@id": `${siteConfig.url}/#organization` },
    knowsAbout: ["Webdesign", "SEO", "Lokales SEO", "GEO", "Conversion-Optimierung"],
  };
  const sameAs = sameAsLinks();
  if (sameAs.length) data.sameAs = sameAs;
  return data;
}

const values = [
  { icon: "euro", title: "Transparenz", text: "Feste Preise, klarer Ablauf – du weißt immer, woran du bist." },
  { icon: "clock", title: "Planbarkeit", text: "Verbindliche Termine statt vager Versprechen." },
  { icon: "sparkles", title: "Effizienz durch KI", text: "KI macht mich schneller – die Verantwortung bleibt bei mir." },
  { icon: "shieldCheck", title: "Verlässlichkeit", text: "Ein fester Ansprechpartner, vom ersten Klick bis nach dem Go-live." },
];

export default function UeberMichPage() {
  return (
    <>
      <JsonLd data={personSchema()} />
      <Breadcrumbs items={[{ name: "Über mich", path: "/ueber-mich" }]} />

      <Section className="!pt-10">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[280px_1fr]">
            <div className="mx-auto grid h-64 w-64 place-items-center rounded-3xl bg-gradient-to-br from-brand-100 to-lumi-100 text-7xl shadow-inner">
              {/* TODO: echtes Foto einsetzen (Solo: Gesicht schafft Vertrauen) */}
              👋
            </div>
            <div>
              <Badge>Über mich</Badge>
              <h1 className="mt-3 text-4xl font-bold text-slate-900">
                Hallo, ich bin {siteConfig.owner.name}.
              </h1>
              <p className="prose-text mt-5 text-lg">{siteConfig.owner.bioShort}</p>
              <p className="prose-text mt-4">
                Als Ein-Personen-Agentur bin ich nah an deinem Projekt – du sprichst immer mit der
                Person, die deine Website auch baut. Moderne KI-Werkzeuge wie meine Assistentin Lumi
                übernehmen Routine, damit ich mehr Zeit für das habe, was zählt: dein Ergebnis.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section muted>
        <Container>
          <SectionHeading eyebrow="Meine Werte" title="Wofür ich stehe" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <Card key={v.title}>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name={v.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold text-slate-900">{v.title}</h3>
                <p className="prose-text mt-2 text-sm">{v.text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900">Wie ich arbeite – Solo, aber nicht allein</h2>
            <div className="prose-text mt-5 space-y-4">
              <p>
                Viele fragen: „Schafft das eine Person allein?“ Die ehrliche Antwort: Ja – gerade weil
                ich KI gezielt einsetze. Lumi nimmt dein Briefing strukturiert auf, Routineaufgaben
                laufen automatisiert, und ich konzentriere mich auf Gestaltung, Qualität und deine
                Beratung.
              </p>
              <p>
                Das Ergebnis ist eine seltene Kombination: die Geschwindigkeit und der faire Preis
                eines automatisierten Anbieters – mit der Persönlichkeit und Verlässlichkeit eines
                festen Ansprechpartners. Kein Callcenter, keine wechselnden Projektmanager.
              </p>
            </div>

            {sameAsLinks().length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {sameAsLinks().map((link) => (
                  <a
                    key={link}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:border-brand-300"
                  >
                    {new URL(link).hostname.replace("www.", "")}
                  </a>
                ))}
              </div>
            )}
          </div>
        </Container>
      </Section>

      <Section muted className="!pb-0 !pt-0 py-16">
        <CtaBanner title="Lust auf eine ehrliche Zusammenarbeit?" />
      </Section>
      <div className="h-16" />
    </>
  );
}
