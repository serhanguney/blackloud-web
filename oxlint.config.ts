import { defineConfig } from 'oxlint';

// oxlint discovers `oxlint.config.ts`, not `.oxlintrc.ts`. Wrong name means silent defaults.
export default defineConfig({
  plugins: [
    'eslint',
    'typescript',
    'unicorn',
    'oxc',
    'react',
    'jsx-a11y',
    'nextjs',
    'import',
    'promise',
  ],
  categories: {
    correctness: 'error',
  },
  env: {
    browser: true,
    node: true,
    es2024: true,
  },

  ignorePatterns: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'],

  rules: {
    'react/react-compiler': 'error',
    'react/rules-of-hooks': 'error',
    'react/exhaustive-deps': 'error',

    'eslint/no-unused-vars': [
      'error',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'typescript/no-explicit-any': 'error',
    'eslint/eqeqeq': ['error', 'always', { null: 'ignore' }],
    'eslint/no-nested-ternary': 'error',
    'react/self-closing-comp': ['error', { html: true, component: true }],
    'react/button-has-type': 'error',
    'react/jsx-no-target-blank': 'error',
    'react/no-unstable-nested-components': 'error',
    'jsx-a11y/alt-text': 'error',
    'nextjs/no-img-element': 'error',
    'import/first': 'error',

    'eslint/no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react',
            importNames: ['forwardRef'],
            message: 'React 19: accept `ref` as a regular prop instead.',
          },
        ],
      },
    ],

    // Correctness would enable these; both force full module resolution and are
    // the biggest oxlint slowdown.
    'import/default': 'off',
    'import/namespace': 'off',

    // Type-aware: only run under `pnpm lint:types`.
    'typescript/no-floating-promises': 'error',
    'typescript/no-misused-promises': 'error',
    'typescript/consistent-type-exports': 'error',
    'typescript/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
    ],
  },
});
