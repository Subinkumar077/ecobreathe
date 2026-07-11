# Design System — Delhi Breathe

Visual identity is built around the thing the product measures: smog itself.
The signature element is the **AQI dial** — a color-coded arc that reads like
an instrument gauge, used in the hero and reused as a small widget elsewhere.
This is deliberately not the generic cream+terracotta or black+neon template —
it's a warm-charcoal, instrument-panel feel grounded in actual AQI color bands.

## Color tokens (`tailwind.config.js` → `theme.extend.colors`)

| Token | Hex | Use |
|---|---|---|
| `charcoal` | `#1C1B1A` | Primary dark background (header, footer, mission banner) |
| `charcoal-soft` | `#26241F` | Secondary dark surface (cards on dark bg) |
| `haze` | `#F4F1E8` | Light background / page base |
| `paper` | `#FFFFFF` | Card surfaces on light bg |
| `ink` | `#20201C` | Primary text on light bg |
| `ink-muted` | `#5B584F` | Secondary text |
| `aqi-good` | `#3E7C59` | Good (0–50) |
| `aqi-moderate` | `#E8A33D` | Moderate (51–100) |
| `aqi-unhealthy` | `#C4432B` | Unhealthy (101–200) |
| `aqi-hazardous` | `#7A2048` | Very unhealthy / hazardous (200+) |
| `accent-amber` | `#E8A33D` | CTAs, links, highlight text (shared w/ moderate band on purpose) |

## Typography

- **Display (headlines):** `Space Grotesk` — geometric, technical, reads like
  instrumentation/data-forward rather than editorial. Used bold, tight
  tracking, large sizes only.
- **Body:** `Inter` — neutral, highly legible at small sizes for dense
  guidance text.
- **Data/mono (AQI numbers, timestamps, coordinates):** `IBM Plex Mono` — used
  sparingly, only where a number is literally a reading off the instrument.

Type scale (Tailwind default rem scale, mapped):
- Hero number: `text-8xl md:text-9xl` (mono)
- H1: `text-4xl md:text-6xl` (display, font-bold)
- H2: `text-3xl md:text-4xl` (display, font-semibold)
- Body: `text-base md:text-lg` (Inter, leading-relaxed)
- Caption/eyebrow: `text-xs uppercase tracking-[0.2em]` (Inter, font-medium)

## Layout

- Max content width: `max-w-7xl`, gutters `px-6 md:px-10`.
- Section vertical rhythm: `py-16 md:py-24`.
- Border radius: small and consistent — `rounded-xl` for cards, `rounded-full`
  only for pills/badges/the AQI dial. No mixed radii within one section.
- Dark sections (charcoal) alternate with light (haze) sections to create
  rhythm down the page — never two dark or two light sections back-to-back
  without a visual break.

## Motion

- One orchestrated moment: the AQI dial arc animates in (draws from 0 to the
  current reading) on hero load. Respect `prefers-reduced-motion` — fall back
  to a static arc.
- Everything else: subtle, fast (150–200ms) hover/focus transitions only. No
  scroll-jacking, no parallax.

## Accessibility baseline

- Visible focus ring: `focus-visible:ring-2 focus-visible:ring-accent-amber`
- Color is never the only signal for AQI band — always pair with a text label
  ("Moderate", "Unhealthy") and an icon.
- Minimum contrast: body text on `haze` uses `ink`, never `ink-muted` below
  16px.
