import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

import styles from './Mark.module.css';

type MarkProps = {
  children: ReactNode;
  /** Standalone label rather than a phrase inside running text. */
  chip?: boolean;
  className?: string;
};

export const Mark = ({ children, chip = false, className }: MarkProps) => (
  <mark className={cn(styles.mark, chip && styles.chip, className)}>{children}</mark>
);
