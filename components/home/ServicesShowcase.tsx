"use client";

import Link from "next/link";
import { useRef } from "react";
import { m, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/Icon";
import { services } from "@/lib/services";
import { Reveal } from "@/components/motion/Reveal";

function TiltCard({ service }: { service: (typeof services)[number] }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 150, damping: 15 });

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <m.a
      ref={ref}
      href={`/leistungen/${service.slug}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-lumi-400/40"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-lumi-500/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-0" />
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-500/30 to-lumi-500/30 text-brand-200">
        <Icon name={service.icon} className="h-6 w-6" />
      </span>
      <h3 className="mt-5 text-xl font-semibold text-white">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{service.teaser}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-lumi-300">
        Mehr erfahren
        <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </m.a>
  );
}

export function ServicesShowcase() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24" aria-label="Leistungen">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,#E553401a,transparent_55%)]" />
      <div className="container-content relative">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-lumi-300">Leistungen</p>
          <h2 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            Alles für deine Sichtbarkeit – an einem Ort
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Von der Website bis zur KI-Suche: jede Leistung mit eigener Spezialisierung,
            gebündelt in transparenten Festpreis-Paketen.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1200 }}>
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06} className="h-full">
              <TiltCard service={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
