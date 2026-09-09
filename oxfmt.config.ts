import { defineConfig } from 'oxfmt';

// oxfmt discovers `oxfmt.config.ts`, not `.oxfmtrc.ts`. Wrong name means silent defaults.
export default defineConfig({
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  endOfLine: 'lf',
  proseWrap: 'preserve',

  sortImports: {
    groups: [
      'builtin',
      'external',
      ['internal', 'subpath'],
      ['parent', 'sibling', 'index'],
      'style',
      'unknown',
    ],
    // A prefix list, not a regex. '^@/.*' matches nothing and silently lumps
    // every @/ import in with the external packages.
    internalPattern: ['@/'],
    ignoreCase: true,
    sortSideEffects: false,
  },

  sortPackageJson: {
    sortScripts: false,
  },

  ignorePatterns: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'pnpm-lock.yaml'],
});
