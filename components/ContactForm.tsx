"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          message: fd.get("message"),
          consent: fd.get("consent") === "on",
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Fehler beim Senden.");
      setStatus("ok");
      setFeedback(json.message);
      form.reset();
    } catch (err) {
      setStatus("error");
      setFeedback(err instanceof Error ? err.message : "Fehler beim Senden.");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl bg-emerald-50 p-6 text-emerald-800" role="status">
        <p className="font-semibold">✅ {feedback}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
          E-Mail <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700">
          Deine Nachricht <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
        />
      </div>
      <div className="flex items-start gap-2">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
        />
        <label htmlFor="consent" className="text-sm text-slate-600">
          Ich bin einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage gemäß der{" "}
          <a href="/datenschutz" className="font-medium text-brand-700 hover:underline">
            Datenschutzerklärung
          </a>{" "}
          verarbeitet werden. <span className="text-red-500">*</span>
        </label>
      </div>

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {feedback}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
      >
        {status === "loading" ? "Wird gesendet …" : "Nachricht senden"}
      </button>
    </form>
  );
}
