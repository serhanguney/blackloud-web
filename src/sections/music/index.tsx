import Image from 'next/image';

import { Reveal } from '@/components/effects/reveal';
import { TrackPlayer } from '@/components/effects/track-player';
import { VideoEmbed } from '@/components/effects/video-embed';
import { Arrow } from '@/components/ui/arrow';
import { ExternalLink } from '@/components/ui/external-link';
import { Heading } from '@/components/ui/heading';
import { Mono } from '@/components/ui/mono';
import { SPOTIFY } from '@/lib/socials';

import styles from './Music.module.css';

const MIXTAPES = [
  {
    title: 'Birgit Berlin Live',
    year: '2025',
    href: 'https://soundcloud.com/blackloudmusic/blackloud-birgit-berlin-august-2025',
    cover: '/mixtapes/birgit-berlin.webp',
  },
  {
    title: 'NWDCAST 084',
    year: '2024',
    href: 'https://soundcloud.com/nowwedeep/nwdcast-084-blackloud',
    cover: '/mixtapes/nwdcast-084.webp',
  },
  {
    title: 'EG After 166',
    year: '2024',
    href: 'https://soundcloud.com/egpodcast/eg-after-166-blackloud',
    cover: '/mixtapes/eg-after-166.webp',
  },
  {
    title: 'Ritmo Futuro 010',
    year: '2023',
    href: 'https://soundcloud.com/ritmofuturo/guestmix-010-blackloud',
    cover: '/mixtapes/ritmo-futuro-010.webp',
  },
  {
    title: 'Synesthesia Invites 028',
    year: '2023',
    href: 'https://soundcloud.com/synesthesiamusicart/synesthesia-invites-blackloud-028',
    cover: '/mixtapes/synesthesia-028.webp',
  },
];

export const Music = () => (
  <section id="music" className={styles.section}>
    <Reveal className={styles.head}>
      <Heading>Music</Heading>
      <Mono tracking="social" className={styles.index}>
        02 / Selected tracks
      </Mono>
    </Reveal>

    <Reveal>
      <TrackPlayer />
      <Mono as="div" size="nano" tracking="meta" className={styles.footnote}>
        <ExternalLink href={SPOTIFY} className={styles.catalogue} arrow>
          Full catalogue on Spotify
        </ExternalLink>
      </Mono>
    </Reveal>

    <div className={styles.columns}>
      <Reveal className={styles.featured}>
        <Mono as="h3" className={styles.subhead}>
          Featured set
        </Mono>
        <VideoEmbed
          id="2xFbIMPLJ24"
          title="Blackloud, DJ set for Diynamic"
          poster="/featured-set.webp"
        />
      </Reveal>

      <Reveal className={styles.mixtapes}>
        <Mono as="h3" className={styles.subhead}>
          Mixtapes
        </Mono>
        <div className={styles.mixList}>
          {MIXTAPES.map((mix) => (
            <ExternalLink key={mix.href} href={mix.href} plain className={styles.mix}>
              <Image
                src={mix.cover}
                alt=""
                width={88}
                height={88}
                sizes="44px"
                className={styles.cover}
              />
              <span className={styles.mixTitle}>{mix.title}</span>
              <Mono as="span" size="small" tracking="none" className={styles.year}>
                {mix.year} <Arrow size={10} />
              </Mono>
            </ExternalLink>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);
