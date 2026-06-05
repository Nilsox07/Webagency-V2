"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { m } from "framer-motion";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";
import type { Crumb } from "@/components/Breadcrumbs";
import { PageHeroFallback } from "@/components/three/Fallbacks";
import { useIsDesktop } from "@/components/three/useIsDesktop";
import { useMountOnInteraction } from "@/components/three/useDeferredMount";

const PageHero3D = dynamic(() => import("@/components/three/PageHero3D"), {
  ssr: false,
  loading: () => null,
});

/**
 * Wiederverwendbarer, dezent animierter Unterseiten-Header.
 * Inhalt (H1/Intro/Breadcrumb + JSON-LD) ist serverseitig im HTML – die
 * WebGL-Szene ist reines Progressive Enhancement (lazy, Desktop-only,
 * reduced-motion-fest).
 */
export function PageHero({
  title,
  intro,
  eyebrow,
  breadcrumbs = [],
  accent = "#3563f6",
  children,
}: {
  title: string;
  intro?: string;
  eyebrow?: string;
  breadcrumbs?: Crumb[];
  accent?: string;
  children?: React.ReactNode;
}) {
  const desktop = useIsDesktop();
  const interacted = useMountOnInteraction(desktop);
  const show3D = desktop && interacted;
  const full: Crumb[] = [{ name: "Start", path: "/" }, ...breadcrumbs];

  return (
    <section className="relative overflow-hidden bg-slate-950" aria-label={title}>
      {/* Tiefen-Verläufe */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_40%,#1f43eb33,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_90%,#7c4dff22,transparent_55%)]" />

      {/* Animation: Desktop + nach idle = WebGL, sonst leichter CSS-Fallback */}
      {show3D ? <PageHero3D accent={accent} /> : <PageHeroFallback accent={accent} />}

      {/* sanfter Abschluss nach unten */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 to-transparent" />

      <div className="container-content relative z-10 py-14 sm:py-20">
        {/* Breadcrumb (mit JSON-LD) */}
        {breadcrumbs.length > 0 && (
          <nav aria-label="Brotkrümelnavigation" className="mb-6">
            <JsonLd data={breadcrumbSchema(full)} />
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-400">
              {full.map((c, i) => (
                <li key={c.path} className="flex items-center gap-1.5">
                  {i < full.length - 1 ? (
                    <>
                      <Link href={c.path} className="hover:text-white">
                        {c.name}
                      </Link>
                      <span aria-hidden="true">/</span>
                    </>
                  ) : (
                    <span className="font-medium text-slate-200" aria-current="page">
                      {c.name}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="max-w-3xl">
          {eyebrow && (
            <m.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-3 text-sm font-semibold uppercase tracking-wider text-lumi-300"
            >
              {eyebrow}
            </m.p>
          )}
          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            {title}
          </m.h1>
          {intro && (
            <m.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-5 text-lg text-slate-300"
            >
              {intro}
            </m.p>
          )}
          {children && (
            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-8"
            >
              {children}
            </m.div>
          )}
        </div>
      </div>
    </section>
  );
}
