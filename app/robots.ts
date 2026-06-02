import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

/**
 * robots.txt – erlaubt bewusst die KI-Such-/Retrieval-Crawler (für Sichtbarkeit
 * in ChatGPT, Perplexity, Google AI Overviews & Claude). Nicht öffentliche Pfade
 * (/api) werden ausgeschlossen.
 */
export default function robots(): MetadataRoute.Robots {
  const aiSearchBots = [
    "OAI-SearchBot", // ChatGPT-Suche (für Zitate nötig)
    "ChatGPT-User",
    "GPTBot", // OpenAI Training (bewusst erlaubt für Markenvertrautheit)
    "PerplexityBot",
    "Perplexity-User",
    "ClaudeBot",
    "Claude-SearchBot",
    "Claude-User",
    "Google-Extended", // Gemini – blockieren würde Google-Ranking nicht beeinflussen
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      ...aiSearchBots.map((bot) => ({
        userAgent: bot,
        allow: "/",
        disallow: ["/api/"],
      })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
