/**
 * Glossar/Lexikon (eigene Definitionen – keine Kopien). Answer-First je Begriff
 * (Definition zuerst), dann Tiefe. Stärkt Topical Authority und Entitäten;
 * je Begriff DefinedTerm-Schema.
 */

export interface GlossarTerm {
  slug: string;
  term: string;
  longForm?: string;
  definition: string;
  body: string[];
  related: string[];
}

export const glossar: GlossarTerm[] = [
  {
    slug: "seo",
    term: "SEO",
    longForm: "Search Engine Optimization (Suchmaschinenoptimierung)",
    definition:
      "SEO (Suchmaschinenoptimierung) umfasst alle Maßnahmen, die dafür sorgen, dass eine Website in den unbezahlten Google-Ergebnissen besser gefunden wird. Dazu gehören passende Inhalte, eine saubere technische Basis, schnelle Ladezeiten und Verlinkungen. Ziel ist mehr qualifizierter Besucherverkehr, ohne pro Klick zu bezahlen.",
    body: [
      "SEO teilt sich grob in Onpage (Inhalte, Struktur, Technik der eigenen Seite), Offpage (Verlinkungen und Erwähnungen) und technisches SEO (Ladezeit, Mobilfreundlichkeit, strukturierte Daten). Für lokale Unternehmen ist zusätzlich lokales SEO entscheidend.",
      "Anders als bezahlte Anzeigen wirkt SEO mittelfristig: Erste Effekte zeigen sich oft nach 2–3 Monaten, stabile Rankings nach mehreren Monaten. Dafür ist der Verkehr nachhaltig und verursacht keine laufenden Klickkosten.",
    ],
    related: ["geo", "local-pack", "core-web-vitals"],
  },
  {
    slug: "geo",
    term: "GEO",
    longForm: "Generative Engine Optimization",
    definition:
      "GEO (Generative Engine Optimization) ist die Optimierung von Inhalten, damit sie in KI-Antworten von ChatGPT, Perplexity oder Google AI Overviews zitiert und empfohlen werden. Während SEO auf Klicks zielt, geht es bei GEO um Erwähnung. Die stärksten Hebel sind Antwort-zuerst-Texte, Statistiken, Zitate und Quellenangaben.",
    body: [
      "Die wissenschaftliche Grundlage liefert die Studie »GEO: Generative Engine Optimization« (Aggarwal et al., KDD 2024): Quellenangaben, Zitate und Statistiken steigern die Sichtbarkeit in generativen Engines um insgesamt bis zu 40 %. Reines Keyword-Stuffing wirkt dagegen negativ.",
      "Besonders interessant für kleinere Anbieter: Gerade mittel platzierte Seiten profitieren am stärksten – man kann in KI-Antworten zitiert werden, lange bevor man organisch auf Seite 1 steht.",
    ],
    related: ["seo", "schema", "core-web-vitals"],
  },
  {
    slug: "core-web-vitals",
    term: "Core Web Vitals",
    definition:
      "Core Web Vitals sind von Google definierte Messwerte für die Nutzererfahrung einer Website: Ladezeit (LCP), Reaktionsfähigkeit (INP) und visuelle Stabilität (CLS). Sie fließen als Ranking-Signal in die Google-Suche ein und entscheiden mit darüber, ob Besucher bleiben oder abspringen.",
    body: [
      "LCP (Largest Contentful Paint) misst, wie schnell der Hauptinhalt sichtbar ist (Ziel unter 2,5 s). INP (Interaction to Next Paint) misst die Reaktionsfähigkeit auf Eingaben (Ziel unter 200 ms). CLS (Cumulative Layout Shift) misst ungewolltes Verrutschen von Inhalten (Ziel unter 0,1).",
      "Entscheidend sind die echten Felddaten der Nutzer (CrUX), nicht nur ein Labor-Wert. Mit modernem Tech-Stack wie Next.js lassen sich diese Werte zuverlässig im grünen Bereich halten.",
    ],
    related: ["seo", "lighthouse", "hosting"],
  },
  {
    slug: "local-pack",
    term: "Local Pack",
    definition:
      "Das Local Pack ist der Block mit drei lokalen Unternehmen plus Karte, den Google bei standortbezogenen Suchen oben anzeigt. Wer dort erscheint, gewinnt einen Großteil der lokalen Klicks. Maßgeblich sind ein gepflegtes Google-Unternehmensprofil, konsistente Kontaktdaten (NAP) und echte Bewertungen.",
    body: [
      "Für lokale Betriebe ist das Local Pack oft wichtiger als Platz 1 der normalen Ergebnisse, weil es prominenter steht und direkt Anruf, Route und Bewertungen zeigt.",
      "Die wichtigsten Hebel: vollständiges Google-Unternehmensprofil, korrekte und überall identische NAP-Daten, Bewertungen aktiv einsammeln und lokale Inhalte auf der Website.",
    ],
    related: ["nap", "seo", "google-unternehmensprofil"],
  },
  {
    slug: "nap",
    term: "NAP",
    longForm: "Name, Address, Phone",
    definition:
      "NAP steht für Name, Adresse und Telefonnummer eines Unternehmens. Für lokales SEO müssen diese Angaben überall exakt identisch sein – auf der Website, im Google-Profil und in Verzeichnissen. Schon kleine Abweichungen (z. B. »Str.« vs. »Straße«) können das Vertrauen von Suchmaschinen mindern.",
    body: [
      "Konsistente NAP-Daten signalisieren Google und KI-Systemen, dass es sich um ein und dasselbe, echte Unternehmen handelt. Das stärkt die lokale Sichtbarkeit und die Chance, im Local Pack zu erscheinen.",
      "Auf der Website gehören die NAP-Daten in den Footer jeder Seite, auf die Kontaktseite und ins Impressum – dort erfüllen sie zugleich die gesetzliche Impressumspflicht.",
    ],
    related: ["local-pack", "google-unternehmensprofil", "seo"],
  },
  {
    slug: "schema",
    term: "Schema / Strukturierte Daten",
    definition:
      "Strukturierte Daten (Schema.org, meist als JSON-LD) sind ein maschinenlesbares Etikett im Quellcode, das Suchmaschinen und KI erklärt, worum es auf einer Seite geht – etwa Unternehmen, Leistung, Preis oder FAQ. Das erhöht die Chance auf Rich Results und die korrekte Zitierung in KI-Antworten.",
    body: [
      "Schema beeinflusst das Ranking nicht direkt, macht Inhalte aber eindeutig interpretierbar. Relevante Typen sind u. a. Organization/LocalBusiness, Service, Offer, FAQPage, Article, Person und BreadcrumbList.",
      "Wichtig: Das Markup muss immer dem sichtbaren Inhalt entsprechen, sonst drohen Richtlinienverstöße. Generisches Minimal-Schema bringt wenig – vollständige, akkurate Auszeichnung ist der Hebel.",
    ],
    related: ["seo", "geo", "core-web-vitals"],
  },
  {
    slug: "responsive-design",
    term: "Responsive Design",
    definition:
      "Responsive Design bedeutet, dass sich eine Website automatisch an jede Bildschirmgröße anpasst – vom Smartphone bis zum großen Monitor. Da Google mobil-first indexiert und die meisten Besucher am Handy kommen, ist ein responsives, mobil-optimiertes Layout heute Pflicht, kein Extra.",
    body: [
      "Konkret heißt das: lesbare Schrift ohne Zoomen, gut tippbare Buttons (mind. 44×44 px), keine horizontalen Scrollbalken und Bilder, die sich der Breite anpassen.",
      "Alle unsere Websites sind standardmäßig responsiv und werden auf echten Geräten geprüft – Mobile-First ist Teil jedes Pakets.",
    ],
    related: ["core-web-vitals", "seo"],
  },
  {
    slug: "one-pager",
    term: "One-Pager",
    definition:
      "Ein One-Pager ist eine Website, die alle Inhalte auf einer einzigen, scrollbaren Seite bündelt – Leistungen, Über uns, Kontakt und mehr in Abschnitten. Er ist günstig, schnell umgesetzt und ideal für Selbstständige und kleine Betriebe mit einem klaren Angebot.",
    body: [
      "Vorteile sind der niedrige Preis (bei uns ab 990 €), die schnelle Umsetzung und die einfache Bedienung. Grenzen hat der One-Pager beim SEO: Für viele verschiedene Suchbegriffe oder Orte sind mehrere Unterseiten besser.",
      "Ein One-Pager lässt sich später zur mehrseitigen Website ausbauen, wenn das Angebot wächst.",
    ],
    related: ["seo", "responsive-design"],
  },
  {
    slug: "hosting",
    term: "Hosting",
    definition:
      "Hosting ist der Speicherplatz auf einem Server, über den deine Website im Internet erreichbar ist. Gutes Hosting sorgt für schnelle Ladezeiten, hohe Verfügbarkeit und Sicherheit. Für deutsche Unternehmen ist ein Serverstandort in Deutschland aus Datenschutzgründen sinnvoll.",
    body: [
      "Zum Betrieb gehören neben dem reinen Speicherplatz auch SSL-Zertifikat, regelmäßige Backups und Software-Updates. Ohne diese Pflege steigt das Risiko von Ausfällen und Sicherheitslücken.",
      "Unsere Wartungspakete (ab 49 €/Monat) bündeln Hosting in Deutschland, SSL, Backups, Updates und Support – damit du dich um nichts kümmern musst.",
    ],
    related: ["ssl", "core-web-vitals"],
  },
  {
    slug: "ssl",
    term: "SSL / HTTPS",
    definition:
      "SSL (heute TLS) verschlüsselt die Verbindung zwischen Browser und Website, erkennbar am https und dem Schloss-Symbol. Es schützt übertragene Daten, ist für Formulare und Datenschutz Pflicht und gilt seit Jahren als Ranking-Signal bei Google.",
    body: [
      "Ohne SSL warnen Browser aktiv vor der Seite, was Besucher abschreckt. Ein SSL-Zertifikat ist daher Grundausstattung jeder seriösen Website.",
      "Bei uns ist SSL in jedem Hosting-/Wartungspaket enthalten und wird automatisch verlängert.",
    ],
    related: ["hosting", "seo"],
  },
  {
    slug: "conversion",
    term: "Conversion",
    definition:
      "Eine Conversion ist eine gewünschte Handlung eines Website-Besuchers – etwa eine Anfrage, ein Anruf, eine Terminbuchung oder ein Kauf. Die Conversion-Rate misst, wie viel Prozent der Besucher diese Handlung ausführen. Sie ist die wichtigste Kennzahl dafür, ob eine Website geschäftlich wirklich funktioniert.",
    body: [
      "Conversions hängen von vielen Faktoren ab: klare Handlungsaufforderungen (CTAs), Vertrauen, Ladezeit, mobile Bedienung und ein reibungsloser Weg vom Interesse zur Anfrage.",
      "Unser Briefing-Assistent Lumi ist ein Conversion-Element: Er macht aus Interesse in wenigen Minuten eine konkrete, qualifizierte Anfrage – ohne Formular-Frust.",
    ],
    related: ["core-web-vitals", "seo"],
  },
  {
    slug: "lighthouse",
    term: "Lighthouse",
    definition:
      "Lighthouse ist ein kostenloses Analyse-Werkzeug von Google, das Websites in den Bereichen Leistung, Barrierefreiheit, Best Practices und SEO bewertet (0–100). Es liefert einen Laborwert, der Schwachstellen aufzeigt – die für das Ranking relevanten Felddaten misst Google zusätzlich über echte Nutzer.",
    body: [
      "Ein guter Lighthouse-Score ist ein Qualitätsindikator, aber kein Selbstzweck: Entscheidend für SEO sind die echten Core Web Vitals der Nutzer (CrUX). Beides sollte im grünen Bereich liegen.",
      "Unsere Websites erreichen dank Next.js typischerweise Spitzenwerte – ein Leistungsnachweis, den wir Kunden direkt zeigen.",
    ],
    related: ["core-web-vitals", "seo", "geo"],
  },
  {
    slug: "google-unternehmensprofil",
    term: "Google-Unternehmensprofil",
    definition:
      "Das Google-Unternehmensprofil (früher Google My Business) ist der kostenlose Eintrag, mit dem ein Unternehmen in der Google-Suche und in Google Maps erscheint – mit Adresse, Öffnungszeiten, Fotos und Bewertungen. Es ist der wichtigste einzelne Hebel für lokale Sichtbarkeit.",
    body: [
      "Ein vollständig gepflegtes Profil mit passender Kategorie, aktuellen Infos und echten Bewertungen erhöht die Chance, im Local Pack zu erscheinen, deutlich.",
      "Die Einrichtung und Optimierung bieten wir als Add-on für 190 € an – inklusive konsistenter NAP-Daten zur Website.",
    ],
    related: ["local-pack", "nap", "seo"],
  },
];

export function getTerm(slug: string): GlossarTerm | undefined {
  return glossar.find((t) => t.slug === slug);
}
