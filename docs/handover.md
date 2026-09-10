# Handover

State as of 2026-09-09. Read `CLAUDE.md` first, then `docs/design-system.md` and
`docs/components.md`.

## Where things stand

Built and deployed. Four sections in page order: hero, about, music, booking, plus a 404. It was
rebuilt from a design canvas that is not part of this repository.

Lighthouse on the production build: 100 accessibility, 100 best practices, 100 SEO, 100 agentic
browsing. Re-run it after content changes rather than trusting it stays there.

## The domain, and the one thing to do at handover

**Currently every absolute URL points at `https://blackloud-web.vercel.app`.** That is deliberate:
metadata has to name a host that answers. Pointing it at the real domain before that domain was
attached is what produced a broken share card, because scrapers fetched a 404 for `og:image` and
fell back to grabbing the hero portrait off the page.

`SITE.url` in `src/lib/site.ts` resolves in this order:

1. `NEXT_PUBLIC_SITE_URL`, if set
2. `VERCEL_PROJECT_PRODUCTION_URL`, which Vercel sets to the project's production host
3. `INTERIM`, the vercel.app deployment, for builds outside Vercel

So **attaching the real domain in Vercel is the whole switch**. That makes
`VERCEL_PROJECT_PRODUCTION_URL` the custom domain, and canonical, `og:url`, `og:image`,
`twitter:image`, `robots.txt` and `sitemap.xml` all follow with no code change. Update `INTERIM`
in the same pass so a local build agrees.

Do that **before** submitting the sitemap, or Search Console indexes the vercel.app host as
canonical.

## Then, off-site, and only Jonas can

- Submit the sitemap to **Google Search Console** and **Bing Webmaster Tools**. Bing matters
  because ChatGPT search reads that index.
- Make the bio wording consistent across Spotify, Beatport, RA and Instagram. The JSON-LD asserts
  through `sameAs` that ten profiles and this site are one act; an inconsistent role string
  weakens the entity match that assertion just made.
- Site verification meta tags need his codes. Two lines in `app/layout.tsx` when they arrive.

`public/llms.txt` is close to decorative: Google has said it does not support it, and OpenAI's
crawler docs reference only `robots.txt`. It stays because it is free and Lighthouse's
agentic-browsing audit checks for it. What actually drives AI citation is the entity work above.

## Not verified

**iOS Safari on a real device.** Everything was measured in Chrome at 390, 504, 768, 1024, 1440,
1728 and 2560. The hero leans on `dvh`, `svh` and `backdrop-filter`, which is precisely where
Safari diverges. Worth ten minutes on a phone before this goes to the client.

## The brand carries no place, city or genre

Blackloud is deliberately not associated with a country, a city or a genre. Nothing on the page or
in the metadata names one: no locality, no `genre`, no `PostalAddress`, no time zone, and no clock.
`src/lib/site.ts` has no fields for them by design. If a future change wants to add a location or a
genre back, that is a brand decision, not a copy tweak.

**This costs real SEO.** Locality and genre were two of the three strongest entity signals, and
they are gone. What is left carrying the entity is `sameAs` across ten platforms, so keeping those
profiles consistent matters more than it otherwise would.

**The opengraph card still reads "MELODIC HOUSE & TECHNO · PRAGUE, CZ".** That text is baked into
the supplied artwork and cannot be edited in code. A replacement card is needed.

## Where the mixtape list comes from

The five rows in Music are the five most recent entries of the artist's own SoundCloud playlist,
`soundcloud.com/blackloudmusic/sets/dj-sets`, newest first. That playlist is the source of truth
for both order and date; the list here was wrong on four of five years before it was checked
against it. There are fifteen sets in total, so the list links out to the full playlist.

All five are from 2026, which is why the row shows month and year rather than year alone. A column
of five identical years reads as a bug rather than a chronology.

If the list is refreshed, note that some of the other ten name a genre or a country in their titles
(one is "Melodic Therapy #206 - Czech Republic"), which the brand deliberately avoids.

## Deliberate, do not "fix" back

- **No pointer glow.** Built, reviewed, removed on request.
- **The YouTube player sits behind a poster** and only loads on click. Embedding it directly costs
  about a megabyte of script on every page load and sets Google's third-party cookies, which took
  best practices to 77. `youtube-nocookie.com` alone did not fix it; the player still pulls a
  script from `www.google.com`.
- **Both hero plates are cropped so the subject's centroid sits at 50%** of the frame. Replacing
  either image means re-cropping both together, or the layers desync and the head drifts off
  centre again. The measurement that found this read the alpha channel of the cutout directly.
  **Do not add a horizontal `object-position` nudge on top of it.** Under `cover`, a feature at
  exactly 50% of the image lands on the box centre at every aspect ratio, so the crop alone holds
  it. Per-breakpoint nudges were tried, and once the crop was right they over-corrected and pushed
  the head off centre the other way.
- **Content images are WebP; the opengraph card stays JPEG.** Social scrapers still handle WebP
  inconsistently and that image exists only to be scraped. There is no WebP encoder on the
  machine (`sips` and ImageIO both read it but cannot write it); the conversions were done with
  the `sharp` that ships inside Next, resolved out of the pnpm store.
- **Reading type carries a rem term, display type does not.** See `docs/design-system.md`.

## How to work here

Verify by measuring in a browser, not by reading source. On this project the source was wrong
about the header frost, the marquee drift and the hero framing, and each was only caught by
measuring the rendered page or the shipped CSS.

Run `pnpm lint && pnpm lint:types && pnpm format:check && pnpm typecheck && pnpm build` before
committing. Delete screenshots and `.playwright-mcp/` before staging.
