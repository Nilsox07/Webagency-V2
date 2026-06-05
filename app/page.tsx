import Link from "next/link";
import { Section, SectionHeading, Container, Button, Card, Badge } from "@/components/ui";
import { PricingCards } from "@/components/PricingCards";
import { ProcessSteps } from "@/components/ProcessSteps";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBanner } from "@/components/CtaBanner";
import { ImmersiveHero } from "@/components/home/ImmersiveHero";
import { StorySection } from "@/components/home/StorySection";
import { StatsBand } from "@/components/home/StatsBand";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { generalFaq } from "@/lib/faq";
import { siteConfig } from "@/lib/config";
import { wave1Locations } from "@/lib/locations";
import { articles } from "@/lib/ratgeber";

export default function HomePage() {
  return (
    <>
      {/* Immersiver Einstieg (3D) */}
      <ImmersiveHero />

      {/* Scroll-Story: Chaos → Klarheit */}
      <StorySection />

      {/* Kennzahlen */}
      <StatsBand />

      {/* Leistungen (3D-Tilt-Karten) */}
      <ServicesShowcase />

      {/* LOKAL: Region Dresden/Sachsen */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              centered
              eyebrow="Dresden & Sachsen"
              title="Dein Webdesigner aus der Region"
              intro="Festpreis-Websites für lokale Unternehmen in Dresden und ganz Sachsen – persönlich, schnell und lokal auffindbar. Wähle deinen Ort:"
            />
          </Reveal>
          <Reveal className="mt-8 flex flex-wrap justify-center gap-2">
            {wave1Locations.map((l) => (
              <Link
                key={l.slug}
                href={`/webdesign/${l.slug}`}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
              >
                Webdesign {l.name}
              </Link>
            ))}
            <Link
              href="/webdesign"
              className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Alle Standorte →
            </Link>
          </Reveal>
        </Container>
      </Section>

      {/* PAKETE */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              centered
              eyebrow="Pakete & Preise"
              title="Feste Preise. Feste Termine. Keine Überraschungen."
              intro="Vier klare Pakete mit sichtbaren Preisen. Wähle deins – oder lass dir von Lumi helfen."
            />
          </Reveal>
          <Reveal direction="scale" className="mt-12">
            <PricingCards />
          </Reveal>
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
          <Reveal>
            <SectionHeading
              centered
              eyebrow="So läuft's ab"
              title="In vier Schritten online"
              intro="Vom Paket bis zum Go-live – planbar und transparent."
            />
          </Reveal>
          <div className="mt-12">
            <ProcessSteps />
          </div>
        </Container>
      </Section>

      {/* ÜBER MICH */}
      <Section>
        <Container>
          <Reveal direction="up">
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
          </Reveal>
        </Container>
      </Section>

      {/* RATGEBER */}
      <Section muted>
        <Container>
          <Reveal>
            <SectionHeading
              centered
              eyebrow="Ratgeber"
              title="Ehrliche Antworten vor deiner Entscheidung"
              intro="Was kostet eine Website? Brauche ich Barrierefreiheit? Selbst machen oder machen lassen? Klar erklärt, mit Zahlen und Quellen."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {articles.slice(0, 3).map((a) => (
              <Reveal key={a.slug} className="h-full">
                <Link href={`/ratgeber/${a.slug}`}>
                  <Card className="h-full">
                    <h3 className="text-lg font-semibold text-slate-900">{a.title}</h3>
                    <p className="prose-text mt-2 text-sm">{a.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                      Weiterlesen
                    </span>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button href="/ratgeber" variant="ghost" withArrow>
              Alle Ratgeber ansehen
            </Button>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeading centered eyebrow="FAQ" title="Häufige Fragen" />
          </Reveal>
          <RevealGroup className="mt-8">
            <FaqAccordion items={generalFaq.slice(0, 6)} />
          </RevealGroup>
          <div className="mt-6 text-center">
            <Button href="/faq" variant="ghost" withArrow>
              Alle Fragen ansehen
            </Button>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section>
        <Reveal direction="scale">
          <CtaBanner />
        </Reveal>
      </Section>
    </>
  );
}
