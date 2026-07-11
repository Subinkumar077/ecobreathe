const PM25_AQI_BREAKPOINTS = [
  [0, 12, 0, 50],
  [12.1, 35.4, 51, 100],
  [35.5, 55.4, 101, 150],
  [55.5, 150.4, 151, 200],
  [150.5, 250.4, 201, 300],
  [250.5, 350.4, 301, 400],
  [350.5, 500.4, 401, 500],
]

export function pm25ToAqi(value) {
  const concentration = Math.min(Math.max(Number(value), 0), 500.4)
  const breakpoint = PM25_AQI_BREAKPOINTS.find(
    ([concentrationLow, concentrationHigh]) =>
      concentration >= concentrationLow && concentration <= concentrationHigh,
  )

  if (!breakpoint) return null

  const [concentrationLow, concentrationHigh, aqiLow, aqiHigh] = breakpoint
  return Math.round(
    ((aqiHigh - aqiLow) / (concentrationHigh - concentrationLow)) *
      (concentration - concentrationLow) +
      aqiLow,
  )
}

export function getAqiBand(aqi) {
  if (aqi <= 50) return 'good'
  if (aqi <= 100) return 'moderate'
  if (aqi <= 200) return 'unhealthy'
  return 'hazardous'
}
