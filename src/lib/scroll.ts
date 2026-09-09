import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SETTLE_MS = 150;

let pending: ReturnType<typeof setTimeout> | undefined;

export const refreshScrollTriggers = () => {
  clearTimeout(pending);
  pending = setTimeout(() => {
    pending = undefined;
    ScrollTrigger.refresh();
  }, SETTLE_MS);
};
