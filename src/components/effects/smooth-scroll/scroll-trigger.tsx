'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

const update = () => ScrollTrigger.update();

/** Must render inside the Lenis provider. */
export const ScrollTriggerSync = () => {
  const lenis = useLenis(update);

  useEffect(() => {
    if (lenis) ScrollTrigger.refresh();
  }, [lenis]);

  return null;
};
