'use client';

import type { LenisRef } from 'lenis/react';
import { ReactLenis } from 'lenis/react';
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { useTempus } from 'tempus/react';

import { usePrefersReducedMotion } from '@/hooks/use-preferences';
import { FRAME_ORDER } from '@/lib/frame';

import 'lenis/dist/lenis.css';

const ScrollTriggerSync = dynamic(
  () => import('./scroll-trigger').then((mod) => mod.ScrollTriggerSync),
  { ssr: false },
);

export const SmoothScroll = ({ children }: { children: ReactNode }) => {
  const lenisRef = useRef<LenisRef>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useTempus(
    ({ time }) => {
      lenisRef.current?.lenis?.raf(time);
    },
    { order: FRAME_ORDER.scroll, label: 'frame:lenis' },
  );

  if (prefersReducedMotion) return children;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.11,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
        autoToggle: true,
        // Overlays render outside the scroll container and must keep native
        // wheel behaviour or they become unscrollable.
        prevent: (node: Element | null) => node?.nodeName === 'VERCEL-LIVE-FEEDBACK',
      }}
    >
      {children}
      <ScrollTriggerSync />
    </ReactLenis>
  );
};
