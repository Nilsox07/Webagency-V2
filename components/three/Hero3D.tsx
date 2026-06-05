"use client";

import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { Suspense, useEffect, useRef, useState } from "react";
import { FloatingScreens } from "./FloatingScreens";
import { HeroFallback } from "./Fallbacks";

/** Die WebGL-Hero-Szene (dynamisch, nur Client). */
export default function Hero3D() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  // Render-Loop nur laufen lassen, solange der Hero sichtbar ist
  // (außerhalb des Viewports → frameloop "never" → Main-Thread frei, niedrige TBT).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (reduce) return <HeroFallback />;

  return (
    <div ref={ref} className="absolute inset-0" aria-hidden="true">
      <Canvas
        frameloop={inView ? "always" : "never"}
        camera={{ position: [0, 0, 6], fov: 42 }}
        dpr={[1, 1.25]}
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
