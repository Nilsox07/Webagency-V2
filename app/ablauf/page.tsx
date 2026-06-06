import type { Metadata } from "next";
import { Section, SectionHeading, Container } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBanner } from "@/components/CtaBanner";
import { processSteps } from "@/lib/process";
import type { FaqItem } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Ablauf – So entsteht deine Website",
  description:
    "Der Ablauf bei Sartu in vier transparenten Schritten: Paket wählen, Briefing mit Lumi, Umsetzung mit festem Termin, Go-live & Wartung. Kein Angebotschaos.",
  alternates: { canonical: "/ablauf" },
};

const ablaufFaq: FaqItem[] = [
  {
    question: "Wie lange dauert ein Projekt?",
    answer:
      "Das hängt vom Paket ab. Eine Basis-Website ist oft in 1–2 Wochen online, sobald dein Briefing und die Materialien vollständig sind. Größere Projekte planen wir mit verbindlichem Liefertermin – du weißt immer, wann es fertig ist.",
  },
  {
    question: "Was muss ich vorbereiten?",
    answer:
      "Im Idealfall hast du Logo, Texte und Bilder bereit – aber kein Muss. Lumi fragt im Briefing alles ab und schlägt passende Zusatzleistungen vor, falls etwas fehlt (z. B. Texte für 120 € pro Seite).",
  },
  {
    question: "Wie viele Korrekturrunden sind enthalten?",
    answer:
      "Je nach Paket 1 bis 3 Korrekturrunden. Damit ist genug Spielraum, dass das Ergebnis passt. Brauchst du mehr, kostet jede weitere Runde transparent 90 €.",
  },
  {
    question: "Was passiert nach dem Go-live?",
    answer:
      "Auf Wunsch übernehme ich die laufende Wartung ab 49 €/Monat: Hosting in Deutschland, Updates, Backups und Support. Du kannst monatlich kündigen – keine lange Bindung.",
  },
];

export default function AblaufPage() {
  return (
    <>
      <PageHero
        eyebrow="Ablauf"
        title="So entsteht deine Website – in vier Schritten"
        intro="Bei uns gibt es kein Angebotschaos. Der Weg von der Idee zur fertigen Website ist klar strukturiert, transparent und planbar. Du weißt in jedem Schritt, was passiert und was es kostet."
        breadcrumbs={[{ name: "Ablauf", path: "/ablauf" }]}
      />
      <Section>
        <Container>
          <div className="space-y-8">
            {processSteps.map((step, i) => (
              <div key={step.number} className="relative flex gap-6">
                {/* Verbindungslinie */}
                {i < processSteps.length - 1 && (
                  <span className="absolute left-7 top-16 h-[calc(100%-1rem)] w-px bg-slate-200" aria-hidden="true" />
                )}
                <span className="z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-600 text-white">
                  <Icon name={step.icon} className="h-6 w-6" />
                </span>
                <div className="pb-2">
                  <span className="text-sm font-bold text-brand-600">Schritt {step.number}</span>
                  <h2 className="mt-1 text-xl font-bold text-slate-900">{step.title}</h2>
                  <p className="prose-text mt-2 max-w-2xl">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section muted>
        <Container>
          <SectionHeading title="Fragen zum Ablauf" />
          <div className="mt-8 max-w-3xl">
            <FaqAccordion items={ablaufFaq} />
          </div>
        </Container>
      </Section>

      <Section className="!pt-0">
        <CtaBanner title="Bereit für Schritt 1?" />
      </Section>
    </>
  );
}
