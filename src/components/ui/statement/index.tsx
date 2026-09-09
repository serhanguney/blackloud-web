import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

import styles from './Statement.module.css';

type StatementProps = {
  children: ReactNode;
  as?: 'p' | 'h2';
  wide?: boolean;
  className?: string;
};

export const Statement = ({ children, as: Tag = 'p', wide = false, className }: StatementProps) => (
  <Tag className={cn(styles.statement, wide && styles.wide, className)}>{children}</Tag>
);
