import { Link } from 'react-router-dom'
import { ShieldCheck, SlidersHorizontal, Check } from 'lucide-react'
import { useConsent } from '@/hooks/use-consent'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { CookiePreferencesModal } from '@/components/CookiePreferencesModal'
import { cn } from '@/lib/utils'

export function CookieBanner() {
  const { isUndecided, acceptAll, openPreferences } = useConsent()
  const prefersReduced = useReducedMotion()

  return (
    <>
      <CookiePreferencesModal />

      {isUndecided && (
        <aside
          role="region"
          aria-label="Aviso de privacidade e consentimento de cookies"
          className={cn(
            'fixed bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-xl z-50 pointer-events-none',
            prefersReduced
              ? 'transition-none'
              : 'transition-all duration-300 animate-in fade-in slide-in-from-bottom-3',
          )}
        >
          <div className="pointer-events-auto rounded-lg bg-zinc-950/95 backdrop-blur-xl border border-white/10 p-3 sm:p-3.5 shadow-xl shadow-black/70 ring-1 ring-white/5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Mensagem resumida e compacta padrão ANPD/gov.br com link para política */}
              <div className="space-y-1 text-left min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-zinc-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span className="text-xs font-semibold tracking-wide text-white">
                    Privacidade e Cookies
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-zinc-300 leading-snug font-sans">
                  Utilizamos cookies para melhorar sua experiência e medir o uso do site. Você pode
                  gerenciar ou recusar os opcionais em Preferências.{' '}
                  <Link
                    to="/privacidade"
                    className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors font-medium inline-block"
                  >
                    Saiba mais
                  </Link>
                  .
                </p>
              </div>

              {/* Botões com pesos visuais equivalentes (sem dark pattern) */}
              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={openPreferences}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-sm border border-white/20 bg-white/10 hover:bg-white/15 text-xs font-medium text-zinc-200 hover:text-white transition-colors min-h-[34px] shadow-sm"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Preferências</span>
                </button>

                <button
                  type="button"
                  onClick={acceptAll}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-sm border border-white/20 bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors min-h-[34px] shadow-sm"
                >
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Aceitar todos</span>
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}
    </>
  )
}
