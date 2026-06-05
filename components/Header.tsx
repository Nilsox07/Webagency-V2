"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/config";
import { services } from "@/lib/services";
import { Icon } from "./Icon";

const mainNav = [
  { label: "Leistungen", href: "/leistungen", hasMenu: true },
  { label: "Pakete & Preise", href: "/preise" },
  { label: "Referenzen", href: "/portfolio" },
  { label: "Ablauf", href: "/ablauf" },
  { label: "Über mich", href: "/ueber-mich" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-900/90 backdrop-blur">
      <nav className="container-content flex h-16 items-center justify-between gap-4" aria-label="Hauptnavigation">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-white">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-lumi-600 text-brand-900">
            <Icon name="layout" className="h-5 w-5" />
          </span>
          <span className="text-lg">{siteConfig.name}</span>
        </Link>

        {/* Desktop-Navigation */}
        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) =>
            item.hasMenu ? (
              <li
                key={item.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-white"
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                >
                  {item.label}
                </Link>
                {servicesOpen && (
                  <div className="absolute left-0 top-full w-72 pt-2">
                    <ul className="rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
                      {services.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/leistungen/${s.slug}`}
                            className="flex items-start gap-3 rounded-xl p-3 hover:bg-slate-50"
                          >
                            <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
                              <Icon name={s.icon} className="h-4 w-4" />
                            </span>
                            <span>
                              <span className="block text-sm font-semibold text-slate-900">
                                {s.title}
                              </span>
                              <span className="block text-xs text-slate-500">{s.teaser}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* CTA + Mobile-Toggle */}
        <div className="flex items-center gap-2">
          <Link
            href="/briefing"
            className="hidden rounded-xl bg-lumi-600 px-4 py-2 text-sm font-semibold text-brand-900 transition hover:bg-lumi-700 sm:inline-flex"
          >
            Briefing starten
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg text-slate-200 hover:bg-white/10 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
          >
            <Icon name={mobileOpen ? "x" : "menu"} className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile-Navigation */}
      {mobileOpen && (
        <div id="mobile-menu" className="border-t border-white/10 bg-brand-900 lg:hidden">
          <ul className="container-content flex flex-col gap-1 py-4">
            <li>
              <Link
                href="/leistungen"
                className="block rounded-lg px-3 py-2 font-medium text-slate-100 hover:bg-white/10"
                onClick={() => setMobileOpen(false)}
              >
                Leistungen (Übersicht)
              </Link>
            </li>
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/leistungen/${s.slug}`}
                  className="block rounded-lg px-6 py-2 text-sm text-slate-300 hover:bg-white/10"
                  onClick={() => setMobileOpen(false)}
                >
                  {s.title}
                </Link>
              </li>
            ))}
            {mainNav
              .filter((i) => !i.hasMenu)
              .map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-lg px-3 py-2 font-medium text-slate-100 hover:bg-white/10"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            <li className="mt-2">
              <Link
                href="/briefing"
                className="block rounded-xl bg-lumi-600 px-4 py-3 text-center font-semibold text-brand-900"
                onClick={() => setMobileOpen(false)}
              >
                Briefing mit Lumi starten
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
