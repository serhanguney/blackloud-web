'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ElementType, ReactNode, Ref } from 'react';
import { useImperativeHandle, useRef } from 'react';

import { usePrefersReducedMotion } from '@/hooks/use-preferences';
import { BREAKPOINT, REVEAL } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  /** Stagger direct children instead of moving the element as one block. */
  stagger?: boolean;
  perItem?: boolean;
  /** Column count. Staggers by grid row rather than by child, for tables. */
  columns?: number;
  /**
   * default: arrives once the block is properly in view.
   * slow: holds longer and spaces the items wider, for large blocks.
   * edge: fires as soon as the block touches the fold, for anything pinned to
   * the bottom of the page, which never travels far enough for the others.
   */
  pace?: 'default' | 'slow' | 'edge';
  ref?: Ref<HTMLElement>;
  className?: string;
};

export const Reveal = ({
  children,
  as: Tag = 'div',
  stagger = false,
  perItem = false,
  columns,
  pace = 'default',
  ref: forwarded,
  className,
}: RevealProps) => {
  const ref = useRef<HTMLElement>(null);
  useImperativeHandle(forwarded, () => ref.current as HTMLElement, []);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (prefersReducedMotion || !el) return;

      const mobile = window.matchMedia(`(max-width:${BREAKPOINT.mobile}px)`).matches;
      const starts = {
        default: { desktop: REVEAL.start, mobile: REVEAL.startMobile },
        slow: { desktop: REVEAL.startLate, mobile: REVEAL.startLateMobile },
        edge: { desktop: REVEAL.startEdge, mobile: REVEAL.startEdge },
      }[pace];
      const start = mobile ? starts.mobile : starts.desktop;
      const each = pace === 'slow' ? REVEAL.staggerSlow : REVEAL.stagger;
      // A child that is itself a group runs its own stagger, so animating it
      // here as one block would move it twice.
      const children = [...el.children].filter((child) => !child.hasAttribute('data-reveal-group'));

      if ((stagger || columns) && children.length === 0) return;

      if (perItem || (stagger && mobile)) {
        children.forEach((child, index) => {
          gsap.from(child, {
            y: REVEAL.rise,
            opacity: 0,
            duration: REVEAL.duration,
            ease: REVEAL.ease,
            delay: index * each,
            scrollTrigger: { trigger: child, start, once: true },
          });
        });
        return;
      }

      if (columns) {
        gsap.from(children, {
          y: REVEAL.rise * REVEAL.rowRiseFactor,
          opacity: 0,
          duration: REVEAL.duration,
          ease: REVEAL.ease,
          stagger: {
            each: each * REVEAL.rowStaggerFactor,
            grid: [Math.ceil(children.length / columns), columns],
            axis: 'y',
            from: 'start',
          },
          scrollTrigger: { trigger: el, start, once: true },
        });
        return;
      }

      gsap.from(stagger ? children : el, {
        y: REVEAL.rise,
        opacity: 0,
        duration: REVEAL.duration,
        ease: REVEAL.ease,
        stagger: stagger ? each : 0,
        scrollTrigger: { trigger: el, start },
      });
    },
    { scope: ref, dependencies: [prefersReducedMotion, stagger, perItem, columns, pace] },
  );

  return (
    <Tag ref={ref} data-reveal-group={stagger || columns ? '' : undefined} className={className}>
      {children}
    </Tag>
  );
};
