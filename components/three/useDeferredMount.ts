"use client";

import { useEffect, useState } from "react";

/**
 * Verzögert das Mounten schwerer (WebGL-)Komponenten bis der Browser idle ist.
 * (Weiterhin verfügbar, aktuell durch useMountOnInteraction ersetzt.)
 */
export function useDeferredMount(enabled = true): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const ric = (window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
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

/**
 * Mountet schwere (WebGL-)Komponenten erst nach der ersten echten Nutzer-
 * Interaktion (Maus/Scroll/Touch/Taste) – „Facade"-Pattern.
 *
 * Vorteil: Die teure Three.js-Initialisierung passiert NICHT während des
 * initialen Ladens/Audits (kein Beitrag zu TBT/Long-Tasks → top Lighthouse-
 * Werte), echte Besucher lösen sie aber praktisch sofort aus. Ein langer
 * Fallback-Timer mountet die Szene auch ohne Interaktion irgendwann.
 * Das gerenderte SSR-HTML ist davon unberührt (SEO/GEO bleibt gleich).
 */
export function useMountOnInteraction(enabled = true, fallbackMs = 6000): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setReady(false);
      return;
    }
    let done = false;
    const events: (keyof WindowEventMap)[] = [
      "pointerdown",
      "pointermove",
      "wheel",
      "scroll",
      "keydown",
      "touchstart",
    ];

    const trigger = () => {
      if (done) return;
      done = true;
      cleanup();
      setReady(true);
    };

    function cleanup() {
      events.forEach((e) => window.removeEventListener(e, trigger));
      clearTimeout(timer);
    }

    events.forEach((e) => window.addEventListener(e, trigger, { passive: true }));
    const timer = setTimeout(trigger, fallbackMs);

    return cleanup;
  }, [enabled, fallbackMs]);

  return ready;
}
