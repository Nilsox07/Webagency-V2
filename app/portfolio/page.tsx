import type { Metadata } from "next";
import { Section, Container, Badge } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/CtaBanner";
import { caseStudies } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Referenzen – Beispielprojekte aus verschiedenen Branchen",
  description:
    "Einblicke in Website-Projekte für Handwerk, Praxen, Gastronomie, Kanzleien und mehr. Jedes Projekt mit passendem Festpreis-Paket umgesetzt.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Referenzen"
        title="Websites, die für ihre Branche funktionieren"
        intro="Von der Handwerker-Website bis zur Praxis mit Online-Terminbuchung – jedes Projekt ist auf die Branche und das Ziel zugeschnitten und mit dem passenden Festpreis-Paket umgesetzt."
        breadcrumbs={[{ name: "Referenzen", path: "/portfolio" }]}
        accent="#1A8C94"
      />
      <Section>
        <Container>
          {/* Hinweis: Platzhalter */}
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <strong>Hinweis:</strong> Die folgenden Projekte sind Beispiel-Platzhalter. Ersetze sie
            vor dem Go-live durch echte Referenzen (Bilder, Ergebnisse, Kundenzitate – nur mit
            Einwilligung).
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((cs) => (
              <article
                key={cs.slug}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className={`relative h-44 bg-gradient-to-br ${cs.gradient} p-5`}>
                  <div className="absolute inset-x-5 bottom-5 rounded-lg bg-white/90 p-3 shadow-sm">
                    <div className="h-2 w-16 rounded bg-slate-300" />
                    <div className="mt-2 h-2 w-24 rounded bg-slate-200" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2">
                    <Badge>{cs.branche}</Badge>
                    <span className="text-xs text-slate-400">Paket {cs.packageUsed}</span>
                  </div>
                  <h2 className="mt-3 text-lg font-semibold text-slate-900">{cs.title}</h2>
                  <p className="prose-text mt-2 text-sm">{cs.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="!pt-0">
        <CtaBanner title="Wird dein Projekt das nächste?" />
      </Section>
    </>
  );
}
