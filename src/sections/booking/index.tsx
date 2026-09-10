import Image from 'next/image';

import { Reveal } from '@/components/effects/reveal';
import { SiteFooter } from '@/components/layout/site-footer';
import { ExternalLink } from '@/components/ui/external-link';
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
      </Mono>
    </Reveal>

    <div className={styles.body}>
      <div className={styles.copy}>
        <Reveal>
          <Statement as="h2">
            Playing your city next? <span className={styles.quiet}>Booking worldwide.</span>
          </Statement>
        </Reveal>

        {/* The auto margin has to sit on the flex item, which is this wrapper and
            not the anchor, or space-between strands the address mid-column. */}
        <Reveal className={styles.mailRow}>
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
          src="/booking-portrait.webp"
          alt={`Portrait of ${SITE.name}`}
          width={1125}
          height={1406}
          sizes="(max-width: 900px) 100vw, 420px"
          className={styles.portraitImage}
        />
      </Reveal>
    </div>

    <SiteFooter />
  </section>
);
