'use client';

import { useEffect } from 'react';

import { refreshScrollTriggers } from '@/lib/scroll';

/**
 * Above BASE_WIDTH the design scales rather than reflows, so it keeps its
 * proportions on a large display instead of stranding capped type in the middle
 * of the screen.
 *
 * Anything sized to the viewport must divide by --z, or it ends up zoom times
 * too tall. Every such value lives in tokens.css or a section module and is
 * already written that way.
 */
const BASE_WIDTH = 1728;

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
