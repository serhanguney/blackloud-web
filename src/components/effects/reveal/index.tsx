'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ElementType, ReactNode } from 'react';
import { useRef } from 'react';

import { usePrefersReducedMotion } from '@/hooks/use-preferences';
import { BREAKPOINT, REVEAL } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  /** Stagger the direct children instead of moving the block as one. */
  stagger?: boolean;
  className?: string;
};

export const Reveal = ({ children, as: Tag = 'div', stagger = false, className }: RevealProps) => {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (prefersReducedMotion || !el) return;

      const children = [...el.children];
      if (stagger && children.length === 0) return;

      const mobile = window.matchMedia(`(max-width:${BREAKPOINT.mobile}px)`).matches;

      gsap.from(stagger ? children : el, {
        y: REVEAL.rise,
        opacity: 0,
        duration: REVEAL.duration,
        ease: REVEAL.ease,
        stagger: stagger ? REVEAL.stagger : 0,
        scrollTrigger: {
          trigger: el,
          start: mobile ? REVEAL.startMobile : REVEAL.start,
          once: true,
        },
      });
    },
    { scope: ref, dependencies: [prefersReducedMotion, stagger] },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};
