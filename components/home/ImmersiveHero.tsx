"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { m, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/Icon";
import { HeroFallback } from "@/components/three/Fallbacks";
import { useIsDesktop } from "@/components/three/useIsDesktop";
import { useDeferredMount } from "@/components/three/useDeferredMount";

// WebGL nur im Browser laden (kein SSR), mit CSS-Fallback währenddessen.
const Hero3D = dynamic(() => import("@/components/three/Hero3D"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

export function ImmersiveHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const desktop = useIsDesktop();
  const deferred = useDeferredMount(desktop);
  const show3D = desktop && deferred;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Inhalt beim Wegscrollen sanft anheben & ausblenden (deaktiviert bei reduce)
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, reduce ? 1 : 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-slate-950"
      aria-label="Einleitung"
    >
      {/* Tiefen-Hintergrund */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,#1a2caf33,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,#7c4dff22,transparent_55%)]" />

      {/* 3D-Szene: Desktop + nach idle gemountet; sonst leichter CSS-Fallback */}
      {show3D ? <Hero3D /> : <HeroFallback />}

      {/* sanfter Abschluss nach unten */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />

      {/* Text-Overlay */}
      <m.div style={{ y, opacity }} className="container-content relative z-10">
        <div className="max-w-3xl">
          <m.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-brand-100 backdrop-blur"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-lumi-400" />
            Webdesign zum Festpreis · mit KI-Assistentin Lumi
          </m.span>

          <m.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Websites, die{" "}
            <span className="bg-gradient-to-r from-brand-300 via-lumi-300 to-brand-200 bg-clip-text text-transparent">
              umhauen
            </span>
            . Zum Festpreis.
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 max-w-xl text-lg text-slate-300 sm:text-xl"
          >
            Professionelle Websites für lokale Unternehmen – ab 990 €, mit festem
            Termin und ohne Angebotschaos. Dein Projekt beschreibst du in Minuten
            im Chat mit Lumi.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/briefing"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-lumi-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-lumi-600/30 transition hover:bg-lumi-500"
            >
              <Icon name="chat" className="h-5 w-5" />
              Briefing mit Lumi starten
              <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/preise"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              Pakete & Preise
            </Link>
          </m.div>

          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400"
          >
            <span className="inline-flex items-center gap-1.5">
              <Icon name="check" className="h-4 w-4 text-emerald-400" /> Festpreis-Garantie
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="check" className="h-4 w-4 text-emerald-400" /> Fester Liefertermin
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="check" className="h-4 w-4 text-emerald-400" /> DSGVO-konform
            </span>
          </m.p>
        </div>
      </m.div>

      {/* Scroll-Indikator */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 p-1.5">
          <m.span
            className="h-2 w-1 rounded-full bg-white/70"
            animate={reduce ? {} : { y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          />
        </div>
      </m.div>
    </section>
  );
}
