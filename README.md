# Klarweb – Festpreis-Webdesign-Agentur mit KI-Briefing-Assistentin „Lumi"

Vollständige Website einer deutschen Festpreis-Webdesign-Agentur, gebaut nach dem
Konzept aus der Projekt-Recherche (Conversion-orientierter Aufbau wie ein Shop,
SEO-/GEO-optimierte Texte, WCAG-2.1-AA-Orientierung, DSGVO). Kernstück ist **Lumi**,
eine KI-Briefing-Assistentin mit hybridem Slot-Filling (feste Slots + Claude formuliert
die Fragen dynamisch).

## Tech-Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS**
- **Anthropic SDK** für Lumi (mit regelbasiertem Fallback ohne API-Key)

## Schnellstart

```bash
npm install
cp .env.example .env.local   # optional: ANTHROPIC_API_KEY eintragen
npm run dev                  # http://localhost:3000
```

Produktion:

```bash
npm run build && npm run start
```

## Lumi – KI-Briefing-Assistentin

Lumi läuft in zwei Modi (automatisch gewählt):

1. **Live-Claude** – wenn `ANTHROPIC_API_KEY` gesetzt ist. Claude formuliert die Fragen
   natürlichsprachlich, erkennt die Branche und füllt die Slots per Tool-Calling.
   Ein **deterministischer Vollständigkeits-Check** stellt sicher, dass alle Pflicht-Slots
   gefüllt sind, bevor abgeschlossen wird.
2. **Regelbasierter Fallback** – ohne API-Key. Deterministisches Slot-Filling, funktioniert
   immer. Auch bei API-Fehlern wird automatisch hierauf zurückgeschaltet.

Architektur:

| Datei | Zweck |
|---|---|
| `lib/lumi-schema.ts` | Slot-Datenmodell (Pflicht/paket-/branchenabhängig), Flow-Reihenfolge |
| `lib/lumi-prompt.ts` | System-Prompt + Tool-Definition (Guardrails) |
| `lib/lumi-fallback.ts` | Regelbasierter Flow ohne LLM |
| `lib/lumi-pricing.ts` | Transparente Live-Preisschätzung (Paket + Add-ons) |
| `app/api/lumi/route.ts` | Chat-Endpoint (LLM + Fallback) |
| `app/api/briefing/route.ts` | Annahme des fertigen Briefings |
| `components/lumi/*` | Chat-UI, persistentes Widget (unten rechts) |

Reihenfolge des Briefings (Kontaktdaten bewusst **zuletzt**, Conversion-optimiert):
Paket → Branche/Ziel → branchenspezifisch → Design → Materialien → Zusatzoptionen →
Kontakt → Zusammenfassung.

## Seitenstruktur

- `/` Startseite · `/leistungen` + 5 Leistungsseiten · `/preise` (Herzstück)
- `/portfolio` · `/ablauf` · `/ueber-mich` · `/kontakt` · `/faq`
- `/briefing` (Lumi-Vollbild-Funnel)
- Recht: `/impressum` · `/datenschutz` · `/agb` · `/barrierefreiheit`
- `sitemap.xml` & `robots.txt` (KI-Such-Crawler bewusst erlaubt)

## SEO / GEO

- JSON-LD: `ProfessionalService`, `WebSite`, `Service`, `AggregateOffer`, `FAQPage`,
  `Person`, `BreadcrumbList` (`components/JsonLd.tsx`)
- Antwort-zuerst-Leads (40–60 Wörter), frage-basierte H2, FAQ-Blöcke, belegte Statistiken
- `robots.ts` erlaubt OAI-SearchBot, PerplexityBot, ClaudeBot u. a.

## Barrierefreiheit (WCAG 2.1 AA orientiert)

Skip-Link, sichtbarer Fokus, semantisches HTML, beschriftete Formulare, `prefers-reduced-motion`,
native `<details>`-FAQ, ausreichende Kontraste.

## ⚠️ Vor dem Go-live anpassen (TODO)

Alle Platzhalter sind zentralisiert und mit `TODO` markiert:

1. **`lib/config.ts`** – Agenturname, Inhaber, NAP (Adresse/Telefon/E-Mail), Domain,
   USt-IdNr./Kleinunternehmer, Social-Links, Bewertungen.
2. **Rechtstexte** (`app/impressum`, `app/datenschutz`, `app/agb`, `app/barrierefreiheit`) –
   Vorlagen, **anwaltlich prüfen** und an die eingesetzten Dienste anpassen (inkl. AVV für
   den KI-Anbieter, Hosting, Cookie-Banner).
3. **`lib/portfolio.ts`** – Beispiel-Referenzen durch echte Projekte ersetzen (keine
   erfundenen Kundenzitate/Bewertungen).
4. **Über-mich / Hero** – echtes Foto und Mockups statt Platzhalter.
5. **E-Mail-Versand** – in `app/api/briefing/route.ts` und `app/api/contact/route.ts`
   anbinden (z. B. Resend/SMTP, `BRIEFING_RECIPIENT_EMAIL`).
6. **Cookie-Banner** ergänzen, falls nicht nur technisch notwendige Cookies genutzt werden.

> Hinweis: Preise sind netto (zzgl. MwSt.). Conversion-/GEO-Kennzahlen aus der Recherche
> sind als Richtung zu verstehen, nicht als Garantie.
