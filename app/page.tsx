import Link from "next/link";
import { Section, SectionHeading, Container, Button, Card, Badge } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { PricingCards } from "@/components/PricingCards";
import { ProcessSteps } from "@/components/ProcessSteps";
import { TrustBar } from "@/components/TrustBar";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBanner } from "@/components/CtaBanner";
import { services } from "@/lib/services";
import { generalFaq } from "@/lib/faq";
import { siteConfig } from "@/lib/config";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
        <Container className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div className="animate-fade-in-up">
            <Badge tone="lumi">Webdesign zum Festpreis · mit KI-Assistentin Lumi</Badge>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              Professionelle Websites zum Festpreis – ab 990&nbsp;€.
            </h1>
            <p className="prose-text mt-5 text-lg">
              Wir bauen schnelle, moderne Websites für lokale Unternehmen – mit transparenten
              Paketpreisen, festem Liefertermin und ohne Angebotschaos. Beschreibe dein Projekt in
              wenigen Minuten im Chat mit unserer KI-Assistentin Lumi.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/briefing"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-lumi-600 px-7 py-3.5 font-semibold text-white transition hover:bg-lumi-700"
              >
                <Icon name="chat" className="h-5 w-5" />
                Briefing mit Lumi starten
              </a>
              <Button href="/preise" variant="secondary" size="lg" withArrow>
                Pakete ansehen
              </Button>
            </div>
            <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1">
                <Icon name="check" className="h-4 w-4 text-emerald-600" /> Festpreis-Garantie
              </span>
              <span className="inline-flex items-center gap-1">
                <Icon name="check" className="h-4 w-4 text-emerald-600" /> Fester Liefertermin
              </span>
              <span className="inline-flex items-center gap-1">
                <Icon name="check" className="h-4 w-4 text-emerald-600" /> DSGVO-konform
              </span>
            </p>
          </div>

          {/* Hero-Visual: Mockup-Platzhalter */}
          <div className="relative animate-fade-in-up">
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl">
              <div className="flex gap-1.5 px-2 py-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <div className="space-y-3 rounded-xl bg-gradient-to-br from-brand-600 to-lumi-600 p-6 text-white">
                <div className="h-3 w-24 rounded bg-white/40" />
                <div className="h-6 w-3/4 rounded bg-white/80" />
                <div className="h-3 w-full rounded bg-white/30" />
                <div className="h-3 w-5/6 rounded bg-white/30" />
                <div className="mt-4 inline-block rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand-700">
                  Jetzt starten
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 p-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-16 rounded-lg bg-slate-100" />
                ))}
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg sm:block">
              <p className="text-xs text-slate-500">ab</p>
              <p className="text-xl font-bold text-slate-900">990 €</p>
            </div>
          </div>
        </Container>
      </section>

      {/* TRUST */}
      <Section muted className="!py-12">
        <Container>
          <TrustBar />
        </Container>
      </Section>

      {/* PROBLEM → LÖSUNG */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Warum Klarweb?"
            title="Schluss mit dem Angebotschaos"
            intro="Klassische Webprojekte starten mit unklaren Angeboten, schwankenden Preisen und Terminen, die sich verschieben. Wir machen es anders."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Card className="border-red-100 bg-red-50/40">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <Icon name="x" className="h-5 w-5 text-red-500" /> Die klassische Agentur
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>Wochenlanges Warten auf ein Angebot</li>
                <li>Unklare Kosten, Nachträge, böse Überraschungen</li>
                <li>Termine, die sich immer wieder verschieben</li>
                <li>Anonymer Ansprechpartner</li>
              </ul>
            </Card>
            <Card className="border-emerald-100 bg-emerald-50/40">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <Icon name="check" className="h-5 w-5 text-emerald-600" /> Klarweb
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>Transparenter Festpreis – sofort sichtbar</li>
                <li>Was im Paket steht, gilt – kein Cent mehr</li>
                <li>Verbindlicher Liefertermin</li>
                <li>Ein persönlicher Ansprechpartner, KI-unterstützt</li>
              </ul>
            </Card>
          </div>
        </Container>
      </Section>

      {/* LEISTUNGEN-TEASER */}
      <Section muted>
        <Container>
          <SectionHeading
            eyebrow="Leistungen"
            title="Alles für deine Sichtbarkeit"
            intro="Von der Website bis zur KI-Suche – jede Leistung mit eigener Spezialisierung."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link key={s.slug} href={`/leistungen/${s.slug}`}>
                <Card className="h-full">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{s.title}</h3>
                  <p className="prose-text mt-2 text-sm">{s.teaser}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                    Mehr erfahren <Icon name="arrowRight" className="h-4 w-4" />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* PAKETE-TEASER */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Pakete & Preise"
            title="Feste Preise. Feste Termine. Keine Überraschungen."
            intro="Vier klare Pakete mit sichtbaren Preisen. Wähle deins – oder lass dir von Lumi helfen."
          />
          <div className="mt-10">
            <PricingCards />
          </div>
          <div className="mt-8 text-center">
            <Button href="/preise" variant="ghost" withArrow>
              Alle Leistungen vergleichen
            </Button>
          </div>
        </Container>
      </Section>

      {/* PROZESS */}
      <Section muted>
        <Container>
          <SectionHeading
            eyebrow="So läuft's ab"
            title="In vier Schritten online"
            intro="Vom Paket bis zum Go-live – planbar und transparent."
          />
          <div className="mt-12">
            <ProcessSteps />
          </div>
        </Container>
      </Section>

      {/* ÜBER-MICH-TEASER */}
      <Section>
        <Container>
          <Card className="grid items-center gap-8 md:grid-cols-[200px_1fr] md:p-10">
            <div className="mx-auto grid h-40 w-40 place-items-center rounded-2xl bg-gradient-to-br from-brand-100 to-lumi-100 text-5xl">
              👋
            </div>
            <div>
              <Badge>Über mich</Badge>
              <h2 className="mt-3 text-2xl font-bold text-slate-900">
                {siteConfig.owner.name} – dein persönlicher Ansprechpartner
              </h2>
              <p className="prose-text mt-3">{siteConfig.owner.bioShort}</p>
              <div className="mt-5">
                <Button href="/ueber-mich" variant="secondary" withArrow>
                  Mehr über mich
                </Button>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      {/* FAQ */}
      <Section muted>
        <Container>
          <SectionHeading eyebrow="FAQ" title="Häufige Fragen" />
          <div className="mt-8">
            <FaqAccordion items={generalFaq.slice(0, 6)} />
          </div>
          <div className="mt-6 text-center">
            <Button href="/faq" variant="ghost" withArrow>
              Alle Fragen ansehen
            </Button>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section>
        <CtaBanner />
      </Section>
    </>
  );
}
