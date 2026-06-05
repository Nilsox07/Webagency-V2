"use client";

import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { Suspense } from "react";
import { FloatingScreens } from "./FloatingScreens";
import { HeroFallback } from "./Fallbacks";

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
