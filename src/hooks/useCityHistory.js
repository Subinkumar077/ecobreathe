import { useEffect, useState } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787'

export default function useCityHistory(city) {
  const [state, setState] = useState({ hours: [], days: [], error: null, loading: true })
  const [requestVersion, setRequestVersion] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadHistory() {
      setState({ hours: [], days: [], error: null, loading: true })

      try {
        const response = await fetch(`${API_BASE_URL}/api/sensors/${city.pm25SensorId}/history`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Historical air-quality data is temporarily unavailable.')
        }

        const payload = await response.json()
        setState({ hours: payload.hours || [], days: payload.days || [], error: null, loading: false })
      } catch (error) {
        if (error.name !== 'AbortError') {
          setState({ hours: [], days: [], error: error.message, loading: false })
        }
      }
    }

    loadHistory()
    return () => controller.abort()
  }, [city, requestVersion])

  return {
    ...state,
    retry: () => setRequestVersion((version) => version + 1),
  }
}
