/* Use Mobile Hook - A hook that checks if the screen is mobile - from shadcn/ui (exposes useIsMobile) */
import * as React from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Valor síncrono já no primeiro render: evita montar fontes de vídeo de desktop no celular
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(() =>
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : undefined,
  )

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener('change', onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return !!isMobile
}
