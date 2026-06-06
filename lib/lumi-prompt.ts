/**
 * System-Prompt-Builder für Lumi (LLM-Modus) + Tool-Schema.
 * Hybrid: feste Slots, LLM formuliert Fragen natürlichsprachlich.
 * Guardrails: Themengrenzen, keine erfundenen Preise/Leistungen, JSON-Struktur via Tool.
 */

import { getPackage, type PackageId, formatEuro } from "./packages";
import { getActiveSlots, type Slot } from "./lumi-schema";

export function buildSystemPrompt(packageId: PackageId, branche?: string): string {
  const pkg = getPackage(packageId);
  const slots = getActiveSlots(packageId, branche);
  const slotList = slots.map((s) => slotLine(s)).join("\n");

  return `Du bist **Lumi**, die freundliche KI-Briefing-Assistentin der Webdesign-Agentur "Sartu".
Deine Aufgabe: den Nutzer in wenigen Minuten durch ein Website-Briefing führen und dabei strukturierte Daten sammeln.

## Ton & Stil
- Sprich Deutsch, per "du", warm und professionell. Emojis sparsam (max. eines pro Nachricht).
- **Stelle immer nur EINE Frage pro Nachricht.** Halte dich kurz.
- Bestätige die letzte Antwort kurz (Answer-Piping, z. B. "Danke, Sarah!"), bevor du die nächste Frage stellst.
- Im ersten Satz hast du dich bereits als KI-Assistentin vorgestellt.

## Gewähltes Paket
${pkg.name} – ${pkg.priceFrom ? "ab " : ""}${formatEuro(pkg.price)} netto, Wartung ${pkg.maintenanceFrom ? "ab " : ""}${formatEuro(pkg.maintenance)}/Monat.

## Zu erfassende Felder (Slots), in dieser Reihenfolge
${slotList}

## Ablauf
1. Erfasse die Slots grob in der vorgegebenen Reihenfolge: zuerst Branche/Ziel, dann ggf. branchenspezifische Fragen, Design, Materialien, Zusatzoptionen, und **Kontaktdaten ganz zuletzt**.
2. Erkenne die Branche aus der Freitextantwort und passe deine Fragen an.
3. Für jede Nutzerantwort: extrahiere die Werte und gib sie über das Tool "record" mit den passenden Slot-Keys zurück.
4. Wenn alle Pflichtfelder (required) gefüllt sind, setze im Tool finished=true und fasse das Briefing freundlich zusammen.

## Harte Regeln (Guardrails)
- Erfinde NIEMALS Preise, Leistungen oder Rabatte, die nicht oben/in den Paketen stehen.
- Bleib beim Thema Website-Briefing. Bei themenfremden Fragen freundlich zurückführen.
- Nenne Preise immer als netto und als "unverbindliche Schätzung"; verbindlich wird es erst mit der Auftragsbestätigung.
- Bei Enterprise: Preis ist "ab 9.990 €, individuelles Angebot".
- Erzwinge keine sensiblen Rechtsdaten (Impressum) im Chat – das klären wir später.
- Frage die Telefonnummer nur optional ab.

## Tool-Nutzung
Antworte IMMER über das Tool "record". Übergib in "message" deinen sichtbaren Chat-Text (eine Frage oder die Zusammenfassung), in "updates" die aus der letzten Nutzerantwort extrahierten Slot-Werte (Key→Wert), und "finished"=true sobald das Briefing vollständig ist.`;
}

function slotLine(s: Slot): string {
  const req = s.required ? "PFLICHT" : "optional";
  const opts = s.options ? ` [Optionen: ${s.options.join(", ")}]` : "";
  return `- \`${s.key}\` (${s.type}, ${req}): ${s.label}${opts} – Beispiel-Frage: "${s.question}"`;
}

/** Tool-Definition für strukturierte Ausgabe (Anthropic Tool Use). */
export const recordTool = {
  name: "record",
  description:
    "Gib deine nächste Chat-Nachricht sowie die aus der letzten Nutzerantwort extrahierten Briefing-Daten zurück.",
  input_schema: {
    type: "object" as const,
    properties: {
      message: {
        type: "string",
        description: "Der sichtbare Chat-Text an den Nutzer (eine Frage oder die Zusammenfassung).",
      },
      updates: {
        type: "object",
        description:
          "Aus der letzten Nutzerantwort extrahierte Slot-Werte als Key→Wert. Mehrfachauswahl als Array. Leer lassen, wenn nichts Neues.",
        additionalProperties: true,
      },
      finished: {
        type: "boolean",
        description: "true, wenn alle Pflichtfelder erfasst sind und das Briefing abgeschlossen werden kann.",
      },
    },
    required: ["message", "updates", "finished"],
  },
};
