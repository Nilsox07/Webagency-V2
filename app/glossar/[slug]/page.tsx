import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section, Container } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd, definedTermSchema } from "@/components/JsonLd";
import { glossar, getTerm } from "@/lib/glossar";

export function generateStaticParams() {
  return glossar.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const t = getTerm(params.slug);
  if (!t) return {};
  return {
    title: `${t.term} – einfach erklärt | Glossar`,
    description: t.definition.slice(0, 155),
    alternates: { canonical: `/glossar/${t.slug}` },
  };
}

export default function TermPage({ params }: { params: { slug: string } }) {
  const t = getTerm(params.slug);
  if (!t) notFound();

  const related = t.related.map(getTerm).filter(Boolean);

  return (
    <>
      <JsonLd
        data={definedTermSchema({ term: t.term, definition: t.definition, path: `/glossar/${t.slug}` })}
      />
      <PageHero
        eyebrow="Glossar"
        title={t.term}
        intro={t.longForm}
        breadcrumbs={[
          { name: "Glossar", path: "/glossar" },
          { name: t.term, path: `/glossar/${t.slug}` },
        ]}
      />

      <Section>
        <Container>
          <article className="mx-auto max-w-3xl">
            <p className="rounded-2xl border-l-4 border-brand-500 bg-brand-50/60 p-5 text-lg font-medium text-slate-800">
              {t.definition}
            </p>
            <div className="mt-8 space-y-4">
              {t.body.map((p, i) => (
                <p key={i} className="prose-text">
                  {p}
                </p>
              ))}
            </div>

            {related.length > 0 && (
              <div className="mt-10 border-t border-slate-200 pt-6">
                <p className="text-sm font-semibold text-slate-500">Verwandte Begriffe</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {related.map((r) => (
                    <Link
                      key={r!.slug}
                      href={`/glossar/${r!.slug}`}
                      className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-brand-300 hover:text-brand-700"
                    >
                      {r!.term}
                      <Icon name="arrowRight" className="h-3.5 w-3.5" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
        </Container>
      </Section>

      <Section className="!pt-0">
        <CtaBanner title="Fragen zu deinem Projekt?" />
      </Section>
    </>
  );
}
