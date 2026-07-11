/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#060D1B',
        'midnight-soft': '#0D1828',
        charcoal: '#1C1B1A',
        'charcoal-soft': '#26241F',
        haze: '#F4F1E8',
        paper: '#FFFFFF',
        ink: '#20201C',
        'ink-muted': '#5B584F',
        'aqi-good': '#3E7C59',
        'aqi-moderate': '#E8A33D',
        'aqi-unhealthy': '#C4432B',
        'aqi-hazardous': '#7A2048',
        'accent-amber': '#E8A33D',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [],
}
