import { cn } from '@/lib/cn';

import styles from './LogoGlyph.module.css';

type LogoGlyphProps = {
  /** bare carries no dimensions: the caller sizes it. */
  size?: 'header' | 'footer' | 'inline' | 'bare';
  variant?: 'solid' | 'outline';
  tone?: 'current' | 'accent';
  label?: string;
  className?: string;
};

export const LogoGlyph = ({
  size = 'inline',
  variant = 'solid',
  tone = 'current',
  label,
  className,
}: LogoGlyphProps) => (
  <span
    {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': 'true' })}
    className={cn(
      variant === 'outline' ? styles.outline : styles.glyph,
      styles[size],
      variant === 'solid' && tone === 'accent' && styles.accent,
      className,
    )}
  />
);
