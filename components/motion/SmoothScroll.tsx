"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { LazyMotion, domAnimation, useReducedMotion } from "framer-motion";

/**
 * Globaler Smooth-Scroll (Lenis) + LazyMotion-Provider.
 * LazyMotion lädt nur das schlanke `domAnimation`-Feature-Set für die
 * `m.*`-Komponenten – das spart einen großen Teil des Framer-Motion-Bundles,
 * ohne das gerenderte HTML zu verändern (SEO/GEO unberührt).
 * Respektiert prefers-reduced-motion (dann nativer Scroll).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let raf = 0;
    function loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduce]);

  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
