"use client";

import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { Suspense } from "react";
import { PageHeroScene } from "./PageHeroScene";

/** CSS-Fallback für den Unterseiten-Header. */
export function PageHeroFallback({ accent = "#3563f6" }: { accent?: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute right-[12%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: `${accent}33` }}
      />
      <div className="absolute right-1/3 top-1/4 h-40 w-40 rounded-full bg-lumi-500/20 blur-3xl" />
    </div>
  );
}

/** Leichte WebGL-Szene für Unterseiten-Header (dynamisch, nur Client). */
export default function PageHero3D({ accent = "#3563f6" }: { accent?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <PageHeroFallback accent={accent} />;

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        dpr={[1, 1.6]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <PageHeroScene accent={accent} />
        </Suspense>
      </Canvas>
    </div>
  );
}
