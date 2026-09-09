import Link from 'next/link';

import { Section } from '@/components/layout/section';

import styles from './NotFound.module.css';

export const NotFound = () => (
  <Section as="main" tone="invert" spacing="none" viewport className={styles.section}>
    <h1 className={styles.code}>404</h1>
    <p className={styles.note}>
      That page does not exist. <Link href="/">Back to the start</Link>.
    </p>
  </Section>
);
