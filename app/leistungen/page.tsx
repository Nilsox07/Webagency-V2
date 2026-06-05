import type { Metadata } from "next";
import Link from "next/link";
import { Section, Container, Button, Card } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/CtaBanner";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Leistungen – Webdesign, SEO, Lokales SEO & GEO",
  description:
    "Alle Leistungen im Überblick: Webdesign, Hosting & Wartung, SEO-Optimierung, Lokales SEO und KI-Suche (GEO). Jede Leistung ist in unseren Festpreis-Paketen gebündelt.",
  alternates: { canonical: "/leistungen" },
};

export default function LeistungenPage() {
  return (
    <>
      <PageHero
        eyebrow="Leistungen"
        title="Alles für deine digitale Sichtbarkeit"
        intro="Eine professionelle Website ist der Anfang. Damit dein Unternehmen gefunden wird – bei Google und in KI-Antworten – kombinieren wir Webdesign mit SEO, lokaler Optimierung und GEO. Jede Leistung hat ihren eigenen Schwerpunkt und ist in unseren Festpreis-Paketen gebündelt."
        breadcrumbs={[{ name: "Leistungen", path: "/leistungen" }]}
      />
      <Section>
        <Container>
          <div className="space-y-6">
            {services.map((s, i) => (
              <Card key={s.slug} className="md:p-8">
                <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600">
                        <Icon name={s.icon} className="h-6 w-6" />
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900">{s.title}</h2>
                    </div>
                    <p className="prose-text mt-4 max-w-2xl">{s.lead}</p>
                  </div>
                  <div className="flex md:justify-end">
                    <Button href={`/leistungen/${s.slug}`} variant={i === 0 ? "primary" : "secondary"} withArrow>
                      Mehr erfahren
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-slate-50 p-6 text-center">
            <p className="prose-text">
              Alle Leistungen sind in unseren{" "}
              <Link href="/preise" className="font-semibold text-brand-700 hover:underline">
                Festpreis-Paketen
              </Link>{" "}
              gebündelt – transparent und ohne versteckte Kosten.
            </p>
          </div>
        </Container>
      </Section>
      <Section className="!pt-0">
        <CtaBanner />
      </Section>
    </>
  );
}
