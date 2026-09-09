import { Reveal } from '@/components/effects/reveal';
import { LogoGlyph } from '@/components/ui/logo-glyph';
import { Mono } from '@/components/ui/mono';
import { SITE } from '@/lib/site';
import { SOCIALS } from '@/lib/socials';

import styles from './SiteFooter.module.css';

export const SiteFooter = () => (
  <Reveal pace="edge">
    <Mono as="footer" size="nanoPlus" tracking="social" className={styles.footer}>
      {/* The colophon line: who, where, and who built it. A credit on its own
          row read as a third element competing with the nav. */}
      <div className={styles.colophon}>
        <LogoGlyph size="footer" />
        <span>
          {SITE.legalName} &middot; {SITE.locality}, {SITE.country}
        </span>
        <span className={styles.credit}>
          &middot; Site by{' '}
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
