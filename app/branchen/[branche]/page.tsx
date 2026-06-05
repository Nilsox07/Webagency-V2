import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section, SectionHeading, Container, Button, Card } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd, localServiceSchema, faqSchema } from "@/components/JsonLd";
import { branchen, getBranche } from "@/lib/branchen";
import { siteConfig } from "@/lib/config";

export function generateStaticParams() {
  return branchen.map((b) => ({ branche: b.slug }));
}

export function generateMetadata({ params }: { params: { branche: string } }): Metadata {
  const b = getBranche(params.branche);
  if (!b) return {};
  return {
    title: b.metaTitle,
    description: b.metaDescription,
    alternates: { canonical: `/branchen/${b.slug}` },
  };
}

export default function BranchePage({ params }: { params: { branche: string } }) {
  const b = getBranche(params.branche);
  if (!b) notFound();

  return (
    <>
      <JsonLd
        data={[
          localServiceSchema({
            name: `Website für ${b.name}`,
            description: b.metaDescription,
            path: `/branchen/${b.slug}`,
            areaServed: siteConfig.contact.region,
          }),
          faqSchema(b.faq),
        ]}
      />
      <PageHero
        eyebrow="Branchen-Webdesign"
        title={`Website für ${b.name}`}
        intro={b.lead}
        breadcrumbs={[
          { name: "Webdesign in Sachsen", path: "/webdesign" },
          { name: `Website für ${b.name}`, path: `/branchen/${b.slug}` },
        ]}
      >
        <a
          href="/briefing"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-lumi-600 px-6 py-3 font-semibold text-brand-900 transition hover:bg-lumi-700"
        >
          <Icon name="chat" className="h-5 w-5" /> Briefing starten
        </a>
      </PageHero>

      <Section muted className="!py-14">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{b.problem.heading}</h2>
              <p className="prose-text mt-4">{b.problem.body}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{b.solution.heading}</h2>
              <p className="prose-text mt-4">{b.solution.body}</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Das bringt dir die Website</h2>
              <ul className="mt-6 space-y-3">
                {b.benefits.map((x) => (
                  <li key={x} className="flex items-start gap-3">
                    <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <span className="text-slate-700">{x}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card className="h-fit bg-slate-50">
              <h3 className="text-sm font-semibold text-slate-900">Empfehlung</h3>
              <p className="prose-text mt-2 text-sm">{b.recommendation}</p>
              <Button href="/preise" variant="secondary" className="mt-4" withArrow>
                Pakete ansehen
              </Button>
            </Card>
          </div>
        </Container>
      </Section>

      <Section muted>
        <Container>
          <SectionHeading title={`Häufige Fragen – Website für ${b.name}`} />
          <div className="mt-8 max-w-3xl">
            <FaqAccordion items={b.faq} />
          </div>
        </Container>
      </Section>

      <Section className="!py-12">
        <Container>
          <p className="text-sm font-semibold text-slate-500">Weitere Branchen</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {branchen
              .filter((x) => x.slug !== b.slug)
              .map((x) => (
                <Link
                  key={x.slug}
                  href={`/branchen/${x.slug}`}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-brand-300 hover:text-brand-700"
                >
                  Website für {x.name}
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
