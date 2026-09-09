export type Track = {
  id: string;
  n: string;
  title: string;
  release: string;
  year: string;
  /** Spotify's 30 second preview. Absent means the row still links out. */
  preview: string;
  url: string;
};

export const TRACKS: Track[] = [
  {
    id: 'cant-hold-back',
    n: '01',
    title: 'Can’t Hold Back',
    release: 'Can’t Hold Back',
    year: '26',
    preview: 'https://p.scdn.co/mp3-preview/d0d852416ca10763f4e599173d58eab2c76e9542',
    url: 'https://open.spotify.com/track/6aQaXZa5wB8Xhiqi38ikxD',
  },
  {
    id: 'dont-make-me',
    n: '02',
    title: 'Don’t Make Me',
    release: 'Can’t Hold Back',
    year: '26',
    preview: 'https://p.scdn.co/mp3-preview/ca4a7e86eb68ed258f44fea7cf46a456b2add8e8',
    url: 'https://open.spotify.com/track/6VGdAuisjJq07KHHLfD3H6',
  },
  {
    id: 'and-then-what',
    n: '03',
    title: 'And Then What',
    release: 'Single',
    year: '26',
    preview: 'https://p.scdn.co/mp3-preview/d5a755ae14f24530aadec94d97b18fed37fd342f',
    url: 'https://open.spotify.com/track/7IEj1MVU4Q4XUMVRGg0aQT',
  },
  {
    id: 'perigosa',
    n: '04',
    title: 'Perigosa',
    release: 'Nu Funk 2/2',
    year: '26',
    preview: 'https://p.scdn.co/mp3-preview/bc3c1cf489387c4b589b71edf4ef41b388d4e5dd',
    url: 'https://open.spotify.com/track/4p9gkbY64hGO1FkzBzQITx',
  },
];
