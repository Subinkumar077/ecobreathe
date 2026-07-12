# 04 — Component Architecture

This document details every reusable component in the ecoBreathe application, including responsibilities, props, state, and reusability patterns.

---

## Component Hierarchy Overview

```
App
├── MainLayout
│   ├── Navbar
│   │   ├── Logo
│   │   ├── NavDropdown (×3)
│   │   ├── SearchBar
│   │   │   └── SearchSuggestions
│   │   └── MobileMenu
│   │
│   ├── [Page Content]
│   │   ├── Home
│   │   │   ├── AQIScaleExplainer
│   │   │   │   ├── ScaleTab
│   │   │   │   └── ScaleCard (×6)
│   │   │   ├── AppPromotion
│   │   │   │   └── ProductCard (×5)
│   │   │   ├── SolutionsSection
│   │   │   │   └── SolutionCard (×15+)
│   │   │   ├── SmartDeviceBanner
│   │   │   │   └── DeviceCard (×3)
│   │   │   ├── BlogSection
│   │   │   │   └── BlogCard (×10)
│   │   │   ├── EditorsPick
│   │   │   ├── MediaCoverage
│   │   │   ├── TrustedBy
│   │   │   └── CountryGrid
│   │   │
│   │   ├── Dashboard
│   │   │   ├── Breadcrumbs
│   │   │   ├── DashboardTabs
│   │   │   ├── AQICard
│   │   │   │   ├── AQIGauge
│   │   │   │   └── WeatherStrip
│   │   │   ├── MiniMap
│   │   │   ├── PollutantGrid
│   │   │   │   └── PollutantCard (×6)
│   │   │   ├── HourlyChart
│   │   │   │   └── ChartControls
│   │   │   ├── TrendChart
│   │   │   ├── AQICalendar
│   │   │   ├── HealthAdvice
│   │   │   │   ├── CigaretteEquiv
│   │   │   │   ├── ProtectionCard (×4)
│   │   │   │   └── DiseaseCard (×6)
│   │   │   ├── MetroCityCards
│   │   │   │   └── MetroCityCard (×8)
│   │   │   ├── CityRankingTable
│   │   │   │   └── RankingRow (×10)
│   │   │   └── LocationGrid
│   │   │
│   │   ├── Rankings
│   │   │   └── CityRankingTable (full)
│   │   │
│   │   └── MapPage
│   │       ├── AQIMap
│   │       │   ├── AQIMarker (×N)
│   │       │   └── MapLegend
│   │       └── MapControls
│   │
│   ├── Footer
│   │   ├── FooterColumn (×4)
│   │   └── SocialLinks
│   │
│   └── BottomNav (mobile only)
│
├── ErrorBoundary
│   └── ErrorFallback
│
├── Loader / SkeletonCard
├── SEOHead
└── ScrollToTop
```

---

## Common Components

### 1. Navbar

**File**: `src/components/common/Navbar/Navbar.jsx`

**Responsibilities**:
- Display brand logo with link to home
- Render navigation dropdown menus (Ranking, Products, Resources)
- Embed the SearchBar component
- Handle mobile hamburger menu toggle
- Sticky positioning on scroll

**Props**: None (uses internal state and context)

**State**:
| State | Type | Description |
|-------|------|-------------|
| `isMobileMenuOpen` | `boolean` | Controls mobile slide-in menu |
| `activeDropdown` | `string\|null` | Currently open dropdown ID |

**Key Behaviors**:
- Closes dropdowns when clicking outside (use `useRef` + `useEffect`)
- Collapses to hamburger below 1024px
- Navbar background opacity changes on scroll (glassmorphism effect)

**Reusability**: Single instance, used in `MainLayout`

---

### 2. SearchBar

**File**: `src/components/common/SearchBar/SearchBar.jsx`

**Responsibilities**:
- Text input with search icon
- Debounced search (300ms delay)
- Display autocomplete suggestions dropdown
- Navigate to city dashboard on selection
- Support keyboard navigation (up/down arrows, Enter)

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `'Search city, state...'` | Input placeholder |
| `onSearch` | `function` | — | Callback when search submitted |
| `variant` | `'navbar'\|'hero'\|'fullscreen'` | `'navbar'` | Style variant |
| `autoFocus` | `boolean` | `false` | Focus on mount |

**State**:
| State | Type | Description |
|-------|------|-------------|
| `query` | `string` | Current input value |
| `suggestions` | `array` | Filtered city/state suggestions |
| `isOpen` | `boolean` | Suggestion dropdown visibility |
| `highlightedIndex` | `number` | Keyboard-selected suggestion index |

**Hooks Used**: `useSearch`, `useRef` (for click-outside detection)

**Reusability**: Used in Navbar and potentially as standalone on Home page

---

### 3. Footer

**File**: `src/components/common/Footer/Footer.jsx`

**Responsibilities**:
- 4-column navigation link layout
- Social media icons
- Legal links (Terms, Privacy, etc.)
- Copyright notice

**Props**: None (static content)

**Reusability**: Single instance in `MainLayout`

---

### 4. Loader

**File**: `src/components/common/Loader/Loader.jsx`

**Responsibilities**:
- Full-page loading spinner
- Used during initial data fetch and route transitions

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm'\|'md'\|'lg'` | `'md'` | Spinner size |
| `message` | `string` | `'Loading...'` | Loading text |
| `fullScreen` | `boolean` | `false` | Whether to overlay full viewport |

---

### 5. SkeletonCard

**File**: `src/components/common/Loader/SkeletonCard.jsx`

**Responsibilities**:
- Placeholder shimmer animation while content loads
- Mimics shape of actual content cards

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'aqi'\|'pollutant'\|'blog'\|'chart'\|'city'` | `'aqi'` | Shape variant |
| `count` | `number` | `1` | Number of skeleton cards to render |

**Reusability**: Used everywhere content loads asynchronously

---

### 6. ErrorBoundary

**File**: `src/components/common/ErrorBoundary/ErrorBoundary.jsx`

**Responsibilities**:
- Catch JavaScript errors in child components
- Display friendly error UI (ErrorFallback)
- Provide retry button

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fallback` | `ReactElement` | `<ErrorFallback />` | Custom fallback UI |
| `onError` | `function` | — | Error logging callback |

---

### 7. SEOHead

**File**: `src/components/common/SEOHead/SEOHead.jsx`

**Responsibilities**:
- Dynamically set `<title>` and `<meta>` tags
- Manage Open Graph tags for social sharing
- Handle canonical URL

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `'ecoBreathe — AQI'` | Page title |
| `description` | `string` | — | Meta description |
| `keywords` | `string` | — | Meta keywords |
| `ogImage` | `string` | — | OG image URL |
| `canonicalUrl` | `string` | — | Canonical URL |

**Implementation Note**: Use `react-helmet-async` or native `document.title` updates

---

## AQI Components

### 8. AQICard

**File**: `src/components/aqi/AQICard/AQICard.jsx`

**Responsibilities**:
- Display the primary AQI value in a large circular gauge
- Show AQI category label and color
- Display last-updated timestamp
- Show city ranking badge
- Embed WeatherStrip

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `aqi` | `number` | — | Current AQI value |
| `category` | `string` | — | AQI category name |
| `color` | `string` | — | Category color hex |
| `cityName` | `string` | — | City name |
| `rank` | `number` | — | Global city rank |
| `lastUpdated` | `string` | — | ISO timestamp |
| `weather` | `object` | — | Weather data object |

**State**: None (presentational)

---

### 9. AQIGauge

**File**: `src/components/aqi/AQICard/AQIGauge.jsx`

**Responsibilities**:
- Render a semi-circular or circular gauge SVG
- Animate the gauge fill on data change
- Display AQI value in center

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | AQI value |
| `max` | `number` | `500` | Maximum scale value |
| `color` | `string` | `'#009966'` | Fill color |
| `size` | `number` | `200` | Diameter in px |
| `animated` | `boolean` | `true` | Animate on mount/change |

**Implementation**: SVG with `stroke-dasharray` and `stroke-dashoffset` for animation

---

### 10. PollutantCard

**File**: `src/components/aqi/PollutantCard/PollutantCard.jsx`

**Responsibilities**:
- Display individual pollutant name, value, and unit
- Show color-coded progress bar based on pollutant level
- Link to detailed pollutant page

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | Full pollutant name |
| `symbol` | `string` | — | Chemical symbol (PM₂.₅, CO, etc.) |
| `value` | `number` | — | Current value |
| `unit` | `string` | — | Unit (µg/m³, ppb, ppm) |
| `maxValue` | `number` | — | Scale maximum for progress bar |
| `color` | `string` | — | Category color |
| `link` | `string` | — | Route to detailed page |
| `icon` | `ReactElement` | — | Pollutant icon |

**Reusability**: Used 6 times in PollutantGrid (PM2.5, PM10, CO, SO₂, NO₂, O₃)

---

### 11. PollutantGrid

**File**: `src/components/aqi/PollutantGrid/PollutantGrid.jsx`

**Responsibilities**:
- Layout 6 PollutantCard components in a responsive grid
- Section header with title and CTA

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pollutants` | `array` | `[]` | Array of pollutant data objects |
| `cityName` | `string` | — | City name for header |

---

### 12. WeatherStrip

**File**: `src/components/aqi/WeatherStrip/WeatherStrip.jsx`

**Responsibilities**:
- Horizontal strip showing temperature, weather condition, humidity, wind speed, UV index
- Weather condition icon

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `temperature` | `number` | — | Temperature in °C |
| `condition` | `string` | — | Weather condition text |
| `conditionIcon` | `string` | — | Weather icon code |
| `humidity` | `number` | — | Humidity percentage |
| `windSpeed` | `number` | — | Wind speed in km/h |
| `uvIndex` | `number` | — | UV Index value |

---

### 13. HealthAdvice

**File**: `src/components/aqi/HealthAdvice/HealthAdvice.jsx`

**Responsibilities**:
- Calculate cigarette equivalence from PM2.5
- Show protection recommendations (purifier, car filter, mask, outdoor activity)
- Render expandable disease risk cards
- Adapt advice based on AQI level

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `aqi` | `number` | — | Current AQI value |
| `pm25` | `number` | — | PM2.5 value for cigarette calc |
| `cityName` | `string` | — | City name for header |

**State**:
| State | Type | Description |
|-------|------|-------------|
| `expandedDisease` | `string\|null` | Currently expanded disease card |

---

### 14. DiseaseCard

**File**: `src/components/aqi/HealthAdvice/DiseaseCard.jsx`

**Responsibilities**:
- Display disease name, risk level, and AQI range
- Expandable accordion with Do's and Don'ts
- Color-coded risk level indicator

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | Disease name |
| `riskLevel` | `'None'\|'Mild'\|'Moderate'\|'High'\|'Severe'` | — | Risk level |
| `description` | `string` | — | Risk description |
| `dos` | `string[]` | `[]` | Recommended actions |
| `donts` | `string[]` | `[]` | Actions to avoid |
| `isExpanded` | `boolean` | `false` | Controlled expanded state |
| `onToggle` | `function` | — | Toggle callback |

---

### 15. AQICalendar

**File**: `src/components/aqi/AQICalendar/AQICalendar.jsx`

**Responsibilities**:
- Render a monthly calendar grid
- Color-code each day's cell based on average AQI
- Navigate between months/years
- Tooltip showing exact AQI on hover

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `array` | `[]` | `[{ date, aqi }]` entries |
| `year` | `number` | Current year | Display year |
| `month` | `number` | Current month | Display month (0-11) |
| `onMonthChange` | `function` | — | Navigation callback |

---

## Chart Components

### 16. HourlyChart

**File**: `src/components/charts/HourlyChart/HourlyChart.jsx`

**Responsibilities**:
- Recharts `BarChart` showing hourly AQI values
- Color-coded bars based on AQI category
- Tooltip showing exact value and timestamp
- Responsive width

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `array` | `[]` | `[{ hour, aqi, color }]` |
| `height` | `number` | `300` | Chart height |

**Recharts Components Used**:
- `BarChart`, `Bar`, `XAxis`, `YAxis`, `Tooltip`, `ResponsiveContainer`

---

### 17. DailyChart

**File**: `src/components/charts/DailyChart/DailyChart.jsx`

**Responsibilities**:
- Recharts `LineChart` or `AreaChart` showing daily AQI trend
- Color-coded area fill based on threshold zones

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `array` | `[]` | `[{ date, aqi, pm25, pm10 }]` |
| `metrics` | `string[]` | `['aqi']` | Which metrics to plot |

---

### 18. TrendChart

**File**: `src/components/charts/TrendChart/TrendChart.jsx`

**Responsibilities**:
- Multi-year comparison line chart
- Legend with year labels
- Zoomable/pannable (optional)

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `object` | `{}` | `{ 2024: [...], 2025: [...] }` |
| `title` | `string` | — | Chart title |

---

### 19. ChartControls

**File**: `src/components/charts/ChartControls/ChartControls.jsx`

**Responsibilities**:
- Tab/button group for switching chart time ranges
- Options: Hourly, Daily, Weekly, Monthly

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `activeRange` | `string` | `'hourly'` | Currently active range |
| `ranges` | `string[]` | `['hourly','daily','weekly','monthly']` | Available ranges |
| `onRangeChange` | `function` | — | Callback on range selection |

---

## Map Components

### 20. AQIMap

**File**: `src/components/map/AQIMap/AQIMap.jsx`

**Responsibilities**:
- Full Leaflet map with OpenStreetMap tiles
- Render AQI markers for all stations in view
- Cluster markers at lower zoom levels
- Handle click events to show station details
- Auto-center on user location

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `center` | `[lat, lng]` | `[20.5937, 78.9629]` | Map center (India default) |
| `zoom` | `number` | `5` | Initial zoom level |
| `stations` | `array` | `[]` | `[{ lat, lng, aqi, name }]` |
| `onStationClick` | `function` | — | Station click callback |
| `height` | `string` | `'500px'` | Map container height |

**Dependencies**: `react-leaflet`, `leaflet`

---

### 21. AQIMarker

**File**: `src/components/map/AQIMap/AQIMarker.jsx`

**Responsibilities**:
- Custom circle marker with AQI-based color
- Display AQI value as label inside marker
- Popup with city name and quick stats on click

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `[lat, lng]` | — | Marker coordinates |
| `aqi` | `number` | — | AQI value (determines color) |
| `cityName` | `string` | — | City name for popup |
| `onClick` | `function` | — | Click handler |

---

### 22. MiniMap

**File**: `src/components/map/MiniMap/MiniMap.jsx`

**Responsibilities**:
- Small, non-interactive map preview
- Single marker at city location
- Used in the dashboard hero section

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lat` | `number` | — | Latitude |
| `lng` | `number` | — | Longitude |
| `cityName` | `string` | — | City label |
| `size` | `{ width, height }` | `{ width: '100%', height: '200px' }` | Container size |

---

## Ranking Components

### 23. CityRankingTable

**File**: `src/components/rankings/CityRankingTable/CityRankingTable.jsx`

**Responsibilities**:
- Sortable table of cities ranked by AQI
- Color-coded status badges
- "× above standard" calculation
- Pagination or "Load More"

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cities` | `array` | `[]` | City ranking data |
| `limit` | `number` | `10` | Initial display count |
| `showPagination` | `boolean` | `false` | Show pagination controls |
| `lastUpdated` | `string` | — | Last update timestamp |

---

### 24. MetroCityCard

**File**: `src/components/rankings/MetroCityCards/MetroCityCard.jsx`

**Responsibilities**:
- Display metro city name, AQI, temperature, humidity
- Color-coded AQI badge
- Click to navigate to city dashboard

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | City name |
| `aqi` | `number` | — | Current AQI |
| `temperature` | `number` | — | Temperature °C |
| `humidity` | `number` | — | Humidity % |
| `link` | `string` | — | Dashboard route |

---

## Content Components

### 25. BlogCard

**File**: `src/components/content/BlogCard/BlogCard.jsx`

**Responsibilities**:
- Display blog thumbnail, title, date, author
- Click to open blog link (external)
- Lazy-load blog images

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Blog title |
| `date` | `string` | — | Publication date |
| `author` | `string` | — | Author name |
| `image` | `string` | — | Thumbnail URL |
| `link` | `string` | — | External blog link |

---

### 26. SolutionCard

**File**: `src/components/content/SolutionsSection/SolutionCard.jsx`

**Responsibilities**:
- Display solution icon, title, description
- Click to navigate to solution detail

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactElement\|string` | — | Solution icon |
| `title` | `string` | — | Solution title |
| `description` | `string` | `''` | Optional description |
| `link` | `string` | — | External link |
| `variant` | `'compact'\|'detailed'` | `'compact'` | Card size variant |

---

## Component Design Patterns

### Pattern 1: Index Re-exports
Every component folder has an `index.js`:
```javascript
// src/components/aqi/AQICard/index.js
export { default } from './AQICard';
export { default as AQIGauge } from './AQIGauge';
```

### Pattern 2: CSS Module Scoping
```javascript
// AQICard.jsx
import styles from './AQICard.module.css';

function AQICard({ aqi, category }) {
  return (
    <div className={styles.card}>
      <span className={styles.value}>{aqi}</span>
      <span className={styles.category}>{category}</span>
    </div>
  );
}
```

### Pattern 3: Compound Components
Complex components like HealthAdvice use sub-components:
```javascript
<HealthAdvice aqi={96} cityName="New Delhi">
  <HealthAdvice.CigaretteEquiv pm25={32} />
  <HealthAdvice.Protections />
  <HealthAdvice.DiseaseRisks />
</HealthAdvice>
```

### Pattern 4: Prop Forwarding for Styling
```javascript
function AQICard({ aqi, className, ...rest }) {
  return (
    <div className={`${styles.card} ${className || ''}`} {...rest}>
      {/* ... */}
    </div>
  );
}
```

### Pattern 5: Loading States
Every data-dependent component handles 3 states:
```javascript
function PollutantGrid({ pollutants, isLoading, error }) {
  if (isLoading) return <SkeletonCard variant="pollutant" count={6} />;
  if (error) return <ErrorFallback message={error} />;
  return (
    <div className={styles.grid}>
      {pollutants.map(p => <PollutantCard key={p.symbol} {...p} />)}
    </div>
  );
}
```

---

## Component Count Summary

| Category | Count | Components |
|----------|-------|------------|
| Common | 7 | Navbar, SearchBar, Footer, Loader, SkeletonCard, ErrorBoundary, SEOHead |
| AQI | 8 | AQICard, AQIGauge, PollutantCard, PollutantGrid, WeatherStrip, HealthAdvice, DiseaseCard, AQICalendar |
| Charts | 4 | HourlyChart, DailyChart, TrendChart, ChartControls |
| Map | 3 | AQIMap, AQIMarker, MiniMap |
| Rankings | 2 | CityRankingTable, MetroCityCard |
| Content | 7 | BlogCard, BlogSection, EditorsPick, MediaCoverage, TrustedBy, SolutionCard, AppPromotion |
| **Total** | **31** | — |

---

## Next Steps

Proceed to [05_API_RESEARCH.md](./05_API_RESEARCH.md) for detailed API research and recommendations.
