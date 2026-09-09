'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { usePrefersReducedMotion } from '@/hooks/use-preferences';
import { BREAKPOINT, REVEAL } from '@/lib/motion';
import { refreshScrollTriggers } from '@/lib/scroll';

gsap.registerPlugin(ScrollTrigger);

/** Mount once. The rest state is CSS; this only animates out of it. */
export const RevealRuntime = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const mobile = window.matchMedia(`(max-width:${BREAKPOINT.mobile}px)`).matches;

      // batch is what makes the stagger read: everything crossing the fold in
      // the same frame arrives as one sequence, not as simultaneous blocks.
      const rise = (targets: HTMLElement[], start: string) => {
        if (targets.length === 0) return;
        ScrollTrigger.batch(targets, {
          start,
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
      };

      rise(
        gsap.utils.toArray<HTMLElement>('[data-reveal=""]'),
        mobile ? REVEAL.startMobile : REVEAL.start,
      );
      rise(gsap.utils.toArray<HTMLElement>('[data-reveal="edge"]'), REVEAL.startEdge);

      // Triggers are measured once, before the images and the display face have
      // landed. Both change the page height, which strands every start position.
      const onSettle = () => refreshScrollTriggers();
      window.addEventListener('load', onSettle);
      void document.fonts?.ready.then(onSettle);

      const observer = new ResizeObserver(onSettle);
      observer.observe(document.body);

      return () => {
        window.removeEventListener('load', onSettle);
        observer.disconnect();
      };
    },
    { dependencies: [prefersReducedMotion] },
  );

  return null;
};
