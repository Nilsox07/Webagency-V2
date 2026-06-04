/**
 * Zentrale Konfiguration der Website.
 *
 * ── TODO (vor Go-Live ersetzen) ────────────────────────────────────────────
 * Alle mit «TODO» markierten Werte sind Platzhalter. Trage hier deine echten
 * Firmen-, Impressums- und Kontaktdaten ein – sie werden site-weit verwendet
 * (Header, Footer, Impressum, Datenschutz, JSON-LD-Schema, NAP-Konsistenz).
 * NAP (Name, Address, Phone) MUSS überall exakt identisch sein.
 * ───────────────────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  // Marke
  name: "Klarweb", // TODO: echter Agenturname
  legalName: "Klarweb", // TODO: vollständiger Rechtsname (z. B. „Klarweb – Vorname Nachname" beim Einzelunternehmen)
  tagline: "Feste Preise. Feste Termine. Keine Überraschungen.",
  description:
    "Festpreis-Webdesign für lokale Unternehmen: professionelle Websites mit transparenten Paketpreisen ab 990 €. Briefing in Minuten – geführt von KI-Assistentin Lumi.",
  // Produktions-Domain (ohne abschließenden Slash) – für Canonical-URLs, Sitemap, Schema
  url: "https://www.klarweb.de", // TODO: echte Domain

  // Inhaber (Solo-Unternehmer – wichtig für E-E-A-T)
  owner: {
    name: "[Dein Name]", // TODO: echten Inhaber-Namen eintragen
    role: "Inhaber & Webdesigner",
    bioShort:
      "Ich baue seit über 8 Jahren Websites für lokale Unternehmen – als Ein-Personen-Agentur, unterstützt durch KI. Das macht mich schnell, persönlich und planbar.",
  },

  // NAP – Name, Adresse, Telefon (Impressumspflicht + lokales SEO)
  contact: {
    email: "hallo@klarweb.de", // TODO
    phone: "+49 30 1234567", // TODO
    phoneDisplay: "030 1234567", // TODO
    street: "Musterstraße 12", // TODO – ladungsfähige Anschrift, kein Postfach
    zip: "10115", // TODO
    city: "Berlin", // TODO
    country: "Deutschland",
    responseTime: "Antwort in der Regel innerhalb von 1 Werktag",
  },

  // Einzugsgebiet (lokales SEO / areaServed)
  areaServed: ["Berlin", "Potsdam", "Brandenburg"], // TODO

  // Rechtliches (Impressum)
  legal: {
    vatId: "DE123456789", // TODO: USt-IdNr. (oder entfernen, falls Kleinunternehmer §19 UStG)
    isSmallBusiness: true, // Kleinunternehmer §19 UStG? (steuert MwSt.-Hinweise)
    register: "", // TODO: Registergericht + Nummer, falls GmbH/UG
    supervisoryAuthority: "", // TODO: Aufsichtsbehörde, falls erlaubnispflichtig
  },

  // Social / sameAs (für JSON-LD Entitäts-Verknüpfung)
  social: {
    linkedin: "", // TODO: https://www.linkedin.com/in/...
    xing: "",
    github: "",
    instagram: "",
  },

  // Bewertungen (NUR echte Werte eintragen – keine erfundenen Sterne!)
  ratings: {
    enabled: false, // auf true setzen, sobald echte Bewertungen vorliegen
    value: 4.9,
    count: 0,
    source: "ProvenExpert & Google",
  },
} as const;

/** Alle externen sameAs-Links als Array (gefiltert) – für Schema. */
export function sameAsLinks(): string[] {
  return Object.values(siteConfig.social).filter(Boolean);
}

/** Vollständige Adresse als String (NAP). */
export function fullAddress(): string {
  const c = siteConfig.contact;
  return `${c.street}, ${c.zip} ${c.city}`;
}
