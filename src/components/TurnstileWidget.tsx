import { useEffect, useRef } from 'react'
import { AlertCircle } from 'lucide-react'

interface TurnstileWidgetProps {
  onVerify: (token: string) => void
}

export function TurnstileWidget({ onVerify }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY

  useEffect(() => {
    if (!siteKey) {
      console.error('[MathOps] VITE_TURNSTILE_SITE_KEY não configurada — Turnstile desabilitado')
      onVerify('')
      return
    }

    let widgetId: string | undefined

    const render = () => {
      if ((window as any).turnstile && containerRef.current) {
        widgetId = (window as any).turnstile.render(containerRef.current, {
          sitekey: siteKey,
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
  }, [onVerify, siteKey])

  if (!siteKey) {
    return (
      <div className="w-full flex items-center gap-3 p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-200 text-xs font-mono">
        <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
        <span>Verificação de segurança indisponível no momento. Configuração pendente.</span>
      </div>
    )
  }

  return (
    <div className="w-full max-w-full bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4 backdrop-blur-sm min-h-[97px] flex items-center justify-center sm:justify-start overflow-hidden transition-colors duration-300 hover:bg-white/10">
      <div
        ref={containerRef}
        className="flex justify-center sm:justify-start w-full max-w-full overflow-hidden"
      />
    </div>
  )
}
