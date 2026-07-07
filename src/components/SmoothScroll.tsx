import { useEffect } from 'react'

export function SmoothScroll() {
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
