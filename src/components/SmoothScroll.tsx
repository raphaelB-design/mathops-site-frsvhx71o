import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function SmoothScroll() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // Quando navegar para uma nova rota sem hash, garante o scroll no topo
    if (!hash) {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updateScrollBehavior = () => {
      if (mediaQuery.matches) {
        document.documentElement.style.scrollBehavior = 'auto'
      } else {
        document.documentElement.style.scrollBehavior = ''
      }
    }

    updateScrollBehavior()
    mediaQuery.addEventListener('change', updateScrollBehavior)

    return () => {
      mediaQuery.removeEventListener('change', updateScrollBehavior)
      document.documentElement.style.scrollBehavior = ''
    }
  }, [])

  return null
}
