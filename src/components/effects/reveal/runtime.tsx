'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { usePrefersReducedMotion } from '@/hooks/use-preferences';
import { BREAKPOINT, REVEAL } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

/** Mount once. The rest state is CSS; this only animates out of it. */
export const RevealRuntime = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const targets = gsap.utils.toArray<HTMLElement>('[data-reveal]');
      if (targets.length === 0) return;

      const mobile = window.matchMedia(`(max-width:${BREAKPOINT.mobile}px)`).matches;

      // batch is what makes the stagger read: everything crossing the fold in
      // the same frame arrives as one sequence, not as simultaneous blocks.
      ScrollTrigger.batch(targets, {
        start: mobile ? REVEAL.startMobile : REVEAL.start,
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: REVEAL.duration,
            ease: REVEAL.ease,
            stagger: REVEAL.stagger,
            overwrite: true,
          });
        },
      });
    },
    { dependencies: [prefersReducedMotion] },
  );

  return null;
};
