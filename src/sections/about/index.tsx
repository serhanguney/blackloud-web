import Image from 'next/image';

import { Reveal } from '@/components/effects/reveal';
import { Mark } from '@/components/ui/mark';
import { Marquee } from '@/components/ui/marquee';
import { Mono } from '@/components/ui/mono';
import { Prose, Strong } from '@/components/ui/prose';
import { Statement } from '@/components/ui/statement';

import styles from './About.module.css';

const GALLERY = [1, 2, 3, 4, 5, 6];

export const About = () => (
  <section id="about" className={styles.section}>
    <Reveal>
      <Mono className={styles.index}>01 / About</Mono>
    </Reveal>

    <div className={styles.columns}>
      <Reveal className={styles.lead}>
        <Statement wide>
          Driven by energy. Sharp, direct, and <Mark>built for the club</Mark>. Tracks that hit fast
          and hold the floor without asking for patience.
        </Statement>
      </Reveal>

      <Reveal className={styles.detail}>
        <Prose tone="muted">
          From Switch It Up and Fuuunk Dat to And Then What, Male Maluco, and Perigosa, the sound
          has always had one constant: momentum. No wasted space, no unnecessary build-ups. Just
          groove that keeps moving when everything else slows down.
        </Prose>
        <Prose tone="muted">
          Releasing on Diynamic, TAU, SomethingNu, and labels across electronic music, he&rsquo;s
          built a catalogue that doesn&rsquo;t chase the moment. His tracks show up in sets by{' '}
          <Strong>Solomun, Camelphat, Pete Tong, Adana Twins, and Musumeci</Strong>.
        </Prose>
      </Reveal>
    </div>

    <Reveal className={styles.strip}>
      <Marquee duration="var(--drift-gallery)" className={styles.stripInner}>
        {GALLERY.map((n) => (
          <Image
            key={n}
            src={`/gallery/0${n}.jpg`}
            alt=""
            width={920}
            height={920}
            sizes="(max-width: 840px) 360px, 460px"
            className={styles.frame}
          />
        ))}
      </Marquee>
    </Reveal>
  </section>
);
