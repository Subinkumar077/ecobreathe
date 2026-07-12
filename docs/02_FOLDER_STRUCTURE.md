# 02 — Folder Structure

## Complete Project Directory

```
ecoBreathe/
├── public/
│   ├── favicon.ico                    # App favicon (custom air quality icon)
│   ├── robots.txt                     # SEO crawler directives
│   ├── sitemap.xml                    # SEO sitemap
│   └── images/
│       ├── og-image.png               # Open Graph social sharing image
│       ├── app-store-badge.png        # Placeholder App Store badge
│       ├── google-play-badge.png      # Placeholder Google Play badge
│       └── placeholder/
│           ├── blog-1.jpg             # Placeholder blog thumbnail
│           ├── blog-2.jpg             # Placeholder blog thumbnail
│           ├── blog-3.jpg             # Placeholder blog thumbnail
│           ├── device-mockup.png      # Placeholder device mockup
│           ├── tv-app-mockup.png      # Placeholder TV app mockup
│           ├── dashboard-mockup.png   # Placeholder dashboard mockup
│           └── hero-illustration.png  # Placeholder hero section illustration
│
├── src/
│   ├── main.jsx                       # Entry point: renders <App /> into DOM
│   ├── App.jsx                        # Root component: providers + router
│   ├── index.css                      # Global styles, CSS variables, resets
│   │
│   ├── assets/                        # Static assets imported in components
│   │   ├── icons/
│   │   │   ├── pollutants/
│   │   │   │   ├── pm25.svg           # PM2.5 icon
│   │   │   │   ├── pm10.svg           # PM10 icon
│   │   │   │   ├── co.svg             # CO icon
│   │   │   │   ├── no2.svg            # NO₂ icon
│   │   │   │   ├── so2.svg            # SO₂ icon
│   │   │   │   └── o3.svg             # O₃ icon
│   │   │   ├── weather/
│   │   │   │   ├── temperature.svg
│   │   │   │   ├── humidity.svg
│   │   │   │   ├── wind.svg
│   │   │   │   └── uv-index.svg
│   │   │   └── general/
│   │   │       ├── location.svg
│   │   │       ├── search.svg
│   │   │       ├── menu.svg
│   │   │       └── close.svg
│   │   └── images/
│   │       ├── logo.svg               # ecoBreathe logo (custom)
│   │       ├── logo-light.svg         # Light variant for dark backgrounds
│   │       └── aqi-scale.svg          # AQI color scale graphic
│   │
│   ├── components/                    # Reusable UI components
│   │   ├── common/                    # Shared across all pages
│   │   │   ├── Navbar/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Navbar.module.css
│   │   │   │   └── index.js           # Re-export for clean imports
│   │   │   ├── Footer/
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Footer.module.css
│   │   │   │   └── index.js
│   │   │   ├── SearchBar/
│   │   │   │   ├── SearchBar.jsx
│   │   │   │   ├── SearchBar.module.css
│   │   │   │   ├── SearchSuggestions.jsx
│   │   │   │   └── index.js
│   │   │   ├── Loader/
│   │   │   │   ├── Loader.jsx
│   │   │   │   ├── Loader.module.css
│   │   │   │   ├── SkeletonCard.jsx
│   │   │   │   ├── SkeletonCard.module.css
│   │   │   │   └── index.js
│   │   │   ├── ErrorBoundary/
│   │   │   │   ├── ErrorBoundary.jsx
│   │   │   │   ├── ErrorFallback.jsx
│   │   │   │   ├── ErrorFallback.module.css
│   │   │   │   └── index.js
│   │   │   ├── SEOHead/
│   │   │   │   ├── SEOHead.jsx         # Manages <title> and meta tags
│   │   │   │   └── index.js
│   │   │   └── ScrollToTop/
│   │   │       ├── ScrollToTop.jsx
│   │   │       └── index.js
│   │   │
│   │   ├── aqi/                       # AQI-specific components
│   │   │   ├── AQICard/
│   │   │   │   ├── AQICard.jsx         # Hero AQI display card
│   │   │   │   ├── AQICard.module.css
│   │   │   │   ├── AQIGauge.jsx        # Circular gauge visualization
│   │   │   │   └── index.js
│   │   │   ├── AQIScale/
│   │   │   │   ├── AQIScale.jsx        # AQI scale legend/explainer
│   │   │   │   ├── AQIScale.module.css
│   │   │   │   └── index.js
│   │   │   ├── PollutantCard/
│   │   │   │   ├── PollutantCard.jsx   # Individual pollutant display
│   │   │   │   ├── PollutantCard.module.css
│   │   │   │   └── index.js
│   │   │   ├── PollutantGrid/
│   │   │   │   ├── PollutantGrid.jsx   # Grid layout for all pollutants
│   │   │   │   ├── PollutantGrid.module.css
│   │   │   │   └── index.js
│   │   │   ├── WeatherStrip/
│   │   │   │   ├── WeatherStrip.jsx    # Weather info bar (temp, humidity, wind)
│   │   │   │   ├── WeatherStrip.module.css
│   │   │   │   └── index.js
│   │   │   ├── HealthAdvice/
│   │   │   │   ├── HealthAdvice.jsx    # Health advice section
│   │   │   │   ├── HealthAdvice.module.css
│   │   │   │   ├── CigaretteEquiv.jsx  # Cigarette equivalence widget
│   │   │   │   ├── DiseaseCard.jsx     # Individual disease risk card
│   │   │   │   ├── DiseaseCard.module.css
│   │   │   │   └── index.js
│   │   │   └── AQICalendar/
│   │   │       ├── AQICalendar.jsx     # Monthly AQI heatmap calendar
│   │   │       ├── AQICalendar.module.css
│   │   │       └── index.js
│   │   │
│   │   ├── charts/                    # Chart components
│   │   │   ├── HourlyChart/
│   │   │   │   ├── HourlyChart.jsx     # 24-hour AQI bar chart
│   │   │   │   ├── HourlyChart.module.css
│   │   │   │   └── index.js
│   │   │   ├── DailyChart/
│   │   │   │   ├── DailyChart.jsx      # 7-day trend line chart
│   │   │   │   ├── DailyChart.module.css
│   │   │   │   └── index.js
│   │   │   ├── TrendChart/
│   │   │   │   ├── TrendChart.jsx      # Monthly/Annual trend comparisons
│   │   │   │   ├── TrendChart.module.css
│   │   │   │   └── index.js
│   │   │   └── ChartControls/
│   │   │       ├── ChartControls.jsx   # Time-range selector tabs
│   │   │       ├── ChartControls.module.css
│   │   │       └── index.js
│   │   │
│   │   ├── map/                       # Map components
│   │   │   ├── AQIMap/
│   │   │   │   ├── AQIMap.jsx          # Main map with AQI markers
│   │   │   │   ├── AQIMap.module.css
│   │   │   │   ├── AQIMarker.jsx       # Custom colored map marker
│   │   │   │   ├── MapLegend.jsx       # Map color legend
│   │   │   │   └── index.js
│   │   │   └── MiniMap/
│   │   │       ├── MiniMap.jsx         # Small map preview on dashboard
│   │   │       ├── MiniMap.module.css
│   │   │       └── index.js
│   │   │
│   │   ├── rankings/                  # Ranking components
│   │   │   ├── CityRankingTable/
│   │   │   │   ├── CityRankingTable.jsx
│   │   │   │   ├── CityRankingTable.module.css
│   │   │   │   └── index.js
│   │   │   └── MetroCityCards/
│   │   │       ├── MetroCityCards.jsx   # Metro cities AQI comparison
│   │   │       ├── MetroCityCard.jsx    # Individual metro city card
│   │   │       ├── MetroCityCards.module.css
│   │   │       └── index.js
│   │   │
│   │   └── content/                   # Content/marketing sections
│   │       ├── BlogCard/
│   │       │   ├── BlogCard.jsx
│   │       │   ├── BlogCard.module.css
│   │       │   └── index.js
│   │       ├── BlogSection/
│   │       │   ├── BlogSection.jsx
│   │       │   ├── BlogSection.module.css
│   │       │   └── index.js
│   │       ├── EditorsPick/
│   │       │   ├── EditorsPick.jsx
│   │       │   ├── EditorsPick.module.css
│   │       │   └── index.js
│   │       ├── MediaCoverage/
│   │       │   ├── MediaCoverage.jsx
│   │       │   ├── MediaCoverage.module.css
│   │       │   └── index.js
│   │       ├── TrustedBy/
│   │       │   ├── TrustedBy.jsx
│   │       │   ├── TrustedBy.module.css
│   │       │   └── index.js
│   │       ├── SolutionsSection/
│   │       │   ├── SolutionsSection.jsx
│   │       │   ├── SolutionCard.jsx
│   │       │   ├── SolutionsSection.module.css
│   │       │   └── index.js
│   │       ├── AppPromotion/
│   │       │   ├── AppPromotion.jsx     # Mobile app download section
│   │       │   ├── AppPromotion.module.css
│   │       │   └── index.js
│   │       ├── SmartDeviceBanner/
│   │       │   ├── SmartDeviceBanner.jsx
│   │       │   ├── SmartDeviceBanner.module.css
│   │       │   └── index.js
│   │       └── AQIScaleExplainer/
│   │           ├── AQIScaleExplainer.jsx  # Full AQI scale with tabs
│   │           ├── AQIScaleExplainer.module.css
│   │           └── index.js
│   │
│   ├── pages/                         # Route-level page components
│   │   ├── Home/
│   │   │   ├── Home.jsx               # Landing page with all sections
│   │   │   ├── Home.module.css
│   │   │   └── index.js
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.jsx          # City-specific AQI dashboard
│   │   │   ├── Dashboard.module.css
│   │   │   └── index.js
│   │   ├── Rankings/
│   │   │   ├── Rankings.jsx           # City/country rankings page
│   │   │   ├── Rankings.module.css
│   │   │   └── index.js
│   │   ├── MapPage/
│   │   │   ├── MapPage.jsx            # Full-screen AQI map
│   │   │   ├── MapPage.module.css
│   │   │   └── index.js
│   │   ├── CityDetail/
│   │   │   ├── CityDetail.jsx         # Detailed city AQI with sub-locations
│   │   │   ├── CityDetail.module.css
│   │   │   └── index.js
│   │   └── NotFound/
│   │       ├── NotFound.jsx           # 404 page
│   │       ├── NotFound.module.css
│   │       └── index.js
│   │
│   ├── layouts/                       # Layout wrapper components
│   │   ├── MainLayout/
│   │   │   ├── MainLayout.jsx         # Navbar + content + Footer
│   │   │   ├── MainLayout.module.css
│   │   │   └── index.js
│   │   └── DashboardLayout/
│   │       ├── DashboardLayout.jsx    # Breadcrumbs + tabs + content
│   │       ├── DashboardLayout.module.css
│   │       └── index.js
│   │
│   ├── context/                       # React Context providers
│   │   ├── LocationContext.jsx        # User location state + geolocation
│   │   ├── AQIDataContext.jsx         # AQI data state + fetching
│   │   └── ThemeContext.jsx           # Dark/Light mode (future)
│   │
│   ├── hooks/                         # Custom React hooks
│   │   ├── useGeolocation.js          # Browser geolocation hook
│   │   ├── useAQIData.js             # Fetch and cache AQI data
│   │   ├── useWeatherData.js         # Fetch weather data
│   │   ├── useSearch.js              # Search with debounce
│   │   ├── useLocalStorage.js        # Persist state to localStorage
│   │   ├── useMediaQuery.js          # Responsive breakpoint detection
│   │   └── useInterval.js            # Auto-refresh interval hook
│   │
│   ├── services/                      # API service layer
│   │   ├── api/
│   │   │   ├── apiClient.js           # Axios instance with interceptors
│   │   │   ├── waqiApi.js             # WAQI API endpoints
│   │   │   ├── openWeatherApi.js      # OpenWeatherMap API endpoints
│   │   │   ├── iqairApi.js            # IQAir API endpoints (backup)
│   │   │   └── geocodingApi.js        # Reverse geocoding service
│   │   ├── aqiService.js             # AQI business logic
│   │   ├── weatherService.js         # Weather data processing
│   │   ├── locationService.js        # Location detection + search
│   │   └── cacheService.js           # In-memory API response cache
│   │
│   ├── utils/                         # Utility/helper functions
│   │   ├── aqiUtils.js               # AQI calculation, color mapping, labels
│   │   ├── dateUtils.js              # Date formatting helpers
│   │   ├── formatUtils.js            # Number formatting, units
│   │   ├── healthAdvice.js           # Health advisory data/logic
│   │   ├── constants.js              # App-wide constants
│   │   └── validators.js            # Input validation helpers
│   │
│   ├── data/                          # Static data files
│   │   ├── indianStates.js           # List of Indian states with codes
│   │   ├── indianCities.js           # Major Indian cities with lat/lng
│   │   ├── metroCities.js            # Metro city definitions
│   │   ├── aqiScaleData.js           # AQI scale categories and descriptions
│   │   ├── healthData.js             # Disease risk data by AQI level
│   │   ├── blogData.js               # Static blog/article entries
│   │   ├── solutionsData.js          # Solutions section content
│   │   └── mediaData.js             # Media coverage logos/links
│   │
│   └── router/                        # Routing configuration
│       └── routes.jsx                 # All route definitions with lazy loading
│
├── .env.example                       # Environment variable template
├── .env.local                         # Local environment variables (git-ignored)
├── .gitignore
├── .eslintrc.cjs                      # ESLint configuration
├── index.html                         # Vite HTML entry point
├── package.json
├── vite.config.js                     # Vite configuration
├── README.md                          # Project README
│
└── docs/                              # Project documentation (this folder)
    ├── 01_PROJECT_OVERVIEW.md
    ├── 02_FOLDER_STRUCTURE.md
    ├── 03_UI_BREAKDOWN.md
    ├── 04_COMPONENT_ARCHITECTURE.md
    ├── 05_API_RESEARCH.md
    ├── 06_DATA_FLOW.md
    ├── 07_IMPLEMENTATION_ROADMAP.md
    ├── 08_UI_CLONE_GUIDE.md
    ├── 09_DEPLOYMENT_GUIDE.md
    └── 10_IMPROVEMENTS.md
```

---

## Directory Explanations

### `public/`
Static files served as-is by Vite. Files here are NOT processed by the build pipeline. Use for:
- Favicon and SEO meta images
- `robots.txt` for search engine crawlers
- Placeholder images that don't need hashing

### `src/assets/`
Static assets that ARE processed by Vite's build pipeline. SVG icons and images placed here get:
- Content hashing for cache-busting
- Inline optimization for small files
- Import path resolution via `import icon from './icon.svg'`

### `src/components/`
Organized by **domain**, not by type. Each component gets its own folder with:
- Component file (`.jsx`)
- Scoped styles (`.module.css`)
- Re-export barrel file (`index.js`) for clean imports

**Subdirectories:**
| Folder | Purpose |
|--------|---------|
| `common/` | Shared across all pages (Navbar, Footer, SearchBar, Loader) |
| `aqi/` | AQI-specific display components (AQICard, PollutantCard, HealthAdvice) |
| `charts/` | All chart/graph components (HourlyChart, DailyChart, TrendChart) |
| `map/` | Map-related components (AQIMap, AQIMarker, MiniMap) |
| `rankings/` | Ranking tables and comparison cards |
| `content/` | Content/marketing sections (Blog, Solutions, Media, AppPromotion) |

### `src/pages/`
Route-level components — each maps to a URL path. Pages compose multiple components into full views.

| Page | Route | Description |
|------|-------|-------------|
| `Home` | `/` | Landing page with hero, scale, blog, solutions, etc. |
| `Dashboard` | `/dashboard/:country/:state/:city` | City-specific AQI dashboard |
| `Rankings` | `/rankings` | Polluted city/country rankings |
| `MapPage` | `/map` | Full-screen AQI map |
| `CityDetail` | `/dashboard/:country/:state/:city/:location` | Sub-location detail |
| `NotFound` | `*` | 404 error page |

### `src/layouts/`
Wrapper components that provide consistent page structure:
- **MainLayout**: Navbar → Page Content → Footer (used by Home, Rankings)
- **DashboardLayout**: Navbar → Breadcrumbs → Tab Navigation → Content → Footer (used by Dashboard, CityDetail)

### `src/context/`
React Context providers for global state:
- **LocationContext**: Current user location, detected vs. searched
- **AQIDataContext**: Cached AQI data, loading states, error states
- **ThemeContext**: Dark/light mode preference (future enhancement)

### `src/hooks/`
Custom hooks encapsulating reusable logic:

| Hook | Purpose |
|------|---------|
| `useGeolocation` | Browser Geolocation API with permission handling |
| `useAQIData` | Fetch, cache, and auto-refresh AQI data |
| `useWeatherData` | Fetch weather data for coordinates |
| `useSearch` | Debounced search with autocomplete suggestions |
| `useLocalStorage` | Read/write to localStorage with state sync |
| `useMediaQuery` | Responsive breakpoint detection (mobile/tablet/desktop) |
| `useInterval` | Set up auto-refresh intervals (5-min AQI refresh) |

### `src/services/`
API communication layer. Components never call APIs directly — they go through services.

**Sub-structure:**
- `api/` — Low-level API client configuration and endpoint wrappers
- Top-level service files — Business logic that combines multiple API calls

### `src/utils/`
Pure utility functions with no side effects:

| File | Purpose |
|------|---------|
| `aqiUtils.js` | `getAQICategory()`, `getAQIColor()`, `getAQILabel()` |
| `dateUtils.js` | `formatTimestamp()`, `getRelativeTime()`, `formatChartDate()` |
| `formatUtils.js` | `formatNumber()`, `formatUnit()`, `truncateText()` |
| `healthAdvice.js` | `getHealthAdvice(aqi)`, `getCigaretteEquivalent(pm25)` |
| `constants.js` | API URLs, breakpoints, refresh intervals, AQI thresholds |
| `validators.js` | `isValidCity()`, `isValidCoordinates()` |

### `src/data/`
Static JSON-like data files for content that doesn't come from APIs:

| File | Content |
|------|---------|
| `indianStates.js` | All 28 states + 8 UTs with slugs |
| `indianCities.js` | Top 500+ cities with lat/lng coordinates |
| `metroCities.js` | 8 metro cities (Delhi, Mumbai, Bangalore, etc.) |
| `aqiScaleData.js` | AQI categories with descriptions for US, India, China standards |
| `healthData.js` | Disease risk data: Asthma, Heart, Allergies, etc. |
| `blogData.js` | Static blog entries with placeholder images |
| `solutionsData.js` | Solutions cards content |
| `mediaData.js` | Media outlet names (no logos — use text/placeholders) |

### `src/router/`
Centralized routing configuration using React Router v7 with lazy loading:

```javascript
// Example route structure
const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'rankings', element: <Rankings /> },
      { path: 'map', element: <MapPage /> },
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { path: ':country/:state/:city', element: <Dashboard /> },
      { path: ':country/:state/:city/:location', element: <CityDetail /> },
    ]
  },
  { path: '*', element: <NotFound /> }
];
```

---

## Import Conventions

### Barrel Exports (index.js)
Every component folder has an `index.js` for clean imports:

```javascript
// src/components/aqi/AQICard/index.js
export { default } from './AQICard';

// Usage in pages:
import AQICard from '@/components/aqi/AQICard';
```

### Vite Path Aliases
Configure in `vite.config.js`:
```javascript
resolve: {
  alias: {
    '@': '/src',
    '@components': '/src/components',
    '@pages': '/src/pages',
    '@hooks': '/src/hooks',
    '@services': '/src/services',
    '@utils': '/src/utils',
    '@assets': '/src/assets',
    '@data': '/src/data',
    '@context': '/src/context',
  }
}
```

---

## Next Steps

Proceed to [03_UI_BREAKDOWN.md](./03_UI_BREAKDOWN.md) for a detailed breakdown of every page and section.
