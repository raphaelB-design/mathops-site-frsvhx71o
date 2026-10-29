import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, SlidersHorizontal, Check } from 'lucide-react'
import { useConsent } from '@/hooks/use-consent'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { CookiePreferencesModal } from '@/components/CookiePreferencesModal'
import { cn } from '@/lib/utils'

export function CookieBanner() {
  const { isUndecided, acceptAll, openPreferences, isPreferencesOpen } = useConsent()
  const prefersReduced = useReducedMotion()
  const modalRef = useRef<HTMLDivElement>(null)
  const acceptButtonRef = useRef<HTMLButtonElement>(null)

  // Bloqueio rigoroso de scroll do body enquanto o visitante estiver indeciso
  useEffect(() => {
    if (isUndecided) {
      const originalOverflow = document.body.style.overflow
      const originalPaddingRight = document.body.style.paddingRight
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth

      document.body.style.overflow = 'hidden'
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`
      }

      return () => {
        document.body.style.overflow = originalOverflow
        document.body.style.paddingRight = originalPaddingRight
      }
    }
  }, [isUndecided])

  // Foco inicial e Focus Trap quando o modal principal estiver aberto (e não o de preferências)
  useEffect(() => {
    if (isUndecided && !isPreferencesOpen) {
      // Foca automaticamente no botão principal
      const timer = setTimeout(() => {
        acceptButtonRef.current?.focus()
      }, 50)

      const handleKeyDown = (e: KeyboardEvent) => {
        // Bloquear Escape para não fechar sem decisão
        if (e.key === 'Escape') {
          e.preventDefault()
          e.stopPropagation()
          return
        }

        // Focus trap
        if (e.key === 'Tab' && modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
          )
          if (focusableElements.length === 0) return

          const firstElement = focusableElements[0]
          const lastElement = focusableElements[focusableElements.length - 1]

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault()
              lastElement.focus()
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault()
              firstElement.focus()
            }
          }
        }
      }

      window.addEventListener('keydown', handleKeyDown, true)
      return () => {
        clearTimeout(timer)
        window.removeEventListener('keydown', handleKeyDown, true)
      }
    }
  }, [isUndecided, isPreferencesOpen])

  return (
    <>
      <CookiePreferencesModal />

      {isUndecided && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-desc"
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 sm:p-6"
        >
          {/* Overlay escuro em tela cheia com backdrop blur potente bloqueando cliques no site */}
          <div
            className={cn(
              'fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity',
              prefersReduced ? 'duration-0' : 'duration-300 animate-in fade-in',
            )}
            aria-hidden="true"
          />

          {/* Card Modal Centralizado Bloqueante */}
          <div
            ref={modalRef}
            className={cn(
              'relative z-10 w-full max-w-xl max-h-[92vh] flex flex-col rounded-xl bg-zinc-950/95 backdrop-blur-2xl border border-white/15 p-5 sm:p-7 shadow-2xl shadow-black/95 ring-1 ring-white/10 overflow-hidden',
              prefersReduced
                ? 'transition-none'
                : 'transition-all duration-300 animate-in fade-in zoom-in-95',
            )}
          >
            {/* Cabeçalho com selo de segurança */}
            <div className="flex items-center gap-2.5 text-blue-400 mb-3">
              <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <span className="text-[11px] font-semibold tracking-wider uppercase text-blue-400 block font-mono">
                  Privacidade & LGPD
                </span>
                <h2
                  id="cookie-consent-title"
                  className="text-lg sm:text-xl font-bold tracking-tight text-white font-sans"
                >
                  Respeitemos a sua privacidade
                </h2>
              </div>
            </div>

            {/* Conteúdo rolável se a tela for muito pequena */}
            <div className="overflow-y-auto pr-1 my-1 space-y-3.5 text-left">
              <p
                id="cookie-consent-desc"
                className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans"
              >
                Utilizamos cookies e tecnologias similares para melhorar a sua experiência de
                navegação, garantir o funcionamento seguro do site e, opcionalmente, medir de forma
                anônima e agregada a nossa audiência. Suas escolhas são respeitadas de acordo com a
                Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
              </p>

              {/* Destaque das categorias */}
              <div className="space-y-2 pt-1 text-xs">
                <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5 flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="font-semibold text-zinc-200 block">Cookies Essenciais</span>
                    <p className="text-[11px] sm:text-xs text-zinc-400 leading-snug">
                      Necessários para segurança, roteamento e memorização de suas opções de
                      privacidade.
                    </p>
                  </div>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    Sempre ativo
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5 flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="font-semibold text-zinc-200 block">
                      Cookies Opcionais (Estatística e Marketing)
                    </span>
                    <p className="text-[11px] sm:text-xs text-zinc-400 leading-snug">
                      Desativados por padrão. Você tem total controle para aceitá-los, recusá-los ou
                      personalizá-los.
                    </p>
                  </div>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-zinc-500/10 text-zinc-400 border border-white/10 shrink-0">
                    Opcionais
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                Para detalhes completos sobre bases legais, finalidades e direitos de titular,
                consulte a nossa{' '}
                <Link
                  to="/privacidade"
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors font-medium inline-block"
                >
                  Diretrizes de Privacidade e Cookies
                </Link>
                .
              </p>
            </div>

            {/* Rodapé com ações de consentimento */}
            <div className="pt-4 mt-3 border-t border-white/10 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-2.5">
              <button
                type="button"
                onClick={openPreferences}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm border border-white/20 bg-white/5 hover:bg-white/10 text-xs sm:text-sm font-medium text-zinc-200 hover:text-white transition-colors min-h-[42px] shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <SlidersHorizontal className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Preferências</span>
              </button>

              <button
                ref={acceptButtonRef}
                type="button"
                onClick={acceptAll}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-blue-600 hover:bg-blue-500 text-xs sm:text-sm font-semibold text-white transition-colors min-h-[42px] shadow-md shadow-blue-900/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <Check className="w-4 h-4 text-white shrink-0" />
                <span>Aceitar todos</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
