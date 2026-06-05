/**
 * Ratgeber-Artikel (Topical Authority + GEO). Answer-First, mit belegten
 * Statistiken/Quellen. Eigene Texte – keine Kopien fremder Inhalte.
 */

import type { FaqItem } from "./faq";

export interface ArticleSection {
  heading: string;
  body: string[];
  list?: string[];
}

export interface RatgeberArticle {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  updated: string;
  readingMinutes: number;
  lead: string;
  sections: ArticleSection[];
  stat?: { text: string; source: string };
  faq: FaqItem[];
}

export const articles: RatgeberArticle[] = [
  {
    slug: "was-kostet-eine-website",
    title: "Was kostet eine Website in Sachsen?",
    metaTitle: "Was kostet eine Website? Preise 2026 (Sachsen)",
    metaDescription:
      "Was kostet eine professionelle Website? Realistische Preise von One-Pager bis Mehrseiter, Festpreis vs. Stundensatz und laufende Kosten – ehrlich erklärt.",
    excerpt:
      "Von 990 € für den One-Pager bis individuell für komplexe Projekte: realistische Preise, was den Preis treibt und warum Festpreise fairer sind.",
    updated: "2026-06-05",
    readingMinutes: 6,
    lead: "Eine professionelle Website kostet in Sachsen meist zwischen 990 € für einen One-Pager und rund 6.000 € für eine umfangreiche Mehrseiten-Website; komplexe Projekte liegen darüber. Den Preis bestimmen vor allem Seitenzahl, Funktionen, Design-Aufwand und ob Texte und Bilder vorhanden sind. Dazu kommen laufende Kosten für Hosting und Wartung.",
    sections: [
      {
        heading: "Was treibt den Preis einer Website?",
        body: [
          "Der größte Hebel ist der Umfang: Ein One-Pager ist deutlich günstiger als eine Website mit 10 Unterseiten. Funktionen wie Online-Terminbuchung, Shop oder Mehrsprachigkeit erhöhen den Aufwand ebenso wie individuelles Design statt einer angepassten Vorlage.",
          "Oft unterschätzt: Inhalte. Wenn Texte und Bilder fehlen, kostet deren Erstellung extra. Genau hier entstehen bei klassischen Agenturen die bösen Überraschungen, weil vorher kein klarer Preis genannt wird.",
        ],
        list: [
          "Anzahl der Unterseiten",
          "Funktionen (Buchung, Shop, Mehrsprachigkeit)",
          "Individuelles Design vs. Vorlage",
          "Vorhandene Texte und Bilder",
          "SEO-Tiefe und laufende Betreuung",
        ],
      },
      {
        heading: "Festpreis oder Stundensatz – was ist besser?",
        body: [
          "Bei einem Stundensatz (in Sachsen grob 60–120 €/Stunde) weißt du vorab nicht, was am Ende auf der Rechnung steht. Ein Festpreis nennt die Investition vor Projektstart – du kannst planen, vergleichen und hast kein Kostenrisiko.",
          "Für die meisten kleinen und mittleren Betriebe ist der Festpreis fairer und stressfreier. Wichtig ist nur, dass klar definiert ist, was enthalten ist – genau dafür gibt es bei uns vier feste Pakete.",
        ],
      },
      {
        heading: "Welche laufenden Kosten kommen dazu?",
        body: [
          "Eine Website will betrieben und gepflegt werden: Domain, Hosting, SSL, Updates und Backups. Realistisch sind dafür je nach Umfang etwa 49 bis 299 € pro Monat. Wer das vernachlässigt, riskiert Sicherheitslücken und Ausfälle.",
          "Unsere Wartungspakete bündeln Hosting in Deutschland, Updates, Backups und Support – monatlich kündbar, ohne lange Bindung.",
        ],
      },
    ],
    stat: {
      text: "Jede zusätzliche Sekunde Ladezeit kostet messbar Conversions – Performance ist also kein Luxus, sondern wirkt direkt auf Anfragen und Umsatz.",
      source: "Branchenkonsens Core Web Vitals / Google",
    },
    faq: [
      {
        question: "Was kostet eine einfache Website?",
        answer:
          "Eine professionelle One-Page-Website kostet bei uns 990 € als Festpreis. Sie enthält Design, mobile Optimierung, Kontaktformular und SEO-Grundlagen – ideal für Selbstständige und kleine Betriebe, die schnell und günstig online sein wollen.",
      },
      {
        question: "Warum sind manche Webdesign-Angebote so teuer?",
        answer:
          "Hohe Preise entstehen oft durch individuelle Programmierung, komplexe Funktionen oder Agentur-Overhead. Für die meisten lokalen Unternehmen ist das nicht nötig. Ein klarer Festpreis verhindert, dass aus einem geplanten Budget unbemerkt das Doppelte wird.",
      },
      {
        question: "Sind die Preise netto oder brutto?",
        answer:
          "Die genannten Preise sind Nettopreise zzgl. der gesetzlichen Umsatzsteuer – Standard bei B2B-Webdesign in Deutschland. Auf Wunsch nennen wir dir jederzeit den Bruttobetrag.",
      },
    ],
  },
  {
    slug: "bfsg-website-pflicht",
    title: "BFSG: Muss meine Website barrierefrei sein?",
    metaTitle: "BFSG 2025: Muss meine Website barrierefrei sein?",
    metaDescription:
      "Barrierefreiheitsstärkungsgesetz (BFSG) seit 28.06.2025: Wer ist betroffen, gilt die Kleinstunternehmer-Ausnahme, und warum Barrierefreiheit sich trotzdem lohnt.",
    excerpt:
      "Seit Juni 2025 gilt das BFSG. Wer muss handeln, wer ist ausgenommen – und warum eine barrierefreie Website auch ohne Pflicht klug ist.",
    updated: "2026-06-05",
    readingMinutes: 5,
    lead: "Das Barrierefreiheitsstärkungsgesetz (BFSG) gilt seit dem 28. Juni 2025 und verpflichtet viele Anbieter mit B2C-Funktionen (z. B. Shop oder Buchung) zu barrierefreien Websites nach WCAG 2.1 AA. Kleinstunternehmen mit weniger als 10 Beschäftigten und höchstens 2 Mio. € Jahresumsatz sind bei Dienstleistungen aber ausgenommen.",
    sections: [
      {
        heading: "Wer ist vom BFSG betroffen?",
        body: [
          "Grundsätzlich richtet sich das BFSG an Websites, die Verbrauchern bestimmte Dienstleistungen anbieten oder Verträge ermöglichen – etwa Onlineshops, Buchungs- oder Banking-Funktionen. Reine Image- oder Visitenkarten-Websites ohne solche Funktionen fallen meist nicht darunter.",
          "Maßstab für die technische Umsetzung sind die WCAG 2.1 auf Stufe AA (über die Norm EN 301 549).",
        ],
      },
      {
        heading: "Gilt die Kleinstunternehmer-Ausnahme für mich?",
        body: [
          "Für Dienstleistungen gibt es eine Ausnahme für Kleinstunternehmen: weniger als 10 Beschäftigte UND höchstens 2 Mio. € Jahresumsatz oder Jahresbilanzsumme. Wer darunter liegt, ist von der Dienstleistungs-Pflicht ausgenommen – die Einordnung ist allerdings eine Einzelfall-Frage.",
          "Wichtig: Diese Ausnahme gilt nicht für Hersteller/Händler bestimmter Produkte. Im Zweifel ist anwaltliche Prüfung sinnvoll.",
        ],
      },
      {
        heading: "Warum sich Barrierefreiheit trotzdem lohnt",
        body: [
          "Auch ohne Pflicht ist eine barrierefreie Website klug: Sie erreicht mehr Menschen, ist besser für SEO, schneller und wirkt professioneller. Wir bauen alle Websites code-seitig WCAG-2.1-AA-orientiert – ganz ohne riskante »Overlay«-Tools, die selbst Abmahnrisiken bergen.",
        ],
        list: [
          "Größere Reichweite (auch ältere Nutzer, Smartphones, schlechte Verbindungen)",
          "Besseres SEO durch saubere Struktur",
          "Geringeres Abmahnrisiko als bei Overlay-Tools",
          "Glaubwürdiges Qualitätssignal",
        ],
      },
    ],
    stat: {
      text: "Bei Verstößen sieht § 37 BFSG Bußgelder von bis zu 100.000 € vor; zusätzlich sind seit Sommer 2025 erste wettbewerbsrechtliche Abmahnungen dokumentiert.",
      source: "BFSG § 37; Branchenberichte 2025",
    },
    faq: [
      {
        question: "Ist eine reine Visitenkarten-Website BFSG-pflichtig?",
        answer:
          "In der Regel nicht. Ohne Shop, Buchung oder ähnliche Verbraucher-Funktionen fällt eine reine Image-Website meist nicht unter das BFSG. Die genaue Einordnung ist aber ein Einzelfall – im Zweifel anwaltlich prüfen lassen.",
      },
      {
        question: "Sind Accessibility-Overlays eine gute Lösung?",
        answer:
          "Nein, davon raten wir ab. Overlay-Tools beheben Barrieren oft nur scheinbar und haben selbst Abmahnungen ausgelöst. Echte Barrierefreiheit entsteht im Code – genau so bauen wir unsere Websites.",
      },
    ],
  },
  {
    slug: "one-pager-oder-mehrseitig",
    title: "One-Pager oder mehrseitige Website?",
    metaTitle: "One-Pager oder mehrseitige Website? Der Vergleich",
    metaDescription:
      "One-Pager oder Mehrseiter? Wann eine einzelne Seite reicht und wann sich mehrere Unterseiten lohnen – inklusive Auswirkung auf SEO und Preis.",
    excerpt:
      "Wann reicht eine Seite, wann brauchst du mehrere? Der ehrliche Vergleich – inklusive SEO- und Preis-Folgen.",
    updated: "2026-06-05",
    readingMinutes: 4,
    lead: "Ein One-Pager (alles auf einer Seite) reicht für Selbstständige und kleine Betriebe mit einem klaren Angebot und ist ab 990 € zu haben. Sobald du mehrere Leistungen, lokale Seiten oder einen Blog für SEO brauchst, lohnt sich eine mehrseitige Website – denn Google rankt einzelne Seiten, nicht ganze Sites.",
    sections: [
      {
        heading: "Wann reicht ein One-Pager?",
        body: [
          "Ein One-Pager ist ideal, wenn dein Angebot überschaubar ist: ein Handwerker mit einem Gewerk, ein Café, ein Coach mit einem Programm. Alle wichtigen Infos – Leistungen, Kontakt, Karte – passen auf eine gut strukturierte Seite, die schnell lädt und günstig ist.",
        ],
      },
      {
        heading: "Wann lohnt sich eine mehrseitige Website?",
        body: [
          "Sobald du mehrere Leistungen getrennt darstellen, lokale Landingpages für verschiedene Orte anlegen oder über einen Blog Sichtbarkeit aufbauen willst, brauchst du mehrere Seiten. Der Grund ist SEO: Jede Seite kann für ein eigenes Suchwort ranken – mehr relevante Seiten bedeuten mehr Chancen, gefunden zu werden.",
        ],
        list: [
          "Mehrere Leistungen mit eigenem Suchvolumen",
          "Lokale Seiten für mehrere Städte",
          "Blog/Ratgeber für Topical Authority",
          "Größeres Portfolio oder Team",
        ],
      },
      {
        heading: "Wie wirkt sich die Wahl auf den Preis aus?",
        body: [
          "Der One-Pager (Basis) kostet 990 €. Eine mehrseitige Website beginnt bei 2.990 € (Pro, bis 8 Seiten) und 5.990 € (Platin, bis 20 Seiten). Du kannst klein starten und später ausbauen – wichtig ist, dass die Struktur von Anfang an sauber angelegt ist.",
        ],
      },
    ],
    faq: [
      {
        question: "Ist ein One-Pager schlecht für SEO?",
        answer:
          "Nicht grundsätzlich. Ein One-Pager kann für ein Hauptthema gut ranken. Für mehrere Suchbegriffe oder Orte stößt er aber an Grenzen, weil Google einzelne Seiten bewertet. Wer breit gefunden werden will, fährt mit mehreren Seiten besser.",
      },
      {
        question: "Kann ich später vom One-Pager zur Mehrseiten-Website wechseln?",
        answer:
          "Ja. Wir legen die Seite technisch so an, dass ein Ausbau später problemlos möglich ist. Du kannst mit dem Basis-Paket starten und bei Bedarf auf Pro oder Platin erweitern, ohne von vorn zu beginnen.",
      },
    ],
  },
  {
    slug: "website-selbst-machen-oder-machen-lassen",
    title: "Website selbst machen oder machen lassen?",
    metaTitle: "Website selbst machen oder machen lassen? Ehrlicher Vergleich",
    metaDescription:
      "Baukasten selbst nutzen oder Profi beauftragen? Kosten, Zeit, Qualität und SEO im ehrlichen Vergleich – damit du die richtige Entscheidung triffst.",
    excerpt:
      "Baukasten oder Profi? Was dich Zeit, Geld und Nerven kostet – und wann sich welche Option lohnt.",
    updated: "2026-06-05",
    readingMinutes: 5,
    lead: "Eine Website selbst mit einem Baukasten zu bauen, ist günstig (oft 10–30 €/Monat) und für einfachste Auftritte machbar. Wer aber Zeit sparen, professionell wirken und bei Google gut gefunden werden will, fährt mit einem Profi zum Festpreis meist besser – weil Qualität, SEO und Performance über Anfragen entscheiden.",
    sections: [
      {
        heading: "Was kostet dich der Selbstbau wirklich?",
        body: [
          "Baukästen wie Wix oder Jimdo wirken billig, doch der echte Preis ist deine Zeit: Einarbeitung, Design, Texte, technische Stolpersteine. Schnell stecken 30–50 Stunden in einem Ergebnis, das oft langsamer, weniger individuell und schlechter auffindbar ist als eine professionelle Seite.",
        ],
      },
      {
        heading: "Wann lohnt sich der Profi?",
        body: [
          "Wenn deine Website Anfragen oder Verkäufe bringen soll, zählt jedes Detail: Ladezeit, mobile Bedienung, klare Struktur, SEO und Vertrauen. Ein Profi liefert das planbar zum Festpreis und nimmt dir die Technik komplett ab – du kümmerst dich um dein Geschäft.",
        ],
        list: [
          "Du willst Zeit sparen statt selbst basteln",
          "Die Website soll messbar Anfragen bringen",
          "Professioneller, vertrauenswürdiger Eindruck ist wichtig",
          "Du brauchst gute Auffindbarkeit (SEO/GEO)",
        ],
      },
      {
        heading: "Gibt es einen Mittelweg?",
        body: [
          "Ja: Du kannst klein starten. Ein professioneller One-Pager ab 990 € ist oft günstiger als ein Jahr Baukasten plus deine investierte Zeit – und liefert ein Ergebnis, das wirklich funktioniert. Lumi nimmt dein Briefing in Minuten auf, der Rest läuft für dich.",
        ],
      },
    ],
    faq: [
      {
        question: "Ist ein Website-Baukasten schlecht?",
        answer:
          "Nicht für jeden Zweck. Für ein reines Hobby oder einen Testballon kann ein Baukasten genügen. Sobald die Website geschäftlich Anfragen bringen, schnell laden und gut ranken soll, stoßen Baukästen aber an Grenzen bei Performance, SEO und Individualität.",
      },
      {
        question: "Wie viel Zeit spare ich, wenn ich es machen lasse?",
        answer:
          "In der Regel mehrere Tage Arbeit. Statt dich einzuarbeiten, beschreibst du dein Projekt in wenigen Minuten mit Lumi – Design, Technik und SEO übernehmen wir. Du bekommst ein professionelles Ergebnis zum festen Termin, ohne eigenen Aufwand.",
      },
    ],
  },
];

export function getArticle(slug: string): RatgeberArticle | undefined {
  return articles.find((a) => a.slug === slug);
}
