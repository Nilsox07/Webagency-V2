"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const stats: Stat[] = [
  { prefix: "ab ", value: 990, suffix: " €", label: "Festpreis – ohne versteckte Kosten" },
  { value: 4, label: "klare Pakete statt Angebotschaos" },
  { value: 5, label: "Leistungen: Web, SEO, Lokal, GEO, Wartung" },
  { value: 1, suffix: " Werktag", label: "typische Antwortzeit" },
];

function Counter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) {
      if (reduce) setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1400;
    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString("de-DE")}
      {suffix}
    </span>
  );
}

export function StatsBand() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20" aria-label="Auf einen Blick">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#1f43eb33,transparent_60%)]" />
      <div className="container-content relative">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="bg-gradient-to-r from-brand-300 to-lumi-300 bg-clip-text text-5xl font-bold text-transparent">
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-sm text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
