/** Der Ablauf in nummerierten Schritten (Startseite + /ablauf). */

export interface ProcessStep {
  number: number;
  title: string;
  body: string;
  icon: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: "Paket wählen",
    body: "Du entscheidest dich für ein Paket mit transparentem Festpreis – ohne Angebot abwarten zu müssen. Unsicher? Lumi hilft dir, das passende Paket zu finden.",
    icon: "package",
  },
  {
    number: 2,
    title: "Briefing mit Lumi",
    body: "Unsere KI-Assistentin Lumi führt dich in wenigen Minuten durch alle wichtigen Fragen – branchenangepasst, freundlich und ohne Formular-Frust. Materialien lädst du gleich mit hoch.",
    icon: "chat",
  },
  {
    number: 3,
    title: "Umsetzung mit festem Termin",
    body: "Ich gestalte und baue deine Website persönlich, KI-unterstützt und damit schnell. Du bekommst ein verbindliches Lieferdatum – kein „irgendwann“.",
    icon: "wrench",
  },
  {
    number: 4,
    title: "Go-live & Wartung",
    body: "Nach deiner Freigabe geht die Website online. Auf Wunsch kümmere ich mich laufend um Hosting, Updates und Backups – ab 49 €/Monat.",
    icon: "rocket",
  },
];
