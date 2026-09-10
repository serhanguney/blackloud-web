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

/* Order and dates taken from the artist's own SoundCloud playlist, newest
   first. Every one of these is 2026, so the row shows the month as well: a
   column of five identical years reads as a bug rather than a chronology. */
const MIXTAPES = [
  {
    title: 'Urge To Podcast 077',
    date: 'Aug 2026',
    href: 'https://soundcloud.com/urgetodance/utp077',
    cover: '/mixtapes/urge-to-podcast-077.webp',
  },
  {
    title: 'Isolate Radio 030',
    date: 'Aug 2026',
    href: 'https://soundcloud.com/isolatemusic/isolate-radio-show-030',
    cover: '/mixtapes/isolate-radio-030.webp',
  },
  {
    title: 'NWDCAST 084',
    date: 'Apr 2026',
    href: 'https://soundcloud.com/nowwedeep/nwdcast-084-blackloud',
    cover: '/mixtapes/nwdcast-084.webp',
  },
  {
    title: 'Ritmo Futuro 010',
    date: 'Mar 2026',
    href: 'https://soundcloud.com/ritmofuturo/guestmix-010-blackloud',
    cover: '/mixtapes/ritmo-futuro-010.webp',
  },
  {
    title: 'Synesthesia Invites 028',
    date: 'Jan 2026',
    href: 'https://soundcloud.com/synesthesiamusicart/synesthesia-invites-blackloud-028',
    cover: '/mixtapes/synesthesia-028.webp',
  },
];

const ALL_SETS = 'https://soundcloud.com/blackloudmusic/sets/dj-sets';

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
                {mix.date} <Arrow size={10} />
              </Mono>
            </ExternalLink>
          ))}
        </div>
        <Mono as="div" size="nano" tracking="meta" className={styles.allSets}>
          <ExternalLink href={ALL_SETS} className={styles.catalogue} arrow>
            All sets on SoundCloud
          </ExternalLink>
        </Mono>
      </Reveal>
    </div>
  </section>
);
