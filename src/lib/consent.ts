import { supabase } from '@/lib/supabase/client'

/**
 * Gestão de Consentimento LGPD (MathOps Strategy)
 *
 * Controla os níveis de consentimento para rastreamento no site:
 * - Necessários: estritamente essenciais para o funcionamento básico e segurança do site (sempre ativo).
 * - Analítico / Estatística: métricas anônimas internas de navegação e visualizações de página.
 *   - Quando o visitante NÃO FEZ escolha (undecided): a coleta anônima própria continua ativa (estado atual).
 *   - Se o visitante RECUSAR a categoria Analítico: a coleta anônima para completamente.
 *   - Se o visitante ACEITAR a categoria Analítico: a coleta anônima continua ativa.
 * - Marketing / Remarketing: reservado para campanhas e pixels de parceiros futuros.
 *   - Atualmente não há nenhum pixel de terceiros carregado.
 *   - Quando consentido, ativa o ponto único onMarketingConsentGranted().
 */

export const CONSENT_STORAGE_KEY = 'mathops_consent_v1'
export const CONSENT_VERSION = '1.0'
const VISITOR_ID_KEY = 'mathops_vid'

export interface ConsentPreferences {
  necessary: true // Sempre ativo por definição legal
  analytics: boolean
  marketing: boolean
}

export interface StoredConsent {
  version: string
  timestamp: string
  preferences: ConsentPreferences
  action?: 'accept_all' | 'reject_all' | 'custom'
}

export type ConsentStatus = 'undecided' | 'accepted_all' | 'rejected_all' | 'custom'

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
 * Obtém ou gera o ID anônimo do visitante do localStorage.
 * Não contém dados pessoais.
 */
function getAnonymousVisitorId(): string {
  if (typeof window === 'undefined') return 'server'
  try {
    let id = localStorage.getItem(VISITOR_ID_KEY)
    if (!id || id.length < 8) {
      if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        id = crypto.randomUUID()
      } else {
        id = 'v_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36)
      }
      localStorage.setItem(VISITOR_ID_KEY, id)
    }
    return id
  } catch {
    return 'anon_session'
  }
}

/**
 * Lê o consentimento salvo no navegador (localStorage).
 * Retorna null se o visitante ainda não tomou decisão ou se a versão for incompatível.
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
 * Grava a evidência de consentimento na tabela consent_log do Supabase.
 * Execução fire-and-forget: nunca bloqueia a UI nem a navegação do usuário.
 */
async function recordConsentLog(
  preferences: ConsentPreferences,
  action: 'accept_all' | 'reject_all' | 'custom',
) {
  if (typeof window === 'undefined') return

  try {
    const visitorId = getAnonymousVisitorId()
    const viewportWidth = window.innerWidth || null
    const deviceCategory = viewportWidth && viewportWidth < 768 ? 'mobile' : 'desktop'

    await (supabase as any).from('consent_log').insert({
      visitor_id: visitorId,
      necessary: true,
      analytics: preferences.analytics,
      marketing: preferences.marketing,
      action: action,
      policy_version: CONSENT_VERSION,
      user_agent_category: deviceCategory,
    })
  } catch {
    // Falha silenciosa para nunca interferir na experiência do visitante
  }
}

/**
 * Grava a decisão do usuário com timestamp UTC, versão e sincronização local + backend.
 */
export function saveConsent(
  preferences: Partial<ConsentPreferences>,
  action: 'accept_all' | 'reject_all' | 'custom' = 'custom',
): StoredConsent {
  const completePreferences: ConsentPreferences = {
    necessary: true,
    analytics: Boolean(preferences.analytics),
    marketing: Boolean(preferences.marketing),
  }

  const payload: StoredConsent = {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    preferences: completePreferences,
    action,
  }

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(payload))
      window.dispatchEvent(new CustomEvent('mathops:consent-updated', { detail: payload }))
    } catch {
      // Ignora se localStorage estiver restrito/bloqueado
    }
  }

  // Registra no banco para auditoria de conformidade LGPD (fire-and-forget)
  recordConsentLog(completePreferences, action)

  // Notifica ponto de extensão para pixels de marketing
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
  return saveConsent(ALL_ACCEPTED_PREFERENCES, 'accept_all')
}

/**
 * Salva decisão rápida: recusar todas as categorias opcionais
 */
export function rejectAllConsent(): StoredConsent {
  return saveConsent(ALL_REJECTED_PREFERENCES, 'reject_all')
}

/**
 * Regra de medição anônima (LGPD):
 * - Se o visitante ainda NÃO escolheu (undecided): retorna TRUE para continuar a coleta anônima própria atual.
 * - Se o visitante escolheu e recusou Estatística: retorna FALSE (coleta de novas visitas cessa).
 * - Se o visitante escolheu e aceitou Estatística: retorna TRUE.
 */
export function shouldTrackVisits(): boolean {
  const stored = getStoredConsent()
  if (!stored) {
    // Estado 'não definido': continua coletando o anônimo atual até a primeira escolha explícita
    return true
  }
  return Boolean(stored.preferences?.analytics)
}

/**
 * Verifica se a categoria Analítica tem consentimento explícito.
 * Diferente de shouldTrackVisits(), esta função verifica especificamente se o usuário consentiu ativamente.
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
 * PONTO ÚNICO DE EXTENSÃO PARA PIXELS FUTUROS (Google Ads, Meta Pixel, LinkedIn Insight Tag).
 *
 * CONFORME DIRETRIZ LGPD DA MATHOPS:
 * - Atualmente, NENHUM script de terceiros nem pixel de marketing é carregado pelo site.
 * - Quando uma campanha futura for ativada e o visitante consentir na categoria Marketing,
 *   insira neste método a inicialização do respectivo pixel (ex.: script inject ou gtag/fbq/lintrk).
 */
export function onMarketingConsentGranted() {
  // PONTO DE PLUG DE PIXELS FUTUROS:
  // Exemplo para implementação futura quando houver tags:
  // if (typeof window !== 'undefined') {
  //   // 1. Google Ads:
  //   // window.gtag?.('consent', 'update', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted' })
  //   // 2. Meta Pixel:
  //   // window.fbq?.('consent', 'grant')
  //   // 3. LinkedIn Insight Tag:
  //   // window.lintrk?.('consent', true)
  // }
}

/**
 * PONTO ÚNICO DE REVOGAÇÃO PARA PIXELS FUTUROS.
 * Chamado quando o usuário desativa ou recusa a categoria Marketing.
 */
export function onMarketingConsentRevoked() {
  // PONTO DE REVOGAÇÃO DE PIXELS FUTUROS:
  // Exemplo para implementação futura quando houver tags:
  // if (typeof window !== 'undefined') {
  //   // window.gtag?.('consent', 'update', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' })
  //   // window.fbq?.('consent', 'revoke')
  // }
}
