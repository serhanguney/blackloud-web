import { useId } from 'react';

import { cn } from '@/lib/cn';

import styles from './Stamp.module.css';

const RADIUS = 72;
/* The authored run is about 8% longer than the circle, and SVG clips a textPath
   at the path end rather than wrapping it, so the closing glyph was never drawn.
   Pinning the run to the circumference closes the loop evenly; it costs a
   fractionally tighter tracking and nothing else. */
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

type StampProps = {
  children: string;
  className?: string;
};

/** A turning disc with the mark held still at its centre. Decorative. */
export const Stamp = ({ children, className }: StampProps) => {
  const path = useId();

  return (
    <div aria-hidden="true" className={cn(styles.stamp, className)}>
      <svg viewBox="0 0 200 200" className={styles.disc}>
        <defs>
          <path
            id={path}
            fill="none"
            d={`M100,100 m-${RADIUS},0 a${RADIUS},${RADIUS} 0 1,1 ${RADIUS * 2},0 a${RADIUS},${RADIUS} 0 1,1 -${RADIUS * 2},0`}
          />
        </defs>
        <circle cx="100" cy="100" r="99" className={styles.face} />
        <text className={styles.text}>
          <textPath href={`#${path}`} textLength={CIRCUMFERENCE} lengthAdjust="spacing">
            {children}
          </textPath>
        </text>
      </svg>
      <span className={styles.mark} />
    </div>
  );
};
