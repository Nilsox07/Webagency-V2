/**
 * Transparente Live-Preisschätzung für Lumi (Paket + Zusatzoptionen).
 * Immer als UNVERBINDLICHE Schätzung kommuniziert. Enterprise: "ab".
 */

import { getPackage, type PackageId, formatEuro } from "./packages";
import { addOns } from "./addons";

export interface PriceLine {
  label: string;
  amount: number;
}

export interface PriceEstimate {
  lines: PriceLine[];
  total: number;
  isFrom: boolean; // true → "ab X" (Enterprise oder mengenabhängig)
  monthly: number;
  monthlyFrom: boolean;
}

/** Mappt Lumi-Auswahllabels auf Add-on-IDs. */
const optionLabelToAddon: Record<string, string> = {
  "Google-Unternehmensprofil (190 €)": "google-profil",
  "Terminbuchung (290 €)": "terminbuchung",
  "KI-Chatbot (490 €)": "ki-chatbot",
  "Newsletter (290 €)": "newsletter",
  "Analytics & Tracking (190 €)": "analytics",
  "Google-Ads-Setup (390 €)": "google-ads",
};

export function estimatePrice(
  packageId: PackageId,
  data: Record<string, unknown>
): PriceEstimate {
  const pkg = getPackage(packageId);
  const lines: PriceLine[] = [{ label: `Paket ${pkg.name}`, amount: pkg.price }];
  let isFrom = pkg.priceFrom;

  // Zusatzoptionen (Multiselect)
  const chosen = (data.zusatzoptionen as string[] | undefined) ?? [];
  for (const label of chosen) {
    const addonId = optionLabelToAddon[label];
    if (addonId) {
      const a = addOns.find((x) => x.id === addonId);
      if (a) lines.push({ label: a.name, amount: a.price });
    }
  }

  // Logo benötigt?
  if (data.logo_vorhanden === "Nein, wird benötigt") {
    const logo = addOns.find((a) => a.id === "logo-wortmarke");
    if (logo) {
      lines.push({ label: "Logo (Wortmarke, ab)", amount: logo.price });
      isFrom = true; // Wort-Bild-Marke wäre teurer
    }
  }

  // Texterstellung?
  if (data.texte_vorhanden === "Bitte für mich schreiben") {
    const texte = addOns.find((a) => a.id === "texte");
    if (texte) {
      lines.push({ label: "Texte (pro Seite, ab)", amount: texte.price });
      isFrom = true; // Seitenzahl variabel
    }
  }

  const total = lines.reduce((sum, l) => sum + l.amount, 0);

  return {
    lines,
    total,
    isFrom,
    monthly: pkg.maintenance,
    monthlyFrom: pkg.maintenanceFrom,
  };
}

/** Lesbarer Schätz-Text. */
export function formatEstimate(est: PriceEstimate): string {
  const prefix = est.isFrom ? "ab " : "";
  return `${prefix}${formatEuro(est.total)} (netto, unverbindlich) zzgl. ${
    est.monthlyFrom ? "ab " : ""
  }${formatEuro(est.monthly)}/Monat Wartung`;
}
