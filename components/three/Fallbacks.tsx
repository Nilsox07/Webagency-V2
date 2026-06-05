/**
 * Leichte CSS-Fallbacks für die 3D-Header – BEWUSST ohne three.js-Importe,
 * damit der WebGL-Code ausschließlich über die dynamischen Imports von
 * Hero3D/PageHero3D geladen wird (Code-Splitting bleibt intakt, Three.js
 * landet NICHT im initialen Bundle).
 */

/** CSS-Fallback für den Startseiten-Hero. */
export function HeroFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/30 blur-3xl" />
      <div className="absolute left-1/3 top-1/3 h-72 w-72 rounded-full bg-lumi-500/30 blur-3xl" />
      <div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-brand-400/20 blur-3xl" />
    </div>
  );
}

/** CSS-Fallback für den Unterseiten-Header. */
export function PageHeroFallback({ accent = "#1A8C94" }: { accent?: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute right-[12%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: `${accent}33` }}
      />
      <div className="absolute right-1/3 top-1/4 h-40 w-40 rounded-full bg-lumi-500/20 blur-3xl" />
    </div>
  );
}
