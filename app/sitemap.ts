import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { services } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticPaths = [
    { path: "/", priority: 1.0, freq: "weekly" as const },
    { path: "/leistungen", priority: 0.9, freq: "monthly" as const },
    { path: "/preise", priority: 0.95, freq: "monthly" as const },
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

  const servicePaths = services.map((s) => ({
    path: `/leistungen/${s.slug}`,
    priority: 0.8,
    freq: "monthly" as const,
  }));

  return [...staticPaths, ...servicePaths].map((p) => ({
    url: `${base}${p.path}`,
    lastModified: now,
    changeFrequency: p.freq,
    priority: p.priority,
  }));
}
