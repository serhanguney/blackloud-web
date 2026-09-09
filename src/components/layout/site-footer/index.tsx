import { Reveal } from '@/components/effects/reveal';
import { LogoGlyph } from '@/components/ui/logo-glyph';
import { Mono } from '@/components/ui/mono';
import { SITE } from '@/lib/site';
import { SOCIALS } from '@/lib/socials';

import styles from './SiteFooter.module.css';

export const SiteFooter = () => (
  <Reveal pace="edge">
    <Mono as="footer" size="nanoPlus" tracking="social" className={styles.footer}>
      <div className={styles.wordmark}>
        <LogoGlyph size="footer" />
        {SITE.legalName} &middot; {SITE.locality}, {SITE.country}
      </div>

      <nav aria-label="Elsewhere" className={styles.links}>
        {SOCIALS.map((social) => (
          <a key={social.href} href={social.href} target="_blank" rel="noopener noreferrer">
            {social.label}
          </a>
        ))}
      </nav>

      <div className={styles.credit}>
        Site by{' '}
        <a href="https://www.jonasarden.com" target="_blank" rel="noopener noreferrer">
          Jonas Arden
        </a>
      </div>
    </Mono>
  </Reveal>
);
