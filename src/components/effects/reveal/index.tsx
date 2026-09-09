import type { ElementType, ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

/**
 * Marks a block to rise in when it reaches the fold. Deliberately has no client
 * code of its own: one batched runtime drives every marked block, so blocks
 * that arrive together stagger against each other rather than each animating
 * alone. See ./runtime.
 */
export const Reveal = ({ children, as: Tag = 'div', className }: RevealProps) => (
  <Tag data-reveal className={className}>
    {children}
  </Tag>
);
