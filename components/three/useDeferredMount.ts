"use client";

import { useEffect, useState } from "react";

/**
 * Verzögert das Mounten schwerer (WebGL-)Komponenten bis der Browser idle ist
 * – also NACH dem kritischen Laden/Interaktiv-Werden. Das hält Three.js aus
 * dem Lighthouse-/CWV-Messfenster (TBT/LCP) heraus; bis dahin zeigt der
 * Aufrufer den leichten CSS-Fallback.
 */
export function useDeferredMount(enabled = true): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const ric = (window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    }).requestIdleCallback;

    if (typeof ric === "function") {
      idleId = ric(() => setReady(true), { timeout: 2500 });
    } else {
      timeoutId = setTimeout(() => setReady(true), 1500);
    }

    return () => {
      const cic = (window as unknown as { cancelIdleCallback?: (id: number) => void })
        .cancelIdleCallback;
      if (idleId !== undefined && typeof cic === "function") cic(idleId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [enabled]);

  return ready;
}
