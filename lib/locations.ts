/**
 * Lokale Stadt-Landingpages (Welle 1 + 2) für Dresden/Sachsen.
 *
 * WICHTIG: Jede Stadt hat EIGENEN, einzigartigen Inhalt (Lead, lokaler Kontext,
 * lokale FAQ) – keine austauschbaren Doorway-Seiten. Texte nach GEO-Prinzip:
 * Antwort-zuerst, Frage-H2, FAQ.
 *
 * TODO: Echte lokale Referenzen/Kundenprojekte je Stadt ergänzen.
 */

import type { FaqItem } from "./faq";

export interface Location {
  slug: string;
  name: string;
  district: string;
  wave: 1 | 2 | 3;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  localContext: string;
  proximity: string;
  typicalBusinesses: string[];
  faq: FaqItem[];
}

export const locations: Location[] = [
  {
    slug: "pirna",
    name: "Pirna",
    district: "Landkreis Sächsische Schweiz-Osterzgebirge",
    wave: 1,
    metaTitle: "Webdesign Pirna – Festpreis-Websites ab 990 €",
    metaDescription:
      "Webdesign in Pirna zum Festpreis: schnelle, mobil-optimierte Websites für Handwerk, Gastronomie & Dienstleister. Persönlich aus der Region, transparent ab 990 €.",
    lead: "Webdesign in Pirna bedeutet bei uns eine professionelle, blitzschnelle Website zum Festpreis ab 990 €. Als Webdesigner aus der Region Dresden bin ich schnell bei dir in Pirna – persönlich, ohne Agentur-Anonymität. Du wählst ein Paket, beschreibst dein Projekt mit Lumi und bekommst einen festen Liefertermin.",
    localContext:
      "Pirna als Tor zur Sächsischen Schweiz lebt von Tourismus, Handwerk und inhabergeführten Geschäften in der historischen Altstadt. Genau diese Betriebe brauchen eine Website, die auf dem Smartphone schnell lädt und lokal bei Google gefunden wird – etwa wenn Gäste »Restaurant Pirna« oder »Handwerker Pirna« suchen.",
    proximity: "Pirna liegt rund 20 km südöstlich von Dresden – kurze Wege für ein persönliches Vor-Ort-Gespräch.",
    typicalBusinesses: ["Gastronomie & Pensionen", "Bau- & Handwerksbetriebe", "Einzelhandel in der Altstadt", "Tourismus & Freizeit"],
    faq: [
      {
        question: "Wie schnell bist du als Webdesigner in Pirna erreichbar?",
        answer:
          "Sehr schnell: Von Dresden aus bin ich in rund 30 Minuten in Pirna. Den Großteil klären wir bequem online über das Briefing mit Lumi – ein persönliches Treffen vor Ort in Pirna ist aber jederzeit möglich.",
      },
      {
        question: "Lohnt sich lokales SEO für ein Geschäft in Pirna?",
        answer:
          "Ja. Gerade in Pirna mit seinem Tourismus suchen Gäste gezielt lokal. Mit einem gepflegten Google-Unternehmensprofil und lokalem SEO erscheinst du, wenn jemand nach deiner Leistung in Pirna sucht – das ist der wichtigste Hebel für Laufkundschaft und Anfragen.",
      },
    ],
  },
  {
    slug: "radebeul",
    name: "Radebeul",
    district: "Landkreis Meißen",
    wave: 1,
    metaTitle: "Webdesign Radebeul – Professionelle Websites zum Festpreis",
    metaDescription:
      "Webdesign Radebeul zum Festpreis ab 990 €: hochwertige, schnelle Websites für Weingüter, Praxen und Dienstleister. Persönlich aus der Region Dresden.",
    lead: "Webdesign in Radebeul liefert dir eine hochwertige, schnelle Website zum Festpreis ab 990 €. Radebeul gilt als eine der wohlhabendsten Adressen Sachsens – entsprechend wertig sollte der Webauftritt wirken. Ich gestalte deine Seite persönlich und mit festem Termin, KI-unterstützt und damit schnell.",
    localContext:
      "Radebeul ist bekannt für Weinbau, Karl-May-Erbe und eine kaufkräftige Wohnlage zwischen Dresden und Meißen. Weingüter, Praxen, Kanzleien und gehobene Dienstleister profitieren hier besonders von einem eleganten, vertrauenswürdigen Auftritt, der die Qualität der Marke widerspiegelt.",
    proximity: "Radebeul grenzt direkt an Dresden – nur etwa 10 km bis zur Innenstadt.",
    typicalBusinesses: ["Weingüter & Gastronomie", "Arzt- & Therapiepraxen", "Kanzleien & Berater", "gehobener Einzelhandel"],
    faq: [
      {
        question: "Können Weingüter in Radebeul eine Website mit Shop bekommen?",
        answer:
          "Ja. Für Weingüter und Hofläden in Radebeul lässt sich ein einfacher Verkauf oder eine Bestell-/Reservierungsfunktion integrieren. Im Paket Platin oder Enterprise binden wir Shop- und Buchungsfunktionen passend zu deinem Betrieb ein.",
      },
      {
        question: "Wie wirkt eine Website besonders hochwertig?",
        answer:
          "Durch klares, ruhiges Design, eigene Fotos statt Stockbilder, schnelle Ladezeiten und eine durchdachte Typografie. Gerade in Radebeul zählt der hochwertige Eindruck – darauf ist unser individuelles Design ab dem Pro-Paket ausgelegt.",
      },
    ],
  },
  {
    slug: "freital",
    name: "Freital",
    district: "Landkreis Sächsische Schweiz-Osterzgebirge",
    wave: 1,
    metaTitle: "Webdesign Freital – Festpreis-Webdesign für KMU",
    metaDescription:
      "Webdesign Freital zum Festpreis ab 990 €: schnelle Websites für Handwerk, Industrie-Zulieferer und Dienstleister. Persönlich aus der Region Dresden.",
    lead: "Webdesign in Freital heißt: eine solide, schnelle Website zum Festpreis ab 990 €, die neue Aufträge bringt. Freital ist geprägt von Handwerk, Industrie und Mittelstand – Betriebe, die eine klare, funktionale Website brauchen statt teurer Agentur-Spielereien. Genau das liefere ich, mit festem Preis und Termin.",
    localContext:
      "Freital südwestlich von Dresden hat eine starke industrielle und handwerkliche Tradition. Zulieferer, Bauunternehmen, Kfz-Betriebe und Dienstleister stehen hier im Fokus – für sie zählt eine Website, die Leistungen klar zeigt, Vertrauen schafft und auf dem Handy schnell lädt.",
    proximity: "Freital liegt direkt an Dresden – rund 10 km bis zum Zentrum.",
    typicalBusinesses: ["Bau- & Handwerksbetriebe", "Kfz & Industrie-Zulieferer", "Dienstleister & Pflege", "Einzelhandel"],
    faq: [
      {
        question: "Brauche ich als Handwerker in Freital wirklich eine Website?",
        answer:
          "Ja. Die meisten Kunden prüfen heute online, bevor sie anrufen. Eine Website mit deinen Referenzen, Leistungen und Kontaktmöglichkeiten in Freital sorgt dafür, dass du gefunden und für seriös gehalten wirst – ein One-Pager ab 990 € reicht oft schon.",
      },
      {
        question: "Was kostet eine einfache Website für einen Freitaler Betrieb?",
        answer:
          "Eine professionelle One-Page-Website (Basis) kostet 990 € als Festpreis. Brauchst du mehrere Unterseiten für verschiedene Leistungen, ist das Pro-Paket für 2.990 € die passende Wahl – beide ohne versteckte Kosten.",
      },
    ],
  },
  {
    slug: "meissen",
    name: "Meißen",
    district: "Landkreis Meißen",
    wave: 1,
    metaTitle: "Webdesign Meißen – Festpreis-Websites für die Region",
    metaDescription:
      "Webdesign Meißen zum Festpreis ab 990 €: schnelle, mobil-optimierte Websites für Tourismus, Handwerk und Manufakturen. Persönlich aus der Region Dresden.",
    lead: "Webdesign in Meißen bringt dir eine professionelle Website zum Festpreis ab 990 €, die Besucher und Kunden überzeugt. Die Porzellanstadt lebt von Tourismus, Tradition und Manufakturen – ein Webauftritt sollte diese Wertigkeit transportieren und zugleich lokal gut auffindbar sein.",
    localContext:
      "Meißen ist weltbekannt für Porzellan, Wein und die historische Altstadt mit Albrechtsburg. Hotels, Gastronomie, Manufakturen und Kunsthandwerk prägen die Wirtschaft – Branchen, die von schönen Bildern, mehrsprachigen Seiten und lokaler Sichtbarkeit besonders profitieren.",
    proximity: "Meißen liegt rund 25 km nordwestlich von Dresden, gut über die S-Bahn und B6 angebunden.",
    typicalBusinesses: ["Tourismus & Hotellerie", "Weingüter & Manufakturen", "Kunsthandwerk", "Handwerk & Einzelhandel"],
    faq: [
      {
        question: "Kann meine Website in Meißen mehrsprachig sein?",
        answer:
          "Ja. Gerade in der Tourismusstadt Meißen ist Englisch oft sinnvoll. Eine Zusatzsprache kostet 490 € pro Sprache; vollständige Mehrsprachigkeit ist Teil des Enterprise-Pakets – ideal für Hotels und Manufakturen mit internationalen Gästen.",
      },
      {
        question: "Wie wichtig sind gute Fotos für eine Meißner Website?",
        answer:
          "Sehr wichtig. Für Tourismus, Wein und Kunsthandwerk verkaufen Bilder die Atmosphäre. Hast du keine eigenen Fotos, beraten wir zu Stockmaterial oder einem Fotoshooting – damit deine Seite die Qualität deines Angebots zeigt.",
      },
    ],
  },
  {
    slug: "heidenau",
    name: "Heidenau",
    district: "Landkreis Sächsische Schweiz-Osterzgebirge",
    wave: 1,
    metaTitle: "Webdesign Heidenau – Schnelle Websites zum Festpreis",
    metaDescription:
      "Webdesign Heidenau zum Festpreis ab 990 €: professionelle Websites für lokale Betriebe und Dienstleister. Persönlich und schnell aus der Region Dresden.",
    lead: "Webdesign in Heidenau liefert dir eine professionelle Website zum Festpreis ab 990 €. In Heidenau gibt es kaum spezialisierte Webdesigner vor Ort – ein klarer Vorteil für dich: Mit einer sauberen, schnellen Seite hebst du dich hier besonders leicht von der lokalen Konkurrenz ab.",
    localContext:
      "Heidenau im Müglitztal zwischen Dresden und Pirna ist ein kompakter Industrie- und Wohnstandort. Handwerk, Dienstleister und kleine Geschäfte dominieren – für sie ist eine gut auffindbare lokale Website oft der entscheidende Unterschied gegenüber Mitbewerbern ohne Online-Präsenz.",
    proximity: "Heidenau liegt etwa 15 km südöstlich von Dresden, direkt an der S-Bahn-Linie nach Pirna.",
    typicalBusinesses: ["Handwerk & Bau", "Dienstleister", "Einzelhandel", "Gesundheit & Pflege"],
    faq: [
      {
        question: "Gibt es überhaupt Konkurrenz für Webdesign in Heidenau?",
        answer:
          "Kaum spezialisierte Anbieter vor Ort – das ist deine Chance. Wer in Heidenau früh eine professionelle, schnelle Website mit lokalem SEO hat, rankt für lokale Suchanfragen oft mit vergleichsweise wenig Aufwand ganz vorne.",
      },
      {
        question: "Wie läuft die Zusammenarbeit aus der Ferne ab?",
        answer:
          "Unkompliziert: Das Briefing erledigst du online mit Lumi, Abstimmungen laufen per E-Mail oder Telefon. Da Heidenau direkt bei Dresden liegt, ist ein persönliches Treffen bei Bedarf jederzeit schnell möglich.",
      },
    ],
  },
  {
    slug: "coswig",
    name: "Coswig",
    district: "Landkreis Meißen",
    wave: 1,
    metaTitle: "Webdesign Coswig – Festpreis-Webdesign aus der Region",
    metaDescription:
      "Webdesign Coswig zum Festpreis ab 990 €: schnelle, mobil-optimierte Websites für lokale Unternehmen zwischen Dresden und Meißen.",
    lead: "Webdesign in Coswig heißt: eine professionelle, schnelle Website zum Festpreis ab 990 €, persönlich umgesetzt. Coswig zwischen Dresden und Meißen ist ein wachsender Wohn- und Wirtschaftsstandort – mit einer modernen Website sicherst du dir hier früh lokale Sichtbarkeit.",
    localContext:
      "Coswig im Elbtal verbindet Wohnqualität mit mittelständischer Wirtschaft und Gewerbe. Handwerk, Gesundheitsdienstleister und lokale Geschäfte prägen den Ort – Betriebe, die von einer klaren, vertrauenswürdigen Online-Präsenz und lokalem SEO direkt profitieren.",
    proximity: "Coswig liegt rund 15 km nordwestlich von Dresden, per S-Bahn bestens angebunden.",
    typicalBusinesses: ["Handwerk & Bau", "Gesundheit & Pflege", "Dienstleister", "Einzelhandel & Gewerbe"],
    faq: [
      {
        question: "Bekomme ich in Coswig auch Hilfe beim Google-Profil?",
        answer:
          "Ja. Die Einrichtung deines Google-Unternehmensprofils gibt es als Add-on für 190 €. Es ist für lokale Sichtbarkeit in Coswig der wichtigste erste Schritt, damit Kunden dich in der Google-Karte und im lokalen Bereich finden.",
      },
      {
        question: "Wie schnell ist meine Website in Coswig online?",
        answer:
          "Sobald Briefing und Materialien vollständig sind, vereinbaren wir einen festen Termin. Eine Basis-Website ist oft in 1–2 Wochen online – planbar und ohne das übliche Warten auf ein Angebot.",
      },
    ],
  },
  {
    slug: "stolpen",
    name: "Stolpen",
    district: "Landkreis Sächsische Schweiz-Osterzgebirge",
    wave: 1,
    metaTitle: "Webdesign Stolpen – Festpreis-Websites für kleine Betriebe",
    metaDescription:
      "Webdesign Stolpen zum Festpreis ab 990 €: schnelle, professionelle Websites für Handwerk, Tourismus und kleine Betriebe in der Region Dresden.",
    lead: "Webdesign in Stolpen liefert dir eine professionelle Website zum Festpreis ab 990 € – ideal für kleine Betriebe und Selbstständige. In Stolpen gibt es so gut wie keine lokale Webdesign-Konkurrenz, sodass du mit einer schnellen, sauberen Seite lokal sehr leicht sichtbar wirst.",
    localContext:
      "Die Burgstadt Stolpen am Rand der Sächsischen Schweiz lebt von Tourismus, Handwerk und kleinen Familienbetrieben. Pensionen, Gaststätten und Handwerker stehen hier im Mittelpunkt – für sie zählt eine einfache, schnelle Website, die Gäste und Kunden aus der Umgebung erreicht.",
    proximity: "Stolpen liegt etwa 25 km östlich von Dresden – ländlich, aber gut erreichbar über die S228/B6.",
    typicalBusinesses: ["Tourismus & Pensionen", "Gastronomie", "Handwerk", "kleine Familienbetriebe"],
    faq: [
      {
        question: "Reicht für meinen kleinen Betrieb in Stolpen ein One-Pager?",
        answer:
          "Oft ja. Für Pensionen, Gaststätten oder Einzel-Handwerker in Stolpen genügt häufig ein professioneller One-Pager (Basis, 990 €) mit allen wichtigen Infos, Kontakt und Karte – schnell umgesetzt und günstig im Festpreis.",
      },
      {
        question: "Werde ich mit einer Website in Stolpen wirklich gefunden?",
        answer:
          "Ja, gerade weil die lokale Konkurrenz dünn ist. Mit sauberem lokalem SEO und einem Google-Unternehmensprofil rankst du in Stolpen und Umgebung für deine Leistung meist schnell – mehr Sichtbarkeit als mit gar keiner oder einer veralteten Seite.",
      },
    ],
  },
  {
    slug: "bautzen",
    name: "Bautzen",
    district: "Landkreis Bautzen",
    wave: 2,
    metaTitle: "Webdesign Bautzen – Festpreis-Webdesign für die Oberlausitz",
    metaDescription:
      "Webdesign Bautzen zum Festpreis ab 990 €: professionelle, schnelle Websites für Unternehmen in der Oberlausitz. Persönlich aus Sachsen.",
    lead: "Webdesign in Bautzen bietet dir eine professionelle Website zum Festpreis ab 990 €, die in der Oberlausitz für Sichtbarkeit sorgt. Als Webdesigner aus Sachsen kombiniere ich transparente Festpreise mit Top-Performance – ein Vorteil, den lokale Wettbewerber in Bautzen selten bieten.",
    localContext:
      "Bautzen als Zentrum der Oberlausitz und der sorbischen Kultur verbindet Tourismus, Mittelstand und Handwerk. Betriebe hier profitieren von einer Website, die Tradition und Modernität verbindet – und bei Bedarf auch sorbische Inhalte sauber darstellen kann.",
    proximity: "Bautzen liegt rund 55 km östlich von Dresden, über die A4 gut erreichbar.",
    typicalBusinesses: ["Tourismus & Gastronomie", "Handwerk & Mittelstand", "Einzelhandel", "Kultur & Vereine"],
    faq: [
      {
        question: "Arbeitest du als Dresdner Webdesigner auch in Bautzen?",
        answer:
          "Ja. Dank des online geführten Briefings mit Lumi spielt die Entfernung kaum eine Rolle – die Zusammenarbeit läuft ortsunabhängig. Für Kunden in Bautzen und der Oberlausitz ist der Ablauf genauso schnell und persönlich wie vor Ort in Dresden.",
      },
    ],
  },
  {
    slug: "goerlitz",
    name: "Görlitz",
    district: "Landkreis Görlitz",
    wave: 2,
    metaTitle: "Webdesign Görlitz – Festpreis-Websites für Ostsachsen",
    metaDescription:
      "Webdesign Görlitz zum Festpreis ab 990 €: schnelle, hochwertige Websites für Tourismus, Handwerk und Dienstleister in der östlichsten Stadt Deutschlands.",
    lead: "Webdesign in Görlitz liefert dir eine hochwertige, schnelle Website zum Festpreis ab 990 €. Görlitz mit seiner berühmten Altstadt und Film-Kulisse lebt von Tourismus und Kreativwirtschaft – ein Webauftritt sollte diese besondere Atmosphäre einfangen und international auffindbar sein.",
    localContext:
      "Görlitz, die östlichste Stadt Deutschlands, ist bekannt als Görliwood und für die am besten erhaltene Altstadt des Landes. Tourismus, Gastgewerbe, Kreative und grenznahe Dienstleister prägen die Wirtschaft – Branchen, für die schöne Bilder, Mehrsprachigkeit und lokale Sichtbarkeit zählen.",
    proximity: "Görlitz liegt rund 100 km östlich von Dresden an der Grenze zu Polen – die Zusammenarbeit läuft komplett online.",
    typicalBusinesses: ["Tourismus & Hotellerie", "Gastronomie", "Kreativ- & Filmwirtschaft", "grenznahe Dienstleister"],
    faq: [
      {
        question: "Kann meine Website in Görlitz auch polnische Gäste ansprechen?",
        answer:
          "Ja. Wegen der Grenznähe ist eine polnische oder englische Sprachversion oft sinnvoll. Eine Zusatzsprache kostet 490 €; so erreichst du Gäste und Kunden aus dem gesamten Dreiländereck rund um Görlitz.",
      },
    ],
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export const wave1Locations = locations.filter((l) => l.wave === 1);
export const wave2Locations = locations.filter((l) => l.wave === 2);
