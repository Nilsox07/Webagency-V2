"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { LumiChat } from "./LumiChat";

/** Persistenter Beratungs-/Briefing-Button unten rechts (Industrie-Standard). */
export function LumiWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Panel */}
      {open && (
        <div
          className="fixed bottom-24 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm animate-fade-in-up flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl sm:right-6"
          role="dialog"
          aria-label="Briefing mit Lumi"
        >
          <div className="flex items-center justify-between rounded-t-2xl bg-lumi-600 px-4 py-3 text-brand-900">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20 font-bold">
                L
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold">Lumi</p>
                <p className="text-[11px] text-brand-800">KI-Briefing-Assistentin</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Chat schließen"
              className="grid h-8 w-8 place-items-center rounded-lg hover:bg-white/20"
            >
              <Icon name="x" className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 px-4 py-3">
            <LumiChat compact />
          </div>
          <div className="border-t border-slate-100 px-4 py-2 text-center">
            <Link
              href="/briefing"
              className="text-xs font-medium text-brand-700 hover:underline"
              onClick={() => setOpen(false)}
            >
              Lieber im Vollbild briefen? →
            </Link>
          </div>
        </div>
      )}

      {/* Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-4 z-50 flex items-center gap-2 rounded-full bg-lumi-600 px-4 py-3.5 font-semibold text-brand-900 shadow-lg shadow-lumi-600/30 transition hover:bg-lumi-700 sm:right-6"
        aria-expanded={open}
        aria-label={open ? "Lumi-Chat schließen" : "Briefing mit Lumi starten"}
      >
        <Icon name={open ? "x" : "chat"} className="h-5 w-5" />
        {!open && <span className="hidden text-sm sm:inline">Briefing starten</span>}
      </button>
    </>
  );
}
