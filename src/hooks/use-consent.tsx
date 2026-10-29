import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'
import {
  ConsentPreferences,
  StoredConsent,
  getStoredConsent,
  saveConsent,
  acceptAllConsent,
  rejectAllConsent,
  hasAnalyticsConsent,
  hasMarketingConsent,
} from '@/lib/consent'

interface ConsentContextValue {
  /** Consentimento persistido atualmente, ou null se não decidiu */
  consent: StoredConsent | null
  /** Se o visitante ainda não registrou decisão */
  isUndecided: boolean
  /** Se a categoria analítica foi aceita */
  isAnalyticsAllowed: boolean
  /** Se a categoria marketing foi aceita */
  isMarketingAllowed: boolean
  /** Estado de abertura do modal de preferências */
  isPreferencesOpen: boolean
  /** Abrir modal de preferências */
  openPreferences: () => void
  /** Fechar modal de preferências */
  closePreferences: () => void
  /** Ação de aceitar todos os cookies */
  acceptAll: () => void
  /** Ação de recusar cookies opcionais */
  rejectAll: () => void
  /** Salvar preferências customizadas */
  savePreferences: (prefs: { analytics: boolean; marketing: boolean }) => void
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<StoredConsent | null>(() => getStoredConsent())
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false)

  useEffect(() => {
    // Sincroniza caso o consentimento seja alterado em outra aba ou via evento customizado
    const handleConsentEvent = (e: Event) => {
      const customEvent = e as CustomEvent<StoredConsent>
      if (customEvent.detail) {
        setConsent(customEvent.detail)
      } else {
        setConsent(getStoredConsent())
      }
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'mathops_consent_v1') {
        setConsent(getStoredConsent())
      }
    }

    window.addEventListener('mathops:consent-updated', handleConsentEvent)
    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('mathops:consent-updated', handleConsentEvent)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  const openPreferences = useCallback(() => setIsPreferencesOpen(true), [])
  const closePreferences = useCallback(() => setIsPreferencesOpen(false), [])

  const handleAcceptAll = useCallback(() => {
    const updated = acceptAllConsent()
    setConsent(updated)
    setIsPreferencesOpen(false)
  }, [])

  const handleRejectAll = useCallback(() => {
    const updated = rejectAllConsent()
    setConsent(updated)
    setIsPreferencesOpen(false)
  }, [])

  const handleSavePreferences = useCallback((prefs: { analytics: boolean; marketing: boolean }) => {
    const updated = saveConsent(prefs)
    setConsent(updated)
    setIsPreferencesOpen(false)
  }, [])

  const isUndecided = consent === null
  const isAnalyticsAllowed = Boolean(consent?.preferences?.analytics)
  const isMarketingAllowed = Boolean(consent?.preferences?.marketing)

  return (
    <ConsentContext.Provider
      value={{
        consent,
        isUndecided,
        isAnalyticsAllowed,
        isMarketingAllowed,
        isPreferencesOpen,
        openPreferences,
        closePreferences,
        acceptAll: handleAcceptAll,
        rejectAll: handleRejectAll,
        savePreferences: handleSavePreferences,
      }}
    >
      {children}
    </ConsentContext.Provider>
  )
}

export function useConsent(): ConsentContextValue {
  const context = useContext(ConsentContext)
  if (!context) {
    // Fallback gracioso para caso seja usado fora do Provider
    const stored = getStoredConsent()
    return {
      consent: stored,
      isUndecided: stored === null,
      isAnalyticsAllowed: hasAnalyticsConsent(),
      isMarketingAllowed: hasMarketingConsent(),
      isPreferencesOpen: false,
      openPreferences: () => {},
      closePreferences: () => {},
      acceptAll: () => acceptAllConsent(),
      rejectAll: () => rejectAllConsent(),
      savePreferences: (p) => saveConsent(p),
    }
  }
  return context
}
