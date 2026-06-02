/**
 * Die 5 Leistungen – jeweils eigene URL (Topical Authority / SEO).
 * Inhalte folgen dem Muster: Problem → Lösung → Vorteile → Umfang → Beweis → FAQ → CTA.
 * Texte nach GEO-Prinzip: Antwort-zuerst (40–60 Wörter), Frage-H2, belegte Zahlen.
 */

import type { FaqItem } from "./faq";

export interface Service {
  slug: string;
  title: string;
  /** Kurzer Teaser (Übersicht/Startseite). */
  teaser: string;
  /** Icon-Key (siehe components/Icon). */
  icon: string;
  /** SEO */
  metaTitle: string;
  metaDescription: string;
  /** Antwort-zuerst-Lead (40–60 Wörter, eigenständig zitierbar). */
  lead: string;
  /** Hauptkeyword (für interne Doku). */
  keyword: string;
  problem: { heading: string; body: string };
  solution: { heading: string; body: string };
  benefits: string[];
  /** Leistungsumfang. */
  scope: string[];
  /** Ablauf in nummerierten Schritten. */
  steps: { title: string; body: string }[];
  /** Belegter Fakt/Statistik mit Quelle (GEO). */
  proof?: { stat: string; source: string };
  /** In welchen Paketen enthalten. */
  inPackages: string;
  faq: FaqItem[];
}

export const services: Service[] = [
  {
    slug: "webdesign",
    title: "Webdesign",
    teaser: "Professionelle, schnelle Websites zum Festpreis – auf deine Marke zugeschnitten.",
    icon: "layout",
    metaTitle: "Webdesign zum Festpreis | Professionelle Websites",
    metaDescription:
      "Professionelles Webdesign zum Festpreis ab 990 €. Schnelle, mobil-optimierte und barrierearme Websites für lokale Unternehmen. Briefing in Minuten mit Lumi.",
    keyword: "Webdesign Festpreis",
    lead: "Webdesign bedeutet bei uns: eine professionelle, schnelle und mobil-optimierte Website zum Festpreis ab 990 €. Du wählst ein Paket, beschreibst dein Projekt in Minuten mit Lumi – und bekommst eine Seite, die zu deiner Marke passt und Anfragen bringt. Kein Angebotschaos, fester Termin.",
    problem: {
      heading: "Warum scheitern viele Website-Projekte?",
      body: "Klassische Webprojekte starten mit langen Angeboten, unklaren Kosten und Zeitplänen, die sich verschieben. Viele Selbstständige verlieren dabei Wochen – und am Ende stimmt das Budget nicht. Genau dieses „Angebotschaos“ ist der häufigste Grund, warum eine professionelle Website nie online geht.",
    },
    solution: {
      heading: "Wie läuft Webdesign zum Festpreis ab?",
      body: "Du wählst ein Paket mit klarem Preis und festem Lieferdatum. Im geführten Briefing mit Lumi sammeln wir alles Nötige – Ziel, Stil, Inhalte und Materialien. Danach setze ich die Website persönlich um, KI-unterstützt und damit schneller als eine klassische Agentur, ohne den persönlichen Ansprechpartner zu verlieren.",
    },
    benefits: [
      "Fester Preis, festes Lieferdatum – garantiert",
      "Individuelles Design auf Basis deiner Marke",
      "Mobil-optimiert und WCAG-orientiert barrierearm",
      "Technisch sauber: schnelle Ladezeit, SEO-Grundlagen, DSGVO-konform",
      "Ein persönlicher Ansprechpartner statt anonymer Agentur",
    ],
    scope: [
      "Konzept & Struktur (Wireframe)",
      "Individuelles Design auf Basis deiner Corporate Identity",
      "Responsive Umsetzung (Desktop, Tablet, Smartphone)",
      "Onpage-SEO-Grundlagen (Title, Meta, Überschriften, Sitemap)",
      "Kontaktformular, rechtssichere Einbindung von Impressum & Datenschutz",
      "Einweisung und Übergabe",
    ],
    steps: [
      { title: "Paket wählen", body: "Du entscheidest dich für ein Paket mit transparentem Festpreis." },
      { title: "Briefing mit Lumi", body: "In wenigen Minuten beschreibst du dein Projekt – geführt und branchenangepasst." },
      { title: "Umsetzung", body: "Ich gestalte und baue deine Website zum fest vereinbarten Termin." },
      { title: "Go-live & Wartung", body: "Deine Seite geht online – auf Wunsch mit laufender Wartung." },
    ],
    proof: {
      stat: "Jede zusätzliche Sekunde Ladezeit senkt die Conversion messbar – wir bauen auf Performance.",
      source: "Branchenstandard Core Web Vitals",
    },
    inPackages: "Webdesign ist die Grundlage aller Pakete – von Basis (One-Pager) bis Enterprise.",
    faq: [
      {
        question: "Was kostet eine professionelle Website?",
        answer:
          "Eine professionelle Website kostet bei uns ab 990 € (Basis, One-Pager). Mehrseitige Websites starten bei 2.990 € (Pro), umfangreiche Projekte bei 5.990 € (Platin). Alle Preise sind Festpreise netto, ohne versteckte Kosten.",
      },
      {
        question: "Wie lange dauert die Umsetzung?",
        answer:
          "Sobald dein Briefing und die Materialien vollständig sind, vereinbaren wir einen festen Liefertermin. Eine Basis-Website ist oft in 1–2 Wochen online, größere Projekte entsprechend planbar – immer mit verbindlichem Datum.",
      },
      {
        question: "Was, wenn ich noch keine Texte oder Bilder habe?",
        answer:
          "Kein Problem. Texte schreiben wir auf Wunsch für 120 € pro Seite, ein Logo gibt es ab 390 €. Lumi fragt im Briefing ab, was vorhanden ist, und schlägt passende Zusatzleistungen vor.",
      },
    ],
  },
  {
    slug: "hosting-wartung",
    title: "Hosting & Wartung",
    teaser: "Sicheres Hosting, Updates und Backups – damit deine Website dauerhaft läuft.",
    icon: "shield",
    metaTitle: "Website Hosting & Wartung | Monatlich ab 49 €",
    metaDescription:
      "Sicheres Hosting und laufende Wartung deiner Website ab 49 €/Monat: Updates, Backups, SSL und schnelle Hilfe. DSGVO-konform, mit Server in Deutschland.",
    keyword: "Website Wartung",
    lead: "Hosting & Wartung bedeutet: Deine Website bleibt schnell, sicher und aktuell – ab 49 € im Monat. Wir übernehmen Updates, Backups, SSL und Monitoring, damit du dich um dein Geschäft kümmern kannst statt um Technik. DSGVO-konform mit Serverstandort Deutschland.",
    problem: {
      heading: "Was passiert mit einer Website ohne Wartung?",
      body: "Eine ungewartete Website wird zum Risiko: Veraltete Software ist ein Einfallstor für Hacker, fehlende Backups bedeuten Datenverlust, und kleine Fehler bleiben unbemerkt. Gerade für Selbstständige ohne IT-Abteilung ist das ein unterschätztes Problem.",
    },
    solution: {
      heading: "Was beinhaltet die Wartung?",
      body: "Wir kümmern uns um alles Technische: regelmäßige Updates, tägliche Backups, SSL-Verlängerung, Sicherheits-Monitoring und kleine Anpassungen. Bei Problemen bist du nicht allein – du hast einen festen Ansprechpartner statt eines anonymen Support-Tickets.",
    },
    benefits: [
      "Server in Deutschland, DSGVO-konform",
      "Automatische Backups und schnelle Wiederherstellung",
      "Software-Updates & Sicherheits-Monitoring",
      "SSL-Zertifikat inklusive",
      "Persönliche Hilfe bei Fragen",
    ],
    scope: [
      "Hosting auf performanten Servern in Deutschland",
      "Regelmäßige System- und Sicherheitsupdates",
      "Tägliche automatische Backups",
      "SSL-Zertifikat und Verlängerung",
      "Uptime- und Sicherheits-Monitoring",
      "Kleine inhaltliche Anpassungen je nach Paket",
    ],
    steps: [
      { title: "Wartungspaket wählen", body: "Passend zu deiner Website: 49 €, 99 €, 299 € oder ab 499 €/Monat." },
      { title: "Einrichtung", body: "Wir richten Hosting, Backups und Monitoring ein." },
      { title: "Laufender Betrieb", body: "Updates und Backups laufen automatisch im Hintergrund." },
      { title: "Bei Bedarf da", body: "Du meldest dich – wir kümmern uns persönlich." },
    ],
    inPackages: "Wartung ist als monatliches Modul zu jedem Paket buchbar (ab 49 €/Monat).",
    faq: [
      {
        question: "Was kostet die Wartung einer Website?",
        answer:
          "Die Wartung kostet je nach Umfang 49 €, 99 € oder 299 € pro Monat, bei Enterprise-Projekten ab 499 €. Enthalten sind Hosting, Updates, Backups, SSL und Support.",
      },
      {
        question: "Ist die Wartung Pflicht?",
        answer:
          "Nein, die Wartung ist optional, aber dringend empfohlen. Ohne Updates und Backups steigt das Sicherheitsrisiko. Du kannst monatlich kündigen – keine lange Vertragsbindung.",
      },
      {
        question: "Wo liegen meine Daten?",
        answer:
          "Deine Website liegt auf Servern in Deutschland und wird DSGVO-konform betrieben. Das ist besonders für lokale Unternehmen mit Kundendaten wichtig.",
      },
    ],
  },
  {
    slug: "seo-optimierung",
    title: "SEO-Optimierung",
    teaser: "Bei Google gefunden werden – mit sauberer Onpage-Optimierung und echtem Content.",
    icon: "search",
    metaTitle: "SEO-Optimierung für lokale Unternehmen | Festpreis",
    metaDescription:
      "SEO-Optimierung, die wirkt: saubere Onpage-Struktur, suchintentions-gerechte Texte und Topical Authority. Mehr Sichtbarkeit bei Google – ohne Tricks.",
    keyword: "SEO Optimierung",
    lead: "SEO-Optimierung sorgt dafür, dass deine Website bei Google gefunden wird, wenn Kunden nach deiner Leistung suchen. Wir optimieren Struktur, Texte und Technik nach der echten Suchintention – nachhaltig, ohne Tricks. Das Ziel: dauerhaft bessere Rankings und mehr qualifizierte Anfragen.",
    problem: {
      heading: "Warum wird meine Website nicht gefunden?",
      body: "Viele Websites sind technisch zwar online, aber für Suchmaschinen unsichtbar: keine klare Struktur, fehlende Keywords in Titeln und Überschriften, dünne Inhalte. Wer auf Seite 2 bei Google steht, wird praktisch nicht gefunden – und verschenkt täglich Anfragen.",
    },
    solution: {
      heading: "Was umfasst die SEO-Optimierung?",
      body: "Wir richten jede Seite auf eine klare Suchintention und ein Hauptkeyword aus: optimierte Titles, Meta-Beschreibungen, saubere Überschriften-Hierarchie und Inhalte, die die Frage des Nutzers vollständig beantworten. Dazu kommt technisches SEO – Ladezeit, mobile Nutzung und strukturierte Daten.",
    },
    benefits: [
      "Höhere Sichtbarkeit für die Suchbegriffe deiner Kunden",
      "Saubere technische Basis (Ladezeit, Mobile, Schema)",
      "Texte nach echter Suchintention statt Keyword-Stuffing",
      "Nachhaltig statt kurzfristiger Tricks",
      "Messbar über Search Console und Rankings",
    ],
    scope: [
      "Keyword- und Suchintentions-Analyse",
      "Onpage-Optimierung (Title, Meta, H1–H3, interne Links)",
      "Technisches SEO (Ladezeit, Mobile, strukturierte Daten/JSON-LD)",
      "Content-Optimierung nach Antwort-zuerst-Prinzip",
      "Einrichtung von Google Search Console & Sitemap",
    ],
    steps: [
      { title: "Analyse", body: "Wir prüfen Rankings, Technik und die wichtigsten Suchbegriffe." },
      { title: "Optimierung", body: "Struktur, Texte und Technik werden auf die Suchintention ausgerichtet." },
      { title: "Strukturierte Daten", body: "Schema-Markup macht Inhalte für Google und KI lesbar." },
      { title: "Monitoring", body: "Wir verfolgen die Entwicklung in der Search Console." },
    ],
    proof: {
      stat: "Gut verständliche Texte (Lesestufe 6–8) werden in KI-Antworten häufiger zitiert als komplexe – Klarheit zahlt sich doppelt aus.",
      source: "SE-Ranking-Analyse, 2,33 Mio. Seiten",
    },
    inPackages: "SEO-Grundlagen sind in jedem Paket enthalten; vertiefte Optimierung ab Pro.",
    faq: [
      {
        question: "Wie lange dauert es, bis SEO wirkt?",
        answer:
          "SEO ist mittelfristig: Erste Effekte zeigen sich oft nach 2–3 Monaten, stabile Rankings nach etwa 4–6 Monaten. Es ist eine Investition in nachhaltige Sichtbarkeit, kein Schalter, der sofort wirkt.",
      },
      {
        question: "Was ist der Unterschied zu Google Ads?",
        answer:
          "Google Ads bringt sofort bezahlte Sichtbarkeit, kostet aber pro Klick. SEO baut organische Sichtbarkeit auf, die langfristig ohne laufende Klickkosten wirkt. Oft ist eine Kombination sinnvoll.",
      },
      {
        question: "Macht ihr auch Keyword-Stuffing?",
        answer:
          "Nein. Keyword-Stuffing schadet heute sowohl klassischem SEO als auch der Sichtbarkeit in KI-Antworten. Wir setzen auf Suchintention, semantische Vollständigkeit und echte Inhalte.",
      },
    ],
  },
  {
    slug: "lokales-seo",
    title: "Lokales SEO",
    teaser: "In deiner Region ganz oben: Google-Profil, lokale Keywords und NAP-Konsistenz.",
    icon: "pin",
    metaTitle: "Lokales SEO | In deiner Region bei Google gefunden werden",
    metaDescription:
      "Lokales SEO für Handwerker, Praxen und lokale Betriebe: Google-Unternehmensprofil, lokale Landingpages, Bewertungen und NAP-Konsistenz für mehr Anfragen aus der Region.",
    keyword: "Lokales SEO",
    lead: "Lokales SEO bringt dich in deiner Region nach oben – im Google-3-Pack und in der Kartenansicht. Für lokale Betriebe wie Handwerker, Praxen oder Läden ist es der wichtigste Hebel: ein gepflegtes Google-Profil, konsistente Kontaktdaten und echte Bewertungen entscheiden, wer den nächsten Auftrag bekommt.",
    problem: {
      heading: "Warum finden mich lokale Kunden nicht?",
      body: "Wenn jemand „[deine Leistung] in [deine Stadt]“ sucht, entscheidet Google in Sekunden – meist zeigt es nur drei lokale Anbieter prominent an. Ohne gepflegtes Google-Profil, konsistente Adressdaten und Bewertungen landest du nicht in diesen Top-Plätzen, egal wie gut deine Arbeit ist.",
    },
    solution: {
      heading: "Was bringt lokales SEO konkret?",
      body: "Wir richten dein Google-Unternehmensprofil professionell ein, sorgen für überall identische Kontaktdaten (NAP-Konsistenz), erstellen lokale Landingpages mit echtem Bezug zu deiner Region und helfen beim systematischen Einsammeln von Bewertungen – die wichtigsten Signale für lokale Sichtbarkeit.",
    },
    benefits: [
      "Bessere Platzierung im lokalen Google-3-Pack",
      "Professionell gepflegtes Google-Unternehmensprofil",
      "Konsistente Kontaktdaten über alle Plattformen (NAP)",
      "Lokale Landingpages mit echtem regionalem Inhalt",
      "Strategie zum Einsammeln echter Bewertungen",
    ],
    scope: [
      "Einrichtung & Optimierung Google-Unternehmensprofil",
      "NAP-Konsistenz-Check über Website und Verzeichnisse",
      "Lokale Landingpages je Kernstadt (einzigartiger Inhalt)",
      "LocalBusiness-Schema mit areaServed",
      "Bewertungs-Strategie (z. B. ProvenExpert & Google)",
    ],
    steps: [
      { title: "Bestandsaufnahme", body: "Wir prüfen dein Profil, deine Daten und lokale Rankings." },
      { title: "Profil & Daten", body: "Google-Profil optimieren, Kontaktdaten überall vereinheitlichen." },
      { title: "Lokale Seiten", body: "Echte lokale Inhalte je Region statt austauschbarer Stadtseiten." },
      { title: "Bewertungen", body: "System zum kontinuierlichen Sammeln echter Bewertungen." },
    ],
    proof: {
      stat: "ChatGPT zieht lokale Empfehlungen u. a. aus Foursquare/Bing – konsistente Brancheneinträge wirken über Google hinaus.",
      source: "GEO-/lokale-Suche-Recherche 2025",
    },
    inPackages: "Lokales SEO ist ab Platin enthalten und ab Pro als Option buchbar.",
    faq: [
      {
        question: "Für wen lohnt sich lokales SEO?",
        answer:
          "Lokales SEO lohnt sich für alle Betriebe mit regionalem Einzugsgebiet: Handwerker, Arztpraxen, Restaurants, Kanzleien, Läden. Wer Kunden aus der Umgebung gewinnt, profitiert am stärksten.",
      },
      {
        question: "Brauche ich dafür ein Google-Unternehmensprofil?",
        answer:
          "Ja, das Google-Unternehmensprofil ist der zentrale Hebel für lokale Sichtbarkeit. Wir richten es ein oder optimieren dein bestehendes Profil – die Einrichtung gibt es als Add-on für 190 €.",
      },
      {
        question: "Wie wichtig sind Bewertungen?",
        answer:
          "Sehr wichtig. Anzahl und Qualität echter Bewertungen gehören zu den stärksten lokalen Ranking-Signalen. Wir helfen dir, systematisch und rechtssicher echte Bewertungen einzusammeln.",
      },
    ],
  },
  {
    slug: "ki-suche-geo",
    title: "KI-Suche & GEO",
    teaser: "In ChatGPT, Perplexity & Google AI empfohlen werden – mit Generative Engine Optimization.",
    icon: "sparkles",
    metaTitle: "GEO – Generative Engine Optimization | In KI-Antworten erscheinen",
    metaDescription:
      "GEO (Generative Engine Optimization): In ChatGPT, Perplexity und Google AI Overviews als Quelle zitiert werden. Antwort-zuerst, Schema, belegte Fakten – wissenschaftlich fundiert.",
    keyword: "Generative Engine Optimization",
    lead: "GEO (Generative Engine Optimization) sorgt dafür, dass deine Website in KI-Antworten von ChatGPT, Perplexity und Google AI Overviews zitiert und empfohlen wird. Während klassische Suche auf Klicks zielt, geht es hier um Erwähnung. Wir strukturieren deine Inhalte so, dass KI sie sauber extrahieren kann.",
    problem: {
      heading: "Warum ist KI-Sichtbarkeit jetzt wichtig?",
      body: "Immer mehr Menschen fragen ChatGPT oder Perplexity statt Google. Erscheint eine AI-Overview, sinkt laut SISTRIX die Klickrate auf Platz 1 von 27 % auf 11 %. Wer in der KI-Antwort nicht vorkommt, wird unsichtbar – selbst mit gutem klassischem Ranking.",
    },
    solution: {
      heading: "Wie funktioniert GEO?",
      body: "Wir wenden die wissenschaftlich belegten Hebel an: Antwort-zuerst-Absätze (40–60 Wörter), frage-basierte Überschriften, belegte Statistiken und Zitate sowie vollständiges JSON-LD-Schema. Diese Website selbst ist nach genau diesen Prinzipien gebaut – ein Live-Beispiel für das, was wir liefern.",
    },
    benefits: [
      "Sichtbarkeit in ChatGPT, Perplexity & Google AI Overviews",
      "Inhalte, die KI sauber extrahieren und zitieren kann",
      "Vollständiges, akkurates JSON-LD-Schema",
      "KI-Crawler korrekt gesteuert (robots.txt für GPTBot, ClaudeBot & Co.)",
      "Diese Agentur-Website als Live-Referenz für GEO",
    ],
    scope: [
      "Antwort-zuerst-Struktur & frage-basierte Überschriften",
      "Einbau belegter Statistiken, Zitate und Quellen",
      "Vollständiges JSON-LD (Organization, Service, FAQPage u. a.)",
      "robots.txt-Steuerung der KI-Such-Crawler",
      "Mess-Setup für KI-Sichtbarkeit (Citation-Tracking)",
    ],
    steps: [
      { title: "Analyse", body: "Wo wird deine Marke in KI-Antworten heute (nicht) erwähnt?" },
      { title: "Struktur", body: "Inhalte auf Antwort-zuerst und Frage-Überschriften umbauen." },
      { title: "Belege & Schema", body: "Statistiken, Zitate und vollständiges JSON-LD ergänzen." },
      { title: "Crawler & Messung", body: "KI-Crawler zulassen und Sichtbarkeit messen." },
    ],
    proof: {
      stat: "Laut der GEO-Studie (Aggarwal et al., KDD 2024, Princeton) steigern Zitate (+41 %), Statistiken (+33 %) und Quellenangaben (+28 %) die Sichtbarkeit in generativen Engines – Keyword-Stuffing wirkt sogar negativ (−8 %).",
      source: "GEO: Generative Engine Optimization, KDD 2024",
    },
    inPackages: "GEO-Grundlagen sind ab Platin enthalten, das volle Setup ist Teil von Enterprise.",
    faq: [
      {
        question: "Was ist der Unterschied zwischen SEO und GEO?",
        answer:
          "SEO optimiert für Platzierungen in der klassischen Trefferliste (Klicks). GEO optimiert dafür, in KI-generierten Antworten zitiert und empfohlen zu werden (Erwähnung). Beide überschneiden sich zu rund 80 % – dieselben guten Inhalte helfen beidem.",
      },
      {
        question: "Bringt eine llms.txt-Datei etwas?",
        answer:
          "Aktuell kaum. Laut Google nutzt kein großer KI-Dienst die llms.txt nachweislich; Messungen zeigen nahezu null Zugriffe. Wirksamer sind saubere Inhalte, FAQ-Strukturen, Schema und eine korrekte robots.txt für KI-Crawler.",
      },
      {
        question: "Kann man KI-Sichtbarkeit garantieren?",
        answer:
          "Nein. KI-Antworten sind volatil und schwanken selbst bei identischen Anfragen. Wir erhöhen die Wahrscheinlichkeit, zitiert zu werden, mit belegten Methoden – eine Garantie wäre unseriös. GEO ist ein junges, sich schnell entwickelndes Feld.",
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
