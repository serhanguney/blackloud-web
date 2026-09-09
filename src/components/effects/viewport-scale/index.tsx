'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

import { refreshScrollTriggers } from '@/lib/scroll';

gsap.registerPlugin(ScrollTrigger);

const BASE_WIDTH = 1728;

/**
 * Above 1728px the design scales rather than reflows, so the layout keeps its
 * proportions on large displays. 1728 is where every type step reaches its cap,
 * so the scale stops growing exactly where the zoom takes over. Anything sized
 * to the viewport must divide by --z, or it ends up zoom times too tall.
 */
export const ViewportScale = () => {
  useEffect(() => {
    let applied = 0;

    const apply = () => {
      const width = document.documentElement.clientWidth;
      const zoom = width > BASE_WIDTH ? width / BASE_WIDTH : 1;
      if (zoom === applied) return;
      applied = zoom;
      document.body.style.setProperty('zoom', `${zoom}`);
      document.documentElement.style.setProperty('--z', `${zoom}`);
      refreshScrollTriggers();
    };

    apply();
    window.addEventListener('resize', apply);
    return () => {
      window.removeEventListener('resize', apply);
      document.body.style.removeProperty('zoom');
      document.documentElement.style.removeProperty('--z');
    };
  }, []);

  return null;
};
