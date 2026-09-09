import Link from 'next/link';

import { Prose } from '@/components/ui/prose';

import styles from './NotFound.module.css';

export const NotFound = () => (
  <main className={styles.section}>
    <h1 className={styles.code}>404</h1>
    <Prose tone="muted">
      That page does not exist. <Link href="/">Back to the start</Link>.
    </Prose>
  </main>
);
