# AGENTS.md — Delhi Breathe

This file is read automatically by Codex/AI coding agents before they touch this repo.
Read `docs/PRD.md`, `docs/DESIGN_SYSTEM.md`, and `docs/ROADMAP.md` before starting any task.

## What this project is

Delhi Breathe is a real-time air quality monitoring web app for Delhi (and eventually
other cities), inspired by IQAir's product but with its own visual identity. Data comes
from the OpenAQ v3 API through a Node/Express proxy (kept out of this repo's scope for
the frontend, lives in `/server`).

## Tech stack (do not substitute)

- React 18 + Vite
- Plain JavaScript (JSX), **not** TypeScript
- Tailwind CSS for styling — no CSS-in-JS, no styled-components
- React Router for pages (landing page ships first, routing added in Phase 2)
- Fetch API / axios for the proxy calls (Phase 2+)

## Golden rules

1. **Modular components only.** One component = one file = one responsibility.
   Landing-page sections live in `src/components/landing/`, shared chrome
   (header/footer/nav) lives in `src/components/layout/`, generic reusable
   pieces (buttons, cards, badges) live in `src/components/ui/`.
2. **No inline mock data in components.** Content arrays (products, news,
   organizations, cities) live in `src/data/*.js` and are imported. This keeps
   components dumb/presentational and easy to wire to the real API later.
3. **Design tokens live in `tailwind.config.js` and `src/index.css`.** Never
   hardcode a hex color inside a component — reference the token
   (`bg-charcoal`, `text-aqi-good`, etc). See `docs/DESIGN_SYSTEM.md`.
4. **Every section is its own component**, even if it's only used once, so
   pages stay short and reviewable (`App.jsx` / `LandingPage.jsx` should read
   like a table of contents).
5. **Accessibility & responsiveness are not optional.** Every interactive
   element needs visible focus states, alt text on images, and a working
   mobile layout (test at 375px, 768px, 1280px).
6. **Don't run `npm run build` or install new dependencies without checking
   `package.json` first** — keep the dependency footprint small.
7. **Commit style:** small, single-purpose commits. One landing-page section
   per commit is ideal so history doubles as a changelog.

## How to run

```bash
npm install
npm run dev       # localhost:5173
npm run build      # production build
npm run lint        # eslint
```

## Current status

- [x] Project scaffold + design tokens
- [x] Landing page v1 (static content, no live API yet)
- [ ] Live AQI map (Phase 2 — needs the Express proxy + OpenAQ v3)
- [ ] City search + "Help Me Choose" flow
- [ ] Product detail pages
- [ ] News/article pages

When picking up a task, check `docs/ROADMAP.md` for the next unchecked item and
open a small PR against just that item.
