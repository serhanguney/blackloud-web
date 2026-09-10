import { Reveal } from '@/components/effects/reveal';
import { Mono } from '@/components/ui/mono';
import { SOCIALS } from '@/lib/socials';

import styles from './SiteFooter.module.css';

export const SiteFooter = () => (
  <Reveal pace="edge">
    <Mono as="footer" size="nanoPlus" tracking="social" className={styles.footer}>
      <div className={styles.colophon}>
        <span className={styles.credit}>
          Site by{' '}
          <a href="https://www.jonasarden.com" target="_blank" rel="noopener noreferrer">
            Jonas Arden
          </a>
        </span>
      </div>

      <nav aria-label="Elsewhere" className={styles.links}>
        {SOCIALS.map((social) => (
          <a key={social.href} href={social.href} target="_blank" rel="noopener noreferrer">
            {social.label}
          </a>
        ))}
      </nav>
    </Mono>
  </Reveal>
);
