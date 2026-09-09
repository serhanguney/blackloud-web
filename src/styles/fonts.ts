import { Geist_Mono } from 'next/font/google';

export const mono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const fontVariables = mono.variable;
