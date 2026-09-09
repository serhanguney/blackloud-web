import Image from 'next/image';
import { Fragment } from 'react';

import { LogoGlyph } from '@/components/ui/logo-glyph';
import { Marquee } from '@/components/ui/marquee';
import { Mono } from '@/components/ui/mono';
import { cn } from '@/lib/cn';
import { SITE } from '@/lib/site';
import { PRIMARY_SOCIALS } from '@/lib/socials';

import styles from './Hero.module.css';

/* Marquee renders its children twice to make the loop seamless, so each row
   below carries half of what ends up on screen. */

const OutlineRun = () => (
  <>
    {[0, 1, 2, 3].map((i) => (
      <Fragment key={i}>
        Blackloud <LogoGlyph variant="outline" />{' '}
      </Fragment>
    ))}
  </>
);

const SolidRun = () => (
  <>
    {[0, 1].map((i) => (
      <Fragment key={i}>
        Blackloud <LogoGlyph /> Black<span className={styles.accent}>loud</span>{' '}
        <LogoGlyph tone="accent" />{' '}
      </Fragment>
    ))}
  </>
);

export const Hero = () => (
  <section id="top" data-hero className={styles.hero}>
    <div className={styles.backdrop}>
      <Image
        data-parallax
        src="/hero-portrait.webp"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="(max-width: 840px) 100vw, 170vw"
        className={styles.plate}
      />
      <div className={styles.scrim} />
    </div>

    <div className={styles.stack}>
      <div data-marquee-shift className={cn(styles.shift, styles.rowBack)}>
        <Marquee duration="var(--drift-back)" className={cn(styles.row, styles.outline)}>
          <OutlineRun />
        </Marquee>
      </div>
      <div data-marquee-shift className={cn(styles.shift, styles.rowMid)}>
        <Marquee duration="var(--drift-mid)" reverse className={styles.row}>
          <SolidRun />
        </Marquee>
      </div>
      <div data-marquee-shift className={cn(styles.shift, styles.rowFore)}>
        <Marquee duration="var(--drift-fore)" className={cn(styles.row, styles.outline)}>
          <OutlineRun />
        </Marquee>
      </div>
    </div>

    <Image
      data-parallax
      src="/hero-cutout.webp"
      alt=""
      aria-hidden="true"
      fill
      priority
      sizes="(max-width: 840px) 100vw, 170vw"
      className={styles.cutout}
    />

    <h1 className="sr-only">
      {SITE.name} - {SITE.role} in {SITE.locality}
    </h1>

    <div className={styles.foot}>
      <Mono tracking="micro" leaded className={styles.tagline}>
        {SITE.tagline}
        <br />
        <span className={styles.taglineStrong}>{SITE.genreLine}</span>
      </Mono>

      <Mono as="nav" tracking="social" aria-label="Listen" className={styles.socials}>
        {PRIMARY_SOCIALS.map((social) => (
          <a key={social.href} href={social.href} target="_blank" rel="noopener noreferrer">
            {social.label}
          </a>
        ))}
      </Mono>
    </div>
  </section>
);
