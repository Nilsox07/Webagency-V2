import type { Metadata } from "next";
import { Section, SectionHeading, Container, Badge } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PricingCards } from "@/components/PricingCards";
import { FaqAccordion } from "@/components/FaqAccordion";
import { TrustBar } from "@/components/TrustBar";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { packages, comparisonMatrix, formatEuro } from "@/lib/packages";
import { addOns } from "@/lib/addons";
import { generalFaq } from "@/lib/faq";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Pakete & Preise – Webdesign zum Festpreis ab 990 €",
  description:
    "Transparente Festpreise: Basis 990 €, Pro 2.990 €, Platin 5.990 €, Enterprise ab 9.990 €. Inkl. Vergleichstabelle, Add-ons und Wartung ab 49 €/Monat. Alle Preise netto.",
  alternates: { canonical: "/preise" },
};

function offerSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateOffer",
    name: "Webdesign-Pakete",
    priceCurrency: "EUR",
    lowPrice: 990,
    highPrice: 9990,
    offerCount: packages.length,
    offers: packages.map((p) => ({
      "@type": "Offer",
      name: `Paket ${p.name}`,
      price: p.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/preise`,
    })),
  };
}

function CellValue({ value }: { value: string | boolean }) {
  if (value === true)
    return <Icon name="check" className="mx-auto h-5 w-5 text-emerald-600" />;
  if (value === false)
    return <Icon name="x" className="mx-auto h-4 w-4 text-slate-300" />;
  return <span className="text-sm text-slate-700">{value}</span>;
}

export default function PreisePage() {
  return (
    <>
      <JsonLd data={offerSchema()} />
      <Breadcrumbs items={[{ name: "Pakete & Preise", path: "/preise" }]} />

      {/* HERO */}
      <Section className="!pt-10 !pb-10">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Pakete & Preise"
            title="Feste Preise. Feste Termine. Keine Überraschungen."
            intro="Eine professionelle Website kostet bei uns ab 990 € – als transparenter Festpreis. Du siehst sofort, was deine Website kostet: kein Angebot abwarten, keine versteckten Kosten. Alle Preise netto zzgl. MwSt."
          />
        </Container>
      </Section>

      {/* KARTEN */}
      <Section className="!pt-0">
        <Container>
          <PricingCards />
        </Container>
      </Section>

      {/* TRUST */}
      <Section muted className="!py-12">
        <Container>
          <TrustBar />
        </Container>
      </Section>

      {/* VERGLEICHSTABELLE */}
      <Section>
        <Container>
          <SectionHeading title="Alle Leistungen im Vergleich" intro="Welches Paket passt zu dir? Hier siehst du alle Unterschiede auf einen Blick." />
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <caption className="sr-only">Vergleich der vier Webdesign-Pakete</caption>
              <thead>
                <tr className="border-b border-slate-200">
                  <th scope="col" className="py-4 pr-4 text-sm font-semibold text-slate-500">
                    Leistung
                  </th>
                  {packages.map((p) => (
                    <th key={p.id} scope="col" className="px-4 py-4 text-center">
                      <span className="block font-bold text-slate-900">{p.name}</span>
                      <span className="block text-sm font-normal text-slate-500">
                        {p.priceFrom ? "ab " : ""}
                        {formatEuro(p.price)}
                      </span>
                      {p.recommended && (
                        <span className="mt-1 inline-block">
                          <Badge tone="lumi">Beliebt</Badge>
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonMatrix.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="py-3 pr-4 text-sm font-medium text-slate-700">
                      {row.label}
                    </th>
                    {packages.map((p) => (
                      <td key={p.id} className="px-4 py-3 text-center">
                        <CellValue value={row.values[p.id]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* ADD-ONS */}
      <Section muted>
        <Container>
          <SectionHeading
            eyebrow="Zusatzleistungen"
            title="Add-ons – nur, was du wirklich brauchst"
            intro="Erweitere dein Paket gezielt. Lumi summiert deine Auswahl im Briefing transparent als unverbindliche Schätzung."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {addOns.map((a) => (
              <div key={a.id} className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
                <div>
                  <p className="font-semibold text-slate-900">{a.name}</p>
                  <p className="mt-1 text-xs text-slate-500">{a.description}</p>
                </div>
                <span className="shrink-0 text-sm font-bold text-brand-700">
                  {a.priceFrom ? "ab " : ""}
                  {formatEuro(a.price)}
                  {a.unit && <span className="block text-[10px] font-normal text-slate-400">{a.unit}</span>}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container>
          <SectionHeading title="Fragen zu Preisen & Paketen" />
          <div className="mt-8 max-w-3xl">
            <FaqAccordion items={generalFaq} />
          </div>
        </Container>
      </Section>

      <Section className="!pt-0">
        <CtaBanner title="Dein Paket gefunden?" />
      </Section>
    </>
  );
}
