# 01 — Project Overview

## Project Name

**ecoBreathe** — Real-time Air Quality Index (AQI) Web Application for India

## Project Goals

1. Build a fully functional, production-grade AQI web application that closely replicates the UI/UX of [aqi.in](https://www.aqi.in/in)
2. Provide real-time air quality data for Indian cities, states, and districts
3. Deliver personalized health advisories based on current pollution levels
4. Enable users to compare pollution across cities and track historical trends
5. Serve as an educational resource for air quality awareness in India

> [!NOTE]
> This is an **educational project**. No copyrighted assets (logos, illustrations, proprietary icons) from the reference site will be used. All images and icons will be royalty-free or custom-generated placeholders.

---

## Core Features

### 1. Location Detection & Search
- Auto-detect user location via Browser Geolocation API
- Fallback to IP-based geolocation if permission denied
- Default to **New Delhi** if all detection fails
- Search functionality for any Indian State → City → Town/District

### 2. Real-time AQI Dashboard
- Live AQI value with color-coded status (Good → Hazardous)
- Individual pollutant cards: PM2.5, PM10, CO, NO₂, SO₂, O₃
- Weather overlay: Temperature, Humidity, Wind Speed, UV Index
- Last-updated timestamp with auto-refresh

### 3. AQI Charts & Analytics
- Hourly AQI bar chart (last 24 hours)
- Daily AQI trend (last 7 days)
- Weekly averages
- Monthly/Annual comparison trends
- Air Quality Calendar heatmap

### 4. Rankings & Comparisons
- Top 10 most polluted Indian cities (live)
- Metro cities comparison cards
- Historical city & country rankings

### 5. Health Advisories
- Cigarette equivalence calculator
- Disease risk assessment (Asthma, Heart Issues, Allergies, Sinus, Cold/Flu, COPD)
- Do's and Don'ts based on current AQI level
- Recommended protective equipment

### 6. Interactive Map
- AQI heatmap overlay on India map
- Clickable stations/cities
- Zoom to user location

### 7. Content Sections
- AQI Scale explanation (US, India, China standards)
- Blog/News section with air quality articles
- Editor's Picks / Media Coverage
- Solutions & Products section
- Mobile App promotion banner
- Smart device / TV app banner

---

## Scope

### In Scope ✅
| Area | Details |
|------|---------|
| Geography | India only (all states, cities, districts with available data) |
| Data | Real-time AQI, pollutants, weather, forecasts, historical |
| Platform | Web (responsive: mobile, tablet, desktop, large screens) |
| APIs | Free-tier public APIs only |
| Content | Static content sections matching reference layout |

### Out of Scope ❌
| Area | Reason |
|------|--------|
| Authentication | No user accounts for v1 |
| Admin Panel | No content management system |
| Custom Backend | Frontend-only; all data from public APIs |
| Push Notifications | Requires backend infrastructure |
| PWA / Offline Mode | Future enhancement |
| Payment Integration | Not applicable |

---

## Tech Stack

| Layer | Technology | Version | Justification |
|-------|-----------|---------|---------------|
| **Build Tool** | Vite | 6.x | Fastest HMR, native ES modules, superior DX |
| **UI Framework** | React | 19.x | Component-based architecture, massive ecosystem |
| **Language** | JavaScript (ES2024+) | — | Per requirement (no TypeScript) |
| **Routing** | React Router | 7.x | De facto standard for React SPA routing |
| **HTTP Client** | Axios | 1.x | Interceptors, request cancellation, error handling |
| **Charts** | Recharts | 2.x | Declarative React components, excellent for dashboards |
| **Maps** | Leaflet + react-leaflet | 4.x / 5.x | Free, open-source, highly customizable |
| **Map Tiles** | OpenStreetMap | — | Free, no API key required for tiles |
| **Styling** | CSS Modules | — | Scoped styles, no runtime overhead, zero config in Vite |
| **Icons** | React Icons (Lucide) | 5.x | Tree-shakeable, comprehensive icon set |
| **Fonts** | Google Fonts (Inter) | — | Modern, highly readable, free |
| **State Management** | React Context + useReducer | Built-in | Sufficient for this scale; no Redux needed |
| **Date Handling** | date-fns | 4.x | Lightweight, tree-shakeable date utilities |
| **Linting** | ESLint | 9.x | Code quality and consistency |

### Why CSS Modules over Tailwind / SCSS?

| Criteria | CSS Modules ✅ | Tailwind CSS | SCSS |
|----------|---------------|-------------|------|
| Scoping | Automatic per-component | Global utility classes | Manual (BEM or nesting) |
| Bundle Size | Only used styles | Purged but still larger | All compiled styles |
| Learning Curve | Standard CSS | New utility syntax | Sass syntax |
| Vite Support | Zero config | Requires plugin + config | Requires preprocessor |
| Matches Reference | Precise control needed | Hard to match pixel-perfect designs | Works but verbose |
| Maintenance | Co-located with components | Class strings get long | Separate file management |

**Verdict**: CSS Modules provide the best balance of scoping, performance, and precise design control needed to replicate the reference UI.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    ecoBreathe App                        │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Pages/Views  │  │  Components  │  │   Layouts    │  │
│  │              │  │              │  │              │  │
│  │ • Home       │  │ • Navbar     │  │ • MainLayout │  │
│  │ • Dashboard  │  │ • AQICard    │  │ • DashLayout │  │
│  │ • CityDetail │  │ • SearchBar  │  │              │  │
│  │ • Rankings   │  │ • Charts     │  │              │  │
│  │ • Map        │  │ • Footer     │  │              │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────────┘  │
│         │                 │                             │
│  ┌──────▼─────────────────▼──────┐                     │
│  │        Context Providers       │                     │
│  │  • LocationContext             │                     │
│  │  • AQIDataContext              │                     │
│  │  • ThemeContext                │                     │
│  └──────────────┬────────────────┘                     │
│                 │                                       │
│  ┌──────────────▼────────────────┐                     │
│  │       Services Layer          │                     │
│  │  • aqiService.js              │                     │
│  │  • weatherService.js          │                     │
│  │  • locationService.js         │                     │
│  │  • searchService.js           │                     │
│  └──────────────┬────────────────┘                     │
│                 │                                       │
│  ┌──────────────▼────────────────┐                     │
│  │       API Layer (Axios)       │                     │
│  │  • apiClient.js (interceptors)│                     │
│  │  • Request caching            │                     │
│  │  • Error handling             │                     │
│  └──────────────┬────────────────┘                     │
│                 │                                       │
└─────────────────┼───────────────────────────────────────┘
                  │
    ┌─────────────▼──────────────┐
    │     External APIs          │
    │  • WAQI (AQI + Pollutants) │
    │  • OpenWeatherMap (Weather)│
    │  • IQAir (Backup/Metro)    │
    │  • OpenStreetMap (Tiles)   │
    └────────────────────────────┘
```

### Data Flow Pattern

```
User Action → Component → Context/Hook → Service → API Client → External API
                                                        ↓
User Sees  ← Component  ← Context Update ← Service  ← Response
```

### Key Architectural Decisions

1. **No Backend**: All API calls go directly from the browser to public APIs. API keys are stored in `.env` files (acceptable for free-tier keys with rate limits).

2. **Service Layer Pattern**: All API logic is encapsulated in service files. Components never call APIs directly.

3. **Context over Redux**: The application state is relatively simple (location, AQI data, search). React Context with `useReducer` handles this without the overhead of Redux.

4. **Route-based Code Splitting**: Each page is lazy-loaded using `React.lazy()` and `Suspense` to minimize initial bundle size.

5. **Client-side Caching**: API responses are cached in memory (with TTL) to reduce unnecessary requests and stay within rate limits.

---

## AQI Scale Reference

The application will support the **US EPA AQI Scale** as the primary standard:

| AQI Range | Category | Color Code | Health Implications |
|-----------|----------|------------|---------------------|
| 0–50 | Good | `#009966` (Green) | Air quality is satisfactory |
| 51–100 | Moderate | `#FFDE33` (Yellow) | Acceptable; sensitive individuals may have mild effects |
| 101–150 | Unhealthy for Sensitive Groups | `#FF9933` (Orange) | Sensitive groups may experience health effects |
| 151–200 | Unhealthy | `#CC0033` (Red) | Everyone may begin to experience health effects |
| 201–300 | Very Unhealthy | `#660099` (Purple) | Health alert; increased risk for everyone |
| 301–500 | Hazardous | `#7E0023` (Maroon) | Emergency conditions; entire population affected |

---

## Browser Support

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| Mobile Chrome | 90+ |
| Mobile Safari | 14+ |

---

## Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint (FCP) | < 1.5s |
| Largest Contentful Paint (LCP) | < 2.5s |
| Total Blocking Time (TBT) | < 200ms |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Lighthouse Score | > 90 |
| Initial Bundle Size | < 200KB gzipped |

---

## Next Steps

Proceed to [02_FOLDER_STRUCTURE.md](./02_FOLDER_STRUCTURE.md) for the complete project directory layout.
