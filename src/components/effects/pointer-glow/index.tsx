'use client';

import { useEffect, useRef } from 'react';
import { useTempus } from 'tempus/react';

import { FRAME_ORDER } from '@/lib/frame';
import { GLOW } from '@/lib/motion';

import styles from './PointerGlow.module.css';

/**
 * A warm bloom that follows the pointer. Two layers lerp at different rates, so
 * the halo lags behind the core and the pair reads as light with weight rather
 * than a cursor decoration.
 *
 * Pointer only: coarse pointers and reduced motion get nothing at all, and the
 * effect never starts its listener there either.
 */
export const PointerGlow = () => {
  const root = useRef<HTMLDivElement>(null);
  const halo = useRef<HTMLDivElement>(null);
  const core = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0, seen: false });
  const eased = useRef({ hx: 0, hy: 0, cx: 0, cy: 0 });

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || still.matches) return;

    const onMove = (event: PointerEvent) => {
      const t = target.current;
      if (!t.seen) {
        // Start both layers under the pointer, or they sweep in from the corner.
        t.seen = true;
        eased.current = {
          hx: event.clientX,
          hy: event.clientY,
          cx: event.clientX,
          cy: event.clientY,
        };
        if (root.current) root.current.dataset.live = 'true';
      }
      t.x = event.clientX;
      t.y = event.clientY;
    };

    const onLeave = () => {
      if (root.current) root.current.dataset.live = 'false';
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  useTempus(
    () => {
      const t = target.current;
      if (!t.seen) return;
      const e = eased.current;

      e.hx += (t.x - e.hx) * GLOW.haloLerp;
      e.hy += (t.y - e.hy) * GLOW.haloLerp;
      e.cx += (t.x - e.cx) * GLOW.coreLerp;
      e.cy += (t.y - e.cy) * GLOW.coreLerp;

      halo.current?.style.setProperty('--gx', `${e.hx.toFixed(1)}px`);
      halo.current?.style.setProperty('--gy', `${e.hy.toFixed(1)}px`);
      core.current?.style.setProperty('--gx', `${e.cx.toFixed(1)}px`);
      core.current?.style.setProperty('--gy', `${e.cy.toFixed(1)}px`);
    },
    { order: FRAME_ORDER.write, label: 'frame:pointer-glow' },
  );

  return (
    <div ref={root} aria-hidden="true" data-live="false" className={styles.glow}>
      <div ref={halo} className={`${styles.layer} ${styles.halo}`} />
      <div ref={core} className={`${styles.layer} ${styles.core}`} />
    </div>
  );
};
