import { Button } from "./ui";
import { Icon } from "./Icon";

export function CtaBanner({
  title = "Bereit für deine neue Website?",
  text = "Beschreibe dein Projekt in wenigen Minuten mit Lumi – oder wähle direkt dein Paket. Festpreis, fester Termin, kein Angebotschaos.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <div className="container-content">
      <div className="overflow-hidden rounded-3xl bg-brand-700 px-6 py-12 text-center sm:px-12 sm:py-16">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-brand-100">{text}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/briefing"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-lumi-500 px-7 py-3.5 font-semibold text-brand-900 transition hover:bg-lumi-600"
          >
            <Icon name="chat" className="h-5 w-5" />
            Briefing mit Lumi starten
          </a>
          <Button href="/preise" variant="secondary" size="lg">
            Pakete & Preise ansehen
          </Button>
        </div>
        <p className="mt-4 text-xs text-brand-200">
          Festpreis-Garantie · Unverbindlich · Antwort in 1 Werktag
        </p>
      </div>
    </div>
  );
}
