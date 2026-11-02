import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Hook unificado de scroll para hash de âncoras na página.
 *
 * Ao mudar location.hash (ou pathname com hash presente), procura o elemento
 * correspondente em loop via requestAnimationFrame com timeout máximo de 2000ms.
 * Isso garante que rotas com chunks lazy carregando consigam posicionar a âncora
 * assim que o elemento for montado no DOM.
 *
 * Respeita prefers-reduced-motion e aplica alinhamento:
 * - block: 'center' para ids que iniciam com 'servico-'
 * - block: 'start' para os demais
 */
export function useHashScroll() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) return

    const rawId = hash.replace(/^#/, '')
    if (!rawId) return

    let decodedId: string
    try {
      decodedId = decodeURIComponent(rawId)
    } catch {
      decodedId = rawId
    }

    const startTime = performance.now()
    const MAX_WAIT_MS = 2000
    let rafId: number | null = null
    let cancelled = false

    const prefersReducedMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const checkAndScroll = () => {
      if (cancelled) return

      const el = document.getElementById(decodedId)
      if (el) {
        el.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: decodedId.startsWith('servico-') ? 'center' : 'start',
        })
        return
      }

      const elapsed = performance.now() - startTime
      if (elapsed < MAX_WAIT_MS) {
        rafId = requestAnimationFrame(checkAndScroll)
      }
      // Se estourar 2000ms sem encontrar, desiste silenciosamente
    }

    rafId = requestAnimationFrame(checkAndScroll)

    return () => {
      cancelled = true
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [pathname, hash])
}
