/**
 * Modulare Zusatzleistungen (Add-ons). Preise netto.
 * Bewusst in ruhiger, getrennter Liste – nicht in den Haupt-Preiskarten,
 * damit der "kein Chaos"-USP erhalten bleibt.
 */

export interface AddOn {
  id: string;
  name: string;
  price: number;
  priceFrom: boolean;
  unit?: string; // z.B. "pro Seite", "pro Sprache"
  description: string;
}

export const addOns: AddOn[] = [
  {
    id: "logo-wortmarke",
    name: "Logo – Wortmarke",
    price: 390,
    priceFrom: false,
    description: "Individuelle typografische Wortmarke inkl. Dateien für Web & Druck.",
  },
  {
    id: "logo-wortbildmarke",
    name: "Logo – Wort-Bild-Marke",
    price: 690,
    priceFrom: false,
    description: "Logo mit Bildzeichen, Varianten und kleinem Style-Guide.",
  },
  {
    id: "texte",
    name: "Texterstellung",
    price: 120,
    priceFrom: false,
    unit: "pro Seite",
    description: "Professionelle, SEO-/GEO-optimierte Texte (bis 400 Wörter pro Seite).",
  },
  {
    id: "google-profil",
    name: "Google-Unternehmensprofil",
    price: 190,
    priceFrom: false,
    description: "Einrichtung & Optimierung deines Google-Profils für lokale Sichtbarkeit.",
  },
  {
    id: "terminbuchung",
    name: "Terminbuchung einrichten",
    price: 290,
    priceFrom: false,
    description: "Online-Terminbuchung integriert und auf deine Abläufe abgestimmt.",
  },
  {
    id: "ki-chatbot",
    name: "KI-Chatbot",
    price: 490,
    priceFrom: false,
    description: "Eigener KI-Assistent auf deiner Website – beantwortet Kundenfragen rund um die Uhr.",
  },
  {
    id: "newsletter",
    name: "Newsletter-Einrichtung",
    price: 290,
    priceFrom: false,
    description: "DSGVO-konformes Newsletter-System mit Anmeldeformular und Double-Opt-in.",
  },
  {
    id: "analytics",
    name: "Analytics & Tracking",
    price: 190,
    priceFrom: false,
    description: "Datenschutzkonformes Tracking, damit du deine Besucher verstehst.",
  },
  {
    id: "zusatzsprache",
    name: "Zusatzsprache",
    price: 490,
    priceFrom: false,
    unit: "pro Sprache",
    description: "Vollständige Übersetzung und mehrsprachige Struktur deiner Website.",
  },
  {
    id: "google-ads",
    name: "Google-Ads-Setup",
    price: 390,
    priceFrom: false,
    description: "Aufsetzen einer ersten Kampagne inkl. Keywords und Conversion-Tracking.",
  },
  {
    id: "korrekturrunde",
    name: "Extra Korrekturrunde",
    price: 90,
    priceFrom: false,
    description: "Zusätzliche Korrekturschleife über die im Paket enthaltenen hinaus.",
  },
];

export function getAddOn(id: string): AddOn | undefined {
  return addOns.find((a) => a.id === id);
}
