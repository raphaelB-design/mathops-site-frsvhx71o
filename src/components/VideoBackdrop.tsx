import { useEffect, useState } from 'react'
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
 * - Desktop: vídeo em loop (webm preferencial, mp4 fallback), carregado após o load da página
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

  // Detecta celular no mount e acompanha mudanças de largura
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)')
    const onChange = () => setIsMobile(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  // Carrega o vídeo somente após o load da página (não bloquear o LCP)
  useEffect(() => {
    if (prefersReducedMotion || isMobile) return
    if (document.readyState === 'complete') {
      setShouldLoad(true)
      return
    }
    const onLoad = () => setShouldLoad(true)
    window.addEventListener('load', onLoad, { once: true })
    return () => window.removeEventListener('load', onLoad)
  }, [prefersReducedMotion, isMobile])

  const poster = `${VIDEO_BASE}/${name}-poster.jpg`
  const showPosterOnly = prefersReducedMotion || isMobile || !shouldLoad || !videoActive

  const mediaStyle = {
    opacity,
    objectFit: 'cover' as const,
    objectPosition,
  }

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
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
