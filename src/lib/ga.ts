/**
 * Módulo de carregamento condicional e controle do Google Analytics (GA4 / gtag.js).
 *
 * Em conformidade com a LGPD:
 * - O script só é injetado dinamicamente quando há consentimento explícito para 'analytics'.
 * - Não é carregado se a variável VITE_GA_TRACKING_ID estiver indefinida ou vazia.
 * - Evita injeção duplicada via flag de módulo em memória.
 * - Suporta revogação (unloadGoogleAnalytics) definindo window['ga-disable-' + ID] = true.
 */

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    [key: `ga-disable-${string}`]: boolean | undefined
  }
}

let isGaLoaded = false

/**
 * Obtém o ID de rastreamento do Google Analytics a partir das variáveis de ambiente Vite.
 * Retorna null se não estiver configurado ou for string vazia / placeholder literal.
 */
function getTrackingId(): string | null {
  const id = import.meta.env.VITE_GA_TRACKING_ID
  if (!id || typeof id !== 'string') return null
  const trimmed = id.trim()
  if (!trimmed || trimmed === '%VITE_GA_TRACKING_ID%') return null
  return trimmed
}

/**
 * Carrega dinamicamente o Google Analytics (gtag.js) caso ainda não esteja carregado.
 * Ativa anonymize_ip e remove eventuais flags de desativação prévia.
 */
export function loadGoogleAnalytics(): void {
  if (typeof window === 'undefined') return

  const trackingId = getTrackingId()
  if (!trackingId) return

  // Reabilita o tracking caso tenha sido desativado anteriormente
  window[`ga-disable-${trackingId}`] = false

  if (isGaLoaded) return

  // Verifica se o script já existe no DOM para evitar duplicatas mesmo em reloads/HMR
  const existingScript = document.querySelector<HTMLScriptElement>(
    `script[src*="googletagmanager.com/gtag/js?id=${trackingId}"]`,
  )

  // Inicializa a fila do dataLayer e a função global gtag se ainda não existirem
  window.dataLayer = window.dataLayer || []
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments)
    }
  }

  if (!existingScript) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`
    document.head.appendChild(script)
  }

  window.gtag('js', new Date())
  window.gtag('config', trackingId, { anonymize_ip: true })

  isGaLoaded = true
}

/**
 * Cessa o envio de hits do Google Analytics desativando a coleta para o ID configurado.
 */
export function unloadGoogleAnalytics(): void {
  if (typeof window === 'undefined') return

  const trackingId = getTrackingId()
  if (!trackingId) return

  window[`ga-disable-${trackingId}`] = true
}

/**
 * Retorna se o script do Google Analytics já foi injetado nesta sessão.
 */
export function isGoogleAnalyticsLoaded(): boolean {
  return isGaLoaded
}
