# 07 — Implementation Roadmap

This document provides a day-by-day development plan from project initialization to deployment. Estimated timeline: **4–5 weeks** for a solo developer.

---

## Phase Overview

| Phase | Days | Focus | Deliverable |
|-------|------|-------|-------------|
| **Phase 1** | Day 1–2 | Project Setup | Vite + React scaffold, dependencies, config |
| **Phase 2** | Day 3–5 | Foundation | Design system, layout, routing, static data |
| **Phase 3** | Day 6–10 | API Integration | Services, context, hooks, data fetching |
| **Phase 4** | Day 11–18 | Core UI | Dashboard, AQI cards, pollutants, charts |
| **Phase 5** | Day 19–22 | Home Page | Landing page sections, content components |
| **Phase 6** | Day 23–25 | Map & Rankings | Leaflet map, ranking tables |
| **Phase 7** | Day 26–28 | Polish | Responsive, animations, error states, SEO |
| **Phase 8** | Day 29–30 | Deploy | Vercel/Netlify deployment, final testing |

---

## Phase 1: Project Setup (Day 1–2)

### Day 1: Initialize Project

- [ ] Create Vite + React project:
  ```bash
  npx -y create-vite@latest ./ --template react
  ```
- [ ] Install core dependencies:
  ```bash
  npm install react-router-dom axios recharts date-fns react-icons
  ```
- [ ] Install map dependencies:
  ```bash
  npm install leaflet react-leaflet
  ```
- [ ] Install development dependencies:
  ```bash
  npm install -D eslint @eslint/js eslint-plugin-react
  ```
- [ ] Configure Vite path aliases (`vite.config.js`)
- [ ] Set up ESLint configuration
- [ ] Create `.env.example` and `.env.local` with API key placeholders
- [ ] Create `.gitignore` (include `.env.local`)
- [ ] Initialize git repository

### Day 2: Create Folder Structure

- [ ] Create all directories as specified in `02_FOLDER_STRUCTURE.md`
- [ ] Create barrel `index.js` files for all component folders
- [ ] Set up `src/index.css` with CSS reset and variables
- [ ] Create `src/App.jsx` with router setup
- [ ] Create `src/main.jsx` entry point
- [ ] Create basic `MainLayout` and `DashboardLayout` shells
- [ ] Verify hot-reload works with a "Hello World" render

**Milestone**: ✅ App runs with Vite dev server, folder structure complete

---

## Phase 2: Foundation (Day 3–5)

### Day 3: Design System

- [ ] Define CSS custom properties in `index.css`:
  - Colors (AQI palette: green→maroon + UI neutrals)
  - Typography (Inter font family, size scale)
  - Spacing scale (4px base)
  - Breakpoints (480, 768, 1024, 1440)
  - Shadows, border-radius, transitions
- [ ] Create `src/utils/constants.js` with all app constants
- [ ] Create `src/utils/aqiUtils.js`:
  - `getAQICategory(value)` → category name
  - `getAQIColor(value)` → hex color
  - `getAQILabel(value)` → label + icon
  - `getAQIDescription(value)` → health description

### Day 4: Static Data Files

- [ ] Create `src/data/indianStates.js` — all 36 states/UTs with slugs
- [ ] Create `src/data/indianCities.js` — top 500+ cities with lat/lng
- [ ] Create `src/data/metroCities.js` — 8 metro cities
- [ ] Create `src/data/aqiScaleData.js` — AQI scale categories (US, India, China)
- [ ] Create `src/data/healthData.js` — disease risk data by AQI level
- [ ] Create `src/data/blogData.js` — 10 placeholder blog entries
- [ ] Create `src/data/solutionsData.js` — solutions section content
- [ ] Create `src/data/mediaData.js` — media outlet text names

### Day 5: Routing Setup

- [ ] Create `src/router/routes.jsx` with all route definitions
- [ ] Implement lazy loading with `React.lazy()` and `Suspense`
- [ ] Create page shell components (Home, Dashboard, Rankings, MapPage, NotFound)
- [ ] Create `Navbar` component (without search functionality yet)
- [ ] Create `Footer` component
- [ ] Create `BottomNav` component (mobile)
- [ ] Create `ScrollToTop` component
- [ ] Test all routes navigate correctly

**Milestone**: ✅ All routes work, layout renders, design system defined

---

## Phase 3: API Integration (Day 6–10)

### Day 6: API Client Setup

- [ ] Sign up for API keys: WAQI, OpenWeatherMap, IQAir
- [ ] Create `src/services/api/apiClient.js` (Axios instance):
  - Base URL configuration
  - Request interceptor (add API tokens)
  - Response interceptor (error normalization)
  - Timeout: 10 seconds
- [ ] Create `src/services/api/waqiApi.js`:
  - `getCityFeed(city)` — get AQI by city name
  - `getGeoFeed(lat, lng)` — get AQI by coordinates
  - `search(keyword)` — search cities
  - `getMapBounds(lat1, lng1, lat2, lng2)` — get map stations
- [ ] Create `src/services/api/openWeatherApi.js`:
  - `getWeather(lat, lng)` — current weather
  - `getAirPollution(lat, lng)` — current air pollution
  - `getAirPollutionForecast(lat, lng)` — 4-day forecast
  - `getAirPollutionHistory(lat, lng, start, end)` — historical

### Day 7: Cache Service

- [ ] Create `src/services/cacheService.js`:
  - In-memory Map-based cache
  - TTL-based expiration (default 5 minutes)
  - localStorage persistence for last-known data
  - Cache eviction on memory pressure
- [ ] Test cache hit/miss scenarios

### Day 8: Service Layer

- [ ] Create `src/services/aqiService.js`:
  - `getAQIData(citySlug)` — orchestrates WAQI + OWM
  - `normalizeData(waqiResponse, owmResponse)` — data normalization
  - `getMetroCitiesData()` — parallel fetch for 8 metro cities
  - `getRankingData(limit)` — top polluted cities
- [ ] Create `src/services/weatherService.js`
- [ ] Create `src/services/locationService.js`:
  - `detectLocation()` — browser geolocation + reverse geocode
  - `reverseGeocode(lat, lng)` — convert coordinates to city name

### Day 9: Context Providers

- [ ] Create `src/context/LocationContext.jsx`:
  - State: location, source, geoPermission, isDetecting
  - Actions: SET_LOCATION, DETECTION_START/SUCCESS/FAILURE
  - Auto-detect on mount
  - Persist to localStorage
- [ ] Create `src/context/AQIDataContext.jsx`:
  - State: currentData, isLoading, error, metroCitiesData, rankingData
  - Actions: FETCH_START/SUCCESS/ERROR, REFRESH, SET_METRO, SET_RANKINGS
  - Watch for location changes → fetch data
  - Auto-refresh timer (5 minutes)

### Day 10: Custom Hooks

- [ ] Create `src/hooks/useGeolocation.js`
- [ ] Create `src/hooks/useAQIData.js` (reads from context)
- [ ] Create `src/hooks/useWeatherData.js`
- [ ] Create `src/hooks/useSearch.js` (debounced search)
- [ ] Create `src/hooks/useLocalStorage.js`
- [ ] Create `src/hooks/useMediaQuery.js`
- [ ] Create `src/hooks/useInterval.js`
- [ ] Test data flow end-to-end: location detection → API fetch → data display

**Milestone**: ✅ Live AQI data fetching works, auto-refresh running

---

## Phase 4: Core Dashboard UI (Day 11–18)

### Day 11: AQICard + AQIGauge

- [ ] Build `AQIGauge` component (SVG circular gauge with animation)
- [ ] Build `AQICard` component (hero card with gauge, category, last updated)
- [ ] Style with CSS Modules to match reference dark theme
- [ ] Add color-coded border/glow based on AQI category

### Day 12: WeatherStrip + MiniMap

- [ ] Build `WeatherStrip` component (temp, condition, humidity, wind, UV)
- [ ] Build `MiniMap` component (small Leaflet map, single marker)
- [ ] Integrate WeatherStrip into AQICard layout
- [ ] Position MiniMap in dashboard hero section

### Day 13: PollutantCard + PollutantGrid

- [ ] Build `PollutantCard` component (name, value, unit, progress bar)
- [ ] Build `PollutantGrid` component (3×2 responsive grid)
- [ ] Create SVG icons for each pollutant
- [ ] Color-code progress bars based on individual pollutant AQI sub-index

### Day 14: HourlyChart

- [ ] Build `ChartControls` component (time range tabs)
- [ ] Build `HourlyChart` with Recharts `BarChart`
- [ ] Color-coded bars (each bar colored by its AQI category)
- [ ] Custom tooltip showing exact value and time
- [ ] Responsive container

### Day 15: DailyChart + TrendChart

- [ ] Build `DailyChart` with Recharts `AreaChart` or `LineChart`
- [ ] Build `TrendChart` for multi-year comparison
- [ ] Ensure charts handle missing data gracefully

### Day 16: HealthAdvice Section

- [ ] Build `CigaretteEquiv` component (PM2.5 → cigarettes calculation)
- [ ] Build `ProtectionCard` components (purifier, car filter, mask, outdoor)
- [ ] Build `DiseaseCard` component (expandable accordion with Do's/Don'ts)
- [ ] Build `HealthAdvice` container component
- [ ] Create `src/utils/healthAdvice.js` for risk calculations

### Day 17: MetroCityCards + CityRankingTable

- [ ] Build `MetroCityCard` component
- [ ] Build `MetroCityCards` grid (8 cards)
- [ ] Build `CityRankingTable` component with color-coded rows
- [ ] Add "× above standard" calculation

### Day 18: Dashboard Page Assembly

- [ ] Build `Breadcrumbs` component
- [ ] Build `DashboardTabs` component
- [ ] Assemble `Dashboard` page with all sections
- [ ] Build `AQICalendar` component (monthly heatmap)
- [ ] Add `SkeletonCard` loading states for each section
- [ ] Test with live data

**Milestone**: ✅ Complete dashboard with live AQI data, charts, health advice

---

## Phase 5: Home Page (Day 19–22)

### Day 19: AQI Scale Explainer

- [ ] Build `AQIScaleExplainer` with tabbed interface (US/India/China)
- [ ] Build `ScaleCard` components for each AQI category
- [ ] Add smooth tab switching animation

### Day 20: Product Showcase Sections

- [ ] Build `AppPromotion` section (mobile app, TV app, dashboard, API, widgets)
- [ ] Build `SmartDeviceBanner` with device cards
- [ ] Generate placeholder device mockup images (phone, TV, laptop)
- [ ] Style cards with dark theme glassmorphism

### Day 21: Content Sections

- [ ] Build `BlogSection` with `BlogCard` grid
- [ ] Build `EditorsPick` featured article section
- [ ] Build `MediaCoverage` horizontal carousel
- [ ] Build `TrustedBy` logo grid
- [ ] Generate placeholder images for blogs

### Day 22: Home Page Assembly

- [ ] Build `SolutionsSection` with `SolutionCard` grid
- [ ] Build `CountryGrid` for world links (India-focused)
- [ ] Assemble `Home` page with all sections
- [ ] Add smooth scroll between sections
- [ ] Add section entry animations (intersection observer)

**Milestone**: ✅ Complete home page with all sections matching reference layout

---

## Phase 6: Map & Rankings (Day 23–25)

### Day 23: Full Map Page

- [ ] Build `AQIMap` component with Leaflet + OpenStreetMap tiles
- [ ] Build `AQIMarker` custom markers (circle with AQI color + value)
- [ ] Implement marker clustering at low zoom levels
- [ ] Build `MapLegend` component
- [ ] Fetch stations using WAQI map bounds API
- [ ] Center on user location with auto-zoom

### Day 24: Map Interactions

- [ ] Click marker → show popup with city details
- [ ] Click popup → navigate to city dashboard
- [ ] Add zoom controls
- [ ] Implement lazy loading of stations on viewport change
- [ ] Mobile-optimized map controls

### Day 25: Rankings Page

- [ ] Build full `Rankings` page with sortable table
- [ ] Add state filter dropdown
- [ ] Add live/historic toggle
- [ ] Pagination or infinite scroll
- [ ] Color-coded AQI badges in table rows

**Milestone**: ✅ Interactive map and rankings pages functional

---

## Phase 7: Polish (Day 26–28)

### Day 26: Responsive Design

- [ ] Test all pages at every breakpoint (480, 768, 1024, 1440)
- [ ] Fix grid layouts for mobile
- [ ] Test horizontal scrollable tabs on mobile
- [ ] Ensure touch targets are ≥ 44px on mobile
- [ ] Test MiniMap and full map on mobile
- [ ] Bottom navigation visibility and functionality

### Day 27: Animations & Micro-interactions

- [ ] Add page transition animations (fade in/out)
- [ ] Add scroll-triggered section animations (slide up)
- [ ] Add hover effects on all cards
- [ ] Add gauge animation on data load
- [ ] Add chart entry animations
- [ ] Add smooth search suggestion dropdown
- [ ] Add navbar background transition on scroll

### Day 28: Error States & SEO

- [ ] Build `ErrorBoundary` with friendly error UI
- [ ] Build `ErrorFallback` component with retry button
- [ ] Build `NotFound` (404) page
- [ ] Add network error banner (offline detection)
- [ ] Implement `SEOHead` component on all pages
- [ ] Add dynamic `<title>` and `<meta description>` per city
- [ ] Add Open Graph tags for social sharing
- [ ] Create `robots.txt` and basic `sitemap.xml`
- [ ] Add `aria-labels` for accessibility
- [ ] Test with Lighthouse

**Milestone**: ✅ Polished, responsive, accessible, SEO-optimized

---

## Phase 8: Deployment (Day 29–30)

### Day 29: Pre-Deployment Checks

- [ ] Run `npm run build` — verify no build errors
- [ ] Check bundle size (target < 200KB gzipped)
- [ ] Test production build locally: `npx vite preview`
- [ ] Remove all `console.log` statements (except error logging)
- [ ] Verify all API keys work in production mode
- [ ] Test with throttled network (3G simulation)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)

### Day 30: Deploy

- [ ] Deploy to Vercel (see `09_DEPLOYMENT_GUIDE.md`)
- [ ] Configure environment variables on hosting platform
- [ ] Test production URL across devices
- [ ] Create `README.md` with setup and usage instructions
- [ ] Update documentation if any changes were made during development
- [ ] Create a brief demo recording or screenshots

**Milestone**: ✅ Application live and accessible at production URL

---

## Priority Matrix

Tasks ranked by impact and effort:

| Priority | Feature | Impact | Effort | Phase |
|----------|---------|--------|--------|-------|
| P0 | AQI Card + Gauge | Critical | Medium | 4 |
| P0 | Pollutant Grid | Critical | Low | 4 |
| P0 | API Integration | Critical | High | 3 |
| P0 | Location Detection | Critical | Medium | 3 |
| P0 | Search | Critical | Medium | 3 |
| P1 | Charts (Hourly) | High | Medium | 4 |
| P1 | Health Advice | High | Medium | 4 |
| P1 | Metro City Cards | High | Low | 4 |
| P1 | City Rankings Table | High | Medium | 4 |
| P1 | Responsive Design | High | High | 7 |
| P2 | Home Page Sections | Medium | High | 5 |
| P2 | AQI Map | Medium | High | 6 |
| P2 | Full Rankings Page | Medium | Medium | 6 |
| P2 | AQI Calendar | Medium | Medium | 4 |
| P3 | Blog Section | Low | Low | 5 |
| P3 | Media Coverage | Low | Low | 5 |
| P3 | Trusted By | Low | Low | 5 |
| P3 | Solutions Section | Low | Medium | 5 |
| P3 | SEO Optimization | Low | Low | 7 |

---

## Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| API rate limit hit | Medium | High | Caching + fallback APIs |
| API key exposure | Low | Medium | Free tier = minimal risk |
| Large bundle size | Medium | Medium | Code splitting + lazy loading |
| WAQI API downtime | Low | High | IQAir fallback + localStorage |
| Slow initial load | Medium | Medium | Skeleton loading + code splitting |
| Mobile layout issues | High | Medium | Mobile-first approach + testing |

---

## Next Steps

Proceed to [08_UI_CLONE_GUIDE.md](./08_UI_CLONE_GUIDE.md) for section-by-section design recreation guidance.
