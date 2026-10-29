import { Link } from 'react-router-dom'
import { ShieldCheck, SlidersHorizontal, Check, X } from 'lucide-react'
import { useConsent } from '@/hooks/use-consent'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { CookiePreferencesModal } from '@/components/CookiePreferencesModal'
import { cn } from '@/lib/utils'

export function CookieBanner() {
  const { isUndecided, acceptAll, rejectAll, openPreferences } = useConsent()
  const prefersReduced = useReducedMotion()

  return (
    <>
      <CookiePreferencesModal />

      {isUndecided && (
        <aside
          role="region"
          aria-label="Aviso de privacidade e consentimento de cookies"
          className={cn(
            'fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-5 pointer-events-none',
            prefersReduced
              ? 'transition-none'
              : 'transition-all duration-300 animate-in fade-in slide-in-from-bottom-4',
          )}
        >
          <div className="max-w-4xl mx-auto pointer-events-auto rounded-lg bg-zinc-950/95 backdrop-blur-xl border border-white/10 p-4 sm:p-6 shadow-2xl shadow-black/80 ring-1 ring-white/5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-5">
              {/* Texto explicativo em português claro */}
              <div className="space-y-2 max-w-2xl text-left">
                <div className="flex items-center gap-2 text-zinc-300">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                  <h3 className="text-sm font-semibold tracking-wide text-white">
                    Privacidade e cookies
                  </h3>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  Utilizamos medição anônima própria para compreender o uso do site e, mediante seu
                  consentimento, cookies de marketing e terceiros para futuras campanhas. Você pode
                  escolher suas preferências ou consultar nossa{' '}
                  <Link
                    to="/privacidade"
                    className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors font-medium inline-flex items-center"
                  >
                    Política de Privacidade
                  </Link>
                  .
                </p>
              </div>

              {/* Três ações com o MESMO destaque visual (sem dark patterns) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 shrink-0 w-full sm:w-auto">
                {/* 1. Preferências */}
                <button
                  type="button"
                  onClick={openPreferences}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-sm border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-200 hover:text-white transition-colors min-h-[40px]"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
                  <span>Preferências</span>
                </button>

                {/* 2. Recusar (só essencial) - mesmo tamanho e destaque visual honesto */}
                <button
                  type="button"
                  onClick={rejectAll}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-sm border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-200 hover:text-white transition-colors min-h-[40px]"
                >
                  <X className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Recusar</span>
                </button>

                {/* 3. Aceitar todos - peso visual honesto e equilibrado */}
                <button
                  type="button"
                  onClick={acceptAll}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-sm border border-blue-500/80 bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-colors min-h-[40px] shadow-sm shadow-blue-600/20"
                >
                  <Check className="w-3.5 h-3.5 text-white" />
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
