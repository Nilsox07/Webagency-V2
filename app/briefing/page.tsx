import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { LumiChat } from "@/components/lumi/LumiChat";
import { packages, type PackageId } from "@/lib/packages";

export const metadata: Metadata = {
  title: "Briefing mit Lumi – dein Website-Projekt in Minuten",
  description:
    "Beschreibe dein Website-Projekt in wenigen Minuten im Chat mit Lumi, unserer KI-Briefing-Assistentin. Wähle dein Paket, beantworte ein paar Fragen – fertig.",
  alternates: { canonical: "/briefing" },
  robots: { index: true, follow: true },
};

const validIds = packages.map((p) => p.id);

export default function BriefingPage({
  searchParams,
}: {
  searchParams: { paket?: string };
}) {
  const initial = searchParams.paket && validIds.includes(searchParams.paket as PackageId)
    ? (searchParams.paket as PackageId)
    : undefined;

  return (
    <div className="bg-gradient-to-b from-lumi-50/60 to-white">
      <Container className="py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Info-Spalte */}
          <div className="lg:pt-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-lumi-100 px-3 py-1 text-sm font-semibold text-brand-900">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-lumi-600 text-xs font-bold text-brand-900">
                L
              </span>
              Lumi · KI-Briefing-Assistentin
            </span>
            <h1 className="mt-5 text-4xl font-bold text-slate-900">
              Dein Website-Projekt in wenigen Minuten beschrieben
            </h1>
            <p className="prose-text mt-5 text-lg">
              Kein langes Formular, kein Telefonat: Lumi führt dich Schritt für Schritt durch alle
              wichtigen Fragen – freundlich und auf deine Branche zugeschnitten. Am Ende hast du ein
              vollständiges Briefing und eine unverbindliche Preisschätzung.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                { icon: "clock", t: "In ~5 Minuten fertig", d: "Eine Frage nach der anderen – ganz entspannt." },
                { icon: "euro", t: "Transparente Schätzung", d: "Du siehst direkt, was dein Projekt etwa kostet." },
                { icon: "shieldCheck", t: "DSGVO-konform", d: "Deine Angaben nutzen wir nur für deine Anfrage." },
              ].map((item) => (
                <li key={item.t} className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white text-brand-700 shadow-sm">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">{item.t}</p>
                    <p className="text-sm text-slate-500">{item.d}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-8 rounded-xl bg-white/70 p-4 text-xs text-slate-500">
              Lumi ist eine KI-Assistentin. Deine Eingaben werden zur Bearbeitung deiner Anfrage
              verarbeitet (siehe{" "}
              <a href="/datenschutz" className="font-medium text-brand-700 hover:underline">
                Datenschutzerklärung
              </a>
              ). Die genannten Preise sind unverbindliche Schätzungen – verbindlich wird es erst mit
              der Auftragsbestätigung.
            </p>
          </div>

          {/* Chat-Spalte */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:p-6">
            <LumiChat initialPackage={initial} />
          </div>
        </div>
      </Container>
    </div>
  );
}
