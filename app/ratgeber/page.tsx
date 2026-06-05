import type { Metadata } from "next";
import Link from "next/link";
import { Section, Container, Card } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/CtaBanner";
import { articles } from "@/lib/ratgeber";

export const metadata: Metadata = {
  title: "Ratgeber – Webdesign, Preise, SEO & Recht verständlich erklärt",
  description:
    "Ehrliche Ratgeber rund um Website & Webdesign: Was kostet eine Website? BFSG-Pflicht? One-Pager oder Mehrseiter? Selbst machen oder machen lassen? Answer-First erklärt.",
  alternates: { canonical: "/ratgeber" },
};

export default function RatgeberHubPage() {
  return (
    <>
      <PageHero
        eyebrow="Ratgeber"
        title="Website-Wissen, ehrlich erklärt"
        intro="Klare Antworten auf die Fragen, die sich Selbstständige und kleine Betriebe vor einer Website stellen – ohne Marketing-Geschwurbel, mit konkreten Zahlen und Quellen."
        breadcrumbs={[{ name: "Ratgeber", path: "/ratgeber" }]}
      />
      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {articles.map((a) => (
              <Link key={a.slug} href={`/ratgeber/${a.slug}`}>
                <Card className="h-full">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Icon name="clock" className="h-4 w-4" />
                    {a.readingMinutes} Min. Lesezeit
                  </div>
                  <h2 className="mt-3 text-xl font-semibold text-slate-900">{a.title}</h2>
                  <p className="prose-text mt-2 text-sm">{a.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                    Weiterlesen <Icon name="arrowRight" className="h-4 w-4" />
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
