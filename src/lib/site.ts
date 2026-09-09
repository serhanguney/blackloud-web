/**
 * Absolute URLs in metadata have to point at a host that actually answers, or a
 * scraper fetching og:image gets a 404 and falls back to whatever image it can
 * find on the page. Until the custom domain is attached, Vercel's own
 * production URL is the one that resolves.
 *
 * Server only. Nothing on the client reads SITE.url, and VERCEL_* is not
 * inlined into the client bundle.
 */
const origin = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return 'https://www.blackloudmusic.com';
};

export const SITE = {
  url: origin(),
  name: 'Blackloud',
  legalName: 'Blackloud®',
  role: 'Melodic house and techno producer and DJ',
  title: 'Blackloud - Melodic House & Techno Producer and DJ, Prague',
  description:
    'Melodic house and techno from Prague. Sharp, direct, built for the club. Releases on Diynamic, TAU and SomethingNu, played by Solomun, Camelphat and Pete Tong.',
  tagline: 'Sharp. Direct. Built for the club.',
  genreLine: 'Melodic House & Techno · Prague',
  email: 'booking@blackloudmusic.com',
  locality: 'Prague',
  region: 'Prague',
  country: 'CZ',
  timeZone: 'Europe/Prague',
  locale: 'en_GB',
  genres: ['Melodic House', 'Melodic Techno', 'Indie Dance', 'Electronic'],
  labels: ['Diynamic', 'TAU', 'SomethingNu'],
  dates: 'https://www.bandsintown.com/a/56932',
  created: '2026-09-09T18:00:00+02:00',
  updated: '2026-09-09T18:00:00+02:00',
} as const;
