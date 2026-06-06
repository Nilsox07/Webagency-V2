import type { Metadata } from "next";
import Link from "next/link";
import { Section, Container, Card } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/CtaBanner";
import { glossar } from "@/lib/glossar";

export const metadata: Metadata = {
  title: "Webdesign- & SEO-Glossar – Begriffe verständlich erklärt",
  description:
    "Das Sartu-Glossar erklärt die wichtigsten Begriffe rund um Webdesign, SEO und GEO verständlich: von Core Web Vitals über Local Pack und NAP bis Schema.",
  alternates: { canonical: "/glossar" },
};

export default function GlossarHubPage() {
  const sorted = [...glossar].sort((a, b) => a.term.localeCompare(b.term, "de"));
  return (
    <>
      <PageHero
        eyebrow="Glossar"
        title="Webdesign- & SEO-Begriffe verständlich erklärt"
        intro="Kurz und klar: Hier findest du die wichtigsten Begriffe rund um Website, SEO und KI-Suche – jeweils mit einer Definition zuerst und dann der nötigen Tiefe."
        breadcrumbs={[{ name: "Glossar", path: "/glossar" }]}
      />
      <Section>
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((t) => (
              <Link key={t.slug} href={`/glossar/${t.slug}`}>
                <Card className="h-full">
                  <h2 className="text-lg font-semibold text-slate-900">{t.term}</h2>
                  {t.longForm && <p className="mt-0.5 text-xs text-slate-500">{t.longForm}</p>}
                  <p className="prose-text mt-2 line-clamp-3 text-sm">{t.definition}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                    Begriff lesen <Icon name="arrowRight" className="h-4 w-4" />
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
