import { Icon } from "./Icon";

const signals = [
  { icon: "euro", title: "Festpreis-Garantie", text: "Kein Cent mehr als im Paket vereinbart." },
  { icon: "clock", title: "Fester Liefertermin", text: "Verbindliches Datum statt „irgendwann“." },
  { icon: "shieldCheck", title: "DSGVO & Server in DE", text: "Datenschutzkonform gehostet." },
  { icon: "sparkles", title: "Persönlich + KI", text: "Schnell durch KI, betreut von einem Menschen." },
];

export function TrustBar() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {signals.map((s) => (
        <div key={s.title} className="flex items-start gap-3 rounded-xl bg-white/60 p-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
            <Icon name={s.icon} className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900">{s.title}</p>
            <p className="text-xs text-slate-500">{s.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
