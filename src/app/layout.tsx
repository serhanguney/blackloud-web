import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { ReactTempus } from 'tempus/react';

import { GsapRuntime } from '@/components/effects/gsap-runtime';
import { LoopGate } from '@/components/effects/loop-gate';
import { SmoothScroll } from '@/components/effects/smooth-scroll';
import { ViewportScale } from '@/components/effects/viewport-scale';
import { SITE } from '@/lib/site';
import { structuredData } from '@/lib/structured-data';
import { fontVariables } from '@/styles/fonts';

import '@/styles/index.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s - ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: '/' },
  keywords: ['Blackloud', 'music producer', 'DJ', 'Diynamic', 'DJ booking'],
  /* The site name is deliberately not declared. A client that finds a title
     beginning with it strips that prefix, which left a shared link reading
     "Producer and DJ" with the brand missing. The JSON-LD carries the entity. */
  openGraph: {
    type: 'website',
    url: SITE.url,
    title: SITE.title,
    description: SITE.description,
    locale: SITE.locale,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
    // Points at the generated opengraph-image route rather than duplicating the
    // file as twitter-image. X falls back to og:image, but being explicit is free.
    images: ['/opengraph-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export const viewport: Viewport = {
  themeColor: '#0c0c0c',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
          }}
        />
        <Script id="scroll-restoration" strategy="beforeInteractive">
          {`history.scrollRestoration='manual';document.documentElement.classList.add('js')`}
        </Script>
        {/* patch routes third-party requestAnimationFrame calls into the same loop */}
        <ReactTempus patch />
        <ViewportScale />
        <GsapRuntime />
        <LoopGate />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
