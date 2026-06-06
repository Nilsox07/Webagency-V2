"use client";

import { useEffect, useState } from "react";

/**
 * DSGVO-konformer Cookie-Consent.
 *
 * - Speichert die Wahl in localStorage (Kategorien). Standard: nur technisch
 *   notwendige Cookies; nicht notwendige (z. B. Analyse) sind opt-in.
 * - „Alle akzeptieren" und „Nur notwendige" sind gleichwertig (Reject so einfach
 *   wie Accept – Art. 7 DSGVO).
 * - Über das Event `cookie:open` (z. B. Footer-Link) jederzeit erneut aufrufbar.
 * - Bei Zustimmung wird ein `cookie:consent`-Event mit den Kategorien gefeuert,
 *   an das später echte Dienste (Analytics, Maps …) gekoppelt werden können.
 *
 * TODO (Produktion): tatsächlich eingesetzte nicht-notwendige Dienste hier als
 * Kategorien ergänzen und nur nach Zustimmung laden.
 */

const STORAGE_KEY = "sartu-consent-v1";

export interface ConsentState {
  necessary: true;
  analytics: boolean;
  ts: number;
}

export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ConsentState) : null;
  } catch {
    return null;
  }
}

function storeConsent(analytics: boolean) {
  const state: ConsentState = { necessary: true, analytics, ts: Date.now() };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent("cookie:consent", { detail: state }));
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    // Erst nach Mount entscheiden (kein SSR-Mismatch)
    if (!getConsent()) setOpen(true);

    const reopen = () => {
      const current = getConsent();
      setAnalytics(current?.analytics ?? false);
      setShowSettings(true);
      setOpen(true);
    };
    window.addEventListener("cookie:open", reopen);
    return () => window.removeEventListener("cookie:open", reopen);
  }, []);

  function finish(analyticsChoice: boolean) {
    storeConsent(analyticsChoice);
    setOpen(false);
    setShowSettings(false);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie-Einstellungen"
      className="fixed bottom-24 left-4 right-4 z-[60] animate-fade-in-up rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-md"
    >
      <h2 className="text-base font-bold text-slate-900">Cookies & Datenschutz</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        Wir verwenden technisch notwendige Cookies, damit die Website funktioniert. Optionale
        Cookies (z. B. zur Reichweitenmessung) setzen wir nur mit deiner Einwilligung. Mehr dazu in
        der{" "}
        <a href="/datenschutz" className="font-medium text-brand-700 underline hover:text-brand-900">
          Datenschutzerklärung
        </a>
        .
      </p>

      {showSettings && (
        <div className="mt-4 space-y-3 rounded-xl bg-slate-50 p-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">Notwendig</p>
              <p className="text-xs text-slate-500">Für den Betrieb der Website erforderlich.</p>
            </div>
            <span className="mt-1 text-xs font-medium text-slate-400">Immer aktiv</span>
          </div>
          <label className="flex items-start justify-between gap-3">
            <span>
              <span className="block text-sm font-semibold text-slate-900">Analyse (optional)</span>
              <span className="block text-xs text-slate-500">
                Hilft uns zu verstehen, wie die Website genutzt wird.
              </span>
            </span>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="mt-1 h-5 w-5 shrink-0 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
          </label>
        </div>
      )}

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          onClick={() => finish(true)}
          className="order-1 flex-1 rounded-xl bg-lumi-600 px-4 py-2.5 text-sm font-semibold text-brand-900 transition hover:bg-lumi-700"
        >
          Alle akzeptieren
        </button>
        <button
          onClick={() => finish(showSettings ? analytics : false)}
          className="order-2 flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          {showSettings ? "Auswahl speichern" : "Nur notwendige"}
        </button>
      </div>

      {!showSettings && (
        <button
          onClick={() => setShowSettings(true)}
          className="mt-3 w-full text-center text-xs font-medium text-brand-700 underline hover:text-brand-900"
        >
          Einstellungen anpassen
        </button>
      )}
    </div>
  );
}
