import { useState, useEffect, useRef, useId } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { AnimatedCounter } from '@/components/animated-counter'

const executiveTrendData = [
  { month: 'M01', valor: 78, meta: 95 },
  { month: 'M02', valor: 81, meta: 95 },
  { month: 'M03', valor: 80, meta: 95 },
  { month: 'M04', valor: 85, meta: 95 },
  { month: 'M05', valor: 84, meta: 95 },
  { month: 'M06', valor: 89, meta: 95 },
  { month: 'M07', valor: 91, meta: 95 },
  { month: 'M08', valor: 90, meta: 95 },
  { month: 'M09', valor: 94, meta: 95 },
  { month: 'M10', valor: 95, meta: 95 },
  { month: 'M11', valor: 97, meta: 95 },
  { month: 'M12', valor: 98, meta: 95 },
]

const CUSTO_INITIAL = 98.1
const CUSTO_STEP = 0.1
const CUSTO_FLOOR = 91.0
const CUSTO_INTERVAL_MS = 4000 // 4s de pausa entre degraus

// Dimensões do viewBox do gráfico SVG puro
const SVG_WIDTH = 500
const SVG_HEIGHT = 160
const PADDING = { top: 12, right: 16, bottom: 26, left: 34 }

const Y_MIN = 70
const Y_MAX = 100
const Y_TICKS = [70, 80, 90, 100]

export function HeroExecutiveChart() {
  const gradientId = useId()
  const prefersReducedMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)
  const [pulseIndex, setPulseIndex] = useState(0)
  const [custoCurrent, setCustoCurrent] = useState(CUSTO_INITIAL)
  const [isVisible, setIsVisible] = useState(true)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [activeTooltipIndex, setActiveTooltipIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // IntersectionObserver: pausar animações quando o painel estiver fora da tela e disparar animação de entrada
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
        if (entry.isIntersecting) {
          setHasAnimated(true)
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Atualização contínua e suave a cada 3.5 segundos sem saltos dos demais KPIs
  useEffect(() => {
    if (prefersReducedMotion || !isVisible) return
    const interval = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % 3)
    }, 3500)
    return () => clearInterval(interval)
  }, [prefersReducedMotion, isVisible])

  // Diminuição lenta em pausas do KPI de custo: degrau de 0,1 a cada 4 segundos
  useEffect(() => {
    if (prefersReducedMotion) {
      setCustoCurrent(CUSTO_INITIAL)
      return
    }
    if (!isVisible) return

    const interval = setInterval(() => {
      setCustoCurrent((prev) => {
        const next = Math.round((prev - CUSTO_STEP) * 10) / 10
        if (next < CUSTO_FLOOR) {
          return CUSTO_INITIAL
        }
        return next
      })
    }, CUSTO_INTERVAL_MS)

    return () => clearInterval(interval)
  }, [prefersReducedMotion, isVisible])

  // KPIs dinâmicos sutis (prazo e qualidade mantêm a oscilação sutil; custo diminui lentamente em pausas)
  const prazoVal = [96.4, 96.8, 96.5][pulseIndex]
  const custoVal = prefersReducedMotion ? CUSTO_INITIAL : custoCurrent
  const qualVal = [99.3, 99.5, 99.4][pulseIndex]

  // Perspectiva 3D: rotateY -10°, rotateX 5° em repouso; no hover (desktop) endireita suavemente
  const transformStyle = prefersReducedMotion
    ? 'none'
    : isHovered
      ? 'perspective(1200px) rotateY(0deg) rotateX(0deg) translateY(-4px)'
      : 'perspective(1200px) rotateY(-10deg) rotateX(5deg)'

  // Geometria do SVG inline
  const innerWidth = SVG_WIDTH - PADDING.left - PADDING.right
  const innerHeight = SVG_HEIGHT - PADDING.top - PADDING.bottom

  const getX = (index: number) => {
    return PADDING.left + (index / (executiveTrendData.length - 1)) * innerWidth
  }

  const getY = (val: number) => {
    const clamped = Math.max(Y_MIN, Math.min(Y_MAX, val))
    return PADDING.top + (1 - (clamped - Y_MIN) / (Y_MAX - Y_MIN)) * innerHeight
  }

  const bottomY = PADDING.top + innerHeight
  const metaY = getY(95)

  // Pontos da linha de tendência
  const points = executiveTrendData.map((d, i) => ({
    x: getX(i),
    y: getY(d.valor),
    month: d.month,
    valor: d.valor,
    meta: d.meta,
  }))

  // Construção de curva suave (monotone / catmull-rom adaptada para SVG cúbico)
  const createSmoothLinePath = () => {
    if (points.length === 0) return ''
    let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = i > 0 ? points[i - 1] : points[i]
      const p1 = points[i]
      const p2 = points[i + 1]
      const p3 = i < points.length - 2 ? points[i + 2] : p2

      const cp1x = p1.x + (p2.x - p0.x) / 6
      const cp1y = p1.y + (p2.y - p0.y) / 6
      const cp2x = p2.x - (p3.x - p1.x) / 6
      const cp2y = p2.y - (p3.y - p1.y) / 6

      d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`
    }
    return d
  }

  const linePathD = createSmoothLinePath()
  const firstPoint = points[0]
  const lastPoint = points[points.length - 1]
  const areaPathD = `${linePathD} L ${lastPoint.x.toFixed(2)} ${bottomY} L ${firstPoint.x.toFixed(2)} ${bottomY} Z`

  // Comprimento aproximado da curva para stroke-dasharray
  const lineLength = Math.round(innerWidth * 1.25)
  const isLineAnimated = prefersReducedMotion || (isVisible && hasAnimated)

  const hoveredData = activeTooltipIndex !== null ? points[activeTooltipIndex] : null

  return (
    <div
      ref={containerRef}
      className="relative w-full transition-transform duration-700 ease-smooth group cursor-pointer"
      style={{
        transform: transformStyle,
        transformStyle: 'preserve-3d',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setActiveTooltipIndex(null)
      }}
      role="region"
      aria-label="Painel executivo com KPIs de prazo, custo e qualidade e linha de tendência histórica de 12 meses"
    >
      {/* Glow externo suave com os novos tokens de accent */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-accent/30 to-accent2/30 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Card container com borda em degradê e fundo #111827 a 80% de opacidade com backdrop-blur */}
      <div className="relative w-full bg-[#111827]/80 backdrop-blur-xl border border-[#1E293B] rounded-xl p-5 md:p-6 shadow-[0_20px_50px_rgba(10,15,28,0.8)] group-hover:border-accent/60 transition-colors duration-500 overflow-hidden">
        {/* Barra superior de acento gradiente */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-accent2 to-accent" />

        {/* Header do painel */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1E293B] mb-5">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8] block">
              Painel Executivo C-Level
            </span>
            <h4 className="font-display text-base font-bold text-[#F5F4F0]">
              Performance Operacional Consolidada
            </h4>
          </div>
        </div>

        {/* 3 KPIs com contador animado */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="p-3 bg-[#0A0F1C]/60 border border-[#1E293B] rounded-sm group-hover:border-accent/30 transition-colors">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8] block">
              Prazo
            </span>
            <span className="font-display text-xl sm:text-2xl font-bold text-[#F5F4F0] block">
              <AnimatedCounter value={Math.floor(prazoVal)} decimals={0} duration={1500} />,
              {(prazoVal % 1).toFixed(1).replace('0.', '')}%
            </span>
            <span className="font-mono text-[9px] text-accent2 block mt-0.5">+4.2 p.p.</span>
          </div>

          <div className="p-3 bg-[#0A0F1C]/60 border border-[#1E293B] rounded-sm group-hover:border-accent/30 transition-colors">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8] block">
              Custo
            </span>
            <span className="font-display text-xl sm:text-2xl font-bold text-[#F5F4F0] block">
              <AnimatedCounter value={custoVal} decimals={1} duration={1000} suffix="%" />
            </span>
            <span className="font-mono text-[9px] text-accent2 block mt-0.5">+2.8 p.p.</span>
          </div>

          <div className="p-3 bg-[#0A0F1C]/60 border border-[#1E293B] rounded-sm group-hover:border-accent/30 transition-colors">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8] block">
              Qualidade
            </span>
            <span className="font-display text-xl sm:text-2xl font-bold text-[#F5F4F0] block">
              <AnimatedCounter value={Math.floor(qualVal)} decimals={0} duration={1500} />,
              {(qualVal % 1).toFixed(1).replace('0.', '')}%
            </span>
            <span className="font-mono text-[9px] text-accent2 block mt-0.5">+1.5 p.p.</span>
          </div>
        </div>

        {/* 12-month Trend Line com área sombreada vertical (30% -> 0% opacidade) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8]">
              Evolução de Eficiência Global (12 meses)
            </span>
            <span className="font-mono text-[10px] text-accent2 font-medium">Meta: 95%</span>
          </div>

          {/* Gráfico SVG puro */}
          <div className="h-40 w-full relative" aria-hidden="true">
            <svg
              viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
              className="w-full h-full select-none overflow-visible"
              preserveAspectRatio="none"
              onMouseLeave={() => setActiveTooltipIndex(null)}
            >
              <defs>
                {/* Degradê vertical 40% -> 0% opacidade - Token #3D63DD (--accent) */}
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3D63DD" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#3D63DD" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              {/* Linhas horizontais de grade (CartesianGrid) */}
              <g stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3">
                {Y_TICKS.map((tickVal) => {
                  const y = getY(tickVal)
                  return (
                    <line
                      key={tickVal}
                      x1={PADDING.left}
                      y1={y}
                      x2={SVG_WIDTH - PADDING.right}
                      y2={y}
                    />
                  )
                })}
              </g>

              {/* Rótulos do Eixo Y */}
              <g fill="#94A3B8" fontSize="10" fontFamily="monospace" textAnchor="end">
                {Y_TICKS.map((tickVal) => {
                  const y = getY(tickVal)
                  return (
                    <text key={tickVal} x={PADDING.left - 6} y={y + 3.5}>
                      {tickVal}%
                    </text>
                  )
                })}
              </g>

              {/* Linha da Meta constante (95%) tracejada teal - Token #2EB8A6 (--accent-2) */}
              <line
                x1={PADDING.left}
                y1={metaY}
                x2={SVG_WIDTH - PADDING.right}
                y2={metaY}
                stroke="#2EB8A6" /* Token --accent-2 */
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.85"
              />

              {/* Área com degradê */}
              <path
                d={areaPathD}
                fill={`url(#${gradientId})`}
                opacity={isLineAnimated ? 1 : 0}
                style={{
                  transition: prefersReducedMotion ? 'none' : 'opacity 1.2s ease-out 0.4s',
                }}
              />

              {/* Linha de tendência azul - Token #3D63DD (--accent) */}
              <path
                d={linePathD}
                fill="none"
                stroke="#3D63DD" /* Token --accent */
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={prefersReducedMotion ? 'none' : `${lineLength}`}
                strokeDashoffset={isLineAnimated ? '0' : `${lineLength}`}
                style={{
                  transition: prefersReducedMotion
                    ? 'none'
                    : 'stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />

              {/* Rótulos do Eixo X (meses M01..M12) */}
              <g fill="#94A3B8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                {points.map((pt, idx) => (
                  <text key={pt.month} x={pt.x} y={SVG_HEIGHT - 6}>
                    {idx % 2 === 0 || idx === points.length - 1 ? pt.month : ''}
                  </text>
                ))}
              </g>

              {/* Pontos da linha: normais e ponto final destacado - Tokens: #3D63DD (--accent) e #2EB8A6 (--accent-2) */}
              <g>
                {points.map((pt, idx) => {
                  const isLast = idx === points.length - 1
                  const isHoveredPoint = activeTooltipIndex === idx
                  return (
                    <circle
                      key={pt.month}
                      cx={pt.x}
                      cy={pt.y}
                      r={isHoveredPoint ? 5 : isLast ? 4 : 2.5}
                      fill={isHoveredPoint ? '#2EB8A6' : isLast ? '#2EB8A6' : '#3D63DD'}
                      stroke={isHoveredPoint || isLast ? '#0A0F1C' : '#3D63DD'}
                      strokeWidth={isHoveredPoint || isLast ? 1.5 : 1}
                      className="transition-all duration-200"
                    />
                  )
                })}
              </g>

              {/* Ponto final com halo suave piscando */}
              {isLineAnimated && (
                <circle
                  cx={lastPoint.x}
                  cy={lastPoint.y}
                  r="7"
                  fill="none"
                  stroke="#2EB8A6" /* Token --accent-2 */
                  strokeWidth="1.5"
                  opacity="0.6"
                  className={prefersReducedMotion ? '' : 'animate-ping'}
                  style={{ transformOrigin: `${lastPoint.x}px ${lastPoint.y}px` }}
                />
              )}

              {/* Áreas invisíveis de captura do mouse para tooltip interativo */}
              {points.map((pt, idx) => {
                const sliceWidth = innerWidth / points.length
                return (
                  <rect
                    key={`hit-${pt.month}`}
                    x={pt.x - sliceWidth / 2}
                    y={PADDING.top}
                    width={sliceWidth}
                    height={innerHeight + 10}
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setActiveTooltipIndex(idx)}
                  />
                )
              })}

              {/* Indicador vertical quando houver hover */}
              {hoveredData && (
                <line
                  x1={hoveredData.x}
                  y1={PADDING.top}
                  x2={hoveredData.x}
                  y2={bottomY}
                  stroke="#2EB8A6" /* Token --accent-2 */
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  opacity="0.6"
                />
              )}
            </svg>

            {/* Tooltip flutuante equivalente ao do Recharts */}
            {hoveredData && (
              <div
                className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-full px-2.5 py-1.5 rounded-md bg-[#0A0F1C]/95 border border-[#1E293B] shadow-xl text-[11px] text-[#F5F4F0] z-20 backdrop-blur-sm"
                style={{
                  left: `${(hoveredData.x / SVG_WIDTH) * 100}%`,
                  top: `${(hoveredData.y / SVG_HEIGHT) * 100 - 8}%`,
                }}
              >
                <div className="font-mono text-[10px] text-[#94A3B8]">{hoveredData.month}</div>
                <div className="flex items-center gap-1.5 font-bold text-[#F5F4F0]">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Índice: <span className="text-accent2">{hoveredData.valor}%</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
