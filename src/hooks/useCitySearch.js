import { useEffect, useState } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787'
const SEARCH_DELAY = 250

export default function useCitySearch(query) {
  const [state, setState] = useState({ results: [], error: null, loading: false })
  const [requestVersion, setRequestVersion] = useState(0)

  useEffect(() => {
    const searchTerm = query.trim()

    if (searchTerm.length < 2) {
      setState({ results: [], error: null, loading: false })
      return undefined
    }

    const controller = new AbortController()
    setState((current) => ({ ...current, loading: true, error: null }))
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/locations/search?q=${encodeURIComponent(searchTerm)}`,
          { signal: controller.signal },
        )

        if (!response.ok) {
          throw new Error('City search is temporarily unavailable.')
        }

        const payload = await response.json()
        setState({ results: payload.results || [], error: null, loading: false })
      } catch (error) {
        if (error.name !== 'AbortError') {
          setState({ results: [], error: error.message, loading: false })
        }
      }
    }, SEARCH_DELAY)

    return () => {
      window.clearTimeout(timer)
      controller.abort()
    }
  }, [query, requestVersion])

  return {
    ...state,
    retry: () => setRequestVersion((version) => version + 1),
  }
}
