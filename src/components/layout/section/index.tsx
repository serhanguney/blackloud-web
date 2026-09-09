import type { ElementType, ReactNode } from 'react';

import { cn } from '@/lib/cn';

import styles from './Section.module.css';

type Tone = 'default' | 'raised' | 'invert';
type Spacing = 'none' | 'block' | 'section';

type SectionProps = {
  children: ReactNode;
  as?: ElementType;
  id?: string;
  tone?: Tone;
  spacing?: Spacing;
  gutter?: boolean;
  viewport?: boolean;
  className?: string;
};

const spacingClass: Record<Spacing, string | false> = {
  none: false,
  block: styles.block ?? '',
  section: styles['section-spacing'] ?? '',
};

export const Section = ({
  children,
  as: Tag = 'section',
  id,
  tone = 'default',
  spacing = 'section',
  gutter = true,
  viewport = false,
  className,
}: SectionProps) => (
  <Tag
    id={id}
    data-scheme={tone === 'invert' ? 'dark' : undefined}
    className={cn(
      styles.section,
      tone === 'raised' && styles.raised,
      spacingClass[spacing],
      gutter && styles.gutter,
      viewport && styles.viewport,
      className,
    )}
  >
    {children}
  </Tag>
);
