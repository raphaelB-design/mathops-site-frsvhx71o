import { useEffect, useState } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

const VIDEO_BASE = 'https://qzdsxtqskwrslsxodexc.supabase.co/storage/v1/object/public/site-media'

type NetworkInformationLike = {
  saveData?: boolean
  effectiveType?: string
}

function isSlowConnection(): boolean {
  if (typeof navigator === 'undefined') return false
  const conn = (navigator as Navigator & { connection?: NetworkInformationLike }).connection
  if (!conn) return false
  if (conn.saveData) return true
  const et = conn.effectiveType
  return et === 'slow-2g' || et === '2g' || et === '3g'
}

/**
 * Vídeo do olho no fundo do Hero.
 * - Desktop: olho-hero-1080 (webm preferencial, mp4 fallback); conexão lenta: 720.mp4
 * - Celular: olho-hero-mobile-9x16 (webm/mp4)
 * - prefers-reduced-motion: apenas a capa (sem reprodução)
 * - Carregamento adiado para depois do evento load da página
 */
export function HeroVideo() {
  const isMobile = useIsMobile()
  const prefersReducedMotion = useReducedMotion()
  const [shouldLoad, setShouldLoad] = useState(false)
  const [slow] = useState(() => isSlowConnection())

  // Carregar o vídeo somente após o load da página (não bloquear o carregamento inicial)
  useEffect(() => {
    if (prefersReducedMotion) return
    if (document.readyState === 'complete') {
      setShouldLoad(true)
      return
    }
    const onLoad = () => setShouldLoad(true)
    window.addEventListener('load', onLoad, { once: true })
    return () => window.removeEventListener('load', onLoad)
  }, [prefersReducedMotion])

  const poster = isMobile
    ? `${VIDEO_BASE}/olho-hero-mobile-poster.jpg`
    : `${VIDEO_BASE}/olho-hero-poster.jpg`

  // Desktop: olho inteiro no terço direito; celular: centralizado um pouco acima
  // Ajuste 2026-11: sem escala extra e com o recipiente limitado a 100svh, o olho
  // aparece por completo dentro da primeira dobra (sem rolar a página).
  const objectPosition = isMobile ? 'center 35%' : '72% 45%'
  const objectFit = 'contain' as const

  return (
    <div
      className="absolute inset-x-0 top-0 h-full max-h-[100svh] z-0 pointer-events-none"
      aria-hidden="true"
    >
      {/* Preenchimento desfocado atrás do vídeo (evita bordas vazias no modo contain) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-2xl brightness-[0.85]"
        style={{
          backgroundImage: `url(${poster})`,
          transform: 'scale(1.1)',
        }}
      />
      {prefersReducedMotion || !shouldLoad ? (
        // Capa estática (reduced motion) ou enquanto o vídeo não carregou
        <div
          className="absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: `url(${poster})`,
            backgroundPosition: objectPosition,
            backgroundSize: 'contain',
            transformOrigin: 'center center',
          }}
        />
      ) : (
        <video
          className="absolute inset-0 w-full h-full object-contain"
          style={{
            objectPosition,
            objectFit,
            transformOrigin: 'center center',
          }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
        >
          {!isMobile && !slow && (
            <source src={`${VIDEO_BASE}/olho-hero-1080.webm`} type="video/webm" />
          )}
          {!isMobile && !slow && (
            <source src={`${VIDEO_BASE}/olho-hero-1080.mp4`} type="video/mp4" />
          )}
          {isMobile && (
            <source src={`${VIDEO_BASE}/olho-hero-mobile-9x16.webm`} type="video/webm" />
          )}
          {isMobile && <source src={`${VIDEO_BASE}/olho-hero-mobile-9x16.mp4`} type="video/mp4" />}
          {!isMobile && slow && <source src={`${VIDEO_BASE}/olho-hero-720.mp4`} type="video/mp4" />}
        </video>
      )}

      {/* Degradês de legibilidade sobre o vídeo */}
      {isMobile ? (
        // Celular: vertical — escuro no topo, transparente no meio, escuro na base
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,15,28,0.92) 0%, rgba(10,15,28,0) 50%, rgba(10,15,28,0.92) 100%)',
          }}
        />
      ) : (
        <>
          {/* Desktop: horizontal — #0A0F1C à esquerda até transparente em 58% */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, rgba(10,15,28,0.94) 0%, rgba(10,15,28,0) 58%)',
            }}
          />
          {/* Desktop: vertical escuro nos 18% inferiores */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(10,15,28,0.92) 0%, rgba(10,15,28,0) 18%)',
            }}
          />
        </>
      )}
    </div>
  )
}
