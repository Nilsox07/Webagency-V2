import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section, SectionHeading, Container } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd, articleSchema, faqSchema } from "@/components/JsonLd";
import { articles, getArticle } from "@/lib/ratgeber";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = getArticle(params.slug);
  if (!a) return {};
  return {
    title: a.metaTitle,
    description: a.metaDescription,
    alternates: { canonical: `/ratgeber/${a.slug}` },
  };
}

const dateFmt = new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "long", year: "numeric" });

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const a = getArticle(params.slug);
  if (!a) notFound();

  const others = articles.filter((x) => x.slug !== a.slug);

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            headline: a.title,
            description: a.metaDescription,
            path: `/ratgeber/${a.slug}`,
            dateModified: a.updated,
          }),
          faqSchema(a.faq),
        ]}
      />
      <PageHero
        eyebrow="Ratgeber"
        title={a.title}
        intro={a.lead}
        breadcrumbs={[
          { name: "Ratgeber", path: "/ratgeber" },
          { name: a.title, path: `/ratgeber/${a.slug}` },
        ]}
      />

      <Section>
        <Container>
          <article className="mx-auto max-w-3xl">
            <p className="flex items-center gap-3 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1">
                <Icon name="clock" className="h-4 w-4" /> {a.readingMinutes} Min.
              </span>
              <span aria-hidden="true">·</span>
              <span>Zuletzt aktualisiert: {dateFmt.format(new Date(a.updated))}</span>
            </p>

            <div className="mt-8 space-y-10">
              {a.sections.map((s, i) => (
                <section key={i}>
                  <h2 className="text-2xl font-bold text-slate-900">{s.heading}</h2>
                  {s.body.map((p, j) => (
                    <p key={j} className="prose-text mt-4">
                      {p}
                    </p>
                  ))}
                  {s.list && (
                    <ul className="mt-4 space-y-2">
                      {s.list.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-slate-700">
                          <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {a.stat && (
              <figure className="mt-10 rounded-2xl border-l-4 border-brand-500 bg-brand-50/60 p-6">
                <blockquote className="text-lg font-medium text-slate-800">»{a.stat.text}«</blockquote>
                <figcaption className="mt-2 text-sm text-slate-500">Quelle: {a.stat.source}</figcaption>
              </figure>
            )}
          </article>
        </Container>
      </Section>

      <Section muted>
        <Container>
          <SectionHeading title="Häufige Fragen" />
          <div className="mt-8 max-w-3xl">
            <FaqAccordion items={a.faq} />
          </div>
        </Container>
      </Section>

      <Section className="!py-12">
        <Container>
          <p className="text-sm font-semibold text-slate-500">Weitere Ratgeber</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {others.map((x) => (
              <Link
                key={x.slug}
                href={`/ratgeber/${x.slug}`}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-brand-300 hover:text-brand-700"
              >
                {x.title}
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
