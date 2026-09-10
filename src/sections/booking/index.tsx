import Image from 'next/image';

import { Reveal } from '@/components/effects/reveal';
import { SiteFooter } from '@/components/layout/site-footer';
import { ExternalLink } from '@/components/ui/external-link';
import { Mono } from '@/components/ui/mono';
import { Stamp } from '@/components/ui/stamp';
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
          <Statement as="h2">Booking worldwide</Statement>
        </Reveal>

        {/* The address and the line under it are one thought, so they are one
            block with a tight gap rather than two items the column spaces out. */}
        <div className={styles.contact}>
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
        <Stamp>Booking worldwide &#10035; Come say hi &#10035;&nbsp;</Stamp>
      </Reveal>
    </div>

    <SiteFooter />
  </section>
);
