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
              {/* Texto explicativo em linguagem simples seguindo referências oficiais da ANPD e gov.br */}
              <div className="space-y-2 max-w-2xl text-left">
                <div className="flex items-center gap-2 text-zinc-300">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                  <h3 className="text-sm font-semibold tracking-wide text-white">
                    Privacidade e controle de cookies
                  </h3>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  Respeitamos a sua privacidade. Utilizamos cookies para melhorar a sua experiência
                  no site, conforme a nossa{' '}
                  <Link
                    to="/privacidade"
                    className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors font-medium inline-flex items-center"
                  >
                    Política de Privacidade
                  </Link>
                  . Ao aceitar todos, você autoriza o uso completo das funcionalidades. Se clicar em
                  &ldquo;Recusar&rdquo;, os cookies que não forem estritamente necessários serão
                  desativados. Para customizar suas escolhas, clique em &ldquo;Preferências&rdquo;.
                </p>
              </div>

              {/* Três botões com pesos visuais equivalentes (sem dark patterns) conforme recomendação ANPD */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 shrink-0 w-full sm:w-auto">
                {/* 1. Aceitar todos */}
                <button
                  type="button"
                  onClick={acceptAll}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-sm border border-white/20 bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors min-h-[40px] shadow-sm"
                >
                  <Check className="w-3.5 h-3.5 text-blue-400" />
                  <span>Aceitar todos</span>
                </button>

                {/* 2. Recusar (desativa não necessários) - peso visual equivalente */}
                <button
                  type="button"
                  onClick={rejectAll}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-sm border border-white/20 bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors min-h-[40px] shadow-sm"
                >
                  <X className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Recusar</span>
                </button>

                {/* 3. Preferências - peso visual equivalente */}
                <button
                  type="button"
                  onClick={openPreferences}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-sm border border-white/20 bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors min-h-[40px] shadow-sm"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
                  <span>Preferências</span>
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}
    </>
  )
}
