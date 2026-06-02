/**
 * Referenzen / Case Studies.
 *
 * TODO: Durch echte Projekte ersetzen. Erfinde KEINE Kundenzitate oder Zahlen –
 * Testimonials nur mit Einwilligung, Bewertungen nur, wenn real (wettbewerbsrechtlich).
 * Die folgenden Einträge sind klar erkennbare Beispiel-Platzhalter.
 */

export interface CaseStudy {
  slug: string;
  title: string;
  branche: string;
  packageUsed: string;
  summary: string;
  /** Platzhalter – kein echtes Ergebnis. */
  isPlaceholder: boolean;
  result?: string;
  /** Farbverlauf für das Mockup-Platzhalterbild. */
  gradient: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "beispiel-handwerk",
    title: "Beispielprojekt: Malerbetrieb",
    branche: "Handwerk",
    packageUsed: "Pro",
    summary:
      "Mehrseitige Website mit Referenzgalerie und Anfrageformular für einen lokalen Malerbetrieb. (Beispiel-Platzhalter)",
    isPlaceholder: true,
    gradient: "from-amber-400 to-orange-500",
  },
  {
    slug: "beispiel-praxis",
    title: "Beispielprojekt: Physiotherapie-Praxis",
    branche: "Gesundheit",
    packageUsed: "Platin",
    summary:
      "Website mit Online-Terminbuchung, Leistungsübersicht und lokalem SEO. (Beispiel-Platzhalter)",
    isPlaceholder: true,
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    slug: "beispiel-restaurant",
    title: "Beispielprojekt: Restaurant",
    branche: "Gastronomie",
    packageUsed: "Pro",
    summary:
      "One-Pager mit digitaler Speisekarte, Öffnungszeiten und Reservierungslink. (Beispiel-Platzhalter)",
    isPlaceholder: true,
    gradient: "from-rose-400 to-pink-500",
  },
  {
    slug: "beispiel-kanzlei",
    title: "Beispielprojekt: Steuerkanzlei",
    branche: "Beratung",
    packageUsed: "Platin",
    summary:
      "Seriöse Website mit Team-Vorstellung, Fachgebieten und Mandanten-Kontakt. (Beispiel-Platzhalter)",
    isPlaceholder: true,
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    slug: "beispiel-coach",
    title: "Beispielprojekt: Business-Coach",
    branche: "Coaching",
    packageUsed: "Pro",
    summary:
      "Conversion-orientierte Seite mit Angeboten, Buchung und Testimonials. (Beispiel-Platzhalter)",
    isPlaceholder: true,
    gradient: "from-violet-400 to-purple-500",
  },
  {
    slug: "beispiel-laden",
    title: "Beispielprojekt: Einzelhandel",
    branche: "Handel",
    packageUsed: "Basis",
    summary:
      "One-Pager mit Sortiment, Standort und Google-Profil-Anbindung. (Beispiel-Platzhalter)",
    isPlaceholder: true,
    gradient: "from-cyan-400 to-sky-500",
  },
];
