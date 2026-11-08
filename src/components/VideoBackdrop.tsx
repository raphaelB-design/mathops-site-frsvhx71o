import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

const VIDEO_BASE =
  'https://qzdsxtqskwrslsxodexc.supabase.co/storage/v1/object/public/site-media/videos'

interface VideoBackdropProps {
  /** Nome do arquivo sem extensão, ex.: "05-relevo-de-risco" */
  name: string
  /** Opacidade do vídeo (0 a 1) */
  opacity?: number
  /** Gradiente navy nas bordas para garantir contraste do texto */
  overlay?: boolean
  /** Posição do vídeo dentro da seção, ex.: "right center" */
  objectPosition?: string
  /** "radial": bordas escuras; "left": escuro à esquerda (texto), transparente à direita */
  overlayVariant?: 'radial' | 'left'
  /** Quando false, renderiza apenas a capa estática (vídeo só na camada ativa do storytelling) */
  videoActive?: boolean
}

/**
 * Vídeo de fundo reutilizável para seções.
 * - Desktop: vídeo em loop (webm preferencial, mp4 fallback). O carregamento começa quando a
 *   seção se aproxima da tela (IntersectionObserver com 1200px de antecedência), e não mais
 *   só após o window load: assim o vídeo já está pronto ao rolar, sem competir com o hero
 *   (o olho carrega primeiro, pois sua capa/vídeo são renderizados no primeiro frame).
 * - Celular (<768px) e prefers-reduced-motion: apenas a capa estática (sem <video>)
 * - Decorativo: aria-hidden; o conteúdo da seção deve estar em uma camada acima (z-10)
 */
export function VideoBackdrop({
  name,
  opacity = 0.45,
  overlay = true,
  objectPosition = 'center center',
  overlayVariant = 'radial',
  videoActive = true,
}: VideoBackdropProps) {
  const prefersReducedMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false,
  )
  const [shouldLoad, setShouldLoad] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Detecta celular no mount e acompanha mudanças de largura
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)')
    const onChange = () => setIsMobile(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  // Gatilho: iniciar quando a seção estiver a até 1200px da área visível (antecedência de
  // uma tela), sem esperar o window load. Trade-off: não baixa vídeos de seções distantes
  // (economia de banda para o hero) e o vídeo já está pronto antes de o visitante chegar.
  useEffect(() => {
    if (prefersReducedMotion || isMobile || shouldLoad) return
    const el = containerRef.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true)
          io.disconnect()
        }
      },
      { rootMargin: '1200px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [prefersReducedMotion, isMobile, shouldLoad])

  const poster = `${VIDEO_BASE}/${name}-poster.jpg`
  const showPosterOnly = prefersReducedMotion || isMobile || !shouldLoad || !videoActive

  const mediaStyle = {
    opacity,
    objectFit: 'cover' as const,
    objectPosition,
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {showPosterOnly ? (
        <img
          src={poster}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full"
          style={mediaStyle}
        />
      ) : (
        <video
          className="absolute inset-0 w-full h-full"
          style={mediaStyle}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
        >
          <source src={`${VIDEO_BASE}/${name}.webm`} type="video/webm" />
          <source src={`${VIDEO_BASE}/${name}.mp4`} type="video/mp4" />
        </video>
      )}

      {overlay && (
        <div
          className="absolute inset-0"
          style={{
            background:
              overlayVariant === 'left'
                ? 'linear-gradient(to right, #0A0F1C 0%, rgba(10,15,28,0.75) 40%, rgba(10,15,28,0.2) 75%, rgba(10,15,28,0) 100%)'
                : 'radial-gradient(ellipse at center, rgba(10,15,28,0) 0%, rgba(10,15,28,0.55) 55%, #0A0F1C 100%)',
          }}
        />
      )}
    </div>
  )
}
