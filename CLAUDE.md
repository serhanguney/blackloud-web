# Blackloud

Blackloud's website. Next.js 16 App Router, React 19 with the React Compiler, TypeScript, CSS
Modules, deployed on Vercel. Animation is GSAP, smooth scroll is Lenis, frame scheduling is Tempus.

Single page plus a 404. Sections are composed in `app/page.tsx` and navigated by anchor.

## Hard rules

- **No test framework.** Deliberate: correctness here is visual. Don't add Vitest, Jest or
  Playwright, and don't write tests unless asked.
- **No three.js, no react-three-fiber, no drei, no Tailwind.** All considered and rejected.
  Styling is CSS Modules.
- **No WebGL and no preloader.** Both were dropped for this site on purpose.
- **Ask before adding any dependency.** Say what it does and what it replaces, then wait.
- **Never bypass the hooks** (`--no-verify`) and never silence a type error with `@ts-ignore`
  or `any`.
- **No em-dashes** in code, comments, copy or replies.
- User-facing copy in English, sentence case.

## Toolchain

oxc, not ESLint or Prettier: `oxlint` + `oxfmt`, with type-aware rules via `oxlint-tsgolint`.
`oxlint` covers react, jsx-a11y, import, nextjs and `react/react-compiler` natively.

Both configs are `.ts` so `pnpm typecheck` covers them. The filenames are load-bearing:
`oxlint.config.ts` and `oxfmt.config.ts`, not `.oxlintrc.ts` / `.oxfmtrc.ts`. A wrong name
falls back to defaults silently.

`pnpm lint` is fast and runs in the pre-commit hook. `pnpm lint:types` needs tsgolint, is
slower, and runs in CI only.

Versions are pinned exactly, no carets. The lockfile covers reproducibility; exact pins make
upgrades deliberate, which matters because there is no test suite to catch a regression from a
silent minor bump.

## Conventions

- Conventional Commits, one focused change each. Validate with
  `pnpm lint && pnpm typecheck && pnpm build` before committing.
- Lint runs with `--max-warnings=0`.
- **Comments: default to none.** A comment earns its place only by recording something the code
  cannot say: a cross-file invariant, a browser or library gotcha, a constraint on how a thing must
  be used. If a good name already conveys it, delete the comment.
  Never write: a JSDoc line restating an obvious name, a description of what the next line does,
  step narration, or section banners.
- Server Components by default; `'use client'` only where interactivity or an animation hook
  needs it, pushed as far down the tree as possible.
- Components PascalCase, modules and hooks kebab-case, styles `Component.module.css` beside
  the component. Path alias `@/*` maps to `./src/*`.
- **Folder structure.** `app/` holds routes only. `sections/` holds page sections, one folder each,
  and is where copy lives. `components/` holds reusable, content-agnostic UI, split into `ui/`
  (primitives and composites), `layout/` (page structure and site chrome) and `effects/` (motion).
  A thing used once with content baked in is a section, not a component.
- **If a container paints its own dark background, give it `data-scheme="dark"`**, or its children
  resolve tokens against the light scheme.

## React Compiler

On via `reactCompiler: true` in `next.config.ts`. It memoizes automatically, so **don't
hand-write `useMemo` or `useCallback` for performance**. Keep them only where load-bearing for
referential identity. `react/react-compiler` is an error in oxlint; when it fires, fix the code
rather than disabling it.

## The frame loop

**Tempus is the only rAF loop.** Nothing else may own one. Every per-frame consumer subscribes
with an explicit order from `FRAME_ORDER` in `src/lib/frame.ts`:

```
scroll     0     Lenis integrates, emits scroll
animation  100   gsap.updateRoot
render     200   reserved
write      1000  queued DOM writes flush
```

Consequences that are easy to undo by accident:

- `gsap.ticker.remove(gsap.updateRoot)` in `src/components/effects/gsap-runtime`. GSAP must not
  tick itself. Also `gsap.ticker.lagSmoothing(0)`.
- Lenis runs with `autoRaf: false` and is driven from Tempus.
- DOM writes go through `mutate()` from `src/lib/frame.ts` so reads and writes never interleave
  within a frame.
- `<ReactTempus patch />` in the root layout routes third-party rAF calls into the same loop.

## Animation and scroll

- Use `useGSAP` from `@gsap/react`, not a raw `useEffect`. It owns cleanup and survives
  StrictMode double-invocation.
- The package is `lenis`. `@studio-freight/lenis` is the abandoned old name; don't install it.
- GSAP is free including plugins. **ScrollSmoother overlaps with Lenis**; don't add it.
- Prefer CSS transitions on the compositor for simple reveals. Reserve GSAP for orchestration,
  scrubbing and pinning.
- Lenis is disabled entirely under `prefers-reduced-motion`.

## Design tokens

- **Never hard-code a colour, size, space or easing.** Use the tokens in `src/styles/tokens.css`.
  If a value is missing, add a token rather than a one-off.
- Spacing is a golden-ratio scale. Snap to a step; don't invent in-between values.
- `src/lib/motion.ts` mirrors the motion tokens for GSAP. Change both together.
- `--font-display` is for h1, h2, h3, nav and the wordmark. `--font-mono` for everything else.
- **The brand yellow is a fill, not a text colour on light.** Measured, it is 1.28:1 on `#f2f2f2`
  and no yellow that passes AA still reads as the brand. Use `--accent-text` for accented text: it
  resolves to ink on light and to the yellow on dark, where it measures 12.64:1. On light, the
  yellow works as `--accent-fill` (with `--accent-ink` on top, 13.19:1) or `--accent-line`.
- **Don't use `--text-subtle` for text a user must read** without checking it against its surface.

Rationale and the open colour issues live in `docs/design-system.md`.
