'use client';

import { useRef } from 'react';
import { useTempus } from 'tempus/react';

import { PragueTime } from '@/components/effects/clock';
import { LogoGlyph } from '@/components/ui/logo-glyph';
import { FRAME_ORDER } from '@/lib/frame';
import { NAV } from '@/lib/motion';
import { SITE } from '@/lib/site';

import styles from './Header.module.css';

const NAV_ITEMS = [
  { href: '#about', label: 'About' },
  { href: '#music', label: 'Music' },
  { href: '#booking', label: 'Booking' },
];

export const Header = () => {
  const ref = useRef<HTMLElement>(null);
  const scrollRef = useRef(0);
  // Written as data attributes so the look stays in the stylesheet, and only
  // when the value actually flips, so the frame does no needless work.
  const stateRef = useRef({ last: 0, frosted: false, hidden: false });

  useTempus(
    () => {
      scrollRef.current = window.scrollY;
    },
    { order: FRAME_ORDER.scroll, label: 'frame:header-read' },
  );

  useTempus(
    () => {
      const el = ref.current;
      const state = stateRef.current;
      if (!el) return;

      const y = scrollRef.current;
      const frosted = y > NAV.frost;
      const hidden = y > state.last && y > NAV.hide;

      if (frosted !== state.frosted) {
        state.frosted = frosted;
        el.dataset.frosted = String(frosted);
      }
      if (hidden !== state.hidden) {
        state.hidden = hidden;
        el.dataset.hidden = String(hidden);
      }
      state.last = y;
    },
    { order: FRAME_ORDER.write, label: 'frame:header-write' },
  );

  return (
    <header ref={ref} data-frosted="false" data-hidden="false" className={styles.header}>
      <a href="#top" data-plain className={styles.wordmark}>
        <LogoGlyph size="header" label={`${SITE.name} logo`} />
        <span>{SITE.legalName}</span>
      </a>

      <nav aria-label="Sections" className={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className={styles.clock}>
        <PragueTime />
      </div>
    </header>
  );
};
