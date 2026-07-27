# GEMINI.md - Agent Guide & Codebase Architecture for Koval UI

This document provides essential information, conventions, and architectural context for AI agents working in the **Koval UI** repository (`koval-ui`).

---

## 1. Overview & Tech Stack

**Koval UI** is a minimalistic, browser-first React component library designed for high performance, accessibility, and low JavaScript overhead.

- **Framework & Runtime**: React 18+ (bundled with ESM and CommonJS support, Next.js compatible via `'use client';` banners).
- **Language**: TypeScript 5.9+ (strict mode, path alias `@/*` -> `./src/*`).
- **Build & Bundling**: Vite 7.1+, `vite-plugin-dts` for declaration generation, `alias-kitchen`.
- **Styling**: CSS Modules with `camelCase` naming conventions, PostCSS (`postcss-preset-env`), `css-vars-hook` for theming.
- **Documentation & Workbench**: Storybook 8 (`@storybook/react-vite`).
- **Testing**: Jest + `ts-jest` with `jest-environment-jsdom`, `@testing-library/react`.
- **Package Manager**: `pnpm`.

---

## 2. Directory Layout & Architecture

```
koval-ui/
├── src/
│   ├── lib/                  # Exported public components (Button, Select, Form, DataTable, etc.)
│   │   └── index.ts          # Main library export file
│   ├── internal/             # Internal hooks, base inputs, icons, locale, portals, transitions, utils
│   ├── storybook-pages/      # Documentation & Storybook custom pages
│   ├── env/                  # Environment configs (Forbidden to import in src/lib/)
│   └── main.tsx              # Local Vite dev entry point
├── .storybook/               # Storybook configuration
├── design/                   # Asset and logo design files
├── dist/                     # Compiled library output (dist/index.js, dist/index.cjs, dist/index.d.ts, dist/index.css)
└── package.json
```

---

## 3. Essential Scripts & Commands

> **Note**: When running `pnpm` commands non-interactively or in CI, use `CI=true` (e.g. `CI=true pnpm lint:types`).

- **Development Server**: `pnpm dev`
- **Storybook Workbench**: `pnpm start:docs` (runs Storybook on `http://localhost:6006`)
- **Build Library**: `pnpm build` (cleans `dist/` and runs `vite build`)
- **Build Storybook Docs**: `pnpm build:docs`
- **Type Check**: `pnpm lint:types` (`tsc --pretty --noEmit`)
- **Lint Code**: `pnpm lint:code` / `pnpm fix:code`
- **Lint Styles**: `pnpm lint:style` / `pnpm fix:style`
- **Run Unit Tests**: `pnpm test`
- **Test Coverage**: `pnpm coverage`

---

## 4. Coding Standards & Linting Rules

### TypeScript Conventions
- **Types over Interfaces**: Always use `type` definitions instead of `interface` (enforced by `@typescript-eslint/consistent-type-definitions`: `type`).
- **Explicit Type Imports**: Enforce type-only imports using `import type { ... } from '...'` (enforced by `@typescript-eslint/consistent-type-imports`).

### Import Ordering & Boundaries
- Imports must be grouped and separated by blank lines in this exact order:
  1. Built-in Node modules (`path`, etc.)
  2. External packages (`react`, `classnames`, etc.)
  3. Internal path alias (`@/...`)
  4. Relative parent / sibling / index (`../`, `./`)
- **Restricted Imports**:
  - Files inside `src/lib/` **must not** import from `src/env/`.
  - Files inside `src/lib/` **must not** import `devDependencies` (only `peerDependencies` allowed).

### CSS & Styling Rules
- Use CSS Modules with `camelCase` class names (`localsConvention: 'camelCase'`).
- Avoid inline styles where possible. Rely on CSS custom properties (variables) for dynamic styling and theming.

### SSR & Next.js Compatibility
- The library uses `'use client';` banners in build output.
- Ensure browser DOM APIs are wrapped in SSR checks or `useEffect` to maintain SSR friendliness (`eslint-plugin-ssr-friendly`).

---

## 5. Testing & Storybook Expectations

- Every exported component under `src/lib/<ComponentName>` should feature:
  - `<ComponentName>.tsx`: Main component code.
  - `<ComponentName>.module.css`: Component styles.
  - `<ComponentName>.test.tsx`: Jest unit tests covering rendering, user interactions, and prop variations.
  - `<ComponentName>.stories.tsx`: Storybook stories for UI documentation and workbench testing.
  - `index.ts`: Re-exporting the component and its public types.

---

## 6. Commit & Release Protocol

DON'T commit anything to git in this project! This is done manually
