/**
 * Erzeugt den Datensatz deutscher Städte (>= 5.000 Einwohner) für die
 * programmatischen Stadt-Landingpages.
 *
 * Aufruf:  node scripts/build-cities.mjs
 * Ausgabe: lib/data/cities.de.json  +  lib/data/cities.de.meta.json
 *
 * Datenquelle: npm-Paket "all-the-cities" (basiert auf GeoNames cities1000,
 * CC-BY 4.0). Attribution im Footer erforderlich.
 */

import cities5000 from "all-the-cities";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "lib", "data");

// GeoNames admin1-Codes für Deutschland -> Bundesland + Kurzform (für Slug-Dedupe)
const BUNDESLAENDER = {
  "01": ["Baden-Württemberg", "bw"],
  "02": ["Bayern", "by"],
  "03": ["Bremen", "hb"],
  "04": ["Hamburg", "hh"],
  "05": ["Hessen", "he"],
  "06": ["Niedersachsen", "ni"],
  "07": ["Nordrhein-Westfalen", "nrw"],
  "08": ["Rheinland-Pfalz", "rlp"],
  "09": ["Saarland", "sl"],
  "10": ["Schleswig-Holstein", "sh"],
  "11": ["Brandenburg", "bb"],
  "12": ["Mecklenburg-Vorpommern", "mv"],
  "13": ["Sachsen", "sn"],
  "14": ["Sachsen-Anhalt", "st"],
  "15": ["Thüringen", "th"],
  "16": ["Berlin", "be"],
};

// Feature-Codes, die KEINE eigenständige Stadt sind (Stadtteile, historisch …)
const EXCLUDE_FEATURE = new Set(["PPLX", "PPLH", "PPLQ", "PPLW", "PPLCH"]);

// Englische Exonyme aus GeoNames -> deutscher Name
const CORRECTIONS = {
  Munich: "München",
  Cologne: "Köln",
  Nuremberg: "Nürnberg",
  Hanover: "Hannover",
  Brunswick: "Braunschweig",
};

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function haversine(aLat, aLng, bLat, bLng) {
  const R = 6371;
  const dLat = ((bLat - aLat) * Math.PI) / 180;
  const dLng = ((bLng - aLng) * Math.PI) / 180;
  const la1 = (aLat * Math.PI) / 180;
  const la2 = (bLat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(h)));
}

function main() {
  let cities = [];
  for (const c of cities5000) {
    if (c.country !== "DE") continue;
    if ((c.population || 0) < 5000) continue;
    if (EXCLUDE_FEATURE.has(c.featureCode)) continue;
    const bl = BUNDESLAENDER[c.adminCode];
    if (!bl) continue;
    const [lng, lat] = c.loc.coordinates;
    const name = CORRECTIONS[c.name] || c.name;
    cities.push({
      name,
      population: c.population,
      lat: Math.round(lat * 10000) / 10000,
      lng: Math.round(lng * 10000) / 10000,
      bundesland: bl[0],
      blSlug: bl[1],
      baseSlug: slugify(name),
    });
  }

  // Größte zuerst (Dedupe-Priorität & Hub-Listen)
  cities.sort((a, b) => b.population - a.population);

  // Slug-Deduplizierung
  const used = new Map();
  for (const city of cities) {
    let slug = city.baseSlug || `ort-${used.size}`;
    if (used.has(slug)) {
      slug = `${city.baseSlug}-${city.blSlug}`;
      let n = 2;
      while (used.has(slug)) slug = `${city.baseSlug}-${city.blSlug}-${n++}`;
    }
    if (slug === "region") slug = `${city.baseSlug}-stadt`; // Kollision mit /webdesign/region vermeiden
    used.set(slug, true);
    city.slug = slug;
    delete city.baseSlug;
    delete city.blSlug;
  }

  // Nachbarorte (6 nächste) vorberechnen
  for (const a of cities) {
    const dist = [];
    for (const b of cities) {
      if (a === b) continue;
      dist.push([haversine(a.lat, a.lng, b.lat, b.lng), b.slug]);
    }
    dist.sort((x, y) => x[0] - y[0]);
    a.nearby = dist.slice(0, 6).map(([km, slug]) => ({ slug, km }));
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, "cities.de.json"), JSON.stringify(cities));

  const byBl = {};
  for (const c of cities) byBl[c.bundesland] = (byBl[c.bundesland] || 0) + 1;
  fs.writeFileSync(
    path.join(OUT_DIR, "cities.de.meta.json"),
    JSON.stringify({ total: cities.length, byBundesland: byBl, generatedAt: new Date().toISOString() }, null, 2)
  );

  console.log(`✓ ${cities.length} Städte geschrieben.`);
  console.log("Beispiele:", cities.slice(0, 3).map((c) => `${c.name} (${c.slug}, ${c.population})`).join(" · "));
  console.log("Bundesländer:", Object.entries(byBl).map(([k, v]) => `${k}: ${v}`).join(", "));
}

main();

