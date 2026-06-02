/**
 * Die vier Festpreis-Pakete + monatliche Wartung.
 * Preise netto, zzgl. MwSt. (Standard bei deutschen B2B-Webdesign-Angeboten).
 * "Pro" ist als Empfehlung markiert (klare visuelle Hierarchie → Conversion).
 */

export type PackageId = "basis" | "pro" | "platin" | "enterprise";

export interface WebPackage {
  id: PackageId;
  name: string;
  /** Einmalpreis in Euro (netto). null = individuell ("ab"). */
  price: number;
  /** true, wenn Preis ein "ab"-Anker ist (Enterprise). */
  priceFrom: boolean;
  /** Monatliche Wartung in Euro (netto). */
  maintenance: number;
  maintenanceFrom: boolean;
  /** Kurzer Nutzen-Satz. */
  tagline: string;
  /** Für wen geeignet. */
  bestFor: string;
  /** Kern-Features (für Karte). */
  features: string[];
  /** Empfohlenes Paket? */
  recommended: boolean;
  /** Maximale Unterseiten (für Lumi-Logik). 1 = One-Pager. */
  maxPages: number | "individuell";
}

export const packages: WebPackage[] = [
  {
    id: "basis",
    name: "Basis",
    price: 990,
    priceFrom: false,
    maintenance: 49,
    maintenanceFrom: false,
    tagline: "Die professionelle One-Page-Website",
    bestFor: "Einzelunternehmer & Selbstständige, die schnell sichtbar sein wollen.",
    features: [
      "Professionelle One-Page-Website",
      "Mobil-optimiert & barrierearm (WCAG-orientiert)",
      "Kontaktformular & Google-Maps-Einbindung",
      "Basis-SEO (Title, Meta, Sitemap)",
      "SSL & DSGVO-konformes Setup",
      "1 Korrekturrunde",
    ],
    recommended: false,
    maxPages: 1,
  },
  {
    id: "pro",
    name: "Pro",
    price: 2990,
    priceFrom: false,
    maintenance: 99,
    maintenanceFrom: false,
    tagline: "Die Mehrseiten-Website für wachsende Betriebe",
    bestFor: "Unternehmen, die mehr Anfragen über mehrere Themenseiten gewinnen wollen.",
    features: [
      "Bis zu 8 Unterseiten",
      "Individuelles Design auf Basis deiner Marke",
      "Onpage-SEO für alle Seiten",
      "Blog-/News-Funktion optional",
      "Performance-Optimierung",
      "2 Korrekturrunden",
    ],
    recommended: true,
    maxPages: 8,
  },
  {
    id: "platin",
    name: "Platin",
    price: 5990,
    priceFrom: false,
    maintenance: 299,
    maintenanceFrom: false,
    tagline: "Die umfangreiche Website mit Funktionen",
    bestFor: "Etablierte Betriebe mit größerem Umfang und besonderen Funktionen.",
    features: [
      "Bis zu 20 Unterseiten",
      "Erweiterte Funktionen (Galerie, Downloads, Mitgliederbereich)",
      "Terminbuchung integrierbar",
      "Lokales SEO inklusive",
      "Conversion-optimiertes Design",
      "3 Korrekturrunden",
    ],
    recommended: false,
    maxPages: 20,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 9990,
    priceFrom: true,
    maintenance: 499,
    maintenanceFrom: true,
    tagline: "Die individuelle Lösung ohne Grenzen",
    bestFor: "Komplexe Projekte mit Mehrsprachigkeit, Integrationen oder Shop-Anbindung.",
    features: [
      "Unbegrenzte Unterseiten",
      "Mehrsprachigkeit",
      "Individuelle Integrationen (CRM, Shop, API)",
      "Buchungs- & Kundensysteme",
      "Premium-SEO & GEO-Setup",
      "Persönliche Projektbetreuung",
    ],
    recommended: false,
    maxPages: "individuell",
  },
];

export function getPackage(id: PackageId): WebPackage {
  const p = packages.find((x) => x.id === id);
  if (!p) throw new Error(`Unbekanntes Paket: ${id}`);
  return p;
}

/** Formatiert einen Euro-Betrag (netto) ohne Nachkommastellen. */
export function formatEuro(amount: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Detaillierte Feature-Matrix für die Vergleichstabelle (Preisseite). */
export interface ComparisonRow {
  label: string;
  values: Record<PackageId, string | boolean>;
}

export const comparisonMatrix: ComparisonRow[] = [
  {
    label: "Unterseiten",
    values: { basis: "1 (One-Pager)", pro: "bis 8", platin: "bis 20", enterprise: "unbegrenzt" },
  },
  {
    label: "Individuelles Design",
    values: { basis: "Vorlage angepasst", pro: true, platin: true, enterprise: true },
  },
  {
    label: "Mobil-optimiert",
    values: { basis: true, pro: true, platin: true, enterprise: true },
  },
  {
    label: "Barrierefreiheit (WCAG 2.1 AA)",
    values: { basis: "Grundlagen", pro: true, platin: true, enterprise: true },
  },
  {
    label: "Onpage-SEO",
    values: { basis: "Basis", pro: true, platin: true, enterprise: "Premium" },
  },
  {
    label: "Lokales SEO",
    values: { basis: false, pro: "optional", platin: true, enterprise: true },
  },
  {
    label: "Blog / News",
    values: { basis: false, pro: "optional", platin: true, enterprise: true },
  },
  {
    label: "Terminbuchung",
    values: { basis: false, pro: "Add-on", platin: true, enterprise: true },
  },
  {
    label: "Mehrsprachigkeit",
    values: { basis: false, pro: false, platin: "Add-on", enterprise: true },
  },
  {
    label: "Integrationen (CRM/Shop/API)",
    values: { basis: false, pro: false, platin: "begrenzt", enterprise: true },
  },
  {
    label: "Korrekturrunden",
    values: { basis: "1", pro: "2", platin: "3", enterprise: "individuell" },
  },
  {
    label: "Wartung / Monat",
    values: { basis: "49 €", pro: "99 €", platin: "299 €", enterprise: "ab 499 €" },
  },
];
