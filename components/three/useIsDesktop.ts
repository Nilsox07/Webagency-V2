"use client";

import { useEffect, useState } from "react";

/**
 * true, sobald der Viewport groß genug für eine WebGL-Szene ist.
 * Auf kleinen Screens wird 3D bewusst NICHT geladen (Mobile-Performance/CWV).
 */
export function useIsDesktop(minWidth = 768): boolean {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${minWidth}px)`);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [minWidth]);

  return isDesktop;
}
