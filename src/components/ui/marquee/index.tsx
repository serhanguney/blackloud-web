import type { CSSProperties, ReactNode } from 'react';

import { cn } from '@/lib/cn';

import styles from './Marquee.module.css';

type MarqueeProps = {
  children: ReactNode;
  /** A CSS duration, from the --drift-* tokens. */
  duration: string;
  reverse?: boolean;
  className?: string;
  style?: CSSProperties;
};

export const Marquee = ({ children, duration, reverse, className, style }: MarqueeProps) => (
  <div
    data-loop
    aria-hidden="true"
    className={cn(styles.track, reverse && styles.reverse, className)}
    style={{ ...style, '--drift-duration': duration } as CSSProperties}
  >
    {children}
    {children}
  </div>
);
