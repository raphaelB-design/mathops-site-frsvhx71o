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

  // Quando o usuário concede consentimento analítico na mesma página,
  // aciona o registro da página atual sem precisar que ele troque de rota
  useEffect(() => {
    const handleConsentChange = () => {
      recordPageView(location.pathname)
    }
    window.addEventListener('mathops:consent-updated', handleConsentChange)
    return () => {
      window.removeEventListener('mathops:consent-updated', handleConsentChange)
    }
  }, [location.pathname])
}
