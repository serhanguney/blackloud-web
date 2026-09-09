'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const setPlaying = (el: Element, playing: boolean) => {
  for (const animation of el.getAnimations()) {
    if (playing) animation.play();
    else animation.pause();
  }
};

export const LoopGate = () => {
  const pathname = usePathname();

  useEffect(() => {
    const looping = document.querySelectorAll('[data-loop]');

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) setPlaying(entry.target, entry.isIntersecting);
    });

    for (const el of looping) observer.observe(el);

    return () => {
      observer.disconnect();
      for (const el of looping) setPlaying(el, true);
    };
  }, [pathname]);

  return null;
};
