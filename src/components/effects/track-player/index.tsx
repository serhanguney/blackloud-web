'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/cn';
import { TRACKS } from '@/lib/tracks';

import styles from './TrackPlayer.module.css';

/** Spotify previews are 30 seconds; used only until metadata gives the real one. */
const FALLBACK_DURATION = 30;

/**
 * Clearing data-current drops the width transition in the same style
 * recalculation as the width change, so a bar being retired snaps to zero
 * instead of visibly rewinding. React sets the attribute correctly on its next
 * render either way.
 */
const snapToZero = (bar: HTMLSpanElement | null | undefined) => {
  if (!bar) return;
  bar.dataset.current = 'false';
  bar.style.width = '0%';
};

export const TrackPlayer = () => {
  const [current, setCurrent] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Progress ticks several times a second. Writing it straight to the DOM keeps
  // that off the render path; only the current track and playing state render.
  const bars = useRef(new Map<string, HTMLSpanElement | null>());

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'none';
    audioRef.current = audio;

    const onTime = () => {
      const id = audio.dataset.trackId;
      const bar = id ? bars.current.get(id) : undefined;
      if (!bar) return;
      const duration = Number.isFinite(audio.duration) ? audio.duration : FALLBACK_DURATION;
      bar.style.width = `${Math.min(100, (audio.currentTime / duration) * 100).toFixed(1)}%`;
    };

    const onEnded = () => {
      setPlaying(false);
      const id = audio.dataset.trackId;
      snapToZero(id ? bars.current.get(id) : undefined);
    };

    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('ended', onEnded);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  const toggle = useCallback(
    (id: string, preview: string) => {
      const audio = audioRef.current;
      if (!audio) return;

      if (current === id && playing) {
        audio.pause();
        setPlaying(false);
        return;
      }

      if (current !== id) {
        snapToZero(current ? bars.current.get(current) : undefined);
        audio.src = preview;
        audio.dataset.trackId = id;
      }

      // Autoplay can still be refused; the row simply stays unlit.
      audio.play().then(
        () => {
          setCurrent(id);
          setPlaying(true);
        },
        () => setPlaying(false),
      );
    },
    [current, playing],
  );

  return (
    <div className={styles.list}>
      {TRACKS.map((track) => {
        const active = current === track.id && playing;
        return (
          <button
            key={track.id}
            type="button"
            aria-pressed={active}
            aria-label={`${active ? 'Pause' : 'Play'} a preview of ${track.title}`}
            onClick={() => toggle(track.id, track.preview)}
            className={cn(styles.row, styles.hover)}
          >
            <span className={cn(styles.number, styles.nudgeIn)}>{track.n}</span>
            <span className={cn(styles.title, styles.nudgeIn)}>{track.title}</span>
            <span className={cn(styles.meta, styles.nudgeOut)}>
              {track.release} &middot; {track.year}
            </span>
            {active && (
              <span aria-hidden="true" className={styles.eq}>
                <span className={styles.bar} />
                <span className={styles.bar} />
                <span className={styles.bar} />
              </span>
            )}
            <span
              aria-hidden="true"
              data-current={String(current === track.id)}
              ref={(el) => {
                bars.current.set(track.id, el);
              }}
              className={styles.progress}
            />
          </button>
        );
      })}
    </div>
  );
};
