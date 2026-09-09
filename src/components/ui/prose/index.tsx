import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

import styles from './Prose.module.css';

type ProseProps = {
  children: ReactNode;
  tone?: 'default' | 'muted';
  className?: string;
};

export const Prose = ({ children, tone = 'default', className }: ProseProps) => (
  <p className={cn(styles.prose, tone === 'muted' && styles.muted, className)}>{children}</p>
);

/** Raises a phrase back to full ink inside a muted paragraph. */
export const Strong = ({ children }: { children: ReactNode }) => (
  <span className={styles.strong}>{children}</span>
);
