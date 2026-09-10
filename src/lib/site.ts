/**
 * Absolute URLs in metadata have to point at a host that actually answers, or a
 * scraper fetching og:image gets a 404 and falls back to whatever image it can
 * find on the page. That is exactly what happened while this pointed at a
 * domain that was not attached yet.
 *
 * Order: an explicit override, then whatever host Vercel is serving as
 * production, then the interim deployment. Attaching the real domain in Vercel
 * makes VERCEL_PROJECT_PRODUCTION_URL become it, so canonical, og:url, the
 * sitemap and robots all follow with no code change. INTERIM is only the
 * last resort for a build running outside Vercel.
 *
 * Server only. Nothing on the client reads SITE.url, and VERCEL_* is not
 * inlined into the client bundle.
 */
const INTERIM = 'https://blackloud-web.vercel.app';

const origin = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return INTERIM;
};

/**
 * Blackloud is deliberately not tied to a country, a city or a genre. Nothing
 * here should name one, on the page or in the metadata, and there is no
 * locality, genre or time zone to reach for by design.
 */
export const SITE = {
  url: origin(),
  name: 'Blackloud',
  legalName: 'Blackloud®',
  role: 'Producer and DJ',
  title: 'Blackloud - Producer and DJ',
  description:
    'Producer and DJ. Releases on Diynamic, TAU and SomethingNu, played by Solomun, Camelphat, Pete Tong, Adana Twins and Musumeci. Booking worldwide.',
  email: 'booking@blackloudmusic.com',
  locale: 'en_GB',
  labels: ['Diynamic', 'TAU', 'SomethingNu'],
  created: '2026-09-09T18:00:00+02:00',
  updated: '2026-09-10T20:00:00+02:00',
} as const;
