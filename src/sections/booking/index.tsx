import Image from 'next/image';

import { PragueTime } from '@/components/effects/clock';
import { Reveal } from '@/components/effects/reveal';
import { SiteFooter } from '@/components/layout/site-footer';
import { ExternalLink } from '@/components/ui/external-link';
import { Mark } from '@/components/ui/mark';
import { Mono } from '@/components/ui/mono';
import { Statement } from '@/components/ui/statement';
import { SITE } from '@/lib/site';

import styles from './Booking.module.css';

const [mailbox, domain] = SITE.email.split('@');

export const Booking = () => (
  <section id="booking" className={styles.section}>
    <Reveal>
      <Mono as="div" className={styles.meta}>
        <span>03 / Booking</span>
        <span>
          <PragueTime />
        </span>
      </Mono>
    </Reveal>

    <div className={styles.body}>
      <div className={styles.copy}>
        <Reveal>
          <Statement as="h2">
            Playing your city next?{' '}
            <span className={styles.quiet}>Booking worldwide, based in Prague.</span>
          </Statement>
        </Reveal>

        <Reveal>
          <a href={`mailto:${SITE.email}`} data-plain className={styles.mail}>
            {mailbox}
            <span className={styles.at}>@</span>
            <wbr />
            {domain}
          </a>
        </Reveal>

        <Reveal>
          <Mono tracking="meta" className={styles.dates}>
            Or say hi at a show &middot; dates on{' '}
            <ExternalLink href={SITE.dates} className={styles.datesLink} arrow>
              Bandsintown
            </ExternalLink>
          </Mono>
        </Reveal>
      </div>

      <span aria-hidden="true" className={styles.watermark} />

      <Reveal as="figure" className={styles.portrait}>
        <Image
          src="/booking-portrait.jpg"
          alt={`${SITE.name} in the studio`}
          width={1080}
          height={1080}
          sizes="(max-width: 840px) 90vw, 420px"
          className={styles.portraitImage}
        />
        <figcaption className={styles.stamp}>
          <Mono size="pico" tracking="meta">
            <Mark chip>
              {SITE.locality}, {SITE.country}
            </Mark>
          </Mono>
        </figcaption>
      </Reveal>
    </div>

    <SiteFooter />
  </section>
);
