// Mirrors the motion tokens in src/styles/tokens.css. Change both together.
// GSAP takes seconds; CSS takes ms.

export const EASE = {
  /* cubic-bezier(.16, 1, .3, 1), the one ease the whole site uses. */
  out: 'expo.out',
  none: 'none',
} as const;

export const DURATION = {
  color: 0.2,
  wipe: 0.35,
  nudge: 0.45,
  chrome: 0.45,
  reveal: 0.9,
  intro: 1,
} as const;

export const REVEAL = {
  rise: 44,
  duration: DURATION.reveal,
  ease: EASE.out,
  stagger: 0.11,
  /* The source used an IntersectionObserver at 0.12 of the element. On a full
     viewport block that is roughly this much of the way up the fold. */
  start: 'top 88%',
  startMobile: 'top 96%',
  /* Anything pinned to the foot of the last section never travels far enough to
     clear the normal start, because the page stops scrolling first. On a tall
     display it would sit at opacity 0 forever. */
  startEdge: 'top 100%',
} as const;

export const HERO = {
  /* Background and cutout drift together at this fraction of scroll. The frame
     loop writes --hero-shift; the framing itself stays in CSS so the mobile
     query can reframe it. */
  parallax: 0.16,
  /* Pointer lerp, and how far the marquee rows and portrait travel with it. */
  lerp: 0.06,
  rowTravel: 90,
} as const;

export const NAV = {
  /* Past this the header frosts. */
  frost: 40,
  /* Past this a downward scroll hides it. */
  hide: 160,
} as const;

export const BREAKPOINT = {
  mobile: 840,
} as const;
