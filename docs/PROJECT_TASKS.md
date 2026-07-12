# ecoBreathe Project Tasks

This document tracks the progress of the implementation roadmap.

## Phase 1: Project Setup (Day 1–2)

### Day 1: Initialize Project
- [x] Create Vite + React project (`npx create-vite@latest ./ --template react`)
- [x] Install core dependencies (`npm install react-router-dom axios recharts date-fns react-icons`)
- [x] Install map dependencies (`npm install leaflet react-leaflet`)
- [x] Install development dependencies (`npm install -D eslint @eslint/js eslint-plugin-react`)
- [x] Configure Vite path aliases (`vite.config.js`)
- [x] Set up ESLint configuration
- [x] Create `.env.example` and `.env.local` with API key placeholders
- [x] Create `.gitignore` (include `.env.local`)
- [x] Initialize git repository (if not already done)

### Day 2: Create Folder Structure
- [x] Create all directories as specified in `02_FOLDER_STRUCTURE.md`
- [x] Create barrel `index.js` files for all component folders
- [x] Set up `src/index.css` with CSS reset and variables
- [x] Create `src/App.jsx` with router setup
- [x] Create `src/main.jsx` entry point
- [x] Create basic `MainLayout` and `DashboardLayout` shells
- [x] Verify hot-reload works with a "Hello World" render

## Phase 2: Foundation (Day 3–5)

### Day 3: Design System
- [x] Define CSS custom properties in `index.css`
- [x] Create `src/utils/constants.js` with all app constants
- [x] Create `src/utils/aqiUtils.js`

### Day 4: Static Data Files
- [x] Create `src/data/indianStates.js`
- [x] Create `src/data/indianCities.js`
- [x] Create `src/data/metroCities.js`
- [x] Create `src/data/aqiScaleData.js`
- [x] Create `src/data/healthData.js`
- [x] Create `src/data/blogData.js`
- [x] Create `src/data/solutionsData.js`
- [x] Create `src/data/mediaData.js`

### Day 5: Routing Setup
- [x] Create `src/router/routes.jsx`
- [x] Implement lazy loading
- [x] Create page shell components (Home, Dashboard, Rankings, MapPage, NotFound)
- [x] Create `Navbar` component (without search functionality yet)
- [x] Create `Footer` component
- [x] Create `BottomNav` component (mobile)
- [x] Create `ScrollToTop` component
- [x] Test all routes navigate correctly

## Phase 3: API Integration (Day 6–10)
- [x] API Client Setup
- [x] Cache Service
- [x] Service Layer
- [x] Context Providers
- [x] Custom Hooks

## Phase 4: Core Dashboard UI (Day 11–18)
- [x] AQICard + AQIGauge
- [x] WeatherStrip + MiniMap
- [x] PollutantCard + PollutantGrid
- [x] HourlyChart
- [x] DailyChart + TrendChart
- [x] HealthAdvice Section
- [x] MetroCityCards + CityRankingTable
- [x] Dashboard Page Assembly

## Phase 5: Home Page (Day 19–22)
- [x] AQI Scale Explainer
- [x] Product Showcase Sections
- [x] Content Sections
- [x] Home Page Assembly

## Phase 6: Map & Rankings (Day 23–25)
- [x] Full Map Page
- [x] Map Interactions
- [x] Rankings Page

## Phase 7: Polish (Day 26–28)
- [x] Responsive Design
- [x] Animations & Micro-interactions
- [x] Error States & SEO

## Phase 8: Deployment (Day 29–30)
- [x] Pre-Deployment Checks
- [x] Deploy
