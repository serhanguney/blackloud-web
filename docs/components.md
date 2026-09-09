# Components

The single most important idea carried over from the canvas: **type voice is a component, not a
class you remember to apply.** `Heading`, `Statement`, `Mono` and `Prose` are the four voices, and
nothing outside them sets a family, weight or width.

## Where things live

```
src/
  app/         routes only. page.tsx composes sections
  sections/    one folder per page section, copy lives here
  components/
    ui/        content-agnostic, reusable
    layout/    page structure and site chrome
    effects/   motion
  hooks/  lib/  styles/
```

## ui

| Component      | Varies by                  | Notes                                            |
| -------------- | -------------------------- | ------------------------------------------------ |
| `Mono`         | size, tracking, tone, `as` | by far the most used; five sizes, four trackings |
| `Heading`      | `h2` / `h3`, `as`          | Archivo black at 125% width, uppercase           |
| `Statement`    | wide, `as`                 | Archivo bold at 112% width, set to read          |
| `Prose`        | tone                       | body copy, with `Strong` to raise a phrase       |
| `Mark`         | chip                       | the yellow fill; always pairs with `--bg`        |
| `Marquee`      | duration, reverse          | renders children twice; see the trap below       |
| `LogoGlyph`    | size, variant, tone        | masked mark, or the outline file                 |
| `ExternalLink` | plain, arrow               | adds `rel`, the arrow, and a screen-reader note  |
| `Arrow`        | size                       | the diagonal that marks a leaving link           |

## layout

`Header` (fixed, frosts and hides on scroll) and `SiteFooter` (wordmark, ten platform links, and
the build credit).

## effects

`Reveal` is a **Server Component**: it only emits `data-reveal`. `RevealRuntime` drives every
marked block from one batched ScrollTrigger. `HeroMotion` resolves its targets from the DOM so the
hero stays a Server Component too. `Clock` and `TrackPlayer` are the only genuinely stateful
clients.

## Traps worth knowing

**`animation` is a shorthand.** Two classes on one element, each setting `animation`, means the
later wins outright. The hero marquee silently lost its drift when the intro fade was added to the
same element. The fade now lives on the `.shift` wrapper.

**Never hand-write a vendor prefix that has a standard property.** Lightningcss adds prefixes from
its own targets, and given both it can keep only the prefixed one. `-webkit-backdrop-filter`
shipped, `backdrop-filter` did not, and the header frost vanished with no error. Write the
standard property alone. `-webkit-font-smoothing` and `-webkit-text-stroke` are fine, having no
standard form.

**The header must not recompute every frame.** It compares the current scroll against the previous
one, so recomputing on a frame where the page did not move compares a value against itself and the
header slides back down on its own. It returns early unless the position actually changed.

**`Marquee` renders its children twice** and translates by exactly half the track. Each row is
authored as half of what ends up on screen. Changing the copy count breaks the loop seam.

**Anything that loops needs `data-loop`.** `LoopGate` pauses those animations when they leave the
viewport; `Marquee` sets it already.

**The hero plates are scaled 1.7x**, so their `sizes` hint is `170vw`, not `100vw`. At `100vw` the
browser fetches a candidate that is then stretched 70% larger than it was chosen for.
