/**
 * Regelbasierter Fallback-Flow für Lumi (ohne LLM/API-Key).
 * Deterministisches Slot-Filling: erfasst die letzte Antwort und fragt den
 * nächsten offenen Slot in fester Reihenfolge ab. Funktioniert immer.
 */

import { getActiveSlots, type Slot } from "./lumi-schema";
import { getPackage, type PackageId } from "./packages";
import { estimatePrice, formatEstimate } from "./lumi-pricing";

export interface FallbackResult {
  message: string;
  data: Record<string, unknown>;
  finished: boolean;
}

const SKIP_WORDS = ["weiter", "skip", "überspringen", "ueberspringen", "keine angabe", "egal", "—", "-"];
const YES_WORDS = ["ja", "jo", "jep", "klar", "gerne", "yes", "passt", "ok", "okay", "einverstanden"];
const NO_WORDS = ["nein", "ne", "nö", "no", "nicht"];

function isSkip(t: string) {
  return SKIP_WORDS.includes(t.trim().toLowerCase());
}
function isYes(t: string) {
  return YES_WORDS.some((w) => t.trim().toLowerCase().startsWith(w));
}
function isNo(t: string) {
  return NO_WORDS.some((w) => t.trim().toLowerCase().startsWith(w));
}

/** Wandelt eine Freitextantwort in einen Slot-Wert um. */
function parseAnswer(slot: Slot, text: string): unknown {
  const t = text.trim();
  switch (slot.type) {
    case "boolean":
      if (isNo(t)) return false;
      return isYes(t) || t.length > 0 ? isYes(t) : false;
    case "multiselect": {
      if (!slot.options) return t.split(/[,;]/).map((s) => s.trim()).filter(Boolean);
      // Optionen anhand von Teilstrings matchen
      const matched = slot.options.filter((o) =>
        t.toLowerCase().includes(o.toLowerCase().split(" (")[0].slice(0, 6).toLowerCase())
      );
      return matched.length ? matched : [t];
    }
    case "select": {
      if (!slot.options) return t;
      const m = slot.options.find((o) => t.toLowerCase().includes(o.toLowerCase().slice(0, 5)));
      return m ?? t;
    }
    default:
      return t;
  }
}

/** Sucht den nächsten offenen Slot (Pflicht + optionale werden angeboten). */
function nextOpenSlot(slots: Slot[], data: Record<string, unknown>): Slot | undefined {
  return slots.find((s) => {
    const v = data[s.key];
    return v === undefined || v === null || v === "";
  });
}

export function runFallback(
  packageId: PackageId,
  messages: { role: string; content: string }[],
  incoming: Record<string, unknown>
): FallbackResult {
  const data = { ...incoming };
  const lastUser = [...messages].reverse().find((m) => m.role === "user");

  // Branche kann sich nach jeder Antwort ändern → Slots dynamisch
  let slots = getActiveSlots(packageId, data.branche as string | undefined);

  // 1) Letzte Nutzerantwort dem zuletzt gefragten (= ersten offenen) Slot zuordnen
  if (lastUser) {
    const pending = nextOpenSlot(slots, data);
    if (pending) {
      if (isSkip(lastUser.content) && !pending.required) {
        data[pending.key] = "(übersprungen)";
      } else {
        data[pending.key] = parseAnswer(pending, lastUser.content);
      }
      // Slots nach möglicher Branchenerkennung neu berechnen
      slots = getActiveSlots(packageId, data.branche as string | undefined);
    }
  }

  // 2) Nächsten offenen Slot bestimmen
  const next = nextOpenSlot(slots, data);

  // 3a) Begrüßung (noch keine Nutzernachricht)
  if (!lastUser && !next) {
    return { message: greeting(packageId), data, finished: false };
  }
  if (!lastUser) {
    return { message: `${greeting(packageId)}\n\n${next!.question}`, data, finished: false };
  }

  // 3b) Fertig → Zusammenfassung
  if (!next) {
    return { message: buildSummary(packageId, data), data, finished: true };
  }

  // 3c) Nächste Frage – bei Eintritt in die Zusatz-Phase die Preisschätzung zeigen
  let prefix = "";
  if (next.phase === "zusatz" && !data.__priceShown) {
    data.__priceShown = true;
    prefix = `Kurzer Zwischenstand: ${formatEstimate(estimatePrice(packageId, data))}\n\n`;
  }
  return { message: prefix + next.question, data, finished: false };
}

function greeting(packageId: PackageId): string {
  const pkg = getPackage(packageId);
  return `Hi, ich bin Lumi 👋 Ich helfe dir, dein Website-Projekt in wenigen Minuten zu beschreiben – ganz entspannt im Chat. Du hast das Paket **${pkg.name}** gewählt, sehr gute Wahl! Lass uns starten.`;
}

function buildSummary(packageId: PackageId, data: Record<string, unknown>): string {
  const est = estimatePrice(packageId, data);
  const fmt = (v: unknown) =>
    Array.isArray(v) ? v.join(", ") : v === true ? "Ja" : v === false ? "Nein" : String(v ?? "—");

  const lines = [
    `**Super, ich habe alles!** Hier dein Briefing im Überblick:`,
    ``,
    `• Unternehmen: ${fmt(data.firmenname)}`,
    `• Branche: ${fmt(data.branche)}`,
    `• Ziel: ${fmt(data.website_ziel)}`,
    `• Stil: ${fmt(data.stil_praeferenz)}`,
    `• Texte: ${fmt(data.texte_vorhanden)} · Logo: ${fmt(data.logo_vorhanden)}`,
    `• Kontakt: ${fmt(data.kontakt_name)} (${fmt(data.kontakt_email)})`,
    ``,
    `**Geschätzte Investition:** ${formatEstimate(est)}.`,
    ``,
    `Mit dem Absenden stellst du eine unverbindliche Anfrage – verbindlich wird's erst mit unserer Auftragsbestätigung. Passt das so? Dann klick auf „Briefing absenden“.`,
  ];
  return lines.join("\n");
}
