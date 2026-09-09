import { SITE } from './site';

const address = {
  '@type': 'PostalAddress',
  addressLocality: SITE.locality,
  addressCountry: SITE.country,
};

const organization = {
  '@type': 'Organization',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  description: SITE.description,
  email: `mailto:${SITE.email}`,
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  ...(SITE.profiles.length > 0 && { sameAs: SITE.profiles }),
  address,
  areaServed: [
    { '@type': 'City', name: SITE.locality },
    { '@type': 'Place', name: 'Remote, worldwide' },
  ],
  knowsLanguage: ['en', 'cs'],
};

const website = {
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  description: SITE.description,
  inLanguage: 'en',
  publisher: { '@id': `${SITE.url}/#organization` },
};

const page = {
  '@type': 'WebPage',
  '@id': `${SITE.url}/#page`,
  url: SITE.url,
  name: SITE.title,
  dateCreated: SITE.created,
  dateModified: SITE.updated,
  isPartOf: { '@id': `${SITE.url}/#website` },
  about: { '@id': `${SITE.url}/#organization` },
  mainEntity: { '@id': `${SITE.url}/#organization` },
};

export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [organization, website, page],
};
