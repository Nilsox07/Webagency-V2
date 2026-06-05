"use client";

import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { Suspense } from "react";
import { FloatingScreens } from "./FloatingScreens";

/** CSS-Fallback (kein WebGL / reduzierte Bewegung): animierte Farbverläufe. */
export function HeroFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/30 blur-3xl" />
      <div className="absolute left-1/3 top-1/3 h-72 w-72 rounded-full bg-lumi-500/30 blur-3xl" />
      <div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-brand-400/20 blur-3xl" />
    </div>
  );
}

/** Die WebGL-Hero-Szene (dynamisch, nur Client). */
export default function Hero3D() {
  const reduce = useReducedMotion();
  if (reduce) return <HeroFallback />;

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        dpr={[1, 1.8]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <FloatingScreens />
        </Suspense>
      </Canvas>
    </div>
  );
}
