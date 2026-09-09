'use client';

import { useEffect, useState } from 'react';

import { SITE } from '@/lib/site';

import styles from './Clock.module.css';

const TICK_MS = 15_000;

const formatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: SITE.timeZone,
});

/** Empty until mounted: the server has no business guessing the reader's clock. */
export const Clock = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = setInterval(tick, TICK_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <time suppressHydrationWarning dateTime={time || undefined} className={styles.time}>
      {time}
    </time>
  );
};

/** The "PRG 18:42" pair, in the header and again above the booking block. */
export const PragueTime = () => (
  <>
    PRG <Clock />
  </>
);
