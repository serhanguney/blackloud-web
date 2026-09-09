'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTempus } from 'tempus/react';

import { FRAME_ORDER } from '@/lib/frame';

gsap.registerPlugin(useGSAP, ScrollTrigger);

if (typeof window !== 'undefined') {
  gsap.ticker.lagSmoothing(0);
  // Detach GSAP's own rAF loop. Tempus is the only clock; two loops drift and
  // ScrollTrigger then reads a scroll position a frame behind.
  gsap.ticker.remove(gsap.updateRoot);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

// Mount once, in the root layout.
export const GsapRuntime = () => {
  useTempus(
    ({ time }) => {
      gsap.updateRoot(time / 1000);
    },
    { order: FRAME_ORDER.animation, label: 'frame:gsap' },
  );

  return null;
};
