# 05 — API Research

This document provides a thorough comparison of free AQI and weather APIs suitable for the ecoBreathe application, focused on Indian coverage. All APIs have been verified for availability as of July 2026.

---

## API Requirements Summary

The application needs the following data points:

| Data Point | Priority | Category |
|-----------|----------|----------|
| AQI (US EPA standard) | Critical | Air Quality |
| PM2.5 | Critical | Air Quality |
| PM10 | Critical | Air Quality |
| CO (Carbon Monoxide) | High | Air Quality |
| NO₂ (Nitrogen Dioxide) | High | Air Quality |
| SO₂ (Sulfur Dioxide) | High | Air Quality |
| O₃ (Ozone) | High | Air Quality |
| Temperature | High | Weather |
| Humidity | High | Weather |
| Wind Speed | High | Weather |
| Weather Condition | Medium | Weather |
| UV Index | Medium | Weather |
| Historical AQI | Medium | Analytics |
| AQI Forecast | Low | Analytics |
| City/Station Search | High | Search |

---

## API Comparison Table

| Feature | WAQI (aqicn.org) | OpenWeatherMap | IQAir (AirVisual) | OpenAQ |
|---------|------------------|----------------|--------------------|--------|
| **AQI** | ✅ US EPA | ✅ EU Standard (1-5) | ✅ US & China | ❌ Raw data only |
| **PM2.5** | ✅ | ✅ µg/m³ | ✅ µg/m³ | ✅ µg/m³ |
| **PM10** | ✅ | ✅ µg/m³ | ✅ µg/m³ | ✅ µg/m³ |
| **CO** | ✅ | ✅ µg/m³ | ✅ | ✅ |
| **NO₂** | ✅ | ✅ µg/m³ | ✅ | ✅ |
| **SO₂** | ✅ | ✅ µg/m³ | ✅ | ✅ |
| **O₃** | ✅ | ✅ µg/m³ | ✅ | ✅ |
| **Temperature** | ✅ (limited) | ✅ Full weather | ✅ | ❌ |
| **Humidity** | ✅ (limited) | ✅ | ✅ | ❌ |
| **Wind Speed** | ✅ (limited) | ✅ | ✅ | ❌ |
| **UV Index** | ❌ | ✅ (One Call API) | ❌ | ❌ |
| **Historical Data** | ❌ (limited) | ✅ (from Nov 2020) | ❌ (free tier) | ✅ Extensive |
| **Forecast** | ✅ 3-day | ✅ 4-day (hourly) | ❌ (free tier) | ❌ |
| **India Stations** | 200+ | Global (lat/lng) | 50+ cities | 100+ |
| **Search by City** | ✅ | ❌ (lat/lng only) | ✅ | ✅ (by location) |
| **Map Bounds Query** | ✅ | ❌ | ❌ | ✅ (bounding box) |
| **Free Tier** | ✅ Unlimited* | ✅ 1,000/day | ✅ 10,000/month | ✅ Free |
| **Rate Limit** | 1,000/min | 60/min | 5/min | Varies |
| **API Key Required** | ✅ | ✅ | ✅ | ✅ |
| **Commercial Use** | ❌ Restricted | ✅ with attribution | ❌ (free tier) | ✅ Open |

---

## Detailed API Analysis

### 1. WAQI (World Air Quality Index) — ⭐ PRIMARY API

**Documentation**: [https://aqicn.org/json-api/doc/](https://aqicn.org/json-api/doc/)  
**Sign Up**: [https://aqicn.org/data-platform/token/](https://aqicn.org/data-platform/token/)

#### Why Chosen as Primary

1. **Best India Coverage**: Aggregates data from CPCB (Central Pollution Control Board) and state PCBs — the official Indian government sources
2. **US EPA AQI Standard**: Returns AQI values in the US EPA scale (0–500), matching the reference site
3. **City Search**: Built-in search endpoint — crucial for the search feature
4. **Map Bounds**: Query all stations within a bounding box — essential for the map page
5. **No Daily Limit**: 1,000 requests/minute is extremely generous
6. **3-Day Forecast**: Provides AQI forecast data

#### Key Endpoints

```
Base URL: https://api.waqi.info

1. City Feed (by name):
   GET /feed/{city}/?token={TOKEN}
   Returns: AQI, pollutants, weather, attributions

2. City Feed (by coordinates):
   GET /feed/geo:{lat};{lng}/?token={TOKEN}
   Returns: Nearest station data

3. Search:
   GET /search/?keyword={query}&token={TOKEN}
   Returns: Array of matching stations

4. Map Stations (bounding box):
   GET /map/bounds/?latlng={lat1},{lng1},{lat2},{lng2}&token={TOKEN}
   Returns: All stations within bounds
```

#### Example Response (City Feed)
```json
{
  "status": "ok",
  "data": {
    "aqi": 96,
    "idx": 7564,
    "attributions": [...],
    "city": {
      "geo": [28.6353, 77.2250],
      "name": "New Delhi, Delhi, India",
      "url": "..."
    },
    "dominentpol": "pm10",
    "iaqi": {
      "co": { "v": 3.4 },
      "h": { "v": 66 },
      "no2": { "v": 24.1 },
      "o3": { "v": 23.2 },
      "p": { "v": 998 },
      "pm10": { "v": 137 },
      "pm25": { "v": 32 },
      "so2": { "v": 6.4 },
      "t": { "v": 31.4 },
      "w": { "v": 5.4 },
      "wg": { "v": 12.2 }
    },
    "time": {
      "s": "2026-07-12 08:00:00",
      "tz": "+05:30",
      "v": 1752307200
    },
    "forecast": {
      "daily": {
        "o3": [...],
        "pm10": [...],
        "pm25": [...]
      }
    }
  }
}
```

#### Rate Limits
| Metric | Limit |
|--------|-------|
| Requests/minute | 1,000 |
| Burst allowance | 60 |
| Daily limit | None (acceptable use) |
| Monthly limit | None |

#### Limitations
- ❌ No detailed historical data (only current + 3-day forecast)
- ❌ Commercial use requires agreement
- ❌ Weather data is limited (no UV index, basic temp/humidity only)
- ❌ Must display attribution: "World Air Quality Index Project"
- ❌ Cannot cache/redistribute data

#### Pricing
| Tier | Cost |
|------|------|
| Free | $0 (personal/educational/non-commercial) |
| Commercial | Contact WAQI team |

---

### 2. OpenWeatherMap — ⭐ SECONDARY API (Weather)

**Documentation**: [https://openweathermap.org/api](https://openweathermap.org/api)  
**Air Pollution API**: [https://openweathermap.org/api/air-pollution](https://openweathermap.org/api/air-pollution)  
**Sign Up**: [https://home.openweathermap.org/users/sign_up](https://home.openweathermap.org/users/sign_up)

#### Why Chosen for Weather Data

1. **Complete Weather Data**: Temperature, humidity, wind speed, weather condition, cloud cover, pressure
2. **UV Index**: Available through the One Call API
3. **Air Pollution History**: Historical data available from Nov 27, 2020
4. **4-Day Forecast**: Hourly granularity for air pollution forecast
5. **Coordinate-Based**: Works with any lat/lng — perfect complement to WAQI

#### Key Endpoints

```
Base URL: https://api.openweathermap.org

1. Current Weather:
   GET /data/2.5/weather?lat={lat}&lon={lon}&appid={KEY}&units=metric
   Returns: Temperature, humidity, wind, weather condition, etc.

2. Air Pollution (Current):
   GET /data/2.5/air_pollution?lat={lat}&lon={lon}&appid={KEY}
   Returns: AQI (1-5 scale), PM2.5, PM10, CO, NO, NO₂, O₃, SO₂, NH₃

3. Air Pollution (Forecast):
   GET /data/2.5/air_pollution/forecast?lat={lat}&lon={lon}&appid={KEY}
   Returns: Hourly forecast for 4 days

4. Air Pollution (Historical):
   GET /data/2.5/air_pollution/history?lat={lat}&lon={lon}&start={unix}&end={unix}&appid={KEY}
   Returns: Historical data between timestamps

5. One Call API 3.0 (for UV Index):
   GET /data/3.0/onecall?lat={lat}&lon={lon}&appid={KEY}
   Returns: Current + forecast + UV index
```

> [!WARNING]
> OpenWeatherMap's AQI uses a **1-5 scale** (EU standard), NOT the US EPA 0-500 scale. You must use WAQI for the primary AQI value and OpenWeatherMap for supplementary weather data and historical air pollution.

#### Rate Limits
| Metric | Limit |
|--------|-------|
| Calls/day | 1,000 |
| Calls/minute | 60 |
| One Call API 3.0 | 1,000 calls/day (free) |

#### Limitations
- ❌ AQI uses EU 1-5 scale, not US EPA
- ❌ Requires coordinates (not city names) — need reverse geocoding
- ❌ 1,000 calls/day may be limiting for heavy use
- ❌ One Call API 3.0 requires credit card on file

#### Pricing
| Tier | Cost | Calls/day |
|------|------|-----------|
| Free | $0 | 1,000 |
| Starter | $0 (subscription) | 1,000 (One Call) |
| Developer | ~$40/month | 3,000 |

---

### 3. IQAir (AirVisual) — 🔄 BACKUP API

**Documentation**: [https://api-docs.iqair.com/](https://api-docs.iqair.com/)  
**Sign Up**: [https://dashboard.iqair.com/](https://dashboard.iqair.com/)

#### Why Kept as Backup

1. **Comprehensive Data**: AQI + all pollutants + weather in one call
2. **City/State/Country Hierarchy**: Perfect for the hierarchical navigation (India → State → City)
3. **IP-Based Geolocation**: Nearest city endpoint using IP — useful for fallback location

#### Key Endpoints

```
Base URL: https://api.airvisual.com/v2

1. Nearest City (by IP):
   GET /nearest_city?key={KEY}

2. Nearest City (by coordinates):
   GET /nearest_city?lat={lat}&lon={lon}&key={KEY}

3. Specific City:
   GET /city?city={name}&state={state}&country=India&key={KEY}

4. List States:
   GET /states?country=India&key={KEY}

5. List Cities in State:
   GET /cities?state={state}&country=India&key={KEY}

6. List Countries:
   GET /countries?key={KEY}
```

#### Rate Limits
| Metric | Limit |
|--------|-------|
| Calls/minute | 5 |
| Calls/day | 500 |
| Calls/month | 10,000 |

#### Limitations
- ❌ Very strict rate limits (5/min, 500/day)
- ❌ Limited city coverage for smaller Indian towns
- ❌ No historical data on free tier
- ❌ No map/bounds query

#### Pricing
| Tier | Cost | Calls/month |
|------|------|-------------|
| Community | $0 | 10,000 |
| Startup | $99/mo | 100,000 |
| Enterprise | Custom | Unlimited |

---

### 4. OpenAQ — 📊 HISTORICAL DATA (Optional)

**Documentation**: [https://docs.openaq.org](https://docs.openaq.org)  
**Sign Up**: [https://explore.openaq.org/register](https://explore.openaq.org/register)

#### Why Included

1. **Open Data**: Truly open-source air quality data
2. **Historical Depth**: Extensive historical measurements
3. **Indian Government Stations**: Aggregates CPCB data
4. **Bounding Box Queries**: Useful for map features

#### Key Endpoints (v3)

```
Base URL: https://api.openaq.org/v3

1. List Locations:
   GET /v3/locations?country=IN&limit=100
   Headers: X-API-Key: {KEY}

2. Measurements by Location:
   GET /v3/locations/{id}/measurements?limit=100

3. Bounding Box Search:
   GET /v3/locations?bbox={west},{south},{east},{north}
```

#### Limitations
- ❌ Returns raw measurement data, NOT calculated AQI
- ❌ Rate limits not clearly documented (HTTP 429 on overuse)
- ❌ API v1 and v2 retired (Jan 2025) — must use v3
- ❌ Requires more data processing on the client side

---

## Recommended API Strategy

### Primary Architecture: WAQI + OpenWeatherMap

```
┌─────────────────────────────────────────────────────┐
│                   ecoBreathe                         │
│                                                     │
│  ┌─────────────┐           ┌──────────────────────┐│
│  │  WAQI API   │           │  OpenWeatherMap API   ││
│  │  (Primary)  │           │  (Secondary)          ││
│  │             │           │                       ││
│  │  • AQI      │           │  • Temperature        ││
│  │  • PM2.5    │           │  • Humidity            ││
│  │  • PM10     │           │  • Wind Speed          ││
│  │  • CO       │           │  • Weather Condition   ││
│  │  • NO₂      │           │  • UV Index            ││
│  │  • SO₂      │           │  • Historical Air Data ││
│  │  • O₃       │           │  • Air Pollution       ││
│  │  • Search   │           │    Forecast (hourly)   ││
│  │  • Map Data │           │                       ││
│  │  • Forecast │           │                       ││
│  └──────┬──────┘           └──────────┬───────────┘│
│         │                             │             │
│  ┌──────▼─────────────────────────────▼───────────┐│
│  │              Service Layer                      ││
│  │  Merge, normalize, cache responses              ││
│  └─────────────────────────────────────────────────┘│
│                                                     │
│  ┌─────────────┐ (Fallback only)                   │
│  │  IQAir API  │                                   │
│  │  • City list│                                   │
│  │  • Nearest  │                                   │
│  └─────────────┘                                   │
└─────────────────────────────────────────────────────┘
```

### How They Work Together

| Data Point | Primary Source | Fallback Source |
|-----------|---------------|-----------------|
| AQI (0-500) | WAQI | Calculated from OWM pollutants |
| PM2.5, PM10, CO, NO₂, SO₂, O₃ | WAQI | OpenWeatherMap Air Pollution |
| Temperature | OpenWeatherMap | WAQI (basic) |
| Humidity | OpenWeatherMap | WAQI (basic) |
| Wind Speed | OpenWeatherMap | WAQI (basic) |
| Weather Condition | OpenWeatherMap | — |
| UV Index | OpenWeatherMap (One Call) | — |
| City Search | WAQI (search endpoint) | IQAir (state/city list) |
| Map Stations | WAQI (map bounds) | — |
| Historical Data | OpenWeatherMap (air pollution history) | — |
| AQI Forecast | WAQI (3-day) + OWM (4-day hourly) | — |
| City Hierarchy | IQAir (states/cities) | Static data file |

---

## API Key Setup Instructions

### Step 1: WAQI API Key
1. Go to [https://aqicn.org/data-platform/token/](https://aqicn.org/data-platform/token/)
2. Enter your email address
3. Check email for confirmation link
4. Click the link to receive your API token
5. Save token as `VITE_WAQI_TOKEN` in `.env.local`

### Step 2: OpenWeatherMap API Key
1. Go to [https://home.openweathermap.org/users/sign_up](https://home.openweathermap.org/users/sign_up)
2. Create a free account
3. Navigate to API keys section in your dashboard
4. Copy the default API key (or create a new one)
5. Save as `VITE_OWM_API_KEY` in `.env.local`
6. **Note**: API key activation can take up to 2 hours

### Step 3: IQAir API Key (Optional Backup)
1. Go to [https://dashboard.iqair.com/](https://dashboard.iqair.com/)
2. Register or sign in
3. Navigate to "Air quality API" tab
4. Generate your API key
5. Save as `VITE_IQAIR_API_KEY` in `.env.local`

### Environment Variables Template

```env
# .env.example

# WAQI API (Primary - AQI & Pollutants)
VITE_WAQI_TOKEN=your_waqi_token_here

# OpenWeatherMap API (Weather & Historical Air Data)
VITE_OWM_API_KEY=your_openweathermap_key_here

# IQAir API (Backup - Optional)
VITE_IQAIR_API_KEY=your_iqair_key_here

# App Configuration
VITE_DEFAULT_CITY=new-delhi
VITE_DEFAULT_LAT=28.6353
VITE_DEFAULT_LNG=77.2250
VITE_REFRESH_INTERVAL=300000
```

> [!IMPORTANT]
> **Security Note**: Since this is a frontend-only app, API keys will be visible in the browser's network requests. This is acceptable because:
> - All APIs have free tiers with rate limits
> - No sensitive user data is exposed
> - For production, consider adding a thin proxy server

---

## Rate Limit Management Strategy

### Request Budget (per day)

| API | Daily Limit | App Usage Estimate | Remaining |
|-----|-------------|-------------------|-----------|
| WAQI | ~144,000 (1k/min) | ~500 | Abundant |
| OpenWeatherMap | 1,000 | ~300 | Comfortable |
| IQAir | 500 | ~50 (fallback) | Safe |

### Optimization Techniques

1. **In-Memory Caching**: Cache API responses for 5 minutes (AQI data updates hourly)
2. **Deduplication**: Don't re-fetch if user revisits the same city within cache TTL
3. **Batch Metro Cities**: Fetch all 8 metro cities in parallel but cache results
4. **Lazy Loading**: Only fetch map station data when map page is visited
5. **localStorage Persistence**: Cache the last known AQI data in localStorage for instant display

---

## API Data Normalization

Since different APIs return data in different formats, normalize everything through the service layer:

### Normalized AQI Data Object

```javascript
// Output of aqiService.getAQIData(city)
{
  aqi: 96,                           // US EPA AQI (from WAQI)
  category: 'Moderate',               // Calculated from AQI
  color: '#FFDE33',                   // Category color
  dominantPollutant: 'pm10',          // From WAQI
  
  pollutants: {
    pm25: { value: 32, unit: 'µg/m³', aqi: 76 },
    pm10: { value: 137, unit: 'µg/m³', aqi: 96 },
    co: { value: 121, unit: 'ppb', aqi: 12 },
    so2: { value: 6, unit: 'ppb', aqi: 8 },
    no2: { value: 24, unit: 'ppb', aqi: 22 },
    o3: { value: 23, unit: 'ppb', aqi: 19 },
  },
  
  weather: {                          // From OpenWeatherMap
    temperature: 31.4,
    condition: 'Mist',
    conditionIcon: '50d',
    humidity: 66,
    windSpeed: 19.4,
    uvIndex: 2.8,
    pressure: 998,
  },
  
  location: {
    name: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    lat: 28.6353,
    lng: 77.2250,
  },
  
  timestamp: '2026-07-12T08:51:00+05:30',
  attribution: 'World Air Quality Index Project',
  
  forecast: {
    pm25: [/* 3-day array */],
    pm10: [/* 3-day array */],
    o3: [/* 3-day array */],
  }
}
```

---

## Next Steps

Proceed to [06_DATA_FLOW.md](./06_DATA_FLOW.md) for the complete data flow and state management architecture.
