import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section, SectionHeading, Container, Button, Card } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ProcessSteps } from "@/components/ProcessSteps";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd, localServiceSchema, faqSchema } from "@/components/JsonLd";
import { locations, getLocation } from "@/lib/locations";
import { packages, formatEuro } from "@/lib/packages";

export function generateStaticParams() {
  return locations.map((l) => ({ stadt: l.slug }));
}

export function generateMetadata({ params }: { params: { stadt: string } }): Metadata {
  const loc = getLocation(params.stadt);
  if (!loc) return {};
  return {
    title: loc.metaTitle,
    description: loc.metaDescription,
    alternates: { canonical: `/webdesign/${loc.slug}` },
  };
}

export default function StadtPage({ params }: { params: { stadt: string } }) {
  const loc = getLocation(params.stadt);
  if (!loc) notFound();

  const otherCities = locations.filter((l) => l.slug !== loc.slug).slice(0, 6);

  return (
    <>
      <JsonLd
        data={[
          localServiceSchema({
            name: `Webdesign ${loc.name}`,
            description: loc.metaDescription,
            path: `/webdesign/${loc.slug}`,
            areaServed: loc.name,
          }),
          faqSchema(loc.faq),
        ]}
      />
      <PageHero
        eyebrow={`Webdesign · ${loc.district}`}
        title={`Webdesign ${loc.name}`}
        intro={loc.lead}
        breadcrumbs={[
          { name: "Webdesign in Sachsen", path: "/webdesign" },
          { name: loc.name, path: `/webdesign/${loc.slug}` },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="/briefing"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-lumi-600 px-6 py-3 font-semibold text-brand-900 transition hover:bg-lumi-700"
          >
            <Icon name="chat" className="h-5 w-5" /> Briefing starten
          </a>
          <a
            href="/preise"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/10"
          >
            Pakete & Preise
          </a>
        </div>
      </PageHero>

      {/* Lokaler Kontext */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-slate-900">
                Webdesign für Unternehmen in {loc.name}
              </h2>
              <p className="prose-text mt-4">{loc.localContext}</p>
              <p className="prose-text mt-4">{loc.proximity}</p>
            </div>
            <Card className="h-fit bg-slate-50">
              <h3 className="text-sm font-semibold text-slate-900">
                Typische Branchen in {loc.name}
              </h3>
              <ul className="mt-4 space-y-2">
                {loc.typicalBusinesses.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-slate-600">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Pakete-Teaser */}
      <Section muted>
        <Container>
          <SectionHeading
            title={`Was kostet eine Website in ${loc.name}?`}
            intro="Transparente Festpreise – du weißt vorab, was deine Website kostet. Keine versteckten Kosten."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {packages.map((p) => (
              <Card key={p.id} className={p.recommended ? "ring-1 ring-lumi-300" : ""}>
                <p className="text-sm font-semibold text-slate-900">{p.name}</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {p.priceFrom ? "ab " : ""}
                  {formatEuro(p.price)}
                </p>
                <p className="mt-1 text-xs text-slate-500">{p.tagline}</p>
              </Card>
            ))}
          </div>
          <div className="mt-6">
            <Button href="/preise" variant="ghost" withArrow>
              Alle Pakete & Leistungen vergleichen
            </Button>
          </div>
        </Container>
      </Section>

      {/* Ablauf */}
      <Section>
        <Container>
          <SectionHeading title="So läuft dein Projekt ab" />
          <div className="mt-10">
            <ProcessSteps />
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section muted>
        <Container>
          <SectionHeading title={`Häufige Fragen – Webdesign ${loc.name}`} />
          <div className="mt-8 max-w-3xl">
            <FaqAccordion items={loc.faq} />
          </div>
        </Container>
      </Section>

      {/* Interne Verlinkung: weitere Orte */}
      <Section className="!py-12">
        <Container>
          <p className="text-sm font-semibold text-slate-500">Webdesign in weiteren Orten</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {otherCities.map((l) => (
              <Link
                key={l.slug}
                href={`/webdesign/${l.slug}`}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-brand-300 hover:text-brand-700"
              >
                Webdesign {l.name}
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="!pt-0">
        <CtaBanner title={`Bereit für deine Website in ${loc.name}?`} />
      </Section>
    </>
  );
}
