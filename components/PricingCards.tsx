import { packages, formatEuro } from "@/lib/packages";
import { Icon } from "./Icon";
import { Badge } from "./ui";

/**
 * Die vier Festpreis-Karten. "Pro" ist visuell als Empfehlung hervorgehoben
 * (klare Hierarchie → Conversion). CTA pro Karte führt direkt zu Lumi.
 */
export function PricingCards({ compact = false }: { compact?: boolean }) {
  return (
    <div className="grid gap-5 lg:grid-cols-4">
      {packages.map((p) => (
        <div
          key={p.id}
          className={`relative flex flex-col rounded-2xl border bg-white p-6 transition ${
            p.recommended
              ? "border-lumi-300 shadow-lg ring-1 ring-lumi-200"
              : "border-slate-200 shadow-sm hover:shadow-md"
          }`}
        >
          {p.recommended && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge tone="lumi">★ Beliebt</Badge>
            </div>
          )}
          <h3 className="text-lg font-bold text-slate-900">{p.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{p.tagline}</p>

          <div className="mt-4">
            <span className="text-3xl font-bold text-slate-900">
              {p.priceFrom ? "ab " : ""}
              {formatEuro(p.price)}
            </span>
            <span className="text-sm text-slate-500"> netto</span>
            <p className="mt-1 text-xs text-slate-500">
              + {p.maintenanceFrom ? "ab " : ""}
              {formatEuro(p.maintenance)}/Monat Wartung
            </p>
          </div>

          {!compact && (
            <ul className="mt-5 flex-1 space-y-2.5 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-slate-600">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          )}

          <a
            href={`/briefing?paket=${p.id}`}
            className={`mt-6 inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              p.recommended
                ? "bg-lumi-600 text-white hover:bg-lumi-700"
                : "bg-brand-50 text-brand-700 hover:bg-brand-100"
            }`}
          >
            {p.id === "enterprise" ? "Anfragen" : `Mit ${p.name} starten`}
            <Icon name="arrowRight" className="h-4 w-4" />
          </a>
          <p className="mt-2 text-center text-[11px] text-slate-400">{p.bestFor}</p>
        </div>
      ))}
    </div>
  );
}
