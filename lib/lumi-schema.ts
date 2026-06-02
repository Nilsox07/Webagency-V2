/**
 * Lumi – Slot-Schema (Datenmodell hinter der Briefing-Assistentin).
 *
 * Hybrid-Architektur: feste, deterministische Slot-Liste im Hintergrund; das LLM
 * formuliert Fragen dynamisch und branchenangepasst. Ein programmatischer
 * Vollständigkeits-Check prüft vor dem Absenden, ob alle aktiven Pflicht-Slots
 * gefüllt sind. Reihenfolge: Paket → Branche/Ziel → branchenspezifisch → Design
 * → Materialien → Zusatzoptionen → Kontakt (zuletzt!) → Zusammenfassung.
 */

import type { PackageId } from "./packages";

export type SlotType =
  | "text"
  | "textarea"
  | "select"
  | "multiselect"
  | "boolean"
  | "email"
  | "phone"
  | "url"
  | "file";

export interface Slot {
  key: string;
  label: string;
  /** Natürlichsprachliche Beispiel-Frage (du-Form). Das LLM darf umformulieren. */
  question: string;
  type: SlotType;
  required: boolean;
  options?: string[];
  /** Phase im Flow (steuert Reihenfolge). */
  phase: BriefingPhase;
  /** Nur ab diesem Paket aktiv (sonst für alle). */
  minPackage?: PackageId;
  /** Hinweis/Hilfetext. */
  hint?: string;
}

export type BriefingPhase =
  | "paket"
  | "branche-ziel"
  | "branchenspezifisch"
  | "design"
  | "materialien"
  | "zusatz"
  | "kontakt"
  | "zusammenfassung";

export const phaseOrder: BriefingPhase[] = [
  "paket",
  "branche-ziel",
  "branchenspezifisch",
  "design",
  "materialien",
  "zusatz",
  "kontakt",
  "zusammenfassung",
];

export const phaseLabels: Record<BriefingPhase, string> = {
  paket: "Paket",
  "branche-ziel": "Dein Vorhaben",
  branchenspezifisch: "Details",
  design: "Stil & Design",
  materialien: "Materialien",
  zusatz: "Zusatzoptionen",
  kontakt: "Kontakt",
  zusammenfassung: "Zusammenfassung",
};

/** Reihenfolge der Paket-Ränge für minPackage-Vergleiche. */
const packageRank: Record<PackageId, number> = {
  basis: 0,
  pro: 1,
  platin: 2,
  enterprise: 3,
};

export function packageMeets(current: PackageId, min: PackageId): boolean {
  return packageRank[current] >= packageRank[min];
}

/** Allgemeine Slots (paketunabhängig, außer minPackage gesetzt). */
export const baseSlots: Slot[] = [
  // Branche & Ziel
  {
    key: "firmenname",
    label: "Firma/Geschäft",
    question: "Erzähl mir kurz: Was machst du beruflich bzw. wie heißt dein Unternehmen?",
    type: "text",
    required: true,
    phase: "branche-ziel",
  },
  {
    key: "rechtsform",
    label: "Rechtsform",
    question: "In welcher Rechtsform bist du unterwegs?",
    type: "select",
    required: true,
    options: ["Einzelunternehmen", "GbR", "GmbH", "UG", "e.K.", "Freiberufler:in", "Verein"],
    phase: "branche-ziel",
  },
  {
    key: "branche",
    label: "Branche",
    question: "In welcher Branche bist du tätig? (Das hilft mir, die richtigen Fragen zu stellen.)",
    type: "text",
    required: true,
    phase: "branche-ziel",
  },
  {
    key: "website_ziel",
    label: "Ziel der Website",
    question:
      "Was soll deine neue Website vor allem erreichen – mehr Anfragen, Verkäufe, oder erstmal professionell präsent sein?",
    type: "multiselect",
    required: true,
    options: ["Mehr Anfragen/Leads", "Verkaufen", "Informieren", "Image/Professionalität", "Terminbuchung", "Bewerbungen"],
    phase: "branche-ziel",
  },
  {
    key: "zielgruppe",
    label: "Zielgruppe",
    question: "Für wen ist die Seite gedacht – wer sind deine typischen Kund:innen?",
    type: "text",
    required: true,
    phase: "branche-ziel",
  },
  {
    key: "neue_seite_oder_relaunch",
    label: "Neu oder Relaunch",
    question: "Ist das eine komplett neue Website oder ein Relaunch einer bestehenden Seite?",
    type: "select",
    required: true,
    options: ["Komplett neu", "Relaunch (bestehende Seite)"],
    phase: "branche-ziel",
  },
  // Seitenstruktur (ab Pro)
  {
    key: "seitenstruktur",
    label: "Seitenstruktur",
    question: "Welche Seiten brauchst du? (z. B. Start, Über uns, Leistungen, Kontakt, Blog …)",
    type: "textarea",
    required: false,
    phase: "branche-ziel",
    minPackage: "pro",
  },
  // Design / Stil
  {
    key: "stil_praeferenz",
    label: "Stil-Präferenz",
    question:
      "Welcher Stil gefällt dir? (z. B. modern & reduziert, hochwertig & elegant, lebendig & verspielt, seriös, technisch)",
    type: "multiselect",
    required: true,
    options: ["Modern & reduziert", "Hochwertig & elegant", "Lebendig & verspielt", "Seriös", "Technisch", "Minimalistisch"],
    phase: "design",
  },
  {
    key: "vorbild_websites",
    label: "Vorbild-Websites",
    question: "Gibt es 1–2 Websites, die dir gut gefallen? Schick mir gern die Links.",
    type: "textarea",
    required: false,
    phase: "design",
  },
  // Materialien
  {
    key: "logo_vorhanden",
    label: "Logo",
    question:
      "Hast du schon ein Logo? Wenn ja, kannst du es hochladen – wenn nicht, kann ich dir unser Logo-Paket ab 390 € zeigen.",
    type: "select",
    required: true,
    options: ["Ja, vorhanden", "Nein, wird benötigt"],
    phase: "materialien",
  },
  {
    key: "corporate_design",
    label: "Corporate Design",
    question: "Gibt es Vorgaben zu Farben und Schriften (Corporate Design / Styleguide)?",
    type: "select",
    required: false,
    options: ["Ja, vorhanden", "Teilweise", "Nein"],
    phase: "materialien",
  },
  {
    key: "texte_vorhanden",
    label: "Texte",
    question:
      "Wie sieht's mit Texten aus – schon fertig, teilweise, oder sollen wir die für dich schreiben (120 € pro Seite)?",
    type: "select",
    required: true,
    options: ["Vollständig vorhanden", "Teilweise vorhanden", "Bitte für mich schreiben"],
    phase: "materialien",
  },
  {
    key: "bildmaterial_vorhanden",
    label: "Bildmaterial",
    question: "Hast du eigene Fotos, brauchst du Stockbilder, oder ist noch nichts da?",
    type: "select",
    required: true,
    options: ["Eigene Fotos vorhanden", "Stockbilder gewünscht", "Noch nichts vorhanden"],
    phase: "materialien",
  },
  {
    key: "domain_vorhanden",
    label: "Domain",
    question: "Hast du schon eine Domain? Wenn ja, welche – wenn nein, hast du eine Wunschdomain?",
    type: "text",
    required: false,
    phase: "materialien",
  },
  // Zusatzoptionen
  {
    key: "zusatzoptionen",
    label: "Zusatzoptionen",
    question:
      "Möchtest du etwas ergänzen? Beliebt sind Google-Profil (190 €), Terminbuchung (290 €), KI-Chatbot (490 €), Newsletter (290 €) oder Analytics (190 €).",
    type: "multiselect",
    required: false,
    options: [
      "Google-Unternehmensprofil (190 €)",
      "Terminbuchung (290 €)",
      "KI-Chatbot (490 €)",
      "Newsletter (290 €)",
      "Analytics & Tracking (190 €)",
      "Google-Ads-Setup (390 €)",
      "Nichts weiter",
    ],
    phase: "zusatz",
  },
  {
    key: "wunschtermin",
    label: "Wunschtermin",
    question: "Gibt es einen Wunschtermin für den Go-live?",
    type: "text",
    required: false,
    phase: "zusatz",
  },
  // Kontakt (zuletzt!)
  {
    key: "kontakt_name",
    label: "Name",
    question: "Super, ich habe fast alles! Wie ist dein Name?",
    type: "text",
    required: true,
    phase: "kontakt",
  },
  {
    key: "kontakt_email",
    label: "E-Mail",
    question: "Und wohin darf ich die Zusammenfassung und das Angebot schicken? Deine E-Mail genügt.",
    type: "email",
    required: true,
    phase: "kontakt",
  },
  {
    key: "kontakt_telefon",
    label: "Telefon (optional)",
    question: "Möchtest du eine Telefonnummer hinterlassen? (Optional – nur wenn du magst.)",
    type: "phone",
    required: false,
    phase: "kontakt",
  },
  {
    key: "dsgvo_einwilligung",
    label: "Einwilligung",
    question:
      "Darf ich deine Angaben gemäß unserer Datenschutzerklärung zur Bearbeitung deiner Anfrage nutzen?",
    type: "boolean",
    required: true,
    phase: "kontakt",
  },
];

/** Branchenspezifische Slots (nur bei erkannter Branche aktiviert). */
export interface BranchSlotGroup {
  /** Schlüsselwörter, die diese Branche auslösen (lowercase). */
  keywords: string[];
  label: string;
  slots: Slot[];
}

export const branchSlotGroups: BranchSlotGroup[] = [
  {
    label: "Restaurant/Gastronomie",
    keywords: ["restaurant", "gastr", "café", "cafe", "bar", "imbiss", "küche", "koch", "bistro", "catering"],
    slots: [
      { key: "speisekarte", label: "Speisekarte", question: "Magst du eine Speisekarte auf der Seite zeigen? Du kannst sie als PDF hochladen.", type: "boolean", required: false, phase: "branchenspezifisch" },
      { key: "oeffnungszeiten", label: "Öffnungszeiten", question: "Wie sind deine Öffnungszeiten?", type: "textarea", required: false, phase: "branchenspezifisch" },
      { key: "reservierung", label: "Reservierung", question: "Sollen Gäste online einen Tisch reservieren können?", type: "boolean", required: false, phase: "branchenspezifisch" },
    ],
  },
  {
    label: "Handwerk",
    keywords: ["handwerk", "maler", "elektr", "sanitär", "klempner", "tischler", "schreiner", "dachdecker", "bau", "fliesen", "garten", "installateur", "zimmerei"],
    slots: [
      { key: "leistungsgebiet", label: "Einzugsgebiet", question: "In welchem Umkreis bist du tätig?", type: "text", required: false, phase: "branchenspezifisch" },
      { key: "gewerke", label: "Gewerke/Leistungen", question: "Welche Leistungen möchtest du vorstellen?", type: "textarea", required: false, phase: "branchenspezifisch" },
      { key: "referenzprojekte", label: "Referenzprojekte", question: "Hast du Fotos abgeschlossener Projekte? Referenzbilder wirken bei Handwerksseiten am stärksten.", type: "boolean", required: false, phase: "branchenspezifisch" },
      { key: "notdienst", label: "Notdienst", question: "Bietest du einen Notdienst an, der hervorgehoben werden soll?", type: "boolean", required: false, phase: "branchenspezifisch" },
    ],
  },
  {
    label: "Arzt/Praxis/Therapie",
    keywords: ["arzt", "ärzt", "praxis", "therap", "zahn", "physio", "heilprakt", "psycho", "medizin", "klinik", "pflege"],
    slots: [
      { key: "behandlungen", label: "Behandlungen", question: "Welche Behandlungen oder Leistungen möchtest du vorstellen?", type: "textarea", required: false, phase: "branchenspezifisch" },
      { key: "sprechzeiten", label: "Sprechzeiten", question: "Wie sind deine Sprechzeiten?", type: "textarea", required: false, phase: "branchenspezifisch" },
      { key: "online_terminbuchung", label: "Online-Terminbuchung", question: "Soll es eine Online-Terminbuchung geben?", type: "boolean", required: false, phase: "branchenspezifisch" },
      { key: "kassen", label: "Kassen/Privat", question: "Behandelst du gesetzlich, privat oder beides?", type: "select", options: ["Gesetzlich", "Privat", "Beides"], required: false, phase: "branchenspezifisch" },
    ],
  },
  {
    label: "Kreative/Fotografen",
    keywords: ["foto", "design", "kreativ", "künstler", "kunst", "film", "video", "musik", "grafik", "illustr"],
    slots: [
      { key: "portfolio", label: "Portfolio/Galerie", question: "Möchtest du ein Portfolio bzw. eine Galerie zeigen? Du kannst Arbeitsproben hochladen.", type: "boolean", required: false, phase: "branchenspezifisch" },
      { key: "preislisten", label: "Preislisten", question: "Sollen Preise oder Pakete auf der Seite stehen?", type: "boolean", required: false, phase: "branchenspezifisch" },
    ],
  },
  {
    label: "Kanzlei/Beratung",
    keywords: ["kanzlei", "anwalt", "rechtsanwalt", "steuer", "berat", "consult", "notar", "wirtschaftsprüf"],
    slots: [
      { key: "fachgebiete", label: "Fach-/Rechtsgebiete", question: "Welche Fach- oder Rechtsgebiete deckst du ab?", type: "textarea", required: false, phase: "branchenspezifisch" },
      { key: "team", label: "Team", question: "Sollen einzelne Personen/Anwält:innen vorgestellt werden?", type: "boolean", required: false, phase: "branchenspezifisch" },
    ],
  },
  {
    label: "Einzelhandel/Ladengeschäft",
    keywords: ["laden", "geschäft", "einzelhandel", "shop", "boutique", "verkauf", "store"],
    slots: [
      { key: "standort", label: "Standort/Anfahrt", question: "Wo ist dein Geschäft, und soll eine Anfahrt/Karte eingebunden werden?", type: "text", required: false, phase: "branchenspezifisch" },
      { key: "sortiment", label: "Sortiment", question: "Welches Sortiment möchtest du präsentieren?", type: "textarea", required: false, phase: "branchenspezifisch" },
    ],
  },
  {
    label: "Coach/Trainer",
    keywords: ["coach", "trainer", "training", "fitness", "yoga", "mentor", "seminar"],
    slots: [
      { key: "angebote", label: "Angebote/Programme", question: "Welche Angebote oder Programme möchtest du vorstellen?", type: "textarea", required: false, phase: "branchenspezifisch" },
      { key: "buchung", label: "Buchung", question: "Sollen Kund:innen direkt Sessions oder Kurse buchen können?", type: "boolean", required: false, phase: "branchenspezifisch" },
    ],
  },
];

/** Erkennt branchenspezifische Slot-Gruppe aus Freitext. */
export function detectBranchSlots(branche: string): Slot[] {
  const b = branche.toLowerCase();
  for (const group of branchSlotGroups) {
    if (group.keywords.some((kw) => b.includes(kw))) {
      return group.slots;
    }
  }
  return [];
}

/** Liefert alle für ein Paket + Branche aktiven Slots in Flow-Reihenfolge. */
export function getActiveSlots(pkg: PackageId, branche?: string): Slot[] {
  const branchSlots = branche ? detectBranchSlots(branche) : [];
  const all = [...baseSlots, ...branchSlots].filter(
    (s) => !s.minPackage || packageMeets(pkg, s.minPackage)
  );
  return all.sort(
    (a, b) => phaseOrder.indexOf(a.phase) - phaseOrder.indexOf(b.phase)
  );
}

/** Prüft, welche Pflicht-Slots noch fehlen. */
export function missingRequiredSlots(
  pkg: PackageId,
  data: Record<string, unknown>,
  branche?: string
): Slot[] {
  return getActiveSlots(pkg, branche).filter((s) => {
    if (!s.required) return false;
    const v = data[s.key];
    if (s.type === "boolean") return v !== true;
    return v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0);
  });
}
