// Mirrors the motion tokens in src/styles/tokens.css. Change both together.
// GSAP takes seconds; CSS takes ms.

export const EASE = {
  out: 'power4.out', // --ease-out-quint
  outExpo: 'expo.out', // --ease-out-expo
  outSoft: 'power2.out', // --ease-out-quad
  inOut: 'power4.inOut', // --ease-in-out-quart
  back: 'back.out(1.7)', // --ease-back
  none: 'none',
} as const;

export const DURATION = {
  press: 0.1,
  hover: 0.4,
  fill: 0.55,
  menu: 0.6,
  reveal: 0.9,
  draw: 1.2,
  count: 1.8,
  pulse: 2.4,
} as const;

export const REVEAL = {
  rise: 28,
  duration: DURATION.reveal,
  ease: EASE.outExpo,
  stagger: 0.07,
  rowRiseFactor: 0.6,
  rowStaggerFactor: 0.85,
  wordRise: 110,
  wordDuration: 1,
  wordStagger: 0.06,
  start: 'top 88%',
  startMobile: 'top 96%',
  /* Large blocks hold until they are properly in view and take a wider gap
     between items, so a three-card row reads as three arrivals, not one. */
  startLate: 'top 74%',
  startLateMobile: 'top 88%',
  staggerSlow: 0.18,
  /* Anything pinned to the foot of the last section never clears the fold, so
     the usual start would never fire. */
  startEdge: 'top 100%',
} as const;

// The signature draws along true path length and keeps its own timing, off the
// duration scale on purpose. The offsets are timeline positions, not durations.
export const INTRO = {
  strokeDurations: [0.32, 0.16, 0.32],
  strokeEases: ['power1.out', 'power1.inOut', 'power1.in'],
  strokeGap: 0.06,
  start: 0.35,
  handover: 0.3,
  offsets: {
    lines: '-=0.45',
    meta: '-=0.9',
    sub: '-=0.65',
    bottom: '-=0.6',
    canvas: '-=1.2',
    nav: '-=0.8',
  },
} as const;

export const BREAKPOINT = {
  mobile: 840,
} as const;
