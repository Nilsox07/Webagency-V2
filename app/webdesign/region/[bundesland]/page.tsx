import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section, Container } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/CtaBanner";
import {
  bundeslandFromSlug,
  bundeslandSlugs,
  citiesByBundesland,
  formatPopulation,
} from "@/lib/cities";

export const dynamicParams = false;

export function generateStaticParams() {
  return bundeslandSlugs().map((bundesland) => ({ bundesland }));
}

export function generateMetadata({ params }: { params: { bundesland: string } }): Metadata {
  const name = bundeslandFromSlug(params.bundesland);
  if (!name) return {};
  return {
    title: `Webdesign in ${name} – Städte & Festpreise`,
    description: `Webdesign zum Festpreis ab 990 € in ${name}: schnelle, lokal auffindbare Websites. Finde deine Stadt in ${name} und starte dein Projekt.`,
    alternates: { canonical: `/webdesign/region/${params.bundesland}` },
  };
}

export default function BundeslandPage({ params }: { params: { bundesland: string } }) {
  const name = bundeslandFromSlug(params.bundesland);
  if (!name) notFound();
  const cities = citiesByBundesland(name);

  return (
    <>
      <PageHero
        eyebrow="Webdesign nach Region"
        title={`Webdesign in ${name}`}
        intro={`Wir bauen Festpreis-Websites ab 990 € für Unternehmen in ${name} – schnell, barrierearm und lokal auffindbar. Wähle deine Stadt (${cities.length} Orte):`}
        breadcrumbs={[
          { name: "Webdesign in Deutschland", path: "/webdesign" },
          { name, path: `/webdesign/region/${params.bundesland}` },
        ]}
      />
      <Section>
        <Container>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3 lg:grid-cols-4">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/webdesign/${c.slug}`}
                  className="flex items-baseline justify-between gap-2 rounded-md px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-700"
                >
                  <span className="truncate">Webdesign {c.name}</span>
                  <span className="shrink-0 text-xs text-slate-400">
                    {formatPopulation(c.population)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <Section className="!pt-0">
        <CtaBanner title={`Deine Website in ${name}`} />
      </Section>
    </>
  );
}
