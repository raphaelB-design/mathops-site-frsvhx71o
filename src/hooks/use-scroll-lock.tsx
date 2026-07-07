import { useEffect } from 'react'

export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const body = document.body
    const originalOverflow = body.style.overflow
    const originalPaddingRight = body.style.paddingRight

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`
    }
    body.style.overflow = 'hidden'

    const preventOverscroll = (e: TouchEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-scroll-lock-ignore]')) return
      e.preventDefault()
    }

    document.addEventListener('touchmove', preventOverscroll, { passive: false })

    return () => {
      body.style.overflow = originalOverflow
      body.style.paddingRight = originalPaddingRight
      document.removeEventListener('touchmove', preventOverscroll)
    }
  }, [locked])
}
