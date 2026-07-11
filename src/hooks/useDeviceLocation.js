import { useEffect, useState } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787'

export default function useDeviceLocation() {
  const [state, setState] = useState({ city: null, status: 'idle' })

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({ city: null, status: 'unavailable' })
      return undefined
    }

    setState({ city: null, status: 'locating' })
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const coordinates = `${coords.latitude.toFixed(4)},${coords.longitude.toFixed(4)}`
          const response = await fetch(`${API_BASE_URL}/api/locations/nearest?coordinates=${coordinates}`)

          if (!response.ok) throw new Error('No nearby station')
          const city = await response.json()
          setState({ city, status: 'found' })
        } catch {
          setState({ city: null, status: 'fallback' })
        }
      },
      () => setState({ city: null, status: 'fallback' }),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 },
    )

    return undefined
  }, [])

  return state
}
