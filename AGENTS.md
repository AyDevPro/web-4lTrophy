# Repository Guidelines

## Project Structure & Module Organization
The repository hosts a static microsite for the 4L Trophy team. HTML entry points (`index.html`, `contact.html`, `equipe.html`, `galerie.html`, `itineraire.html`, `sponsors.html`) sit at the root so they can be served directly. Global styling lives in `styles.css` with design tokens, gradients, and layout utilities; keep new page-specific rules close to related sections to preserve readability. Shared behaviour is centralized in `script.js`, which boots AOS animations and highlights the active navigation link. Static assets (team imagery, logos) remain alongside the pages; prefer reusing existing SVG and PNG naming patterns when adding media.

## Build, Test, and Development Commands
Use a lightweight HTTP server from the repo root to preview interactions and cross-page navigation:
- `python3 -m http.server 8000` — serves the site at `http://localhost:8000` and mimics the deployed folder structure.
- `npx serve .` — alternative node-based server that respects content-type headers for fonts and CSS.
Restart the server after structural changes to ensure cached assets update.

## Coding Style & Naming Conventions
Follow the existing two-space indentation in HTML and keep attribute ordering semantic (structure, behaviour, styling). CSS relies on compact selector blocks with tokenized colors (`--orange-500`, `--ink`); extend the palette by adding variables near the top of `styles.css`. Prefer utility-like class names (`.hero-immersive`, `.ticker`) and keep JavaScript in ES2015+ syntax without transpilation. Inline `<style>` blocks are acceptable for page-specific hero variations but default to the shared stylesheet when possible.

## Testing Guidelines
There is no automated test suite; rely on manual verification across modern desktop and mobile browsers. After changes, confirm smooth scroll behaviour, countdown animations, and section reveal timings with `prefers-reduced-motion` enabled to avoid regressions. Validate internal links and navigation highlighting on each HTML page. When adjusting layout, resize down to 320px width to ensure cards and typography remain legible.

## Commit & Pull Request Guidelines
Past commits use descriptive, sentence-case summaries followed by concise detail lines when necessary. Craft messages that explain the user-facing impact (e.g., “Refine gallery animations for lighter GPU usage”). Pull requests should link relevant issues, list touched pages, and attach before/after screenshots for visual tweaks. Note any manual test steps taken so reviewers can reproduce critical scenarios quickly.
