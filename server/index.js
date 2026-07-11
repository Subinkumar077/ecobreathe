import { existsSync } from 'node:fs'
import dotenv from 'dotenv'
import express from 'express'

const envPath = new URL('.env', import.meta.url)
if (existsSync(envPath)) {
  dotenv.config({ path: envPath, override: true })
}

const OPENAQ_BASE_URL = 'https://api.openaq.org/v3'
const DEFAULT_PORT = 8787
const LOCATION_CACHE_TTL = 5 * 60 * 1000
const LIVE_READING_MAX_AGE = 36 * 60 * 60 * 1000
const LOCAL_ORIGINS = ['http://localhost:5173', 'http://127.0.0.1:5173']
const MAP_DEFAULT_COORDINATES = '28.6139,77.2090'
const MAP_DEFAULT_RADIUS = '25000'
const MAP_QUERY_PARAMS = new Set(['coordinates', 'radius', 'limit'])
const LOCATION_QUERY_PARAMS = new Set([
  'bbox',
  'coordinates',
  'countries_id',
  'iso',
  'limit',
  'order_by',
  'page',
  'parameters_id',
  'providers_id',
  'radius',
  'sort_order',
])

let indiaLocationsCache = { expiresAt: 0, locations: [] }
const mapStationsCache = new Map()

function getAllowedOrigins() {
  const configuredOrigins = (process.env.CORS_ORIGIN || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

  return new Set([...LOCAL_ORIGINS, ...configuredOrigins])
}

function corsMiddleware(req, res, next) {
  const origin = req.get('Origin')

  if (origin && !getAllowedOrigins().has(origin)) {
    return res.status(403).json({ error: 'Origin is not allowed to use this API.' })
  }

  if (origin) {
    res.set('Access-Control-Allow-Origin', origin)
    res.set('Vary', 'Origin')
  }

  res.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.set('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204)
  }

  return next()
}

function copyAllowedQueryParams(query, allowedParams) {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(query)) {
    if (!allowedParams.has(key) || typeof value !== 'string') {
      continue
    }

    params.set(key, value)
  }

  return params
}

async function requestOpenAq(path, query) {
  const apiKey = process.env.OPENAQ_API_KEY

  if (!apiKey) {
    const error = new Error('The OpenAQ proxy is not configured.')
    error.status = 503
    throw error
  }

  const url = new URL(`${OPENAQ_BASE_URL}${path}`)
  url.search = query.toString()

  let response
  try {
    response = await fetch(url, {
      headers: { 'X-API-Key': apiKey },
      signal: AbortSignal.timeout(30_000),
    })
  } catch {
    const error = new Error('OpenAQ is currently unavailable.')
    error.status = 502
    throw error
  }

  if (!response.ok) {
    const error = new Error('OpenAQ could not fulfill this request.')
    error.status = response.status >= 500 ? 502 : response.status
    throw error
  }

  return response.json()
}

async function getIndiaPm25Locations() {
  if (Date.now() < indiaLocationsCache.expiresAt) {
    return indiaLocationsCache.locations
  }

  const query = new URLSearchParams({ iso: 'IN', limit: '100' })
  const payload = await requestOpenAq('/locations', query)
  const liveAfter = Date.now() - LIVE_READING_MAX_AGE
  const locations = (payload.results || []).filter((location) => {
    const latestReadingAt = new Date(location.datetimeLast?.utc).getTime()
    return (
      latestReadingAt >= liveAfter &&
      location.sensors?.some((sensor) => sensor.parameter?.name === 'pm25')
    )
  })

  indiaLocationsCache = {
    expiresAt: Date.now() + LOCATION_CACHE_TTL,
    locations,
  }

  return locations
}

function toCityResult(location) {
  const pm25Sensor = location.sensors.find((sensor) => sensor.parameter?.name === 'pm25')

  return {
    id: location.id,
    name: location.name || 'Unnamed monitoring station',
    cityName: location.locality || location.city || '',
    country: location.country?.name || location.country?.code || '',
    latitude: location.coordinates?.latitude,
    longitude: location.coordinates?.longitude,
    pm25SensorId: pm25Sensor.id,
  }
}

export function createApp() {
  const app = express()

  app.disable('x-powered-by')
  app.use(corsMiddleware)

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' })
  })

  app.get('/api/map/stations', async (req, res, next) => {
    const query = copyAllowedQueryParams(req.query, MAP_QUERY_PARAMS)
    query.set('coordinates', query.get('coordinates') || MAP_DEFAULT_COORDINATES)
    query.set('radius', query.get('radius') || MAP_DEFAULT_RADIUS)
    query.set('limit', query.get('limit') || '60')

    const cacheKey = query.toString()
    const cached = mapStationsCache.get(cacheKey)
    if (cached && cached.expiresAt > Date.now()) {
      return res.json({ results: cached.results })
    }

    const locationsQuery = new URLSearchParams(query)
    locationsQuery.set('parameters_id', '2')

    try {
      const locationsPayload = await requestOpenAq('/locations', locationsQuery)
      const liveAfter = Date.now() - LIVE_READING_MAX_AGE
      const locations = (locationsPayload.results || [])
        .map((location) => ({
          location,
          pm25Sensor: location.sensors?.find((sensor) => sensor.parameter?.name === 'pm25'),
        }))
        .filter(({ location, pm25Sensor }) => {
          const lastReadingAt = new Date(location.datetimeLast?.utc).getTime()
          return pm25Sensor && lastReadingAt >= liveAfter
        })

      const latestResponses = await Promise.allSettled(
        locations.map(({ location }) =>
          requestOpenAq(`/locations/${location.id}/latest`, new URLSearchParams()),
        ),
      )
      const results = latestResponses
        .map((response, index) => {
          if (response.status !== 'fulfilled') return null

          const { location, pm25Sensor } = locations[index]
          const measurement = response.value.results?.find(
            (result) => result.sensorsId === pm25Sensor.id,
          )
          const measuredAt = new Date(measurement?.datetime?.utc).getTime()
          const coordinates = measurement?.coordinates || location.coordinates

          if (!measurement || !coordinates || measuredAt < liveAfter) return null

          return {
            id: location.id,
            name: location.name || 'Unnamed monitoring station',
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            value: measurement.value,
            datetime: measurement.datetime,
          }
        })
        .filter(Boolean)
        .sort((first, second) => second.value - first.value)

      mapStationsCache.set(cacheKey, {
        expiresAt: Date.now() + 2 * 60 * 1000,
        results,
      })

      return res.json({ results })
    } catch (error) {
      return next(error)
    }
  })
  app.get('/api/locations/nearest', async (req, res, next) => {
    const coordinates = typeof req.query.coordinates === 'string' ? req.query.coordinates : ''

    if (!/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(coordinates)) {
      return res.status(400).json({ error: 'coordinates must be latitude,longitude.' })
    }

    try {
      const payload = await requestOpenAq(
        '/locations',
        new URLSearchParams({ coordinates, radius: '25000', parameters_id: '2', limit: '60' }),
      )
      const liveAfter = Date.now() - LIVE_READING_MAX_AGE
      const location = (payload.results || []).find((candidate) => {
        const latestReadingAt = new Date(candidate.datetimeLast?.utc).getTime()
        return latestReadingAt >= liveAfter && candidate.sensors?.some((sensor) => sensor.parameter?.name === 'pm25')
      })

      if (!location) {
        return res.status(404).json({ error: 'No active PM2.5 station was found nearby.' })
      }

      return res.json(toCityResult(location))
    } catch (error) {
      return next(error)
    }
  })
  app.get('/api/locations/search', async (req, res, next) => {
    const query = typeof req.query.q === 'string' ? req.query.q.trim().toLowerCase() : ''

    if (query.length < 2) {
      return res.json({ results: [] })
    }

    try {
      const locations = await getIndiaPm25Locations()
      const results = locations
        .filter((location) => {
          const searchableText = [location.name, location.locality, location.country?.name]
            .filter(Boolean)
            .join(' ')
            .toLowerCase()

          return searchableText.includes(query)
        })
        .slice(0, 6)
        .map(toCityResult)

      return res.json({ results })
    } catch (error) {
      return next(error)
    }
  })

  app.get('/api/locations', async (req, res, next) => {
    try {
      const query = copyAllowedQueryParams(req.query, LOCATION_QUERY_PARAMS)
      const data = await requestOpenAq('/locations', query)
      res.json(data)
    } catch (error) {
      next(error)
    }
  })

  app.get('/api/sensors/:sensorId/history', async (req, res, next) => {
    const { sensorId } = req.params

    if (!/^\d+$/.test(sensorId)) {
      return res.status(400).json({ error: 'sensorId must be a numeric OpenAQ sensor ID.' })
    }

    const now = new Date()
    const hourlyFrom = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()
    const dailyFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()

    try {
      const [hours, days] = await Promise.all([
        requestOpenAq(
          `/sensors/${sensorId}/hours`,
          new URLSearchParams({ datetime_from: hourlyFrom, limit: '24' }),
        ),
        requestOpenAq(
          `/sensors/${sensorId}/days`,
          new URLSearchParams({ date_from: dailyFrom, limit: '7' }),
        ),
      ])

      return res.json({ hours: hours.results || [], days: days.results || [] })
    } catch (error) {
      return next(error)
    }
  })
  app.get('/api/locations/:locationId/latest', async (req, res, next) => {
    const { locationId } = req.params

    if (!/^\d+$/.test(locationId)) {
      return res.status(400).json({ error: 'locationId must be a numeric OpenAQ location ID.' })
    }

    try {
      const data = await requestOpenAq(`/locations/${locationId}/latest`, new URLSearchParams())
      return res.json(data)
    } catch (error) {
      return next(error)
    }
  })

  app.use((req, res) => {
    res.status(404).json({ error: 'Route not found.' })
  })

  app.use((error, _req, res, _next) => {
    const status = error.status || 500
    res.status(status).json({ error: error.message || 'Unexpected server error.' })
  })

  return app
}

const app = createApp()
const port = Number(process.env.PORT) || DEFAULT_PORT

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`OpenAQ proxy listening on http://localhost:${port}`)
  })
}
