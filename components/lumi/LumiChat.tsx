"use client";

import { useEffect, useRef, useState } from "react";
import { packages, getPackage, formatEuro, type PackageId } from "@/lib/packages";
import type { PriceEstimate } from "@/lib/lumi-pricing";
import { Icon } from "@/components/Icon";
import { formatMessage } from "./format";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface LumiChatProps {
  /** Vorab gewähltes Paket (z. B. von der Preisseite). */
  initialPackage?: PackageId;
  /** Kompakte Höhe für das Widget. */
  compact?: boolean;
}

export function LumiChat({ initialPackage, compact = false }: LumiChatProps) {
  const [packageId, setPackageId] = useState<PackageId | null>(initialPackage ?? null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [data, setData] = useState<Record<string, unknown>>({});
  const [estimate, setEstimate] = useState<PriceEstimate | null>(null);
  const [finished, setFinished] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // Auto-Start, sobald ein Paket gewählt ist
  useEffect(() => {
    if (packageId && messages.length === 0) {
      void callLumi([], {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packageId]);

  async function callLumi(history: Message[], currentData: Record<string, unknown>) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/lumi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId, messages: history, data: currentData }),
      });
      if (!res.ok) throw new Error("Lumi ist gerade nicht erreichbar.");
      const json = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: json.message }]);
      setData(json.data ?? currentData);
      setEstimate(json.estimate ?? null);
      setFinished(Boolean(json.finished));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unbekannter Fehler.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSend(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    const newHistory: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newHistory);
    setInput("");
    await callLumi(newHistory, data);
  }

  async function handleSubmitBriefing() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/briefing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId, data }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Absenden fehlgeschlagen.");
      setSubmitted(true);
      setMessages((m) => [...m, { role: "assistant", content: json.message }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Absenden fehlgeschlagen.");
    } finally {
      setLoading(false);
    }
  }

  /* ── Paketauswahl ──────────────────────────────────────────────────────── */
  if (!packageId) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-slate-600">
          Wähle dein Paket – dann führe ich dich durch das Briefing. Unsicher? Wähle einfach „Noch
          unsicher“, ich helfe dir weiter.
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {packages.map((p) => (
            <button
              key={p.id}
              onClick={() => setPackageId(p.id)}
              className={`rounded-xl border p-3 text-left transition hover:border-lumi-400 hover:bg-lumi-50 ${
                p.recommended ? "border-lumi-300 ring-1 ring-lumi-200" : "border-slate-200"
              }`}
            >
              <span className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">{p.name}</span>
                <span className="text-sm font-semibold text-lumi-700">
                  {p.priceFrom ? "ab " : ""}
                  {formatEuro(p.price)}
                </span>
              </span>
              <span className="mt-1 block text-xs text-slate-500">{p.tagline}</span>
            </button>
          ))}
        </div>
        <button
          onClick={() => setPackageId("pro")}
          className="rounded-xl border border-dashed border-slate-300 p-3 text-sm text-slate-600 hover:bg-slate-50"
        >
          🤔 Noch unsicher? Lumi hilft dir, das passende Paket zu finden.
        </button>
      </div>
    );
  }

  const pkg = getPackage(packageId);

  /* ── Chat ──────────────────────────────────────────────────────────────── */
  return (
    <div className="flex h-full flex-col">
      {/* Kopf mit Paket + Live-Preis */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-lumi-50 px-2.5 py-1 text-xs font-semibold text-lumi-700">
          Paket {pkg.name}
        </span>
        {estimate && (
          <span className="text-xs font-medium text-slate-500">
            {estimate.isFrom ? "ab " : "≈ "}
            {formatEuro(estimate.total)}{" "}
            <span className="text-slate-400">netto, unverbindlich</span>
          </span>
        )}
      </div>

      {/* Nachrichten */}
      <div
        ref={scrollRef}
        className={`flex-1 space-y-4 overflow-y-auto py-4 ${compact ? "max-h-[50vh]" : "min-h-[320px]"}`}
        aria-live="polite"
        aria-atomic="false"
      >
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "assistant" && (
              <span className="mr-2 mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-lumi-600 text-xs font-bold text-white">
                L
              </span>
            )}
            <div
              className={`max-w-[85%] space-y-1 rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-brand-600 text-white"
                  : "bg-slate-100 text-slate-800"
              }`}
            >
              {formatMessage(m.content)}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <span className="mr-2 mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-lumi-600 text-xs font-bold text-white">
              L
            </span>
            <div className="flex items-center gap-1 rounded-2xl bg-slate-100 px-4 py-3">
              <Dot /> <Dot delay="150ms" /> <Dot delay="300ms" />
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="mb-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>
      )}

      {/* Eingabe oder Absenden */}
      {submitted ? (
        <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          ✅ Briefing gesendet. Wir melden uns per E-Mail.
        </div>
      ) : finished ? (
        <div className="space-y-2">
          <button
            onClick={handleSubmitBriefing}
            disabled={loading}
            className="w-full rounded-xl bg-lumi-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-lumi-700 disabled:opacity-60"
          >
            Briefing absenden
          </button>
          <p className="text-center text-xs text-slate-400">
            Unverbindlich – verbindlich erst mit Auftragsbestätigung.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSend} className="flex items-end gap-2">
          <label htmlFor="lumi-input" className="sr-only">
            Deine Nachricht an Lumi
          </label>
          <textarea
            id="lumi-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void handleSend();
              }
            }}
            rows={1}
            placeholder="Antwort eingeben …"
            className="max-h-32 min-h-[44px] flex-1 resize-none rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-lumi-400 focus:ring-2 focus:ring-lumi-200"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-lumi-600 text-white transition hover:bg-lumi-700 disabled:opacity-50"
            aria-label="Nachricht senden"
          >
            <Icon name="send" className="h-5 w-5" />
          </button>
        </form>
      )}
    </div>
  );
}

function Dot({ delay = "0ms" }: { delay?: string }) {
  return (
    <span
      className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
      style={{ animationDelay: delay }}
    />
  );
}
