# Design system

Where the tokens in `src/styles/tokens.css` come from. The source of truth is the design canvas in
`source/`, which is not committed. Everything below was taken from it and then verified in a
browser.

## Colour

Four values carry the whole site. There is no light scheme; the page is dark by construction.

| Token   | Value     | Role                         |
| ------- | --------- | ---------------------------- |
| `--bg`  | `#0c0c0c` | the ground, everywhere       |
| `--ink` | `#edebe6` | body and display type        |
| `--mut` | `#9b978d` | secondary copy, labels, meta |
| `--acc` | `#f5e003` | the one chromatic value      |

Everything else is derived: `--line` and friends are `--ink` at 14%, 28% and 8%, and `--veil` is
`--bg` at 55% behind the header blur. Deriving them means a change to the ink carries through.

### Contrast, measured

| Pair                        | Ratio | AA   |
| --------------------------- | ----- | ---- |
| `--ink` on `--bg`           | 16.42 | pass |
| `--mut` on `--bg`           | 6.71  | pass |
| `--acc` on `--bg`           | 14.48 | pass |
| `--bg` on the `--acc` fill  | 14.48 | pass |
| `--ink` on the `--acc` fill | 1.13  | fail |

The yellow is unusually well chosen: on this ground it works **both** as text and as a fill, which
a brand yellow on a light ground cannot do. The single rule that follows is the last row: **never
put ink on the yellow.** `Mark` pairs the fill with `--bg`, which is the passing combination.

## Type

Two families, both variable where it matters.

| Token            | Face          | Used for                                     |
| ---------------- | ------------- | -------------------------------------------- |
| `--font-display` | Archivo       | headings, marquee, track titles, the address |
| `--font-mono`    | IBM Plex Mono | labels, meta, nav, captions, footer          |

Archivo is loaded with its `wdth` axis, which is the point: the display cuts run at
`--wdth-display` (125%) and the statements at `--wdth-statement` (112%). That width change is what
separates the two voices, not a second family.

Golden ratio, base 17px: **17 / 27.5 / 44.5 / 72 / 116**, as `--t-body`, `--t-lead`, `--t-h3`,
`--t-h2`, `--t-display`. Authored in px in the canvas, expressed here in `rem` so browser zoom
keeps working, which a px clamp does not.

## Spacing

Golden ratio, base 27px, the body line box: **27 / 44 / 71 / 115 / 186**, as `--s0` through `--s5`.

The middle term of each clamp is `vh`, not `vw`, on purpose: sections are paced against screen
height so a full-height section holds its rhythm on any display. `--gx` is the one horizontal
inset, and every section uses it and nothing else.

`--d0` through `--d6` are fixed gaps below the 16px floor of `--s0`. They sit between elements
inside a single component rather than between blocks, so they do not scale.

## Motion

One ease for the entire site: `cubic-bezier(.16, 1, .3, 1)`, which is `expo.out` in GSAP. Mirrored
as `EASE.out` in `src/lib/motion.ts`.

```
REVEAL   rise 44px   duration 0.9s   stagger 0.11s
HERO     parallax 0.16 of scroll   pointer lerp 0.06   row travel 90px
NAV      frost past 40px   hide past 160px on a downward scroll
DRIFT    hero rows 40s / 46s / 52s, middle row reversed   gallery 60s
```

Reveals are **batched**, not per block. Everything crossing the fold in the same frame arrives as
one staggered sequence, which is what the canvas does with a shared IntersectionObserver. A
per-block trigger would animate them simultaneously and lose the cascade.

The rest state lives in CSS under a `.js` class set before paint, so a failed bundle leaves the
page readable rather than blank, and there is no flash of content before the runtime hides it.

## The frame loop

Tempus owns the only rAF loop. The header, the hero parallax and the hero pointer all read scroll
at `FRAME_ORDER.scroll` and write transforms at `FRAME_ORDER.write`, so no frame interleaves a
read with a write. GSAP's own ticker is detached and Lenis runs with `autoRaf: false`.

Lenis smooth scroll is an addition to the canvas, not a translation of it, and it is disabled
entirely under `prefers-reduced-motion`.

## Deliberately not carried over

- **WebGL and a preloader.** Neither exists in the design.
- **Body zoom above a base width.** The canvas caps its own clamps instead, so a zoom layer would
  compound with them.

## Known, inherited from the design

- **Track titles truncate at 390px.** The row keeps the release meta at full size, which leaves
  about 156px for the title, so "Can't Hold Back" ellipsises. The canvas behaves the same way.
  Hiding the meta below `--breakpoint` would fix it, and is a one-line change held back only
  because it is a deviation from the source.
