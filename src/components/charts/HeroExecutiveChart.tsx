import { useState, useEffect, useRef } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
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

export function HeroExecutiveChart() {
  const prefersReducedMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)
  const [pulseIndex, setPulseIndex] = useState(0)
  const [custoCurrent, setCustoCurrent] = useState(CUSTO_INITIAL)
  const [isVisible, setIsVisible] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  // IntersectionObserver: pausar animações quando o painel estiver fora da tela
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
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

  return (
    <div
      ref={containerRef}
      className="relative w-full transition-transform duration-700 ease-smooth group cursor-pointer"
      style={{
        transform: transformStyle,
        transformStyle: 'preserve-3d',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Painel executivo com KPIs de prazo, custo e qualidade e linha de tendência histórica de 12 meses"
    >
      {/* Glow externo suave em azul vivo */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-[#3B82F6]/30 to-[#22D3EE]/30 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Card container com borda em degradê e fundo #111827 a 70% de opacidade com backdrop-blur */}
      <div className="relative w-full bg-[#111827]/80 backdrop-blur-xl border border-[#1E293B] rounded-xl p-5 md:p-6 shadow-[0_20px_50px_rgba(10,15,28,0.8)] group-hover:border-[#3B82F6]/60 transition-colors duration-500 overflow-hidden">
        {/* Barra superior de acento gradiente */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#3B82F6] via-[#22D3EE] to-[#3B82F6]" />

        {/* Header do painel */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1E293B] mb-5">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#94A3B8] block">
              Painel Executivo C-Level
            </span>
            <h4 className="font-display text-base font-bold text-[#F5F4F0]">
              Performance Operacional Consolidada
            </h4>
          </div>
        </div>

        {/* 3 KPIs com contador animado */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="p-3 bg-[#0A0F1C]/60 border border-[#1E293B] rounded-sm group-hover:border-[#3B82F6]/30 transition-colors">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8] block">
              Prazo
            </span>
            <span className="font-display text-xl sm:text-2xl font-bold text-[#F5F4F0] block">
              <AnimatedCounter value={Math.floor(prazoVal)} decimals={0} duration={1500} />,
              {(prazoVal % 1).toFixed(1).replace('0.', '')}%
            </span>
            <span className="font-mono text-[9px] text-[#22D3EE] block mt-0.5">+4.2 p.p.</span>
          </div>

          <div className="p-3 bg-[#0A0F1C]/60 border border-[#1E293B] rounded-sm group-hover:border-[#3B82F6]/30 transition-colors">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8] block">
              Custo
            </span>
            <span className="font-display text-xl sm:text-2xl font-bold text-[#F5F4F0] block">
              <AnimatedCounter value={custoVal} decimals={1} duration={1000} suffix="%" />
            </span>
            <span className="font-mono text-[9px] text-[#22D3EE] block mt-0.5">+2.8 p.p.</span>
          </div>

          <div className="p-3 bg-[#0A0F1C]/60 border border-[#1E293B] rounded-sm group-hover:border-[#3B82F6]/30 transition-colors">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8] block">
              Qualidade
            </span>
            <span className="font-display text-xl sm:text-2xl font-bold text-[#F5F4F0] block">
              <AnimatedCounter value={Math.floor(qualVal)} decimals={0} duration={1500} />,
              {(qualVal % 1).toFixed(1).replace('0.', '')}%
            </span>
            <span className="font-mono text-[9px] text-[#22D3EE] block mt-0.5">+1.5 p.p.</span>
          </div>
        </div>

        {/* 12-month Trend Line com área sombreada vertical (30% -> 0% opacidade) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8]">
              Evolução de Eficiência Global (12 meses)
            </span>
            <span className="font-mono text-[10px] text-[#22D3EE] font-medium">Meta: 95%</span>
          </div>
          <div className="h-40 w-full" aria-hidden="true">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={executiveTrendData}
                margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
              >
                <defs>
                  {/* Degradê vertical 30% -> 0% opacidade */}
                  <linearGradient id="heroExecArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis
                  domain={[70, 100]}
                  stroke="#94A3B8"
                  fontSize={10}
                  tickLine={false}
                  unit="%"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0A0F1C',
                    borderColor: '#1E293B',
                    borderRadius: '6px',
                    fontSize: '11px',
                    color: '#F5F4F0',
                  }}
                  formatter={(val: any) => [`${val}%`, 'Índice']}
                  labelStyle={{ color: '#94A3B8' }}
                />
                <Area
                  type="monotone"
                  dataKey="valor"
                  stroke="#3B82F6"
                  strokeWidth={2.5}
                  fill="url(#heroExecArea)"
                  isAnimationActive={!prefersReducedMotion}
                  animationDuration={1800}
                  animationEasing="ease-out"
                />
                <Line
                  type="monotone"
                  dataKey="valor"
                  stroke="#3B82F6"
                  strokeWidth={2.5}
                  dot={{ r: 2.5, fill: '#3B82F6', strokeWidth: 1 }}
                  activeDot={{ r: 5, fill: '#22D3EE' }}
                  isAnimationActive={!prefersReducedMotion}
                  animationDuration={1800}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
