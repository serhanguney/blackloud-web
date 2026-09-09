import { Archivo, IBM_Plex_Mono } from 'next/font/google';

// wdth is the point of Archivo here: the display cuts run at 125% width and the
// statements at 112%, which is what carries the headlines without a second family.
export const display = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

export const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const fontVariables = `${display.variable} ${mono.variable}`;
