export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.blackloud.com',
  name: 'Blackloud',
  role: 'TODO one-line role or category',
  title: 'TODO Blackloud - what it is',
  description: 'TODO one sentence, under 160 characters, that carries the entity and the offer.',
  email: 'TODO@blackloud.com',
  /** sameAs: the statement that these accounts and this site are one entity. */
  profiles: [] as string[],
  locality: 'Prague',
  country: 'CZ',
  locale: 'en_GB',
  created: '2026-09-09T18:00:00+02:00',
  updated: '2026-09-09T18:00:00+02:00',
} as const;
