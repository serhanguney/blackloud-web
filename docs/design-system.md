# Design system

Where the tokens in `src/styles/tokens.css` come from, and what is still unresolved.

The scale, the spacing model and the motion tokens are carried over from the portfolio project,
where every value was cross-checked against resolved styles in a real browser rather than trusted
from the stylesheet. That habit is worth keeping: reading source alone has been wrong every time.

## Colour

Monochrome, plus one brand yellow. The neutral ramp is inherited unchanged. `--signal` (`#34d961`)
is kept for status only and is not a second accent.

Two surfaces alternate down the page: `#f2f2f2` (default) and `#e7e7e7` (raised), with `#161616`
for inverted sections. A container sets `data-scheme="dark"` and every child resolves correctly with
no props. **Light and dark are not variants of a component.**

### The yellow, measured

`--brand-500` is `#ffd400` (provisional, pending the real brand hex). Contrast, computed rather than
eyeballed:

| Pair                            | Ratio | AA   |
| ------------------------------- | ----- | ---- |
| `#ffd400` text on `#f2f2f2`     | 1.28  | fail |
| `#e6bf00` text on `#f2f2f2`     | 1.59  | fail |
| `#ffd400` text on `#161616`     | 12.64 | pass |
| `#111111` on the `#ffd400` fill | 13.19 | pass |
| `#f2f2f2` on the `#ffd400` fill | 1.28  | fail |

**The rule that follows: yellow is a fill, not a text colour on light.** Any yellow dark enough to
reach 4.5:1 against `#f2f2f2` has a luminance under 0.16 and reads as olive, not as the brand. So
the tokens encode the role rather than the colour:

| Token                 | Light         | Dark          | Use                                |
| --------------------- | ------------- | ------------- | ---------------------------------- |
| `--accent-text`       | `--text`      | `--brand-500` | text that wants emphasis           |
| `--accent-fill`       | `--brand-500` | `--brand-500` | a yellow surface                   |
| `--accent-fill-hover` | `--brand-600` | `--brand-600` | that surface on hover              |
| `--accent-ink`        | `--ink-900`   | `--ink-900`   | the only text safe on the fill     |
| `--accent-line`       | `--brand-500` | `--brand-500` | rules, underlines, marks, non-text |

On light, reach for a fill or a mark behind dark text, not yellow type. On dark, `--accent-text` is
genuinely available.

If the real brand hex differs, re-run the measurement before assuming the table still holds. A
darker or more orange yellow changes which rows pass.

### Open issue: the neutral ramp is uneven

Inherited as-is. Lightness (L*): `050` 95.5, `150` 91.6, `250` 83.1, `300` 80.2, `500` 64.4, `600`
36.1, `700` 21.2, `900` 5.1. Two near-duplicates in the mid-lights (250 and 300) and a 28-point hole
between L* 36 and 64. Worth rebuilding as a contrast-targeted ramp when the palette is revisited.

### Choosing between muted and subtle

`--text-muted` is the one that flips usefully: `#555555` on light, `#9c9c9c` on dark. That is the
pair for every small label. `--text-subtle` goes the other way on dark and is too dark for a label
on `#161616`. For a `#9c9c9c` label, reach for `--text-muted`.

## Spacing

Golden ratio, base 16, each step x1.618: 26, 42, 68, 110, 178, 288 at 1728px.

Every step from `xs` up is fluid and interpolates down to a tighter value at 390px. `3xs` and `2xs`
stay fixed: a 1px fluid range is noise and they sit next to hairlines.

Each clamp keeps a `rem` term in its middle value. A `vw`-only middle would stop responding to
browser zoom, which fails WCAG 1.4.4.

Fluid pairs interpolate between adjacent steps. Values like 8, 12, 14, 18, 20 and 22 are drift, not
scale. Snap to the nearest step.

## Type

The page default is **the display sans at weight 400**, set on `body`. Only elements that explicitly
ask for `Geist Mono` get mono, and mono is weight 400 too; 500 is reserved for headings and stat
figures. Getting this backwards renders all body copy as mono medium.

Body is 16px. Labels are Geist Mono 11px uppercase at `0.09em`.

`--font-display` is currently a system stack (`'Helvetica Neue', Helvetica, Arial, sans-serif`).
Only Geist Mono is loaded as a webfont. If Blackloud has a licensed display face, it drops into
`src/styles/fonts.ts` and the token.

Eight leading values are tokenised, because on a type-driven site they are design decisions rather
than arbitrary numbers.

Anything that counts up needs `font-variant-numeric: tabular-nums`, or the digits jitter mid-animation.

## Motion

One motion language: same rise, same duration, same ease everywhere. Only the stagger changes,
because only the grouping changes.

```
RISE 28px   DURATION 0.9s   EASE expo.out   STAGGER 0.07
START 'top 88%' desktop, 'top 96%' mobile
```

Encoded as `REVEAL` in `src/lib/motion.ts`, mirrored by the CSS tokens. Every duration and ease
comes from `DURATION`/`EASE` or the matching token; no literals. Grid rows use `rise x 0.6` and
`stagger x 0.85`. Word splits use `yPercent 110`, `duration 1`, `stagger 0.06`.

Lenis runs `lerp: 0.11, smoothWheel: true, syncTouch: false`, and is disabled entirely under
`prefers-reduced-motion`.

The mobile breakpoint is **840px**, and it changes behaviour as well as layout: on mobile, grouped
items reveal individually as each scrolls in rather than together as a group.

## Deliberately not carried over

- **WebGL.** No canvas work on this site.
- **The preloader.** No intro sequence, so nothing owns the hero tweens and sections animate on
  their own scroll triggers from the first frame.
- **The portfolio's UI primitives.** Its buttons, links, labels, headings and numbered section
  eyebrows encode that site's design language, not this one. The component vocabulary here is built
  from Blackloud's own design once it lands, rather than inherited. What is shared is the method:
  small typed components, every value from a token, one motion language.
- The film grain, which the portfolio also dropped. Dark surfaces are `--ink-850` (`#161616`)
  directly, which is what the grain lifted `#111111` to.

## Provisional

The neutral ramp, the type scale and the measures are the portfolio's, carried over as a working
baseline so the site builds. **They are a starting point, not a decision.** Expect to replace the
palette and retune the type scale against Blackloud's design; the spacing model, the easing curves
and the motion language are the parts worth keeping regardless.

`ViewportScale` is kept: above 1728px the body zooms by `width / 1728` so the design scales rather
than reflows. **Anything sized to the viewport must divide by `--z`** or it ends up zoom times too
tall.
