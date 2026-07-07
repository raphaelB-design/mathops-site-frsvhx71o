import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function InteractiveGrid({ className }: { className?: string }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)

    if (mediaQuery.matches) return

    let rafId: number | null = null
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        setMouse({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20,
        })
        rafId = null
      })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  if (isReducedMotion) {
    return (
      <div
        className={cn(
          'absolute inset-0 z-0 opacity-[0.06] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]',
          className,
        )}
      />
    )
  }

  return (
    <div
      className={cn(
        'absolute inset-0 z-0 overflow-hidden pointer-events-none perspective-[1000px] flex items-center justify-center',
        className,
      )}
    >
      <div
        className="w-[200%] h-[200%] absolute border-white/5 opacity-[0.08] transition-transform duration-100 ease-out will-change-transform"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          transform: `rotateX(60deg) translateY(${mouse.y * 2}px) translateX(${mouse.x * 2}px) translateZ(-200px)`,
        }}
      />
    </div>
  )
}
