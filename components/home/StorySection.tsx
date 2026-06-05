"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { Icon } from "@/components/Icon";

const chaosChips = [
  { text: "Wochenlang aufs Angebot warten", x: -260, y: -120, r: -12 },
  { text: "Versteckte Kosten & Nachträge", x: 240, y: -80, r: 9 },
  { text: "Termine, die ständig platzen", x: -200, y: 130, r: 7 },
  { text: "Anonyme Ansprechpartner", x: 260, y: 120, r: -8 },
];

const clarityItems = [
  { icon: "euro", text: "Transparenter Festpreis" },
  { icon: "clock", text: "Verbindlicher Termin" },
  { icon: "shieldCheck", text: "Ein persönlicher Kontakt" },
];

function ChaosChip({
  chip,
  progress,
  reduce,
}: {
  chip: (typeof chaosChips)[number];
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  // Chaos (0) → Ordnung (1): Chips driften weg und verblassen
  const x = useTransform(progress, [0, 0.5], [chip.x, reduce ? chip.x : 0]);
  const y = useTransform(progress, [0, 0.5], [chip.y, reduce ? chip.y : 0]);
  const rotate = useTransform(progress, [0, 0.5], [chip.r, 0]);
  const opacity = useTransform(progress, [0.28, 0.5], [1, 0]);
  return (
    <m.div
      style={{ x, y, rotate, opacity }}
      className="absolute rounded-2xl border border-red-400/30 bg-red-500/10 px-5 py-3 text-sm font-medium text-red-100 backdrop-blur"
    >
      <span className="mr-2 inline-block">⚠️</span>
      {chip.text}
    </m.div>
  );
}

export function StorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Hintergrund-Stimmung: chaotisches Rot → ruhiges Blau
  const bg = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#1c0f12", "#0A1626", "#07111F"]
  );

  // Problem-Headline raus, Lösungs-Headline rein
  const problemOpacity = useTransform(scrollYProgress, [0, 0.3, 0.45], [1, 1, 0]);
  const problemY = useTransform(scrollYProgress, [0, 0.45], [0, -40]);
  const solutionOpacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);
  const solutionY = useTransform(scrollYProgress, [0.5, 0.7], [40, 0]);
  const solutionScale = useTransform(scrollYProgress, [0.5, 1], [0.96, 1]);

  return (
    <section ref={ref} className="relative h-[320vh]" aria-label="Vom Angebotschaos zur Klarheit">
      <m.div
        style={{ backgroundColor: reduce ? "#07111F" : bg }}
        className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden"
      >
        {/* Glühen */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lumi-600/20 blur-3xl" />

        {/* Phase 1: Chaos */}
        <m.div
          style={{ opacity: problemOpacity, y: problemY }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-red-300">Das Problem</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-bold text-white sm:text-6xl">
            Webdesign fühlt sich oft an wie{" "}
            <span className="text-red-400">Chaos</span>.
          </h2>
          {/* Schwebende Chaos-Chips */}
          <div className="relative mt-10 hidden h-64 w-full max-w-2xl sm:block">
            {chaosChips.map((chip) => (
              <div key={chip.text} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <ChaosChip chip={chip} progress={scrollYProgress} reduce={reduce} />
              </div>
            ))}
          </div>
        </m.div>

        {/* Phase 2: Klarheit */}
        <m.div
          style={{ opacity: solutionOpacity, y: solutionY, scale: solutionScale }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-300">Die Lösung</p>
          <h2 className="mt-4 max-w-4xl text-4xl font-bold text-white sm:text-6xl">
            Feste Preise. Feste Termine.{" "}
            <span className="bg-gradient-to-r from-lumi-300 to-lumi-500 bg-clip-text text-transparent">
              Klarheit.
            </span>
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            {clarityItems.map((item) => (
              <div
                key={item.text}
                className="inline-flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-white backdrop-blur"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500/20 text-brand-200">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <span className="font-semibold">{item.text}</span>
              </div>
            ))}
          </div>
        </m.div>

        {/* Fortschrittsbalken */}
        <div className="absolute bottom-10 left-1/2 h-1 w-40 -translate-x-1/2 overflow-hidden rounded-full bg-white/10">
          <m.div
            style={{ scaleX: scrollYProgress }}
            className="h-full w-full origin-left bg-gradient-to-r from-lumi-500 to-lumi-300"
          />
        </div>
      </m.div>
    </section>
  );
}
