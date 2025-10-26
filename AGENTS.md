# Repository Guidelines

This repository hosts the Next.js site for the La Jerricane #311 4L Trophy project. The guidance below keeps contributions consistent, fast to review, and aligned with the live experience.

## Project Structure & Module Organization
- `src/app`: App Router routes, grouped by folders per page (`/itineraire`, `/sponsors`, etc.); keep shared layouts under `src/app/(shared)` or `src/app/layout.tsx`.
- `src/components`: Reusable UI (navigation, countdown, footer); favor colocated styles through Tailwind utilities.
- `src/lib`: Cross-cutting utilities (state, helpers).
- `public`: Static assets (logos, 3D textures) referenced via `/asset-name.ext`.
- Global styling and design tokens live in `tailwind.config.ts` and `postcss.config.js`.

## Build, Test, and Development Commands
- `pnpm install`: Sync dependencies with the checked-in `pnpm-lock.yaml`.
- `pnpm dev`: Run Next.js locally on port 3000 with hot reload.
- `pnpm build`: Production bundle; fails on type errors and missing env vars.
- `pnpm start`: Serve the optimized build (use when validating deployment artifacts).
- `pnpm lint`: Runs `next lint` (ESLint + built-in TypeScript analysis); fix warnings before opening a PR.

## Coding Style & Naming Conventions
- TypeScript + React function components only; use `"use client"` at the top when a component needs client-side hooks.
- Indentation is two spaces; keep imports sorted: external, absolute (`@/…`), then relative.
- Components and files use `PascalCase` (e.g., `Navigation.tsx`); hooks/utilities use `camelCase`.
- Tailwind classes encode most styling; prefer design tokens defined in `tailwind.config.ts` over literal hex values when possible.
- Keep copy in French unless there is an explicit bilingual requirement; store repeated strings in `src/lib/constants.ts` before reuse.

## Testing Guidelines
Automated tests are not yet wired up. When adding them, colocate component tests under `src/__tests__` or `*.spec.tsx` beside the component and run them before `pnpm build`. Always rely on `pnpm lint` + manual smoke tests (`pnpm dev` locally, check hero animations, scrolling, and 3D interactions) before submitting. Document any manual test matrix in the PR description until a test runner is introduced.

## Commit & Pull Request Guidelines
Follow the history pattern: imperative, descriptive messages that summarize scope (e.g., `Refactor itineraire layout for better responsiveness`). Group related changes into a single commit and keep diffs focused. PRs should include: purpose, screenshots or screen recordings for visual changes, steps to reproduce/verifications, and linked issues or tasks. Tag reviewers who own the touched area (`components`, `app/itineraire`, etc.) and wait for at least one approval before merging.
