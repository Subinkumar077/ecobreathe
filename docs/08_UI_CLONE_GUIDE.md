# 08 — UI Clone Guide

This document provides section-by-section guidance on recreating the reference design ([aqi.in](https://www.aqi.in/in)), including specific CSS properties, layout techniques, and placeholder asset strategies.

> [!IMPORTANT]
> **Copyright Notice**: Do NOT copy any logos, illustrations, icons, or images from the reference site. This guide uses placeholder descriptions for all visual assets. Use royalty-free alternatives or generate custom assets.

---

## Global Design System

### Color Palette

```css
:root {
  /* Background Colors */
  --bg-primary: #0d1117;           /* Deep navy — main background */
  --bg-secondary: #161b22;         /* Slightly lighter — cards */
  --bg-tertiary: #1c2333;          /* Card hover / elevated surfaces */
  --bg-surface: #21262d;           /* Input fields, table rows */
  
  /* AQI Category Colors */
  --aqi-good: #009966;             /* 0-50: Green */
  --aqi-moderate: #FFDE33;         /* 51-100: Yellow */
  --aqi-poor: #FF9933;             /* 101-150: Orange */
  --aqi-unhealthy: #CC0033;        /* 151-200: Red */
  --aqi-severe: #660099;           /* 201-300: Purple */
  --aqi-hazardous: #7E0023;        /* 301+: Maroon */
  
  /* Text Colors */
  --text-primary: #f0f6fc;         /* White — headings */
  --text-secondary: #8b949e;       /* Gray — descriptions */
  --text-tertiary: #6e7681;        /* Dim — metadata */
  --text-accent: #58a6ff;          /* Blue — links */
  
  /* Accent Colors */
  --accent-gold: #d4a843;          /* CTA buttons, highlights */
  --accent-blue: #1f6feb;          /* Active states */
  --accent-green: #3fb950;         /* Success / Good */
  
  /* Chart Colors */
  --chart-bar-good: #55a868;
  --chart-bar-moderate: #c5b833;
  --chart-bar-poor: #dd7e3d;
  --chart-bar-unhealthy: #d44040;
  --chart-bar-severe: #8040a0;
  --chart-bar-hazardous: #7e0023;
  
  /* Borders & Dividers */
  --border-subtle: #30363d;
  --border-default: #444c56;
  
  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5);
  --shadow-glow: 0 0 20px rgba(255, 222, 51, 0.15);
}
```

### Typography

```css
/* Google Fonts import in index.html */
/* <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"> */

:root {
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  --font-size-xs: 0.75rem;    /* 12px — metadata, labels */
  --font-size-sm: 0.875rem;   /* 14px — body small */
  --font-size-base: 1rem;     /* 16px — body */
  --font-size-lg: 1.125rem;   /* 18px — subtitles */
  --font-size-xl: 1.25rem;    /* 20px — section titles */
  --font-size-2xl: 1.5rem;    /* 24px — page titles */
  --font-size-3xl: 2rem;      /* 32px — hero text */
  --font-size-4xl: 3rem;      /* 48px — AQI value */
  --font-size-5xl: 4rem;      /* 64px — AQI gauge number */
  
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
  
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
}
```

### Spacing Scale

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
}
```

### Breakpoints

```css
/* Mobile First Approach */
/* Default styles = mobile (0-480px) */

@media (min-width: 481px)  { /* Mobile Large */ }
@media (min-width: 769px)  { /* Tablet */ }
@media (min-width: 1025px) { /* Desktop */ }
@media (min-width: 1441px) { /* Large Desktop */ }
```

---

## Section-by-Section Recreation Guide

### 1. Navbar

**Reference Appearance**: Dark navbar with transparent-to-solid background on scroll. Logo left, nav items center, Login button right.

**CSS Approach**:
```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: var(--space-3) var(--space-6);
  background: rgba(13, 17, 23, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-subtle);
  transition: background 0.3s ease;
}

.navbar.scrolled {
  background: rgba(13, 17, 23, 0.98);
}

.navContainer {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

**Logo**: Create a text-based logo "eco**Breathe**" using CSS:
```css
.logo {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  text-decoration: none;
}
.logo span { /* "Breathe" part */
  color: var(--accent-gold);
}
```

**Placeholder Assets**: No image logo needed — use styled text.

---

### 2. AQI Scale Explainer Section

**Reference Appearance**: Dark section with 6 colored cards arranged in a grid. Tabbed interface for US/India/China standards.

**CSS Approach**:
```css
.scaleSection {
  padding: var(--space-16) var(--space-6);
  background: var(--bg-primary);
}

.scaleGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
  max-width: 1200px;
  margin: 0 auto;
}

.scaleCard {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  border-left: 4px solid;  /* Color set by AQI category */
  transition: transform 0.2s, box-shadow 0.2s;
}

.scaleCard:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* Tab styling */
.tabGroup {
  display: flex;
  gap: var(--space-2);
  margin-bottom: var(--space-8);
}

.tab {
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  background: var(--bg-surface);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.tab.active {
  background: var(--accent-gold);
  color: var(--bg-primary);
}
```

**Mobile**: Change to `grid-template-columns: repeat(2, 1fr)` below 768px.

---

### 3. AQI Dashboard Hero Card

**Reference Appearance**: Large card with circular AQI gauge on the left, weather info and mini-map on the right. Dark card with colored border based on AQI level.

**CSS Approach**:
```css
.heroCard {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
  background: var(--bg-secondary);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  border: 1px solid var(--border-subtle);
  position: relative;
  overflow: hidden;
}

/* Glow effect based on AQI category */
.heroCard::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--current-aqi-color);
}

.gaugeContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.aqiValue {
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-extrabold);
  color: var(--text-primary);
  line-height: 1;
}

.aqiCategory {
  font-size: var(--font-size-lg);
  color: var(--current-aqi-color);
  text-transform: uppercase;
  letter-spacing: 1px;
}
```

**AQI Gauge Implementation**:
```css
/* SVG-based circular gauge */
.gauge {
  width: 200px;
  height: 200px;
}

.gaugeTrack {
  fill: none;
  stroke: var(--bg-surface);
  stroke-width: 12;
}

.gaugeFill {
  fill: none;
  stroke: var(--current-aqi-color);
  stroke-width: 12;
  stroke-linecap: round;
  transition: stroke-dashoffset 1s ease-out;
  transform: rotate(-90deg);
  transform-origin: center;
}
```

**Mobile**: Change to `grid-template-columns: 1fr` (stacked).

---

### 4. Pollutant Cards Grid

**Reference Appearance**: 3×2 grid of dark cards, each showing pollutant name, value, and a horizontal progress bar.

**CSS Approach**:
```css
.pollutantGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}

.pollutantCard {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  cursor: pointer;
  transition: transform 0.2s;
}

.pollutantCard:hover {
  transform: scale(1.02);
}

.pollutantName {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: var(--space-1);
}

.pollutantSymbol {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

.pollutantValue {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

.pollutantUnit {
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
  margin-left: var(--space-1);
}

.progressBar {
  height: 6px;
  background: var(--bg-surface);
  border-radius: var(--radius-full);
  margin-top: var(--space-3);
  overflow: hidden;
}

.progressFill {
  height: 100%;
  border-radius: var(--radius-full);
  transition: width 0.8s ease-out;
  /* background color set dynamically */
}
```

**Mobile**: `grid-template-columns: repeat(2, 1fr)`

---

### 5. AQI Chart (Hourly Bar Chart)

**Reference Appearance**: Bar chart with yellow/gold colored bars on dark background. Hours on X-axis, AQI on Y-axis. Each bar colored individually by AQI category.

**Recharts Customization**:
```css
.chartContainer {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}
```

**Recharts Custom Theme Props**:
```javascript
// Chart styling (passed as props to Recharts)
const chartTheme = {
  axisStroke: '#8b949e',      // Axis line color
  tickFill: '#8b949e',        // Tick label color
  gridStroke: '#21262d',      // Grid line color
  tooltipBg: '#1c2333',       // Tooltip background
  tooltipBorder: '#30363d',   // Tooltip border
};
```

**Key**: Each bar's color should be set individually based on that hour's AQI value using Recharts' `Cell` component with custom fill color.

---

### 6. Health Advice Section

**Reference Appearance**: Dark section with cigarette equivalence widget, 4 protection recommendation cards, and expandable disease risk accordion.

**CSS Approach**:
```css
.cigaretteWidget {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  text-align: center;
}

.cigaretteCount {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-extrabold);
  color: var(--aqi-poor);     /* Orange-ish color */
}

.protectionGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
}

.protectionCard {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  text-align: center;
}

/* Disease accordion */
.diseaseCard {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-3);
  overflow: hidden;
}

.diseaseHeader {
  padding: var(--space-4) var(--space-5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.diseaseContent {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  padding: 0 var(--space-5);
}

.diseaseContent.expanded {
  max-height: 1000px;
  padding: var(--space-4) var(--space-5);
}
```

---

### 7. Metro Cities Cards

**Reference Appearance**: 4×2 grid of small cards, each showing city name, AQI badge (color-coded), temperature, and humidity.

**CSS Approach**:
```css
.metroCitiesGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
}

.metroCityCard {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
}

.metroCityCard:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.cityName {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.aqiBadge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: white;
  /* background set dynamically by AQI color */
}

.cityMeta {
  display: flex;
  gap: var(--space-4);
  margin-top: var(--space-3);
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}
```

---

### 8. City Rankings Table

**Reference Appearance**: Numbered rows with city name, state, AQI badge, status label, and "× above standard" multiplier.

**CSS Approach**:
```css
.rankingTable {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 var(--space-2);
}

.rankingRow {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  transition: background 0.2s;
}

.rankingRow:hover {
  background: var(--bg-tertiary);
}

.rankingRow td {
  padding: var(--space-4) var(--space-5);
}

.rankingRow td:first-child {
  border-radius: var(--radius-lg) 0 0 var(--radius-lg);
}

.rankingRow td:last-child {
  border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
}

.statusBadge {
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  /* background and color set by AQI category */
}

.multiplier {
  color: var(--aqi-unhealthy);
  font-weight: var(--font-weight-semibold);
}
```

---

### 9. Blog Section

**Reference Appearance**: 2-column grid of blog cards with image thumbnails, titles, dates, and author names.

**Placeholder Strategy**:
- Generate 10 placeholder blog images using the image generation tool
- Topics: air quality, pollution, health, cities, environment
- Use generic but relevant images (city skylines, nature, health)

**CSS Approach**:
```css
.blogGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
}

.blogCard {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: transform 0.2s;
}

.blogCard:hover {
  transform: translateY(-3px);
}

.blogImage {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.blogContent {
  padding: var(--space-5);
}

.blogTitle {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-3);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blogMeta {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}
```

---

### 10. App Promotion Section

**Reference Appearance**: Large section with phone mockup on left, feature bullets on right, download badges at bottom.

**Placeholder Assets Needed**:
| Asset | Replacement Strategy |
|-------|---------------------|
| Phone mockup with app | Generate a generic phone frame with AQI dashboard UI |
| TV app mockup | Generate a TV screen with AQI color display |
| Dashboard screenshot | Generate a laptop showing a generic dashboard |
| App Store badge | Use text "Download on App Store" in a styled button |
| Google Play badge | Use text "Get it on Google Play" in a styled button |

```css
.appPromo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-10);
  align-items: center;
  padding: var(--space-16) var(--space-6);
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
}

.appMockup {
  max-width: 300px;
  margin: 0 auto;
  /* Use CSS to create a phone frame if no image */
  border: 3px solid var(--border-default);
  border-radius: 32px;
  padding: var(--space-3);
  background: var(--bg-primary);
}

.featureList {
  list-style: none;
  padding: 0;
}

.featureItem {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
  font-size: var(--font-size-base);
  color: var(--text-secondary);
}

.featureItem::before {
  content: '✓';
  color: var(--accent-green);
  font-weight: bold;
}

.downloadBadges {
  display: flex;
  gap: var(--space-4);
  margin-top: var(--space-6);
}

.badge {
  padding: var(--space-3) var(--space-5);
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-default);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: var(--space-2);
  text-decoration: none;
  transition: background 0.2s;
}

.badge:hover {
  background: var(--bg-tertiary);
}
```

---

### 11. Media Coverage & Trusted By

**Placeholder Strategy**:

Since you cannot use actual media logos or company logos:

**Media Coverage**:
- Use styled text names in a decorative font/weight
- Example: Instead of The Economic Times logo, render "Economic Times" in bold serif text
- Create a horizontal auto-scrolling marquee effect

**Trusted By**:
- Use generic category labels: "Government Agency", "Fortune 500 Corp", "University"
- Or use simple circles with initials
- Arrange in a clean grid

```css
.mediaScroll {
  display: flex;
  gap: var(--space-10);
  overflow: hidden;
  padding: var(--space-6) 0;
}

.mediaName {
  font-family: 'Georgia', serif;
  font-size: var(--font-size-xl);
  color: var(--text-tertiary);
  white-space: nowrap;
  opacity: 0.6;
  transition: opacity 0.3s;
}

.mediaName:hover {
  opacity: 1;
}

/* Auto-scroll animation */
.mediaTrack {
  display: flex;
  gap: var(--space-10);
  animation: scroll 30s linear infinite;
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

---

### 12. Footer

**Reference Appearance**: Dark footer with 4 columns of links, social icons, and legal links at bottom.

```css
.footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-subtle);
  padding: var(--space-16) var(--space-6) var(--space-8);
}

.footerGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-8);
  max-width: 1400px;
  margin: 0 auto;
}

.footerColumn h4 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-4);
}

.footerLink {
  display: block;
  color: var(--text-secondary);
  text-decoration: none;
  padding: var(--space-2) 0;
  font-size: var(--font-size-sm);
  transition: color 0.2s;
}

.footerLink:hover {
  color: var(--text-primary);
}

.socialIcons {
  display: flex;
  gap: var(--space-4);
  margin-top: var(--space-6);
}

.socialIcon {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  background: var(--bg-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: background 0.2s, color 0.2s;
}

.socialIcon:hover {
  background: var(--accent-blue);
  color: white;
}

.legalBar {
  border-top: 1px solid var(--border-subtle);
  margin-top: var(--space-8);
  padding-top: var(--space-6);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}
```

---

## Animation Guidelines

### Entry Animations (Scroll-triggered)

```css
/* Fade up animation for sections */
.fadeInUp {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fadeInUp.visible {
  opacity: 1;
  transform: translateY(0);
}
```

Use `IntersectionObserver` in React to add `.visible` class when section enters viewport.

### Micro-interactions

```css
/* Card hover lift */
.card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

/* Button press */
.button:active {
  transform: scale(0.98);
}

/* Gauge fill animation */
@keyframes fillGauge {
  from { stroke-dashoffset: 283; }  /* Full circumference */
  to { stroke-dashoffset: var(--target-offset); }
}

/* Number count-up animation */
@keyframes countUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## Placeholder Asset Summary

| Asset Needed | What to Use Instead |
|-------------|-------------------|
| aqi.in logo | Text logo: "eco**Breathe**" styled with CSS |
| App screenshots | Generated phone frame with colored AQI blocks |
| Blog images | Royalty-free images from Unsplash/Pexels (city, nature, health) or generate using AI |
| Media logos | Styled text names in serif font |
| Company logos | Generic placeholder circles or text initials |
| Device mockups | CSS-rendered device frames or royalty-free mockup images |
| Pollutant icons | React Icons (Lucide) or simple SVG circles with chemical symbols |
| Weather icons | React Icons weather set or OpenWeatherMap's free icon API |
| Hero illustration | Generated illustration or gradient-based abstract design |

---

## Next Steps

Proceed to [09_DEPLOYMENT_GUIDE.md](./09_DEPLOYMENT_GUIDE.md) for deployment instructions.
