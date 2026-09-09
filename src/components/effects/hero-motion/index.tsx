'use client';

import { useEffect, useRef } from 'react';
import { useTempus } from 'tempus/react';

import { usePrefersReducedMotion } from '@/hooks/use-preferences';
import { FRAME_ORDER } from '@/lib/frame';
import { HERO } from '@/lib/motion';

type Targets = {
  parallax: HTMLElement[];
  rows: HTMLElement[];
};

const collect = (): Targets => ({
  parallax: [...document.querySelectorAll<HTMLElement>('[data-hero] [data-parallax]')],
  rows: [...document.querySelectorAll<HTMLElement>('[data-hero] [data-marquee-shift]')],
});

/**
 * Drives the hero from the one Tempus loop: the backdrop and the cutout drift
 * against the scroll, and the marquee rows lean toward the pointer. Both write
 * transforms only, so nothing here triggers layout.
 *
 * It resolves its targets from the DOM so the hero itself stays a Server
 * Component. The attributes it looks for are set in sections/hero.
 */
export const HeroMotion = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const scroll = useRef(0);
  const pointer = useRef({ target: 0, current: 0 });
  const targets = useRef<Targets | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    // The hero is exactly one viewport, so the window is the same frame of
    // reference and this needs no element to measure against.
    const onMove = (event: PointerEvent) => {
      pointer.current.target = event.clientX / window.innerWidth - 0.5;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [prefersReducedMotion]);

  useTempus(
    () => {
      scroll.current = window.scrollY;
    },
    { order: FRAME_ORDER.scroll, label: 'frame:hero-read' },
  );

  useTempus(
    () => {
      if (prefersReducedMotion) return;

      // Once the hero has left the screen there is nothing here to move.
      const y = scroll.current;
      if (y >= window.innerHeight) return;

      targets.current ??= collect();
      const { parallax, rows } = targets.current;

      const shift = `${(y * HERO.parallax).toFixed(2)}px`;
      for (const el of parallax) {
        el.style.setProperty('--hero-shift', shift);
      }

      const p = pointer.current;
      p.current += (p.target - p.current) * HERO.lerp;
      const travel = (p.current * HERO.rowTravel).toFixed(2);
      for (const row of rows) {
        row.style.transform = `translate3d(${travel}px,0,0)`;
      }
    },
    { order: FRAME_ORDER.write, label: 'frame:hero-write' },
  );

  return null;
};
