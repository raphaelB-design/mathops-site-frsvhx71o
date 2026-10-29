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
          aria-label="Consentimento de cookies e privacidade"
          aria-describedby="cookie-consent-desc"
          className={cn(
            'fixed bottom-0 left-0 right-0 z-50 w-full pointer-events-auto',
            'border-t border-white/15 bg-zinc-950/70 backdrop-blur-md shadow-2xl shadow-black/80',
            prefersReduced
              ? 'transition-none'
              : 'transition-all duration-300 animate-in slide-in-from-bottom-4',
          )}
        >
          <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
              {/* Bloco de conteúdo / texto ANPD */}
              <div className="space-y-2 flex-1 pr-0 lg:pr-6">
                <div className="flex items-center gap-2 text-blue-400">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-[11px] font-semibold tracking-wider uppercase font-mono">
                    Privacidade & LGPD
                  </span>
                  <span className="text-zinc-600">|</span>
                  <h2
                    id="cookie-consent-title"
                    className="text-xs sm:text-sm font-semibold tracking-tight text-white font-sans"
                  >
                    Respeitamos a sua privacidade
                  </h2>
                </div>

                <p
                  id="cookie-consent-desc"
                  className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans max-w-4xl"
                >
                  Utilizamos cookies e tecnologias similares para melhorar a sua experiência de
                  navegação, garantir o funcionamento seguro do site e medir de forma anônima e
                  agregada a nossa audiência. Suas escolhas são respeitadas de acordo com a Lei
                  Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).{' '}
                  <Link
                    to="/privacidade"
                    className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors font-medium inline-block ml-1"
                  >
                    Diretrizes de Privacidade e Cookies
                  </Link>
                  .
                </p>
              </div>

              {/* Botões de Ação na Faixa: Apenas Preferências e Aceitar todos */}
              <div className="flex items-center gap-2.5 shrink-0 self-stretch sm:self-end lg:self-center">
                <button
                  type="button"
                  onClick={openPreferences}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 sm:px-4 sm:py-2.5 rounded-sm border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-medium text-zinc-200 hover:text-white transition-colors min-h-[40px] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Preferências</span>
                </button>

                <button
                  type="button"
                  onClick={acceptAll}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-sm bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-colors min-h-[40px] shadow-md shadow-blue-900/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
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
