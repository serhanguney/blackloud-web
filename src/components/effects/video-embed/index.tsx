'use client';

import Image from 'next/image';
import { useState } from 'react';

import styles from './VideoEmbed.module.css';

type VideoEmbedProps = {
  id: string;
  title: string;
  poster: string;
};

/**
 * Holds the player behind a poster until it is asked for. The embed pulls about
 * a megabyte of script and sets Google's third-party cookies the moment it
 * mounts, so nothing loads until someone actually wants to watch.
 */
export const VideoEmbed = ({ id, title, poster }: VideoEmbedProps) => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={styles.frame}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${title}`}
          className={styles.trigger}
        >
          <Image
            src={poster}
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 62vw"
            className={styles.poster}
          />
          <span aria-hidden="true" className={styles.play}>
            <svg width="20" height="24" viewBox="0 0 20 24" fill="currentColor">
              <path d="M0 0v24l20-12z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
};
