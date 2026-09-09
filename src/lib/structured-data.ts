import { SITE } from './site';
import { SOCIALS } from './socials';
import { TRACKS } from './tracks';

const address = {
  '@type': 'PostalAddress',
  addressLocality: SITE.locality,
  addressCountry: SITE.country,
};

/* sameAs across every platform is the strongest entity signal an artist has:
   it is the statement that these profiles and this site are one act. */
const artist = {
  '@type': 'MusicGroup',
  '@id': `${SITE.url}/#artist`,
  name: SITE.name,
  alternateName: SITE.legalName,
  description: SITE.description,
  genre: SITE.genres,
  url: SITE.url,
  image: `${SITE.url}/booking-portrait.jpg`,
  email: `mailto:${SITE.email}`,
  sameAs: SOCIALS.map((social) => social.href),
  foundingLocation: { '@type': 'City', name: SITE.locality },
  location: { '@type': 'City', name: SITE.locality, address },
  address,
  track: TRACKS.map((track) => ({
    '@type': 'MusicRecording',
    name: track.title,
    byArtist: { '@id': `${SITE.url}/#artist` },
    inAlbum: { '@type': 'MusicAlbum', name: track.release },
    url: track.url,
    ...(track.preview && {
      audio: { '@type': 'AudioObject', contentUrl: track.preview, encodingFormat: 'audio/mpeg' },
    }),
  })),
};

const booking = {
  '@type': 'ContactPoint',
  '@id': `${SITE.url}/#booking`,
  contactType: 'Booking',
  email: `mailto:${SITE.email}`,
  areaServed: 'Worldwide',
  availableLanguage: ['en', 'cs'],
};

const website = {
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  description: SITE.description,
  inLanguage: 'en',
  publisher: { '@id': `${SITE.url}/#artist` },
};

const page = {
  '@type': 'ProfilePage',
  '@id': `${SITE.url}/#page`,
  url: SITE.url,
  name: SITE.title,
  dateCreated: SITE.created,
  dateModified: SITE.updated,
  isPartOf: { '@id': `${SITE.url}/#website` },
  about: { '@id': `${SITE.url}/#artist` },
  mainEntity: { '@id': `${SITE.url}/#artist` },
};

export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    { ...artist, contactPoint: { '@id': `${SITE.url}/#booking` } },
    booking,
    website,
    page,
  ],
};
