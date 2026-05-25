# pm-tests-piggybacks

## Table of contents

- [Overview](#overview)
- [Adding a new page](#adding-a-new-page)
- [URLs](#urls)
- [Shared code](#shared-code)

## Overview

**pm-tests-piggybacks** is a small **multi-page (MPA)** front-end used for **piggyback / PM-related tests** (see `package.json` description). The app is built with **Vite** and **TypeScript**: the site root is one HTML entry, and each **first-level folder** under `pages/` is another HTML entry with its own scripts and styles.

A **page list** is generated from the filesystem so the shared header can render navigation links without hand-maintaining URLs. The generator (`pnpm gen:pages`) writes `src/components/9-pages.ts`; **`pnpm dev`** and **`pnpm build`** run that step first. Shared utilities used across pages live in **`shared/`** and are imported via the **`@shared/*`** path alias.

## Adding a new page

1. **Create a folder** under `pages/`, for example `pages/my-feature/`.

2. **Add `index.html`** inside that folder. It is required: the page generator scans **every direct child directory** of `pages/` and expects `index.html` in each one. If any folder is missing it, `pnpm gen:pages` will fail with a clear error.

3. **Wire scripts and styles** (same pattern as existing pages such as `pages/page-b/`):
   - In `<head>`, link shared nav styles:  
     `<link rel="stylesheet" href="/src/nav.css" />`
   - Shared header/nav (built from generated data):  
     `<script type="module" src="/src/components/1-headers.ts"></script>`
   - Optional page bundle:  
     `<script type="module" src="./main.ts"></script>`
   - Keep a placeholder for the nav:  
     `<nav id="page-nav" aria-label="Pages"></nav>`

4. **Optional `main.ts`** (and `style.css`, etc.) next to `index.html` for page-only TypeScript and CSS.

5. **Regenerate the page list** so the root nav includes your route:

   ```bash
   pnpm gen:pages
   ```

   This runs `scripts/generate-pages.js` and updates `src/components/9-pages.ts` (do not edit that file by hand). `pnpm dev` and `pnpm build` run `gen:pages` first.

6. **Build / preview** as usual:

   ```bash
   pnpm dev
   pnpm build
   pnpm preview
   ```

## URLs

Each page is served as a separate URL, for example:

`/pages/my-feature/`

In `9-pages.ts`, each entry’s `path` is stored as a **repo-root-relative** string with a **`./`** prefix (for example `./pages/my-feature`). Nav and tooling strip that when building absolute paths like `/pages/my-feature/`.

## Shared code

Reusable helpers and types live under `shared/` and are imported with the `@shared/…` alias (see `tsconfig.json` and `vite.config.ts`).
