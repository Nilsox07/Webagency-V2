/**
 * Content-Engine für die programmatischen Stadt-Landingpages.
 *
 * Erzeugt aus den reinen Stadtdaten (City) deterministisch VARIIERENDE,
 * datenangereicherte Texte (Lead, Kontext, FAQ). Ziel: jede Seite hat echte,
 * unterschiedliche Substanz (Einwohner, Bundesland, nächstgrößere Stadt,
 * Nachbarorte) statt nur ausgetauschtem Ortsnamen – das senkt das Thin-/
 * Doorway-Content-Risiko und erhöht die Indexierungs-Chance.
 */

import type { City } from "./cities";
import { getCity, formatPopulation, resolveNearby } from "./cities";
import type { FaqItem } from "./faq";

export interface CityPageContent {
  name: string;
  slug: string;
  bundesland: string;
  population: number;
  lat: number;
  lng: number;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  sizeWord: string;
  localContext: string;
  whyLocal: string;
  typicalBusinesses: string[];
  faq: FaqItem[];
  nearby: { name: string; slug: string; km: number }[];
  biggerNearby?: { name: string; km: number };
}

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick<T>(arr: T[], h: number, salt = 0): T {
  return arr[(h + salt) % arr.length];
}

function sizeWord(pop: number): string {
  if (pop >= 100000) return "Großstadt";
  if (pop >= 20000) return "Stadt";
  if (pop >= 10000) return "Kleinstadt";
  return "kleinere Stadt";
}

const BUSINESS_POOL = [
  "Handwerk & Bau",
  "Gastronomie & Cafés",
  "Einzelhandel & Geschäfte",
  "Dienstleister & Berater",
  "Gesundheit, Praxen & Pflege",
  "Kanzleien & Steuerberatung",
  "Friseure & Kosmetik",
  "Vereine & Veranstalter",
  "Immobilien & Hausverwaltung",
  "Tourismus & Hotellerie",
];

export function buildCityContent(city: City): CityPageContent {
  const h = hash(city.slug);
  const popF = formatPopulation(city.population);
  const size = sizeWord(city.population);

  const nearbyResolved = resolveNearby(city);
  const nearby = nearbyResolved.map((n) => ({ name: n.city.name, slug: n.city.slug, km: n.km }));

  // Nächstgrößere Stadt in der Nähe (für lokalen Bezug)
  const bigger = nearbyResolved
    .filter((n) => n.city.population > city.population)
    .sort((a, b) => a.km - b.km)[0];
  const biggerNearby = bigger ? { name: bigger.city.name, km: bigger.km } : undefined;
  const nearestName = nearby[0]?.name;

  const ctx = { name: city.name, bl: city.bundesland, popF, size, biggerNearby, nearestName };

  // ── Lead (Antwort-zuerst, 40–60 W.) ──────────────────────────────────────
  const leads = [
    `Webdesign in ${ctx.name} bedeutet bei uns eine professionelle, blitzschnelle Website zum Festpreis ab 990 €. Für die rund ${ctx.popF} Menschen in ${ctx.name} (${ctx.bl}) und die Betriebe vor Ort bauen wir Seiten, die mobil schnell laden und lokal bei Google gefunden werden – persönlich betreut, mit festem Liefertermin und ohne Angebotschaos.`,
    `Du suchst Webdesign in ${ctx.name}? Wir liefern professionelle Websites zum Festpreis ab 990 € – schnell, mobil-optimiert und barrierearm. Als Webdesigner für ${ctx.bl} machen wir Unternehmen in ${ctx.name} lokal sichtbar, mit transparentem Preis und verbindlichem Termin statt langem Angebotsprozess.`,
    `Professionelles Webdesign für ${ctx.name} (${ctx.bl}): Festpreis ab 990 €, blitzschnelle Ladezeiten und lokales SEO, damit dich Kund:innen in ${ctx.name} finden. Du wählst ein Paket, beschreibst dein Projekt in Minuten mit unserer KI-Assistentin Lumi – den Rest übernehmen wir, persönlich und planbar.`,
    `Webdesign ${ctx.name} zum Festpreis: ab 990 € bekommst du eine moderne, schnelle Website, die zu deinem Betrieb passt und in ${ctx.name} gut gefunden wird. Kein Agentur-Chaos, kein Stundensatz-Risiko – fester Preis, fester Termin, ein persönlicher Ansprechpartner für ${ctx.bl}.`,
    `Eine professionelle Website für dein Unternehmen in ${ctx.name} gibt es bei uns ab 990 € als Festpreis. Schnell, mobil und lokal auffindbar – zugeschnitten auf ${size === "Großstadt" ? "den Wettbewerb einer Großstadt" : "die Betriebe vor Ort"} in ${ctx.name}. Briefing in Minuten mit Lumi, Umsetzung mit verbindlichem Liefertermin.`,
  ];

  // ── Lokaler Kontext ──────────────────────────────────────────────────────
  const contexts = [
    `${ctx.name} ist eine ${size} in ${ctx.bl} mit rund ${ctx.popF} Einwohnern. Lokale Betriebe stehen hier im Wettbewerb um die Aufmerksamkeit der Menschen vor Ort – wer mit einer schnellen, gut auffindbaren Website auftritt, gewinnt Anfragen, die sonst an Mitbewerber gehen.`,
    `Mit etwa ${ctx.popF} Einwohnern bietet ${ctx.name} (${ctx.bl}) ein lebendiges lokales Umfeld für Handwerk, Handel und Dienstleistung. Eine professionelle Website ist hier der digitale Schaufensterplatz: Sie zeigt dein Angebot rund um die Uhr und macht dich in der lokalen Google-Suche sichtbar.`,
    `${ctx.name} zählt rund ${ctx.popF} Einwohner und gehört zu ${ctx.bl}. Gerade für lokale Unternehmen entscheidet die Online-Präsenz zunehmend über neue Kund:innen – viele prüfen heute online, bevor sie anrufen oder vorbeikommen. Genau dafür bauen wir schnelle, vertrauenswürdige Seiten.`,
    `Als ${size} in ${ctx.bl} (ca. ${ctx.popF} Einwohner) hat ${ctx.name} eine eigene lokale Wirtschaft. Eine moderne Website mit lokalem SEO sorgt dafür, dass du genau dann erscheinst, wenn jemand in ${ctx.name} nach deiner Leistung sucht – der wichtigste Hebel für planbare Anfragen.`,
  ];

  // ── Warum lokal / Erreichbarkeit ─────────────────────────────────────────
  const whyLocals = [
    biggerNearby
      ? `${ctx.name} liegt nur etwa ${biggerNearby.km} km von ${biggerNearby.name} entfernt. Die Zusammenarbeit läuft komplett online über das Briefing mit Lumi – ortsunabhängig, schnell und persönlich. So bekommst du dieselbe Qualität wie eine Großstadt-Agentur, ohne deren Preise.`
      : `Die Zusammenarbeit läuft komplett online über das Briefing mit Lumi – ortsunabhängig, schnell und persönlich. So bekommst du in ${ctx.name} professionelles Webdesign ohne lange Wege und ohne Großstadt-Preise.`,
    `Du musst für deine neue Website in ${ctx.name} nicht zu einer großen Agentur fahren: Das gesamte Briefing erledigst du online in wenigen Minuten mit Lumi, Abstimmungen laufen per E-Mail oder Telefon. Persönlich, transparent und ohne Zeitverlust.`,
    `Egal ob ${nearestName ? `${ctx.name} oder das nahe ${nearestName}` : ctx.name}: Wir arbeiten ortsunabhängig und trotzdem persönlich. Dein Projekt wird von einer festen Ansprechperson umgesetzt – kein Callcenter, keine wechselnden Projektmanager.`,
  ];

  // ── Typische Branchen (4, deterministisch gewählt) ──────────────────────
  const start = h % BUSINESS_POOL.length;
  const typicalBusinesses = [0, 1, 2, 3].map((i) => BUSINESS_POOL[(start + i) % BUSINESS_POOL.length]);

  // ── FAQ (datenbasiert, leicht variiert) ─────────────────────────────────
  const faq: FaqItem[] = [
    {
      question: `Was kostet eine Website in ${ctx.name}?`,
      answer: `Eine professionelle Website kostet in ${ctx.name} bei uns ab 990 € als Festpreis (One-Pager). Mehrseitige Websites starten bei 2.990 €. Du kennst den Preis vorab – ohne versteckte Kosten, ohne Stundensatz-Risiko.`,
    },
    {
      question: `Wie werde ich in ${ctx.name} bei Google gefunden?`,
      answer: `Mit lokalem SEO und einem gepflegten Google-Unternehmensprofil erscheinst du, wenn jemand deine Leistung in ${ctx.name} sucht. Wir richten Technik, Inhalte und konsistente Kontaktdaten so ein, dass du in ${ctx.bl} lokal sichtbar wirst.`,
    },
    biggerNearby
      ? {
          question: `Arbeitest du auch im Umkreis von ${ctx.name}?`,
          answer: `Ja. Neben ${ctx.name} betreuen wir die gesamte Region – etwa ${biggerNearby.name} (rund ${biggerNearby.km} km entfernt) und weitere Orte. Da das Briefing online läuft, spielt die Entfernung keine Rolle.`,
        }
      : {
          question: `Arbeitest du auch im Umkreis von ${ctx.name}?`,
          answer: `Ja. Neben ${ctx.name} betreuen wir die umliegenden Orte in ${ctx.bl}. Da das Briefing mit Lumi online läuft, ist die Zusammenarbeit ortsunabhängig und genauso persönlich.`,
        },
  ];

  // ── Meta ─────────────────────────────────────────────────────────────────
  const metaDescriptions = [
    `Webdesign in ${ctx.name} zum Festpreis ab 990 €: schnelle, mobil-optimierte Websites mit lokalem SEO für Unternehmen in ${ctx.name} und ${ctx.bl}. Persönlich, transparent, mit festem Termin.`,
    `Professionelle Website für ${ctx.name} (${ctx.bl}) ab 990 € Festpreis: blitzschnell, barrierearm und lokal auffindbar. Briefing in Minuten mit KI-Assistentin Lumi.`,
  ];

  return {
    name: city.name,
    slug: city.slug,
    bundesland: city.bundesland,
    population: city.population,
    lat: city.lat,
    lng: city.lng,
    metaTitle: `Webdesign ${city.name} – Festpreis-Websites ab 990 €`,
    metaDescription: pick(metaDescriptions, h, 7),
    lead: pick(leads, h),
    sizeWord: size,
    localContext: pick(contexts, h, 3),
    whyLocal: pick(whyLocals, h, 5),
    typicalBusinesses,
    faq,
    nearby,
    biggerNearby,
  };
}
