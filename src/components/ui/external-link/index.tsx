import type { ReactNode } from 'react';

import { Arrow } from '@/components/ui/arrow';

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
  /** The yellow underline wipe is the default; plain drops it. */
  plain?: boolean;
  arrow?: boolean;
  arrowSize?: number;
  className?: string;
};

export const ExternalLink = ({
  href,
  children,
  plain = false,
  arrow = false,
  arrowSize,
  className,
}: ExternalLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    {...(plain && { 'data-plain': '' })}
    className={className}
  >
    {children}
    {arrow && (
      <>
        {' '}
        <Arrow size={arrowSize} />
      </>
    )}
    <span className="sr-only"> (opens in a new tab)</span>
  </a>
);
