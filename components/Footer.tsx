import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { services } from "@/lib/services";
import { Icon } from "./Icon";

const legalLinks = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "AGB", href: "/agb" },
  { label: "Barrierefreiheit", href: "/barrierefreiheit" },
];

const companyLinks = [
  { label: "Pakete & Preise", href: "/preise" },
  { label: "Ablauf", href: "/ablauf" },
  { label: "Referenzen", href: "/portfolio" },
  { label: "Über mich", href: "/ueber-mich" },
  { label: "FAQ", href: "/faq" },
  { label: "Kontakt", href: "/kontakt" },
];

export function Footer() {
  const c = siteConfig.contact;
  return (
    <footer className="border-t border-slate-200 bg-slate-50" aria-label="Fußbereich">
      <div className="container-content py-14">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Marke + NAP */}
          <div>
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-white">
                <Icon name="layout" className="h-5 w-5" />
              </span>
              <span className="text-lg">{siteConfig.name}</span>
            </div>
            <p className="prose-text mt-4 text-sm">{siteConfig.tagline}</p>
            <address className="mt-4 space-y-1 text-sm not-italic text-slate-600">
              <p>{siteConfig.legalName}</p>
              <p>{c.street}</p>
              <p>
                {c.zip} {c.city}
              </p>
              <p className="pt-2">
                <a href={`mailto:${c.email}`} className="hover:text-brand-700">
                  {c.email}
                </a>
              </p>
              <p>
                <a href={`tel:${c.phone}`} className="hover:text-brand-700">
                  {c.phoneDisplay}
                </a>
              </p>
            </address>
          </div>

          {/* Leistungen */}
          <nav aria-label="Leistungen">
            <h2 className="text-sm font-semibold text-slate-900">Leistungen</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/leistungen/${s.slug}`} className="text-slate-600 hover:text-brand-700">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Agentur */}
          <nav aria-label="Agentur">
            <h2 className="text-sm font-semibold text-slate-900">Agentur</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-600 hover:text-brand-700">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Rechtliches + CTA */}
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Rechtliches</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-600 hover:text-brand-700">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/briefing"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-lumi-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-lumi-700"
            >
              <Icon name="chat" className="h-4 w-4" />
              Briefing mit Lumi
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. Alle Preise netto zzgl. MwSt.
          </p>
          <p>{c.responseTime}</p>
        </div>
      </div>
    </footer>
  );
}
