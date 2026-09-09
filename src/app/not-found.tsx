import type { Metadata } from 'next';

import { NotFound } from '@/sections/not-found';

export const metadata: Metadata = {
  title: '404 - page not found',
  robots: { index: false, follow: true },
};

export default function NotFoundPage() {
  return <NotFound />;
}
