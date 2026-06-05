import { siteConfig, sameAsLinks } from "@/lib/config";
import type { FaqItem } from "@/lib/faq";

/** Rendert ein JSON-LD-Script. Markup MUSS dem sichtbaren Inhalt entsprechen. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** ProfessionalService / Organization (site-weit). */
export function organizationSchema() {
  const c = siteConfig.contact;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    email: c.email,
    telephone: c.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: c.street,
      postalCode: c.zip,
      addressLocality: c.city,
      addressRegion: c.region,
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: c.lat,
      longitude: c.lng,
    },
    priceRange: "990 € – 9.990 €",
    areaServed: siteConfig.areaServed.map((a) => ({ "@type": "City", name: a })),
    founder: { "@type": "Person", name: siteConfig.owner.name },
    knowsAbout: ["Webdesign", "SEO", "Lokales SEO", "Generative Engine Optimization", "Hosting"],
  };
  const sameAs = sameAsLinks();
  if (sameAs.length) data.sameAs = sameAs;
  if (siteConfig.ratings.enabled && siteConfig.ratings.count > 0) {
    data.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: siteConfig.ratings.value,
      reviewCount: siteConfig.ratings.count,
    };
  }
  return data;
}

/** WebSite-Schema. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: "de-DE",
  };
}

/** FAQPage-Schema aus FAQ-Items. */
export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** BreadcrumbList-Schema. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

/** Article/BlogPosting-Schema (Ratgeber). */
export function articleSchema(opts: {
  headline: string;
  description: string;
  path: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    inLanguage: "de-DE",
    datePublished: opts.dateModified,
    dateModified: opts.dateModified,
    author: { "@type": "Person", name: siteConfig.owner.name },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    mainEntityOfPage: `${siteConfig.url}${opts.path}`,
  };
}

/** DefinedTerm-Schema (Glossar). */
export function definedTermSchema(opts: { term: string; definition: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: opts.term,
    description: opts.definition,
    inDefinedTermSet: `${siteConfig.url}/glossar`,
    url: `${siteConfig.url}${opts.path}`,
  };
}

/** Service-Schema mit lokalem areaServed (Stadt-/Branchenseiten). */
export function localServiceSchema(opts: {
  name: string;
  description: string;
  path: string;
  areaServed: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    serviceType: "Webdesign",
    description: opts.description,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: { "@type": "City", name: opts.areaServed },
    url: `${siteConfig.url}${opts.path}`,
  };
}
