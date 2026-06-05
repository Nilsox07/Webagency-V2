"use client";

/** Öffnet den Cookie-Consent erneut (für den Footer). */
export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("cookie:open"))}
      className={className}
    >
      Cookie-Einstellungen
    </button>
  );
}
