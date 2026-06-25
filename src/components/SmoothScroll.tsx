import { useEffect } from 'react'

export function SmoothScroll() {
  useEffect(() => {
    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.scrollBehavior = 'smooth'
      return
    }

    // Lenis-like smooth scroll implementation
    let current = window.scrollY
    let target = window.scrollY
    let isScrolling = false
    let rafId: number

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return // Don't interfere with zooming

      e.preventDefault()

      // Calculate new target bounded by document height
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
      target = Math.max(0, Math.min(target + e.deltaY, maxScroll))

      if (!isScrolling) {
        isScrolling = true
        rafId = requestAnimationFrame(update)
      }
    }

    const update = () => {
      const diff = target - current

      // If we are close enough, snap to target and stop
      if (Math.abs(diff) < 0.5) {
        current = target
        window.scrollTo(0, current)
        isScrolling = false
        return
      }

      // Lerp
      current += diff * 0.08
      window.scrollTo(0, current)

      rafId = requestAnimationFrame(update)
    }

    window.addEventListener('wheel', onWheel, { passive: false })

    // Keep target in sync if scrolled by other means (scrollbar drag, arrows)
    const onScroll = () => {
      if (!isScrolling) {
        target = window.scrollY
        current = window.scrollY
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return null
}
