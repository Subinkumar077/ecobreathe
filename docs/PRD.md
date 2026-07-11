# PRD — Delhi Breathe

## Problem

Delhi residents need a fast, trustworthy read on current air quality and clear
guidance on what to do about it (mask up, run a purifier, keep kids inside).
Existing government dashboards are dense and not action-oriented; Delhi
Breathe should feel like a health tool first, a data tool second.

## Audience

- Primary: Delhi residents checking AQI daily (mobile-first, quick glance).
- Secondary: schools, offices, and clinics wanting to embed/reference live data.
- Tertiary: people researching purifiers/masks and comparing products.

## Product pillars (in priority order)

1. **Live AQI at a glance** — a hero reading + gauge, no scrolling required.
2. **Actionable guidance** — what today's number means for going outside,
   exercising, opening windows.
3. **Products that solve the problem** — masks, purifiers, monitors, matched
   to the day's air quality.
4. **Trust** — data sourcing (OpenAQ / CPCB), methodology, and credibility
   signals (institutions, awards, testimonials) without overwhelming the page.

## Landing page — sections (Phase 1, this build)

| # | Section | Purpose | Data source |
|---|---------|---------|-------------|
| 1 | Header/Nav | Wayfinding, city search entry point | static |
| 2 | Hero — Live AQI | The thesis: current reading + short forecast teaser | `src/data/aqi.js` (mock now, OpenAQ later) |
| 3 | Understand Your Air | 3–4 short cards explaining AQI bands (good/moderate/unhealthy/hazardous) | static |
| 4 | Product Showcase | Masks/purifiers/monitors carousel | `src/data/products.js` |
| 5 | Trusted By | Institutions/partners strip | `src/data/partners.js` |
| 6 | Mission banner | Full-bleed image + short mission statement + CTA | static |
| 7 | Help Me Choose | Short quiz CTA driving to product recommender (future page) | static |
| 8 | Air Quality News | 3 article teaser cards | `src/data/news.js` |
| 9 | For Communities/Orgs | Grid: schools, hospitals, offices, labs | `src/data/organizations.js` |
| 10 | Footer | Links, newsletter signup, socials | static |

Sections intentionally condensed vs. the IQAir reference (which has ~16
sections) — cut anything that doesn't serve the four pillars above, to keep
the page fast and focused rather than a 1:1 clone.

## Out of scope for Phase 1

- Real live map (needs the proxy + OpenAQ integration — Phase 2)
- Search/city switch functionality (Phase 2)
- Auth, checkout, cart (not planned unless requested)
- CMS-driven news content (static array for now)

## Success criteria for this phase

- Landing page renders correctly at 375px / 768px / 1280px+
- All sections are independently swappable components
- No hardcoded copy/data inside JSX — pulled from `src/data/*`
- Lighthouse accessibility score ≥ 90 on a local build
