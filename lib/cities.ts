/**
 * Loader für den programmatischen Städte-Datensatz (lib/data/cities.de.json,
 * generiert via scripts/build-cities.mjs aus all-the-cities / GeoNames, CC-BY 4.0).
 */

import data from "./data/cities.de.json";

export interface NearbyRef {
  slug: string;
  km: number;
}

export interface City {
  name: string;
  population: number;
  lat: number;
  lng: number;
  bundesland: string;
  slug: string;
  nearby: NearbyRef[];
}

const cities = data as unknown as City[];
const bySlug = new Map(cities.map((c) => [c.slug, c]));

export function getCity(slug: string): City | undefined {
  return bySlug.get(slug);
}

export function allCities(): City[] {
  return cities;
}

export function allCitySlugs(): string[] {
  return cities.map((c) => c.slug);
}

/** Bundesland-Name -> URL-Slug (für /webdesign/region/[bundesland]). */
export const BUNDESLAND_SLUG: Record<string, string> = {
  "Baden-Württemberg": "baden-wuerttemberg",
  Bayern: "bayern",
  Berlin: "berlin",
  Brandenburg: "brandenburg",
  Bremen: "bremen",
  Hamburg: "hamburg",
  Hessen: "hessen",
  "Mecklenburg-Vorpommern": "mecklenburg-vorpommern",
  Niedersachsen: "niedersachsen",
  "Nordrhein-Westfalen": "nordrhein-westfalen",
  "Rheinland-Pfalz": "rheinland-pfalz",
  Saarland: "saarland",
  Sachsen: "sachsen",
  "Sachsen-Anhalt": "sachsen-anhalt",
  "Schleswig-Holstein": "schleswig-holstein",
  Thüringen: "thueringen",
};

const SLUG_TO_BUNDESLAND: Record<string, string> = Object.fromEntries(
  Object.entries(BUNDESLAND_SLUG).map(([name, slug]) => [slug, name])
);

export function bundeslandFromSlug(slug: string): string | undefined {
  return SLUG_TO_BUNDESLAND[slug];
}

export function bundeslandSlugs(): string[] {
  return Object.values(BUNDESLAND_SLUG);
}

/** Alle Städte eines Bundeslands, größte zuerst. */
export function citiesByBundesland(name: string): City[] {
  return cities.filter((c) => c.bundesland === name).sort((a, b) => b.population - a.population);
}

/** Größte Städte (für den nationalen Hub). */
export function topCities(n: number): City[] {
  return [...cities].sort((a, b) => b.population - a.population).slice(0, n);
}

/** Nachbarorte als aufgelöste City-Objekte. */
export function resolveNearby(city: City): { city: City; km: number }[] {
  return city.nearby
    .map((n) => {
      const c = getCity(n.slug);
      return c ? { city: c, km: n.km } : null;
    })
    .filter((x): x is { city: City; km: number } => x !== null);
}

export function formatPopulation(n: number): string {
  return new Intl.NumberFormat("de-DE").format(n);
}
