import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section, SectionHeading, Container, Button, Card, Badge } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { services, getService } from "@/lib/services";
import { siteConfig } from "@/lib/config";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getService(params.slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/leistungen/${service.slug}` },
  };
}

function serviceSchema(slug: string) {
  const s = getService(slug)!;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    serviceType: s.keyword,
    description: s.metaDescription,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: siteConfig.areaServed.map((a) => ({ "@type": "City", name: a })),
    url: `${siteConfig.url}/leistungen/${s.slug}`,
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd data={serviceSchema(service.slug)} />
      <Breadcrumbs
        items={[
          { name: "Leistungen", path: "/leistungen" },
          { name: service.title, path: `/leistungen/${service.slug}` },
        ]}
      />

      {/* HERO mit Antwort-zuerst-Lead (GEO) */}
      <Section className="!pt-10 !pb-12">
        <Container>
          <div className="max-w-3xl">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <Icon name={service.icon} className="h-6 w-6" />
            </span>
            <h1 className="mt-5 text-4xl font-bold text-slate-900 sm:text-5xl">{service.title}</h1>
            <p className="prose-text mt-5 text-lg">{service.lead}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="/briefing"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-lumi-600 px-6 py-3 font-semibold text-white transition hover:bg-lumi-700"
              >
                <Icon name="chat" className="h-5 w-5" /> Briefing starten
              </a>
              <Button href="/preise" variant="secondary">
                Preise ansehen
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* PROBLEM */}
      <Section muted className="!py-14">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{service.problem.heading}</h2>
              <p className="prose-text mt-4">{service.problem.body}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{service.solution.heading}</h2>
              <p className="prose-text mt-4">{service.solution.body}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* VORTEILE + UMFANG */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Deine Vorteile</h2>
              <ul className="mt-6 space-y-3">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <span className="text-slate-700">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card className="bg-slate-50">
              <h2 className="text-xl font-bold text-slate-900">Leistungsumfang</h2>
              <ul className="mt-5 space-y-2.5 text-sm">
                {service.scope.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-slate-600">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </Section>

      {/* ABLAUF (nummeriert) */}
      <Section muted>
        <Container>
          <SectionHeading title="So gehen wir vor" />
          <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {service.steps.map((step, i) => (
              <li key={i}>
                <span className="text-3xl font-bold text-brand-200">{i + 1}</span>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="prose-text mt-2 text-sm">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* BEWEIS / STATISTIK (GEO) */}
      {service.proof && (
        <Section className="!py-14">
          <Container>
            <figure className="mx-auto max-w-3xl rounded-2xl border-l-4 border-brand-500 bg-brand-50/50 p-8">
              <blockquote className="text-xl font-medium text-slate-800">
                „{service.proof.stat}“
              </blockquote>
              <figcaption className="mt-3 text-sm text-slate-500">
                Quelle: {service.proof.source}
              </figcaption>
            </figure>
          </Container>
        </Section>
      )}

      {/* PAKET-BEZUG */}
      <Section muted={!service.proof}>
        <Container>
          <Card className="flex flex-col items-start justify-between gap-4 bg-brand-700 text-white md:flex-row md:items-center">
            <div>
              <Badge tone="lumi">In welchen Paketen?</Badge>
              <p className="mt-3 max-w-2xl text-brand-50">{service.inPackages}</p>
            </div>
            <Button href="/preise" variant="secondary">
              Pakete vergleichen
            </Button>
          </Card>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container>
          <SectionHeading title={`Häufige Fragen zu ${service.title}`} />
          <div className="mt-8 max-w-3xl">
            <FaqAccordion items={service.faq} />
          </div>
        </Container>
      </Section>

      {/* Querverlinkung */}
      <Section muted className="!py-12">
        <Container>
          <p className="text-sm font-semibold text-slate-500">Weitere Leistungen</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {services
              .filter((s) => s.slug !== service.slug)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/leistungen/${s.slug}`}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-brand-300 hover:text-brand-700"
                >
                  {s.title}
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
