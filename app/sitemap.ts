import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { services } from "@/lib/services";
import { allCities, bundeslandSlugs } from "@/lib/cities";
import { branchen } from "@/lib/branchen";
import { articles } from "@/lib/ratgeber";
import { glossar } from "@/lib/glossar";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticPaths = [
    { path: "/", priority: 1.0, freq: "weekly" as const },
    { path: "/leistungen", priority: 0.9, freq: "monthly" as const },
    { path: "/preise", priority: 0.95, freq: "monthly" as const },
    { path: "/webdesign", priority: 0.9, freq: "weekly" as const },
    { path: "/ratgeber", priority: 0.7, freq: "weekly" as const },
    { path: "/glossar", priority: 0.6, freq: "monthly" as const },
    { path: "/briefing", priority: 0.9, freq: "monthly" as const },
    { path: "/portfolio", priority: 0.7, freq: "monthly" as const },
    { path: "/ablauf", priority: 0.7, freq: "monthly" as const },
    { path: "/ueber-mich", priority: 0.7, freq: "monthly" as const },
    { path: "/kontakt", priority: 0.7, freq: "yearly" as const },
    { path: "/faq", priority: 0.6, freq: "monthly" as const },
    { path: "/impressum", priority: 0.2, freq: "yearly" as const },
    { path: "/datenschutz", priority: 0.2, freq: "yearly" as const },
    { path: "/agb", priority: 0.2, freq: "yearly" as const },
    { path: "/barrierefreiheit", priority: 0.2, freq: "yearly" as const },
  ];

  const dynamicPaths = [
    ...services.map((s) => ({ path: `/leistungen/${s.slug}`, priority: 0.8, freq: "monthly" as const })),
    ...bundeslandSlugs().map((b) => ({ path: `/webdesign/region/${b}`, priority: 0.6, freq: "monthly" as const })),
    ...allCities().map((c) => ({ path: `/webdesign/${c.slug}`, priority: 0.6, freq: "monthly" as const })),
    ...branchen.map((b) => ({ path: `/branchen/${b.slug}`, priority: 0.75, freq: "monthly" as const })),
    ...articles.map((a) => ({ path: `/ratgeber/${a.slug}`, priority: 0.65, freq: "monthly" as const })),
    ...glossar.map((t) => ({ path: `/glossar/${t.slug}`, priority: 0.5, freq: "yearly" as const })),
  ];

  return [...staticPaths, ...dynamicPaths].map((p) => ({
    url: `${base}${p.path}`,
    lastModified: now,
    changeFrequency: p.freq,
    priority: p.priority,
  }));
}
