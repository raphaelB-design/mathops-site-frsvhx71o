import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

/**
 * Carta de controle "viva" (versão animada do SectionBackdrop variant="control").
 * - Ao entrar na viewport: os pontos são plotados em sequência (stagger) e a linha
 *   de controle se desenha (stroke-dasharray/stroke-dashoffset + transition).
 * - Um ponto sai do limite superior (UCL), é destacado em cyan (hsl(var(--accent-2)))
 *   e depois volta ao estado normal — em loop, enquanto a seção estiver visível.
 * - prefers-reduced-motion: estado final estático (tudo plotado, ponto destacado),
 *   sem animação e sem loop.
 */

interface ControlChartLiveProps {
  className?: string
}

// Sequência de pontos (x, y) no viewBox 800x320 — o ponto de índice 12 sai pelo UCL
const POINTS: Array<[number, number]> = [
  [70, 165],
  [110, 140],
  [150, 175],
  [190, 130],
  [230, 155],
  [270, 180],
  [310, 145],
  [350, 160],
  [390, 120],
  [430, 170],
  [470, 150],
  [510, 165],
  [550, 60], // fora do limite (acima do UCL)
  [590, 140],
  [630, 155],
  [670, 175],
  [710, 150],
]
const OUTLIER_INDEX = 12
const POINT_STAGGER_MS = 90
const HIGHLIGHT_AT_MS = 2000
const HIGHLIGHT_END_MS = 3400
const CYCLE_MS = 4400

export function ControlChartLive({ className = '' }: ControlChartLiveProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [hasEntered, setHasEntered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [plotted, setPlotted] = useState(false)
  const [highlight, setHighlight] = useState(false)

  // IntersectionObserver: dispara a animação uma vez e pausa o loop fora de vista
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
        if (entry.isIntersecting) setHasEntered(true)
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Loop: plota em sequência → destaca o ponto fora do limite → volta → recomeça
  useEffect(() => {
    if (prefersReducedMotion || !hasEntered || !isVisible) return
    let timers: number[] = []
    const runCycle = () => {
      setPlotted(false)
      setHighlight(false)
      timers.push(
        window.setTimeout(() => setPlotted(true), 80),
        window.setTimeout(() => setHighlight(true), HIGHLIGHT_AT_MS),
        window.setTimeout(() => setHighlight(false), HIGHLIGHT_END_MS),
        window.setTimeout(() => runCycle(), CYCLE_MS),
      )
    }
    runCycle()
    return () => {
      timers.forEach((t) => window.clearTimeout(t))
      timers = []
    }
  }, [prefersReducedMotion, hasEntered, isVisible])

  // Estado final estático quando prefers-reduced-motion
  const staticDone = prefersReducedMotion
  const pointsVisible = staticDone || plotted
  const outlierLit = staticDone || highlight

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
    >
      <svg viewBox="0 0 800 320" className="w-full h-full" preserveAspectRatio="none">
        {/* Linhas de limite */}
        <line
          x1="50"
          y1="70"
          x2="750"
          y2="70"
          stroke="#EF4444"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          opacity="0.8"
        />
        <text x="14" y="66" fill="#EF4444" fontSize="10" fontFamily="monospace">
          UCL (+3σ)
        </text>

        {/* CL Média — Token #2EB8A6 (--accent-2) */}
        <line
          x1="50"
          y1="160"
          x2="750"
          y2="160"
          stroke="#2EB8A6"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.9"
        />
        <text x="14" y="156" fill="#2EB8A6" fontSize="10" fontFamily="monospace">
          CL (X̄)
        </text>

        <line
          x1="50"
          y1="250"
          x2="750"
          y2="250"
          stroke="#EF4444"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          opacity="0.8"
        />
        <text x="14" y="246" fill="#EF4444" fontSize="10" fontFamily="monospace">
          LCL (−3σ)
        </text>

        {/* Linha de controle que se desenha — Token #3D63DD (--accent) */}
        <polyline
          points={POINTS.map(([x, y]) => `${x},${y}`).join(' ')}
          fill="none"
          stroke="#3D63DD"
          strokeWidth="2.5"
          pathLength={1}
          strokeDasharray={prefersReducedMotion ? 'none' : '1'}
          strokeDashoffset={pointsVisible ? 0 : 1}
          style={{
            transition: prefersReducedMotion
              ? 'none'
              : 'stroke-dashoffset 1.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Pontos plotados em sequência */}
        {POINTS.map(([cx, cy], i) => {
          const isOutlier = i === OUTLIER_INDEX
          if (isOutlier) {
            return (
              <g key={i}>
                {/* Anel de destaque do ponto fora do limite */}
                <circle
                  cx={cx}
                  cy={cy}
                  r="12"
                  fill="none"
                  stroke="hsl(var(--accent-2))"
                  strokeWidth="1.5"
                  style={{
                    opacity: outlierLit ? 0.85 : 0,
                    transition: prefersReducedMotion ? 'none' : 'opacity 0.4s ease, r 0.4s ease',
                  }}
                />
                <circle
                  cx={cx}
                  cy={cy}
                  r="6"
                  style={{
                    fill: outlierLit ? 'hsl(var(--accent-2))' : '#3D63DD',
                    opacity: pointsVisible ? 1 : 0,
                    transition: prefersReducedMotion
                      ? 'none'
                      : `fill 0.35s ease, opacity 0.3s ease ${i * POINT_STAGGER_MS}ms`,
                  }}
                  stroke="#0A0F1C"
                  strokeWidth="1"
                />
              </g>
            )
          }
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="3.5"
              fill="#3D63DD"
              stroke="#0A0F1C"
              strokeWidth="1"
              style={{
                opacity: pointsVisible ? 1 : 0,
                transition: prefersReducedMotion
                  ? 'none'
                  : `opacity 0.3s ease ${i * POINT_STAGGER_MS}ms`,
              }}
            />
          )
        })}
      </svg>
    </div>
  )
}
