import type { ElementType, ReactNode } from 'react';

import { cn } from '@/lib/cn';

import styles from './Mono.module.css';

type Size = 'pico' | 'nano' | 'nanoPlus' | 'micro' | 'small';
type Tracking = 'none' | 'micro' | 'meta' | 'social' | 'label';
type Tone = 'default' | 'muted' | 'accent';

const trackingClass: Record<Tracking, string | undefined> = {
  none: styles.trackNone,
  micro: styles.trackMicro,
  meta: styles.trackMeta,
  social: styles.trackSocial,
  label: styles.trackLabel,
};

type MonoProps = {
  children: ReactNode;
  as?: ElementType;
  size?: Size;
  tracking?: Tracking;
  tone?: Tone;
  /** Two-line blocks need a line box; single-line labels must not have one. */
  leaded?: boolean;
  id?: string;
  className?: string;
  'aria-label'?: string;
};

export const Mono = ({
  children,
  as: Tag = 'span',
  size = 'micro',
  tracking = 'label',
  tone = 'default',
  leaded = false,
  id,
  className,
  ...rest
}: MonoProps) => (
  <Tag
    id={id}
    {...rest}
    className={cn(
      styles.mono,
      styles[size],
      trackingClass[tracking],
      tone !== 'default' && styles[tone],
      leaded && styles.leaded,
      className,
    )}
  >
    {children}
  </Tag>
);
