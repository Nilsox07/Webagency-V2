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
import { getLocation } from "@/lib/locations";
import { getCity, allCitySlugs, formatPopulation } from "@/lib/cities";
import { buildCityContent } from "@/lib/city-content";
import { packages, formatEuro } from "@/lib/packages";

// Alle Städte werden statisch vorgerendert (schnellste Auslieferung, CDN).
export const dynamicParams = false;

export function generateStaticParams() {
  return allCitySlugs().map((stadt) => ({ stadt }));
}

/** Normalisiert: handgepflegte sächsische Texte (locations.ts) haben Vorrang,
 *  sonst datenangereicherte Inhalte aus der Content-Engine. */
function resolve(slug: string) {
  const rich = getLocation(slug);
  const city = getCity(slug);
  if (!rich && !city) return null;
  const cc = city ? buildCityContent(city) : null;

  return {
    name: rich?.name ?? cc!.name,
    metaTitle: rich?.metaTitle ?? cc!.metaTitle,
    metaDescription: rich?.metaDescription ?? cc!.metaDescription,
    eyebrow: rich?.district ?? cc!.bundesland,
    lead: rich?.lead ?? cc!.lead,
    contextHeading: `Webdesign für Unternehmen in ${rich?.name ?? cc!.name}`,
    localContext: rich?.localContext ?? cc!.localContext,
    extra: rich?.proximity ?? cc!.whyLocal,
    typicalBusinesses: rich?.typicalBusinesses ?? cc!.typicalBusinesses,
    faq: rich?.faq ?? cc!.faq,
    population: city?.population,
    nearby: cc?.nearby ?? [],
  };
}

export function generateMetadata({ params }: { params: { stadt: string } }): Metadata {
  const r = resolve(params.stadt);
  if (!r) return {};
  return {
    title: r.metaTitle,
    description: r.metaDescription,
    alternates: { canonical: `/webdesign/${params.stadt}` },
  };
}

export default function StadtPage({ params }: { params: { stadt: string } }) {
  const r = resolve(params.stadt);
  if (!r) notFound();

  return (
    <>
      <JsonLd
        data={[
          localServiceSchema({
            name: `Webdesign ${r.name}`,
            description: r.metaDescription,
            path: `/webdesign/${params.stadt}`,
            areaServed: r.name,
          }),
          faqSchema(r.faq),
        ]}
      />
      <PageHero
        eyebrow={`Webdesign · ${r.eyebrow}`}
        title={`Webdesign ${r.name}`}
        intro={r.lead}
        breadcrumbs={[
          { name: "Webdesign in Deutschland", path: "/webdesign" },
          { name: r.name, path: `/webdesign/${params.stadt}` },
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
              <h2 className="text-2xl font-bold text-slate-900">{r.contextHeading}</h2>
              <p className="prose-text mt-4">{r.localContext}</p>
              <p className="prose-text mt-4">{r.extra}</p>
            </div>
            <Card className="h-fit bg-slate-50">
              <h3 className="text-sm font-semibold text-slate-900">
                Typische Branchen in {r.name}
              </h3>
              <ul className="mt-4 space-y-2">
                {r.typicalBusinesses.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-slate-600">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              {r.population && (
                <p className="mt-4 border-t border-slate-200 pt-3 text-xs text-slate-500">
                  {r.name}: rund {formatPopulation(r.population)} Einwohner
                </p>
              )}
            </Card>
          </div>
        </Container>
      </Section>

      {/* Pakete-Teaser */}
      <Section muted>
        <Container>
          <SectionHeading
            title={`Was kostet eine Website in ${r.name}?`}
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
          <SectionHeading title={`Häufige Fragen – Webdesign ${r.name}`} />
          <div className="mt-8 max-w-3xl">
            <FaqAccordion items={r.faq} />
          </div>
        </Container>
      </Section>

      {/* Nachbarorte (interne Verlinkung + Crawl) */}
      {r.nearby.length > 0 && (
        <Section className="!py-12">
          <Container>
            <p className="text-sm font-semibold text-slate-500">Webdesign in der Umgebung</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {r.nearby.map((n) => (
                <Link
                  key={n.slug}
                  href={`/webdesign/${n.slug}`}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-brand-300 hover:text-brand-700"
                >
                  {n.name} <span className="text-slate-400">· {n.km} km</span>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section className="!pt-0">
        <CtaBanner title={`Bereit für deine Website in ${r.name}?`} />
      </Section>
    </>
  );
}
