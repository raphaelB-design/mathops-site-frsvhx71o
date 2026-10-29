/**
 * Gestão de Consentimento LGPD (MathOps Strategy)
 *
 * Controla os níveis de consentimento para rastreamento no site:
 * - Necessários: estritamente essenciais para o funcionamento básico do site.
 * - Analítico: métricas anônimas internas de navegação e visualizações de página.
 * - Marketing: campanhas de remarketing ou pixels de parceiros (Google Ads, Meta, LinkedIn).
 *
 * Por padrão, sem consentimento explícito, nada de analítico ou marketing é coletado.
 */

export const CONSENT_STORAGE_KEY = 'mathops_consent_v1'
export const CONSENT_VERSION = '1.0'

export interface ConsentPreferences {
  necessary: true // Sempre ativo por definição
  analytics: boolean
  marketing: boolean
}

export interface StoredConsent {
  version: string
  timestamp: string
  preferences: ConsentPreferences
}

export type ConsentStatus = 'undecided' | 'accepted_all' | 'rejected_all' | 'custom'

const DEFAULT_PREFERENCES: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
}

const ALL_ACCEPTED_PREFERENCES: ConsentPreferences = {
  necessary: true,
  analytics: true,
  marketing: true,
}

const ALL_REJECTED_PREFERENCES: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
}

/**
 * Lê o consentimento salvo no navegador (localStorage).
 * Retorna null se o visitante ainda não tiver tomado decisão ou versão incompatível.
 */
export function getStoredConsent(): StoredConsent | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null

    const parsed: StoredConsent = JSON.parse(raw)
    if (!parsed || parsed.version !== CONSENT_VERSION || !parsed.preferences) {
      return null
    }

    return parsed
  } catch {
    return null
  }
}

/**
 * Grava a decisão do usuário com timestamp UTC e versão da política.
 */
export function saveConsent(preferences: Partial<ConsentPreferences>): StoredConsent {
  const completePreferences: ConsentPreferences = {
    necessary: true,
    analytics: Boolean(preferences.analytics),
    marketing: Boolean(preferences.marketing),
  }

  const payload: StoredConsent = {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    preferences: completePreferences,
  }

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(payload))
      window.dispatchEvent(new CustomEvent('mathops:consent-updated', { detail: payload }))
    } catch {
      // Ignora erro se localStorage estiver bloqueado
    }
  }

  // Notifica integrações de marketing caso habilitado
  if (completePreferences.marketing) {
    onMarketingConsentGranted()
  } else {
    onMarketingConsentRevoked()
  }

  return payload
}

/**
 * Salva decisão rápida: aceitar todas as categorias
 */
export function acceptAllConsent(): StoredConsent {
  return saveConsent(ALL_ACCEPTED_PREFERENCES)
}

/**
 * Salva decisão rápida: recusar todas as categorias opcionais
 */
export function rejectAllConsent(): StoredConsent {
  return saveConsent(ALL_REJECTED_PREFERENCES)
}

/**
 * Verifica se a categoria Analítica tem consentimento ativo do visitante.
 * Sem consentimento registrado (undecided) ou com analytics=false => retorna false.
 */
export function hasAnalyticsConsent(): boolean {
  const stored = getStoredConsent()
  if (!stored) return false
  return Boolean(stored.preferences?.analytics)
}

/**
 * Verifica se a categoria Marketing tem consentimento ativo do visitante.
 * Sem consentimento registrado (undecided) ou com marketing=false => retorna false.
 */
export function hasMarketingConsent(): boolean {
  const stored = getStoredConsent()
  if (!stored) return false
  return Boolean(stored.preferences?.marketing)
}

/**
 * Ponto de extensão para pixels de marketing futuros (Google Ads, Meta Pixel, LinkedIn Insight Tag).
 * Atualmente nenhum script externo ou pixel é carregado pelo site.
 */
function onMarketingConsentGranted() {
  // TODO: Quando MathOps adotar campanhas pagas no futuro, inicializar pixels aqui:
  // - Google Ads gtag('consent', 'update', { ad_storage: 'granted', analytics_storage: 'granted' })
  // - Meta Pixel fbq('consent', 'grant')
  // - LinkedIn Insight Tag lintrk('consent', true)
}

function onMarketingConsentRevoked() {
  // TODO: Revogar ou desativar tags de parceiros quando o usuário alterar preferências
}
