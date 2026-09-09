# Blackloud

Blackloud's website. Next.js 16 (App Router) on Vercel, React 19 with the React Compiler,
TypeScript, CSS Modules, GSAP for animation, Lenis for smooth scroll and Tempus for frame
scheduling.

## Requirements

Node 24 (see `.nvmrc`) and pnpm.

## Getting started

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000.

## Structure

```
src/
  app/         routes only. page.tsx composes sections
  sections/    one folder per page section, content lives here
  components/
    ui/        content-agnostic, reusable
    layout/    page structure and site chrome
    effects/   motion
  hooks/       useSyncExternalStore wrappers for browser preferences
  lib/         frame ordering, motion tokens, site config, structured data
  styles/      tokens, base, fonts
```

## Scripts

| Script              | Does                                  |
| ------------------- | ------------------------------------- |
| `pnpm dev`          | Start the dev server                  |
| `pnpm build`        | Production build                      |
| `pnpm start`        | Serve the production build            |
| `pnpm lint`         | oxlint, fails on any warning          |
| `pnpm lint:fix`     | oxlint with autofix                   |
| `pnpm lint:types`   | oxlint type-aware rules, via tsgolint |
| `pnpm format`       | oxfmt, write                          |
| `pnpm format:check` | oxfmt, check only                     |
| `pnpm typecheck`    | `next typegen && tsc --noEmit`        |

## Quality gate

Commit hooks run via husky:

- `pre-commit` runs lint-staged (oxlint autofix, then oxfmt, on staged files only)
- `commit-msg` enforces Conventional Commits via commitlint
- `pre-push` runs the full typecheck

CI runs lint, type-aware lint, format check, typecheck and build on every push to `main` and
every pull request. There is no deploy step: Vercel's git integration builds every push and
preview itself.
