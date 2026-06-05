import type { Metadata } from "next";
import { Section, Container } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBanner } from "@/components/CtaBanner";
import { generalFaq } from "@/lib/faq";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "FAQ – Häufige Fragen zu Webdesign, Preisen & Ablauf",
  description:
    "Antworten auf die häufigsten Fragen: Was kostet eine Website? Wie läuft die Zusammenarbeit ab? Was ist Lumi? Alle Antworten zu Festpreisen, Wartung und mehr.",
  alternates: { canonical: "/faq" },
};

// Sammelt alle leistungsspezifischen FAQ für die Schema-Ausgabe (eine FAQPage)
const allFaq = [...generalFaq, ...services.flatMap((s) => s.faq)];

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Häufige Fragen"
        intro="Hier findest du Antworten auf die wichtigsten Fragen rund um Preise, Ablauf, Wartung und Lumi. Deine Frage ist nicht dabei? Schreib mir einfach."
        breadcrumbs={[{ name: "FAQ", path: "/faq" }]}
        accent="#7c4dff"
      />
      <Section>
        <Container>
          {/* Allgemein (mit Schema für alle FAQ inkl. Leistungs-FAQ) */}
          <div className="max-w-3xl">
            <FaqAccordion items={allFaq} />
          </div>
        </Container>
      </Section>

      <Section className="!pt-0">
        <CtaBanner title="Noch Fragen offen?" text="Schreib mir oder starte direkt dein Briefing mit Lumi – ich helfe dir gern weiter." />
      </Section>
    </>
  );
}
