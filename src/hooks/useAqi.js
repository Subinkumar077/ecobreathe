import { useEffect, useState } from 'react'
import { getAqiBand, pm25ToAqi } from '../utils/aqi.js'
import { formatRelativeTime } from '../utils/time.js'
import { aqiBands } from '../data/aqi.js'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787'

export default function useAqi(city) {
  const [state, setState] = useState({ data: null, error: null, loading: true })
  const [requestVersion, setRequestVersion] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadAqi() {
      setState({ data: null, error: null, loading: true })

      try {
        const response = await fetch(`${API_BASE_URL}/api/locations/${city.id}/latest`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Live air-quality data is temporarily unavailable.')
        }

        const payload = await response.json()
        const measurement = payload.results?.find(
          (result) => result.sensorsId === city.pm25SensorId,
        )
        const aqi = pm25ToAqi(measurement?.value)

        if (!measurement || aqi === null) {
          throw new Error('No current PM2.5 reading is available for this city.')
        }

        const bandId = getAqiBand(aqi)
        const bandData = aqiBands.find((b) => b.id === bandId)

        setState({
          data: {
            city: city.name,
            cityName: city.cityName || '',
            aqi,
            band: bandId.replace(/^./, (l) => l.toUpperCase()),
            dominantPollutant: 'PM2.5',
            guidance: bandData?.guidance || '',
            updatedAt: formatRelativeTime(measurement.datetime),
          },
          error: null,
          loading: false,
        })
      } catch (error) {
        if (error.name !== 'AbortError') {
          setState({ data: null, error: error.message, loading: false })
        }
      }
    }

    loadAqi()
    return () => controller.abort()
  }, [city, requestVersion])

  return {
    ...state,
    retry: () => setRequestVersion((version) => version + 1),
  }
}
