/**
 * Branchen-Landingpages (Money-Pages je Branche). Quick-Win-Nischen mit
 * geringem Wettbewerb. Texte Answer-First, mit lokalem Sachsen-Bezug + FAQ.
 */

import type { FaqItem } from "./faq";

export interface Branche {
  slug: string;
  name: string;
  audience: string;
  icon: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  problem: { heading: string; body: string };
  solution: { heading: string; body: string };
  benefits: string[];
  recommendation: string;
  faq: FaqItem[];
}

export const branchen: Branche[] = [
  {
    slug: "friseur",
    name: "Friseure",
    audience: "Friseursalons",
    icon: "sparkles",
    metaTitle: "Website für Friseure – Festpreis-Webdesign mit Online-Termin",
    metaDescription:
      "Professionelle Website für deinen Friseursalon zum Festpreis ab 990 €: mit Online-Terminbuchung, Galerie und lokalem SEO. Mehr Termine, weniger Telefon.",
    lead: "Eine Website für Friseure bringt dir vor allem eins: mehr gebuchte Termine ohne ständiges Telefonklingeln. Zum Festpreis ab 990 € bekommst du eine schnelle, mobile Seite mit Online-Terminbuchung, Foto-Galerie deiner Arbeiten und lokalem SEO, damit dich Kund:innen in deiner Stadt finden.",
    problem: {
      heading: "Warum reicht ein Instagram-Profil nicht?",
      body: "Social Media ist gut für Sichtbarkeit, aber niemand bucht dort zuverlässig einen Termin, und du tauchst kaum bei Google auf. Wer »Friseur in der Nähe« sucht, landet bei Salons mit gepflegter Website und Google-Profil – nicht bei einem reinen Instagram-Account.",
    },
    solution: {
      heading: "Was bringt eine eigene Friseur-Website?",
      body: "Sie nimmt rund um die Uhr Termine entgegen, zeigt deine besten Arbeiten, listet Preise und Öffnungszeiten und macht dich lokal bei Google sichtbar. Das spart dir Zeit am Telefon und gewinnt neue Kund:innen, die gezielt in deiner Stadt suchen.",
    },
    benefits: [
      "Online-Terminbuchung – weniger Telefon, mehr gebuchte Stühle",
      "Galerie deiner Schnitte, Farben und Stylings",
      "Preise & Öffnungszeiten immer aktuell",
      "Lokales SEO + Google-Profil für »Friseur + deine Stadt«",
      "Mobil-optimiert – die meisten suchen am Handy",
    ],
    recommendation:
      "Für die meisten Salons passt das Pro-Paket (2.990 €) mit mehreren Seiten; die Terminbuchung gibt es als Add-on für 290 €.",
    faq: [
      {
        question: "Kann ich Online-Terminbuchung in meine Friseur-Website einbauen?",
        answer:
          "Ja. Wir binden ein Buchungssystem ein, über das Kund:innen rund um die Uhr Termine reservieren. Die Einrichtung kostet als Add-on 290 € und reduziert spürbar den Telefonaufwand in deinem Salon.",
      },
      {
        question: "Was kostet eine Website für einen Friseursalon?",
        answer:
          "Ab 990 € als Festpreis für einen professionellen One-Pager. Mit mehreren Unterseiten (Leistungen, Team, Galerie) ist das Pro-Paket für 2.990 € üblich. Online-Terminbuchung kommt optional für 290 € dazu – alles ohne versteckte Kosten.",
      },
    ],
  },
  {
    slug: "handwerker",
    name: "Handwerker",
    audience: "Handwerksbetriebe",
    icon: "wrench",
    metaTitle: "Website für Handwerker – Festpreis-Webdesign für Betriebe",
    metaDescription:
      "Professionelle Website für deinen Handwerksbetrieb zum Festpreis ab 990 €: mit Referenzen, Leistungen und lokalem SEO. Mehr Anfragen aus deiner Region.",
    lead: "Eine Website für Handwerker sorgt für planbare Anfragen statt nur Mundpropaganda. Zum Festpreis ab 990 € bekommst du eine schnelle Seite mit deinen Referenzprojekten, Leistungen und klaren Kontaktwegen – plus lokales SEO, damit dich Kunden finden, wenn sie »Maler, Elektriker oder Dachdecker in der Nähe« suchen.",
    problem: {
      heading: "Warum verlieren Handwerksbetriebe Aufträge online?",
      body: "Viele Betriebe haben keine oder eine veraltete Website. Doch die meisten Auftraggeber prüfen heute online, bevor sie anrufen. Ohne sichtbare Referenzen und gute Auffindbarkeit gehen Anfragen an Mitbewerber, die online professionell auftreten.",
    },
    solution: {
      heading: "Was muss eine Handwerker-Website können?",
      body: "Sie muss schnell laden, auf dem Handy funktionieren, deine besten Projekte zeigen und es leicht machen, dich zu kontaktieren. Referenzbilder schaffen Vertrauen, lokales SEO sorgt dafür, dass du in deinem Einzugsgebiet gefunden wirst – genau dafür ist unser Webdesign gemacht.",
    },
    benefits: [
      "Referenzgalerie deiner abgeschlossenen Projekte",
      "Klare Leistungsübersicht je Gewerk",
      "Schneller Kontakt: Anruf, Formular, Rückrufbitte",
      "Lokales SEO für dein Einzugsgebiet",
      "Optional: Notdienst-Hinweis prominent platziert",
    ],
    recommendation:
      "Für Handwerksbetriebe ist meist das Pro-Paket (2.990 €) ideal; ein starker One-Pager (Basis, 990 €) genügt für den Einstieg.",
    faq: [
      {
        question: "Welche Inhalte braucht eine Handwerker-Website?",
        answer:
          "Am wichtigsten sind Referenzbilder, eine klare Leistungsübersicht, dein Einzugsgebiet und einfache Kontaktwege. Bei Handwerksseiten wirken echte Projektfotos am stärksten – sie schaffen Vertrauen und führen direkt zu Anfragen.",
      },
      {
        question: "Lohnt sich lokales SEO für meinen Handwerksbetrieb?",
        answer:
          "Auf jeden Fall. Die meisten Kunden suchen lokal (»Heizung Notdienst Dresden«). Mit gepflegtem Google-Profil und lokalem SEO erscheinst du genau dann, wenn jemand in deiner Region deine Leistung braucht – der wichtigste Hebel für neue Aufträge.",
      },
    ],
  },
  {
    slug: "gastronomie",
    name: "Gastronomie",
    audience: "Restaurants & Cafés",
    icon: "euro",
    metaTitle: "Website für Restaurants & Cafés – Festpreis mit Speisekarte",
    metaDescription:
      "Professionelle Website für dein Restaurant oder Café zum Festpreis ab 990 €: digitale Speisekarte, Reservierung, Öffnungszeiten und lokales SEO.",
    lead: "Eine Website für Restaurants und Cafés führt Gäste direkt zu dir – mit digitaler Speisekarte, Öffnungszeiten und Reservierung. Zum Festpreis ab 990 € bekommst du eine appetitliche, schnelle Seite, die bei Google gut gefunden wird, wenn Gäste »Restaurant in der Nähe« oder deine Küche suchen.",
    problem: {
      heading: "Warum reicht ein Eintrag bei Lieferdiensten nicht?",
      body: "Plattformen kosten Provision und gehören dir nicht. Gäste, die deine Atmosphäre, deine aktuelle Karte oder freie Tische suchen, erwarten eine eigene Website. Fehlt sie oder ist die Speisekarte veraltet, ziehen sie zum nächsten Lokal weiter.",
    },
    solution: {
      heading: "Was gehört auf eine Gastro-Website?",
      body: "Eine aktuelle, gut lesbare Speisekarte, Öffnungszeiten, Anfahrt, schöne Bilder und eine einfache Reservierungsmöglichkeit. Dazu lokales SEO und ein gepflegtes Google-Profil, damit du in der lokalen Suche und auf der Karte sichtbar bist – genau das setzen wir um.",
    },
    benefits: [
      "Digitale Speisekarte – jederzeit aktualisierbar",
      "Öffnungszeiten, Anfahrt & Kontakt auf einen Blick",
      "Optional: Online-Reservierung",
      "Appetitliche Bildsprache, schnell ladend",
      "Lokales SEO + Google-Profil für mehr Gäste",
    ],
    recommendation:
      "Für viele Lokale genügt ein hochwertiger One-Pager (Basis, 990 €); mit Reservierung und mehreren Seiten ist Pro (2.990 €) passend.",
    faq: [
      {
        question: "Kann ich meine Speisekarte selbst aktualisieren?",
        answer:
          "Ja. Auf Wunsch richten wir die Speisekarte so ein, dass du sie selbst pflegen kannst, oder wir übernehmen Aktualisierungen im Rahmen der Wartung (ab 49 €/Monat). So ist deine Karte immer aktuell – online wie am Gast.",
      },
      {
        question: "Brauche ich eine Reservierungsfunktion?",
        answer:
          "Das hängt von deinem Konzept ab. Für Restaurants mit Tischservice lohnt sich Online-Reservierung; die Einrichtung gibt es als Add-on für 290 €. Cafés mit Laufkundschaft kommen oft mit Öffnungszeiten und Kontakt aus.",
      },
    ],
  },
];

export function getBranche(slug: string): Branche | undefined {
  return branchen.find((b) => b.slug === slug);
}
