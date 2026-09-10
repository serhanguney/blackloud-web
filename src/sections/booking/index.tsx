import Image from 'next/image';

import { Reveal } from '@/components/effects/reveal';
import { SiteFooter } from '@/components/layout/site-footer';
import { ExternalLink } from '@/components/ui/external-link';
import { Mark } from '@/components/ui/mark';
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
        <span className={styles.metaStrong}>Come say hi</span>
      </Mono>
    </Reveal>

    {/* Three blocks pinned to the corners of one stage rather than stacked in a
        column: the headline top left, the portrait centre right, the address
        bottom left, with the disc bridging the gap between them. */}
    <div className={styles.stage}>
      <Reveal className={styles.headline}>
        <Statement as="h2" className={styles.statement}>
          Booking <Mark>worldwide</Mark>.
        </Statement>
      </Reveal>

      <Reveal as="figure" className={styles.portrait}>
        <Image
          src="/booking-portrait.webp"
          alt={`Portrait of ${SITE.name}`}
          width={1125}
          height={1406}
          sizes="(max-width: 900px) 100vw, 40vw"
          className={styles.portraitImage}
        />
        <Stamp className={styles.stamp}>
          Booking worldwide &#10035; Come say hi &#10035;&nbsp;
        </Stamp>
      </Reveal>

      <Reveal className={styles.contact}>
        <Mono as="p" tracking="micro" leaded className={styles.inquiries}>
          For all inquiries &darr;
        </Mono>

        <a href={`mailto:${SITE.email}`} data-plain className={styles.mail}>
          {mailbox}
          <span className={styles.at}>@</span>
          <br />
          {domain}
        </a>

        <Mono as="div" tracking="meta" className={styles.dates}>
          Or say hi at a show &middot; dates on{' '}
          <ExternalLink href={SITE.dates} className={styles.datesLink} arrow>
            Bandsintown
          </ExternalLink>
        </Mono>
      </Reveal>
    </div>

    <SiteFooter />
  </section>
);
