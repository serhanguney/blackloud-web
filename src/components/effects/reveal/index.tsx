import type { ElementType, ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  /**
   * edge fires as soon as the block touches the fold. Use it for anything at the
   * foot of the last section, which never scrolls far enough for the default.
   */
  pace?: 'default' | 'edge';
  className?: string;
};

/**
 * Marks a block to rise in when it reaches the fold. Deliberately has no client
 * code of its own: one batched runtime drives every marked block, so blocks
 * that arrive together stagger against each other rather than each animating
 * alone. See ./runtime.
 */
export const Reveal = ({ children, as: Tag = 'div', pace = 'default', className }: RevealProps) => (
  <Tag data-reveal={pace === 'edge' ? 'edge' : ''} className={className}>
    {children}
  </Tag>
);
