import { useEffect, useState } from 'react'
import { pm25ToAqi } from '../utils/aqi.js'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787'

export default function useMapStations(city) {
  const [state, setState] = useState({ stations: [], error: null, loading: true })
  const [requestVersion, setRequestVersion] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    const coordinates = `${city.latitude},${city.longitude}`

    async function loadStations() {
      setState({ stations: [], error: null, loading: true })

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/map/stations?coordinates=${encodeURIComponent(coordinates)}`,
          { signal: controller.signal },
        )

        if (!response.ok) {
          throw new Error('The live map is temporarily unavailable.')
        }

        const payload = await response.json()
        const stations = (payload.results || [])
          .map((station) => ({ ...station, aqi: pm25ToAqi(station.value) }))
          .filter((station) => station.aqi !== null)

        setState({ stations, error: null, loading: false })
      } catch (error) {
        if (error.name !== 'AbortError') {
          setState({ stations: [], error: error.message, loading: false })
        }
      }
    }

    loadStations()
    return () => controller.abort()
  }, [city, requestVersion])

  return {
    ...state,
    retry: () => setRequestVersion((version) => version + 1),
  }
}
