/**
 * FAQ-Daten. Echte, häufige Kundenfragen mit 40–60-Wort-Antworten (GEO/AEO).
 * Werden sowohl sichtbar als auch als FAQPage-JSON-LD ausgegeben.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

/** Allgemeine FAQ (FAQ-Seite + Auszug auf Startseite). */
export const generalFaq: FaqItem[] = [
  {
    question: "Was kostet eine professionelle Website?",
    answer:
      "Eine professionelle Website kostet bei uns ab 990 € (Basis, One-Pager). Mehrseitige Websites starten bei 2.990 € (Pro), umfangreiche bei 5.990 € (Platin), individuelle Projekte ab 9.990 € (Enterprise). Alle Preise sind Festpreise netto – ohne versteckte Kosten.",
  },
  {
    question: "Warum feste Preise statt individueller Angebote?",
    answer:
      "Feste Preise schaffen Klarheit: Du weißt vom ersten Klick an, was deine Website kostet. Kein Angebotschaos, keine bösen Überraschungen. Was im Paket steht, gilt – verbindlich mit der Auftragsbestätigung.",
  },
  {
    question: "Wie läuft die Zusammenarbeit ab?",
    answer:
      "In vier Schritten: Du wählst ein Paket, beschreibst dein Projekt im Briefing mit Lumi, ich setze die Website zum festen Termin um, und sie geht online – auf Wunsch mit laufender Wartung. Du hast durchgehend einen persönlichen Ansprechpartner.",
  },
  {
    question: "Was ist Lumi?",
    answer:
      "Lumi ist unsere KI-Briefing-Assistentin. Sie führt dich in wenigen Minuten durch alle Fragen zu deinem Website-Projekt – branchenangepasst und freundlich. So entsteht ein vollständiges Briefing, ohne dass du ein Formular ausfüllen oder telefonieren musst.",
  },
  {
    question: "Was kostet die monatliche Wartung?",
    answer:
      "Die Wartung kostet je nach Paket 49 €, 99 € oder 299 € im Monat, bei Enterprise ab 499 €. Enthalten sind Hosting in Deutschland, Updates, Backups, SSL und persönlicher Support. Monatlich kündbar, keine lange Bindung.",
  },
  {
    question: "Was, wenn ich mehr brauche als im Paket enthalten ist?",
    answer:
      "Dann ergänzt du gezielt Add-ons: Logo ab 390 €, Texte 120 € pro Seite, Terminbuchung 290 €, KI-Chatbot 490 € und mehr. Lumi summiert deine Auswahl transparent – als unverbindliche Schätzung, verbindlich erst mit der Auftragsbestätigung.",
  },
  {
    question: "Sind die Preise netto oder brutto?",
    answer:
      "Alle genannten Preise sind Nettopreise und verstehen sich zzgl. der gesetzlichen Umsatzsteuer. Das ist bei B2B-Webdesign-Angeboten in Deutschland Standard. Auf Wunsch nennen wir dir jederzeit den Bruttobetrag.",
  },
  {
    question: "Ist meine Website barrierefrei?",
    answer:
      "Wir bauen alle Websites WCAG-2.1-AA-orientiert: Tastaturbedienung, gute Kontraste, Alt-Texte und klare Formular-Labels. Das ist seit dem Barrierefreiheitsstärkungsgesetz (BFSG, seit 28.06.2025) für viele Anbieter relevant – und ein echtes Qualitätssignal.",
  },
  {
    question: "Wem gehört die Website am Ende?",
    answer:
      "Dir. Nach Bezahlung gehören dir Website und Inhalte vollständig. Du bist an keinen Anbieter gebunden und kannst die Wartung jederzeit beenden oder umziehen – Transparenz gilt auch hier.",
  },
  {
    question: "Bietet ihr eine Garantie?",
    answer:
      "Ja. Es gilt der Festpreis – kein Cent mehr als im Paket vereinbart. Die enthaltenen Korrekturrunden sorgen dafür, dass das Ergebnis passt. Weitere Korrekturrunden gibt es transparent für je 90 €.",
  },
];
