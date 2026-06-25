import { useEffect, useRef } from 'react'

interface TurnstileWidgetProps {
  onVerify: (token: string) => void
}

export function TurnstileWidget({ onVerify }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let widgetId: string | undefined

    const render = () => {
      if ((window as any).turnstile && containerRef.current) {
        widgetId = (window as any).turnstile.render(containerRef.current, {
          sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA',
          theme: 'dark',
          callback: onVerify,
          'error-callback': () => onVerify(''),
          'expired-callback': () => onVerify(''),
        })
      }
    }

    if (!(window as any).turnstile) {
      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      script.async = true
      script.defer = true
      script.onload = render
      document.head.appendChild(script)
    } else {
      // Small timeout to ensure DOM is ready if script was already loaded
      setTimeout(render, 100)
    }

    return () => {
      if (widgetId !== undefined && (window as any).turnstile) {
        try {
          ;(window as any).turnstile.remove(widgetId)
        } catch (e) {
          // Ignore if already removed
        }
      }
    }
  }, [onVerify])

  return <div ref={containerRef} className="my-4 min-h-[65px]" />
}
