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

      {/* FAQ */}
      <Section muted>
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
