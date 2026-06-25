import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full flex flex-col space-y-3"
    >
      <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground font-semibold">
        [ Sistema de Segurança ]
      </div>
      <div className="w-full bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-sm min-h-[97px] flex items-center justify-center sm:justify-start overflow-hidden transition-colors duration-300 hover:bg-white/10">
        <div ref={containerRef} className="flex justify-center sm:justify-start w-full" />
      </div>
    </motion.div>
  )
}
