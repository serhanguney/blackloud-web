export type Social = {
  label: string;
  href: string;
  /** The five that also run along the foot of the hero. */
  primary?: boolean;
};

export const SOCIALS: Social[] = [
  {
    label: 'Spotify',
    href: 'https://open.spotify.com/artist/6K0Y096jSf23jHzPtClzPT',
    primary: true,
  },
  { label: 'SoundCloud', href: 'https://soundcloud.com/blackloudmusic', primary: true },
  { label: 'Instagram', href: 'https://instagram.com/blackloud.wav', primary: true },
  { label: 'YouTube', href: 'https://youtube.com/@blackloudmusic', primary: true },
  { label: 'Bandcamp', href: 'https://blackloudmusic.bandcamp.com' },
  { label: 'Beatport', href: 'https://www.beatport.com/artist/blackloud/520561', primary: true },
  { label: 'Traxsource', href: 'https://www.traxsource.com/artist/273547/blackloud' },
  { label: 'Apple Music', href: 'https://music.apple.com/cz/artist/blackloud/1057960753' },
  { label: 'YT Music', href: 'https://music.youtube.com/channel/UCaGaLR3FKV6WhJk_RyXk70w' },
  { label: 'RA', href: 'https://ra.co/dj/blackloud' },
];

export const PRIMARY_SOCIALS = SOCIALS.filter((social) => social.primary);

export const SPOTIFY = SOCIALS[0]?.href ?? '';
