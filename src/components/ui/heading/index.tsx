import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

import styles from './Heading.module.css';

type HeadingProps = {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'span';
  size?: 'h2' | 'h3';
  className?: string;
};

export const Heading = ({ children, as: Tag = 'h2', size = 'h2', className }: HeadingProps) => (
  <Tag className={cn(styles.heading, styles[size], className)}>{children}</Tag>
);
