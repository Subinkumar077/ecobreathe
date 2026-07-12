# 03 — UI Breakdown

This document breaks down every page and section of the reference website ([aqi.in](https://www.aqi.in/in)), including purpose, components, layout, responsive behavior, and data sources.

---

## Page 1: Home Page (`/`)

The home page is a long-scrolling landing page with multiple distinct sections. It serves as the entry point and showcases AQI data, products, blogs, and credibility signals.

---

### Section 1: Navbar (Sticky)

**Purpose**: Global navigation, branding, search, and user actions.

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  [Logo]    [Ranking ▼]  [Products ▼]  [Resources ▼]  [Login]│
│            [Search Bar — full width on mobile]               │
└─────────────────────────────────────────────────────────────┘
```

**Components**:
| Component | Props | Description |
|-----------|-------|-------------|
| `Navbar` | — | Container with dark background (#1a1a2e style) |
| `Logo` | `variant: 'light'` | ecoBreathe text logo |
| `NavDropdown` | `label, items[]` | Dropdown menus for Ranking, Products, Resources |
| `SearchBar` | `onSearch, placeholder` | Typeahead search for cities/states |
| `NavLink` | `to, label` | Login/CTA button |

**Responsive Behavior**:
- **Desktop (>1024px)**: Full horizontal nav with dropdowns
- **Tablet (768–1024px)**: Hamburger menu, search remains visible
- **Mobile (<768px)**: Full-screen slide-in menu, search prominent at top

**Data Source**: Static data (navigation links)

---

### Section 2: AQI Scale Explainer (Hero Area)

**Purpose**: Educate users about AQI categories. Interactive tabbed section showing scales for different standards.

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│        Air Quality Index (AQI) Scale                        │
│  Know about the category of air quality index...            │
│                                                             │
│  [Tab: US AQI] [Tab: India AQI] [Tab: China AQI]          │
│                                                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │ Good     │ │ Moderate │ │ Poor     │ │ Unhealthy│      │
│  │ 0-50     │ │ 51-100   │ │ 101-150  │ │ 151-200  │      │
│  │ 🟢      │ │ 🟡      │ │ 🟠      │ │ 🔴      │      │
│  │ desc...  │ │ desc...  │ │ desc...  │ │ desc...  │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│                                                             │
│  ┌──────────┐ ┌──────────┐                                 │
│  │ Severe   │ │ Hazardous│                                 │
│  │ 201-300  │ │ 301+     │                                 │
│  │ 🟣      │ │ 🟤      │                                 │
│  └──────────┘ └──────────┘                                 │
│                                                             │
│  [Smart Device Promo Banner — Cair+ Monitor]               │
└─────────────────────────────────────────────────────────────┘
```

**Components**:
| Component | Props | Description |
|-----------|-------|-------------|
| `AQIScaleExplainer` | — | Full section container with tabs |
| `ScaleTab` | `standard: 'US'\|'India'\|'China'` | Tab switcher |
| `ScaleCard` | `category, range, color, description` | Individual AQI category card |

**Data Source**: Static (`aqiScaleData.js`)

**Responsive Behavior**:
- **Desktop**: 6 cards in 2 rows of 3
- **Tablet**: 3 cards per row
- **Mobile**: 2 cards per row, horizontal scroll option

---

### Section 3: AQI Data Analytics Solutions (Product Showcase)

**Purpose**: Showcase the data analytics platforms — Mobile App, TV App, Dashboard, API, Widgets.

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  AQI Data Analytics Solutions                               │
│  "Empower Your Decisions with Reliable Data"               │
│                                                             │
│  ┌─────────────────────────────────┐                       │
│  │  📱 Mobile App                  │                       │
│  │  [Phone Mockup]  • Real-time   │                       │
│  │                   • Health tips  │                       │
│  │                   • Trends       │                       │
│  │  [App Store] [Google Play]      │                       │
│  └─────────────────────────────────┘                       │
│                                                             │
│  ┌────────────────┐ ┌──────────────┐                       │
│  │  📺 TV App     │ │ 📊 Dashboard │                       │
│  │  [TV Mockup]   │ │ [Dashboard]  │                       │
│  │  • Themes      │ │ • 24/7 data  │                       │
│  │  • Mobile ctrl │ │ • Export     │                       │
│  └────────────────┘ └──────────────┘                       │
│                                                             │
│  ┌────────────────┐ ┌──────────────┐                       │
│  │  🔗 API        │ │ 📦 Widgets   │                       │
│  │  • Real-time   │ │ • Custom     │                       │
│  │  • Historical  │ │ • Free       │                       │
│  └────────────────┘ └──────────────┘                       │
└─────────────────────────────────────────────────────────────┘
```

**Components**:
| Component | Props | Description |
|-----------|-------|-------------|
| `AppPromotion` | `section: 'mobile'\|'tv'\|'dashboard'\|'api'\|'widgets'` | Product promo cards |
| `ProductCard` | `title, description, features[], image, ctaLink, ctaLabel` | Individual product card |
| `AppBadge` | `store: 'apple'\|'google'` | Store download buttons |

**Data Source**: Static (`solutionsData.js`)

**Responsive Behavior**:
- **Desktop**: 2-column grid for secondary products, full-width for mobile app
- **Mobile**: Single column, stacked

> [!NOTE]
> **Placeholder Guidance**: Use generic phone/TV/laptop mockup images. Do NOT use actual aqi.in app screenshots. Generate device frames with placeholder dashboards.

---

### Section 4: Air Quality Solutions

**Purpose**: Grid of air quality monitoring and clean air product categories.

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  Air Quality Solutions                                      │
│  "Explore the solutions of air quality monitoring..."       │
│                                                             │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐  │
│  │Monitor │ │Sensors │ │FreshAir│ │CarFilt │ │N95 Mask│  │
│  │  📡    │ │  📊    │ │  🌬️   │ │  🚗    │ │  😷    │  │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘  │
│                                                             │
│  ┌──────────────────┐ ┌──────────────────┐                 │
│  │ Offices          │ │ Smart City       │                 │
│  │ Full description │ │ Full description │                 │
│  └──────────────────┘ └──────────────────┘                 │
│  ... (more solution cards)                                  │
└─────────────────────────────────────────────────────────────┘
```

**Components**:
| Component | Props | Description |
|-----------|-------|-------------|
| `SolutionsSection` | — | Full section container |
| `SolutionCard` | `icon, title, description, link` | Individual solution card |
| `SolutionCardLarge` | `title, description, link, image` | Large solution card with description |

**Data Source**: Static (`solutionsData.js`)

**Responsive Behavior**:
- **Desktop**: 5 small cards in a row, 2 large cards per row below
- **Tablet**: 3 small + 1 large per row
- **Mobile**: 2 small per row, full-width large cards

---

### Section 5: Smart Device Promo Banner

**Purpose**: Promote smart air quality monitoring devices (Prana Sense, Pocket PM, Cair+).

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│  │ Prana Sense   │ │ Pocket PM    │ │ Cair+        │       │
│  │ [Device Img]  │ │ [Device Img] │ │ [Device Img] │       │
│  │ Air Quality   │ │ Know the air │ │ Track indoor │       │
│  │ Monitor       │ │ around you   │ │ air quality  │       │
│  │ [Know More]   │ │ [Know More]  │ │ [Know More]  │       │
│  └──────────────┘ └──────────────┘ └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

**Components**:
| Component | Props | Description |
|-----------|-------|-------------|
| `SmartDeviceBanner` | — | Section container |
| `DeviceCard` | `name, subtitle, description, image, link` | Individual device promo |

**Data Source**: Static

> [!NOTE]
> **Placeholder Guidance**: Use generic air quality monitor images from royalty-free sources. Text content can reference generic "Smart AQI Monitor" products.

---

### Section 6: Recent AQI Blogs

**Purpose**: Display latest air quality blog posts / news articles.

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  Recent AQI Blogs — Read the latest news                    │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │ [Blog Image]     │  │ [Blog Image]     │                │
│  │ Blog Title...    │  │ Blog Title...    │                │
│  │ 4 Jun 2026       │  │ 2 Jun 2026       │                │
│  │ Author Name      │  │ Author Name      │                │
│  └──────────────────┘  └──────────────────┘                │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │ [Blog Image]     │  │ [Blog Image]     │                │
│  │ Blog Title...    │  │ Blog Title...    │                │
│  └──────────────────┘  └──────────────────┘                │
│  ... (scrollable or paginated, ~10 posts)                   │
└─────────────────────────────────────────────────────────────┘
```

**Components**:
| Component | Props | Description |
|-----------|-------|-------------|
| `BlogSection` | `blogs[]` | Section container with grid |
| `BlogCard` | `title, date, author, image, link` | Individual blog card |

**Data Source**: Static (`blogData.js`)  
> Blog content is static for v1. Future versions could integrate a headless CMS or RSS feed.

**Responsive Behavior**:
- **Desktop**: 2-column grid with 5 rows
- **Tablet**: 2 columns
- **Mobile**: Single column, first 4 posts visible with "Show More"

---

### Section 7: Editor's Pick

**Purpose**: Featured article highlight — showcases a major publication feature.

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  Editor's Pick                                              │
│                                                             │
│  ┌─────────────────────────────────────┐                   │
│  │ [Newspaper Image / Article Preview] │                   │
│  │                                     │                   │
│  │ "ecoBreathe is India's leading..."  │                   │
│  │                                     │                   │
│  │          [Read Article →]           │                   │
│  └─────────────────────────────────────┘                   │
└─────────────────────────────────────────────────────────────┘
```

**Components**:
| Component | Props | Description |
|-----------|-------|-------------|
| `EditorsPick` | `title, description, image, articleLink` | Featured article card |

**Data Source**: Static

> [!IMPORTANT]
> **Placeholder Guidance**: Do NOT use the actual Economic Times article image. Use a generic newspaper mockup or generate a placeholder that says "Featured In Major Publications" with a generic newspaper design.

---

### Section 8: Media Coverage

**Purpose**: Display logos of media outlets that have featured the platform.

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  Media Coverage                                             │
│  "ecoBreathe has been featured in media for its..."         │
│                                                             │
│  [Logo1] [Logo2] [Logo3] [Logo4] [Logo5] [Logo6]          │
│  (auto-scrolling horizontal carousel)                       │
└─────────────────────────────────────────────────────────────┘
```

**Components**:
| Component | Props | Description |
|-----------|-------|-------------|
| `MediaCoverage` | `outlets[]` | Container with horizontal scroll/carousel |
| `MediaLogo` | `name, url` | Individual outlet logo/text |

**Data Source**: Static (`mediaData.js`)

> [!NOTE]
> **Placeholder Guidance**: Do NOT use actual media logos (The Economic Times, CNBCTV18, etc.). Instead, use **text-based placeholders** styled to look like media outlet names, or generate generic "Media Partner" placeholder badges.

---

### Section 9: Trusted By

**Purpose**: Display logos of organizations/companies that use the platform.

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  Trusted by — Some of the Industry's Top Organisations      │
│                                                             │
│  [Logo1] [Logo2] [Logo3] [Logo4] [Logo5] [Logo6]          │
│  [Logo7] [Logo8] [Logo9] [Logo10] [Logo11] [Logo12]       │
└─────────────────────────────────────────────────────────────┘
```

**Components**:
| Component | Props | Description |
|-----------|-------|-------------|
| `TrustedBy` | `companies[]` | Logo grid section |

**Data Source**: Static

> [!NOTE]
> **Placeholder Guidance**: Use generic company placeholder logos or text names. Categories: Government, Corporate, Educational, Healthcare.

---

### Section 10: Air Quality Around The World

**Purpose**: Country link grid for international AQI pages.

**Layout**: Alphabetically sorted grid of country links.

**Components**:
| Component | Props | Description |
|-----------|-------|-------------|
| `CountryGrid` | `countries[]` | Multi-column alphabetical link grid |

**Data Source**: Static list of countries

**Responsive**:
- **Desktop**: 6 columns
- **Tablet**: 4 columns
- **Mobile**: 2 columns

---

### Section 11: Footer

**Purpose**: Site-wide footer with navigation links, contact info, social links, and legal.

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  [Logo]  "Real-time Air quality and Weather data..."        │
│                                                             │
│  About AQI        Air Quality       Rankings      Location  │
│  • About Us       • AQI App         • Live Rank   • Support│
│  • Contact Us     • TV App          • Historic    • Email   │
│  • Blog           • Map             • Country     • Address │
│  • Climate        • API             • Weather              │
│  • Community      • Widgets                                │
│  • World Report   • Dashboard                              │
│                                                             │
│  [Social Icons: Instagram, Twitter, LinkedIn, YouTube, FB]  │
│                                                             │
│  [Terms] [Privacy] [Shipping] [Refund]  © 2026 ecoBreathe  │
└─────────────────────────────────────────────────────────────┘
```

**Components**:
| Component | Props | Description |
|-----------|-------|-------------|
| `Footer` | — | Full footer container |
| `FooterColumn` | `title, links[]` | Column of footer links |
| `SocialLinks` | `links[]` | Social media icon links |

**Data Source**: Static

---

### Section 12: Bottom Nav (Mobile Only)

**Purpose**: Fixed bottom navigation bar for quick access on mobile.

**Layout**:
```
┌─────────────────────────────────────┐
│  [🏠Home] [🗺Map] [🌡Climate] [📍Near Me] │
└─────────────────────────────────────┘
```

**Components**:
| Component | Props | Description |
|-----------|-------|-------------|
| `BottomNav` | — | Fixed bottom bar, mobile only |
| `BottomNavItem` | `icon, label, to` | Individual nav item |

**Responsive**: Only visible on screens < 768px

---

## Page 2: City Dashboard (`/dashboard/india/:state/:city`)

This is the core data page showing detailed AQI information for a specific city.

---

### Section 2.1: Breadcrumb Navigation

**Layout**: `Home > Dashboard > India > Delhi > New Delhi`

**Components**:
| Component | Props | Description |
|-----------|-------|-------------|
| `Breadcrumbs` | `path[]` | Clickable breadcrumb trail |

---

### Section 2.2: Tab Navigation

**Layout**: `[AQI] [History] [PM₂.₅] [PM₁₀] [CO] [SO₂] [NO₂] [O₃] | [AQI] [Weather]`

**Components**:
| Component | Props | Description |
|-----------|-------|-------------|
| `DashboardTabs` | `activeTab, tabs[], onTabChange` | Horizontal scrollable tabs |

---

### Section 2.3: Hero AQI Card

**Purpose**: Primary display of current AQI with circular gauge, weather info, and city rank.

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  Real-time PM2.5, PM10 air pollution level in New Delhi     │
│  Last Updated: 2026-07-12 08:51 (Local Time)               │
│                                                             │
│  ┌─────────────────────┐  ┌─────────────────────────────┐  │
│  │   ┌─────────────┐   │  │  31°C  Mist                │  │
│  │   │             │   │  │  Humidity 66%               │  │
│  │   │     96      │   │  │  Wind Speed 19.4 km/h      │  │
│  │   │  Moderate   │   │  │  UV Index 2.8              │  │
│  │   │             │   │  ├─────────────────────────────┤  │
│  │   └─────────────┘   │  │  Currently, New Delhi ranks │  │
│  │   [AQI Gauge/Ring]  │  │  108th among cities with    │  │
│  │                     │  │  highest AQI worldwide.     │  │
│  └─────────────────────┘  ├─────────────────────────────┤  │
│                           │  [🗺 Mini Map — New Delhi]   │  │
│                           └─────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**Components**:
| Component | Props | Description |
|-----------|-------|-------------|
| `AQICard` | `aqi, category, color, lastUpdated` | Main AQI display |
| `AQIGauge` | `value, max, color` | Circular progress gauge |
| `WeatherStrip` | `temp, condition, humidity, windSpeed, uvIndex` | Weather info strip |
| `CityRank` | `rank, cityName` | Ranking badge |
| `MiniMap` | `lat, lng, cityName` | Small embedded map |

**Data Source**: WAQI API (AQI) + OpenWeatherMap (Weather)

**Responsive**:
- **Desktop**: Two columns (gauge left, weather+map right)
- **Mobile**: Single column, stacked

---

### Section 2.4: Major Air Pollutants Grid

**Purpose**: Display all 6 pollutant values with individual progress bars.

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  Major Air Pollutants — New Delhi        [Get AQI App →]   │
│                                                             │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐  │
│  │ PM₂.₅         │  │ PM₁₀          │  │ CO            │  │
│  │ 32 µg/m³      │  │ 137 µg/m³     │  │ 121 ppb       │  │
│  │ [▓▓▓▓░░░░░░]  │  │ [▓▓▓▓▓▓▓░░░]  │  │ [▓░░░░░░░░░]  │  │
│  └───────────────┘  └───────────────┘  └───────────────┘  │
│                                                             │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐  │
│  │ SO₂           │  │ NO₂           │  │ O₃            │  │
│  │ 6 ppb         │  │ 24 ppb        │  │ 23 ppb        │  │
│  │ [▓░░░░░░░░░]  │  │ [▓▓░░░░░░░░]  │  │ [▓▓░░░░░░░░]  │  │
│  └───────────────┘  └───────────────┘  └───────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**Components**:
| Component | Props | Description |
|-----------|-------|-------------|
| `PollutantGrid` | `pollutants[]` | 3×2 grid container |
| `PollutantCard` | `name, symbol, value, unit, color, progress` | Individual pollutant |

**Data Source**: WAQI API

**Responsive**:
- **Desktop**: 3 columns
- **Tablet**: 2 columns
- **Mobile**: 2 columns (compact)

---

### Section 2.5: AQI History Chart

**Purpose**: Hourly AQI bar chart for the current day, with tabs for different time ranges.

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  AQI Graph                                                  │
│  [Hourly ▼]  [Today] [Yesterday] [This Week]              │
│                                                             │
│  250│                                                       │
│  200│       ██                                              │
│  150│    ██ ██ ██                                           │
│  100│ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██                       │
│   50│ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██             │
│    0└──────────────────────────────────────────────          │
│      00  02  04  06  08  10  12  14  16  18  20  22        │
└─────────────────────────────────────────────────────────────┘
```

**Components**:
| Component | Props | Description |
|-----------|-------|-------------|
| `HourlyChart` | `data[], timeRange` | Recharts BarChart |
| `ChartControls` | `activeRange, onRangeChange` | Time range tabs |

**Data Source**: WAQI API (forecast data) or OpenWeatherMap (historical)

---

### Section 2.6: Historical Air Quality Data

**Purpose**: Table showing AQI data download options and historical trends.

**Components**:
| Component | Props | Description |
|-----------|-------|-------------|
| `HistoricalData` | `cityName, data[]` | Data table with download CTA |

**Data Source**: Processed from WAQI API historical data

---

### Section 2.7: AQI Trends — Annual Changes

**Purpose**: Year-over-year comparison line chart showing AQI improvement/degradation.

**Components**:
| Component | Props | Description |
|-----------|-------|-------------|
| `TrendChart` | `data[], years[]` | Recharts LineChart with multiple series |

---

### Section 2.8: Sub-Locations List

**Purpose**: Grid of all sub-locations within a city with their AQI values.

**Layout**: Multi-column grid of clickable location links.

**Components**:
| Component | Props | Description |
|-----------|-------|-------------|
| `LocationGrid` | `locations[]` | Alphabetical grid of location links |
| `LocationLink` | `name, slug, aqi` | Individual location with AQI badge |

---

### Section 2.9: Metro Cities Comparison

**Purpose**: Compare AQI across India's 8 major metro cities.

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  India's Metro Cities — Air Quality Index                   │
│                                                             │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐             │
│  │Ahmedab │ │Bangalo │ │Chennai │ │Hyderab │             │
│  │  67    │ │  62    │ │  57    │ │  63    │             │
│  │ 27°C   │ │ 23°C   │ │ 32°C   │ │ 26°C   │             │
│  │ H:74%  │ │ H:89%  │ │ H:67%  │ │ H:70%  │             │
│  └────────┘ └────────┘ └────────┘ └────────┘             │
│                                                             │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐             │
│  │Kolkata │ │Mumbai  │ │NewDelhi│ │Pune    │             │
│  │  140   │ │  56    │ │  96    │ │  58    │             │
│  └────────┘ └────────┘ └────────┘ └────────┘             │
└─────────────────────────────────────────────────────────────┘
```

**Components**:
| Component | Props | Description |
|-----------|-------|-------------|
| `MetroCityCards` | — | Grid container |
| `MetroCityCard` | `name, aqi, temp, humidity, link` | Individual metro city |

**Data Source**: WAQI API (fetched for each metro city) + OpenWeatherMap

---

### Section 2.10: Air Quality Calendar

**Purpose**: Monthly heatmap showing daily AQI values with color coding.

**Components**:
| Component | Props | Description |
|-----------|-------|-------------|
| `AQICalendar` | `year, month, data[]` | Calendar grid with AQI-colored cells |

**Data Source**: Historical API data (processed)

---

### Section 2.11: Health Advice

**Purpose**: Personalized health recommendations based on current AQI level.

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  Health Advice For People Living In New Delhi                │
│                                                             │
│  🚬 1.6 Cigarettes per day                                  │
│  "Breathing the air in this location is as harmful..."      │
│  Source: Berkeley Earth                                      │
│                                                             │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌──────────┐│
│  │ 🫁 Air     │ │ 🚗 Car    │ │ 😷 Mask    │ │ 🏃 Avoid ││
│  │ Purifier   │ │ Filter    │ │ Required   │ │ Outdoors ││
│  │ [Get →]    │ │ [Get →]   │ │ [Get →]    │ │          ││
│  └────────────┘ └────────────┘ └────────────┘ └──────────┘│
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Disease Risk Assessment                             │   │
│  │                                                      │   │
│  │  [Asthma — Mild] [Heart Issues — Mild]              │   │
│  │  [Allergies — Mild] [Sinus — Mild]                  │   │
│  │  [Cold/Flu — Mild] [COPD — Mild]                    │   │
│  │                                                      │   │
│  │  Each expandable with Do's / Don'ts                 │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Components**:
| Component | Props | Description |
|-----------|-------|-------------|
| `HealthAdvice` | `aqi, cityName` | Full health section |
| `CigaretteEquiv` | `pm25Value` | Cigarette equivalence calculator |
| `ProtectionCard` | `type, description, link` | Protection recommendation |
| `DiseaseCard` | `name, riskLevel, dos[], donts[]` | Expandable disease card |

**Data Source**: Calculated from AQI value using `healthAdvice.js` utility

---

### Section 2.12: Most Polluted Cities Table

**Purpose**: Live top-10 most polluted Indian cities ranking.

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  Most Polluted Cities 2026 — India                          │
│  [Live Ranking] [Historic Cities] [Historic Countries]      │
│                                                             │
│  # │ City, State           │ AQI  │ Status    │ vs Standard│
│  ──┼───────────────────────┼──────┼───────────┼────────────│
│  1 │ Budaun, UP            │ 500  │ Hazardous │ 19x above  │
│  2 │ Eluru, AP             │ 189  │ Unhealthy │ 7x above   │
│  3 │ Kakinada, AP          │ 182  │ Unhealthy │ 8x above   │
│  ...                                                        │
│  10│ Kharagpur, WB         │ 151  │ Unhealthy │ 4x above   │
│                                                             │
│  [View All City Rankings →]                                 │
└─────────────────────────────────────────────────────────────┘
```

**Components**:
| Component | Props | Description |
|-----------|-------|-------------|
| `CityRankingTable` | `cities[], lastUpdated` | Ranked table |
| `RankingRow` | `rank, city, state, aqi, status, multiplier` | Table row |

**Data Source**: WAQI API (fetched for multiple Indian cities, sorted by AQI)

---

## Page 3: Rankings Page (`/rankings`)

Full rankings page with sortable/filterable tables for cities and countries.

**Sections**:
1. Live city ranking table (expandable, all Indian cities)
2. Filter by state
3. Historical rankings by year

---

## Page 4: Map Page (`/map`)

Full-screen interactive map showing AQI stations across India.

**Components**:
| Component | Props | Description |
|-----------|-------|-------------|
| `AQIMap` | `center, zoom, stations[]` | Full Leaflet map |
| `AQIMarker` | `lat, lng, aqi, cityName` | Color-coded marker |
| `MapLegend` | — | AQI color scale legend |
| `MapControls` | `onZoom, onFilter` | Map interaction controls |

**Data Source**: WAQI API map bounds endpoint

---

## Responsive Breakpoints Summary

| Breakpoint | Range | Layout Changes |
|------------|-------|----------------|
| Mobile | 0–480px | Single column, stacked cards, bottom nav visible |
| Mobile Large | 481–768px | 2-column grids, larger cards |
| Tablet | 769–1024px | 2–3 column grids, side-by-side layouts |
| Desktop | 1025–1440px | Full reference layout, 3-4 column grids |
| Large Desktop | 1441px+ | Max-width container (1400px), centered |

---

## Next Steps

Proceed to [04_COMPONENT_ARCHITECTURE.md](./04_COMPONENT_ARCHITECTURE.md) for detailed component specifications.
