import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { recordPageView } from '@/services/visitTracker'

/**
 * Tracks route changes in the React SPA.
 * Automatically runs on location change, completely fire-and-forget.
 */
export function usePageTracking() {
  const location = useLocation()
  const prevPathRef = useRef<string | null>(null)

  useEffect(() => {
    const currentPath = location.pathname
    // Avoid double firing in React 18/19 strict mode for identical render pass
    if (prevPathRef.current === currentPath) return
    prevPathRef.current = currentPath

    recordPageView(currentPath)
  }, [location.pathname])
}
