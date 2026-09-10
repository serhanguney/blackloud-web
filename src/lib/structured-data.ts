import { SITE } from './site';
import { SOCIALS } from './socials';
import { TRACKS } from './tracks';

/* sameAs across every platform is the strongest entity signal an artist has:
   it is the statement that these profiles and this site are one act. It carries
   more weight here than usual, because there is deliberately no genre, city or
   country to anchor the entity to. */
const artist = {
  '@type': 'MusicGroup',
  '@id': `${SITE.url}/#artist`,
  name: SITE.name,
  alternateName: SITE.legalName,
  description: SITE.description,
  url: SITE.url,
  image: `${SITE.url}/opengraph-image.jpg`,
  email: `mailto:${SITE.email}`,
  sameAs: SOCIALS.map((social) => social.href),
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
