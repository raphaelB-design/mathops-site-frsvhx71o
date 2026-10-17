import { useEffect, useRef, useState, memo } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { useIsMobile } from '@/hooks/use-mobile'

export type SectionBackdropVariant =
  | 'executive'
  | 'divergence'
  | 'process'
  | 'control'
  | 'risk'
  | 'timeline'
  | 'scurve'

interface SectionBackdropProps {
  variant: SectionBackdropVariant
  className?: string
  /** Se for usado dentro de um card no hover */
  isHovered?: boolean
  /** Opacidade customizada (ex: 12-18% por padrão = 'opacity-15') */
  opacityClass?: string
}

export const SectionBackdrop = memo(function SectionBackdrop({
  variant,
  className = '',
  isHovered,
  opacityClass = 'opacity-[0.14]',
}: SectionBackdropProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const [isVisible, setIsVisible] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)

  // IntersectionObserver para pausar animações quando fora de vista
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
        if (entry.isIntersecting) {
          setHasEntered(true)
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Lazy render: não monta SVG complexo até estar próximo/visível
  const shouldAnimate = !prefersReducedMotion && isVisible
  const onceAnimated = !prefersReducedMotion && (hasEntered || isVisible)

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${opacityClass} ${className}`}
      style={{
        maskImage: 'radial-gradient(ellipse 90% 70% at 50% 50%, black 40%, transparent 95%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 50%, black 40%, transparent 95%)',
      }}
    >
      {variant === 'executive' && (
        <ExecutiveVariant
          isMobile={isMobile}
          shouldAnimate={shouldAnimate}
          prefersReducedMotion={prefersReducedMotion}
        />
      )}
      {variant === 'divergence' && (
        <DivergenceVariant animateOnce={onceAnimated} prefersReducedMotion={prefersReducedMotion} />
      )}
      {variant === 'process' && (
        <ProcessVariant
          isHovered={isHovered}
          shouldAnimate={shouldAnimate}
          prefersReducedMotion={prefersReducedMotion}
        />
      )}
      {variant === 'control' && (
        <ControlVariant
          isHovered={isHovered}
          shouldAnimate={shouldAnimate}
          prefersReducedMotion={prefersReducedMotion}
        />
      )}
      {variant === 'risk' && (
        <RiskVariant
          isHovered={isHovered}
          shouldAnimate={shouldAnimate}
          prefersReducedMotion={prefersReducedMotion}
        />
      )}
      {variant === 'timeline' && (
        <TimelineVariant animateOnce={onceAnimated} prefersReducedMotion={prefersReducedMotion} />
      )}
      {variant === 'scurve' && (
        <SCurveVariant animateOnce={onceAnimated} prefersReducedMotion={prefersReducedMotion} />
      )}
    </div>
  )
})

/* =========================================================================
   VARIANTE 1: EXECUTIVE (Mosaico de 6 a 9 mini painéis no desktop, máx 4 no celular)
   Animação contínua: valores atualizando a cada 3-5s suavemente
   ========================================================================= */
function ExecutiveVariant({
  isMobile,
  shouldAnimate,
  prefersReducedMotion,
}: {
  isMobile: boolean
  shouldAnimate: boolean
  prefersReducedMotion: boolean
}) {
  const [ticker, setTicker] = useState(0)

  useEffect(() => {
    if (!shouldAnimate || prefersReducedMotion || isMobile) return
    const interval = setInterval(() => {
      setTicker((prev) => (prev + 1) % 4)
    }, 4000)
    return () => clearInterval(interval)
  }, [shouldAnimate, prefersReducedMotion, isMobile])

  // Valores que mudam levemente a cada tick
  const val1 = [96.4, 96.8, 97.2, 96.6][ticker]
  const val2 = [142, 148, 154, 150][ticker]
  const val3 = [99.2, 99.4, 99.1, 99.5][ticker]

  return (
    <div
      className={`w-full h-full p-4 md:p-8 grid gap-3 md:gap-4 ${
        isMobile ? 'grid-cols-2 grid-rows-2' : 'grid-cols-3 grid-rows-3'
      } ${isMobile ? '' : 'blur-[2px]'}`}
    >
      {/* 1. Linha de tendência */}
      <div className="bg-[#111827]/70 border border-[#1E293B] rounded p-3 flex flex-col justify-between">
        <div className="flex justify-between items-center text-[10px] font-mono text-[#94A3B8]">
          <span>KPI_TREND</span>
          <span className="text-[#22D3EE]">+{ticker * 0.4}%</span>
        </div>
        <svg viewBox="0 0 100 35" className="w-full h-12 stroke-[#3B82F6] fill-none">
          <path d="M 5 28 Q 25 15, 45 22 T 85 8 L 95 6" strokeWidth="2" strokeLinecap="round" />
          <circle cx="95" cy="6" r="3" fill="#22D3EE" />
        </svg>
      </div>

      {/* 2. Barras de capacidade */}
      <div className="bg-[#111827]/70 border border-[#1E293B] rounded p-3 flex flex-col justify-between">
        <span className="text-[10px] font-mono text-[#94A3B8]">THROUGHPUT</span>
        <div className="flex items-end gap-1.5 h-12 w-full pt-2">
          {[40, 65, 80, 55, 90, 75, 88].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-[#3B82F6]/70 rounded-t transition-all duration-1000"
              style={{
                height: `${Math.min(100, h + (i === ticker ? 10 : 0))}%`,
                backgroundColor: i === 4 ? '#22D3EE' : '#3B82F6',
              }}
            />
          ))}
        </div>
      </div>

      {/* 3. KPI Numérico grande */}
      <div className="bg-[#111827]/70 border border-[#1E293B] rounded p-3 flex flex-col justify-between">
        <span className="text-[10px] font-mono text-[#94A3B8]">EVM_CPI</span>
        <div className="font-mono text-2xl font-bold text-[#F5F4F0] flex items-baseline gap-1">
          <span>{val1.toFixed(1)}</span>
          <span className="text-xs text-[#22D3EE] font-normal">%</span>
        </div>
        <div className="w-full bg-[#1E293B] h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-[#22D3EE] h-full transition-all duration-1000"
            style={{ width: `${val1}%` }}
          />
        </div>
      </div>

      {/* 4. Rosca / Donut */}
      <div className="bg-[#111827]/70 border border-[#1E293B] rounded p-3 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-[#94A3B8]">OTIF</span>
          <span className="text-sm font-mono font-bold text-[#F5F4F0]">{val3}%</span>
        </div>
        <svg viewBox="0 0 36 36" className="w-12 h-12 -rotate-90">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#1E293B"
            strokeWidth="3.5"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="3.5"
            strokeDasharray="92, 100"
            strokeLinecap="round"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#22D3EE"
            strokeWidth="3.5"
            strokeDasharray="25, 100"
            strokeDashoffset="-92"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Painéis extras no desktop (5 a 9) */}
      {!isMobile && (
        <>
          {/* 5. Área de densidade */}
          <div className="bg-[#111827]/70 border border-[#1E293B] rounded p-3 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-[#94A3B8]">DENSITY_CURVE</span>
            <svg viewBox="0 0 100 40" className="w-full h-12">
              <defs>
                <linearGradient id="execAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M 5 35 Q 25 32, 45 10 T 75 25 L 95 35 Z" fill="url(#execAreaGrad)" />
              <path
                d="M 5 35 Q 25 32, 45 10 T 75 25 L 95 35"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="1.8"
              />
            </svg>
          </div>

          {/* 6. Sparkline de latência */}
          <div className="bg-[#111827]/70 border border-[#1E293B] rounded p-3 flex flex-col justify-between">
            <div className="flex justify-between items-center text-[10px] font-mono text-[#94A3B8]">
              <span>SAMPLE_CYCLE</span>
              <span className="text-[#22D3EE] font-bold">{val2} ms</span>
            </div>
            <svg viewBox="0 0 100 25" className="w-full h-10 stroke-[#22D3EE] fill-none">
              <polyline points="2,15 15,12 28,18 42,6 55,14 68,9 82,16 98,4" strokeWidth="1.5" />
            </svg>
          </div>

          {/* 7. Matriz de status mini */}
          <div className="bg-[#111827]/70 border border-[#1E293B] rounded p-3 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-[#94A3B8]">NODE_GRID</span>
            <div className="grid grid-cols-4 gap-1.5 my-auto">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-2 rounded-sm"
                  style={{
                    backgroundColor:
                      i === (ticker * 2) % 8 ? '#22D3EE' : i % 2 === 0 ? '#3B82F6' : '#1E293B',
                  }}
                />
              ))}
            </div>
          </div>

          {/* 8. Dispersão de pontos */}
          <div className="bg-[#111827]/70 border border-[#1E293B] rounded p-3 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-[#94A3B8]">REGRESSION_FIT</span>
            <svg viewBox="0 0 100 35" className="w-full h-12">
              <line
                x1="5"
                y1="30"
                x2="95"
                y2="8"
                stroke="#3B82F6"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />
              {[
                [10, 28],
                [25, 23],
                [40, 20],
                [50, 17],
                [65, 14],
                [75, 12],
                [88, 9],
              ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="2" fill={i === 3 ? '#22D3EE' : '#94A3B8'} />
              ))}
            </svg>
          </div>

          {/* 9. Meta de conformidade */}
          <div className="bg-[#111827]/70 border border-[#1E293B] rounded p-3 flex flex-col justify-between">
            <div className="flex justify-between items-center text-[10px] font-mono text-[#94A3B8]">
              <span>SIX_SIGMA</span>
              <span className="text-[#3B82F6] font-bold">Cp 1.67</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="h-6 w-1 bg-[#3B82F6] rounded-full" />
              <span className="h-10 w-1 bg-[#22D3EE] rounded-full" />
              <span className="h-8 w-1 bg-[#3B82F6] rounded-full" />
              <span className="h-5 w-1 bg-[#1E293B] rounded-full" />
              <span className="h-7 w-1 bg-[#3B82F6] rounded-full" />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

/* =========================================================================
   VARIANTE 2: DIVERGENCE (Duas linhas que começam juntas e se separam)
   Previsto vs. Realizado - Animação única ao entrar
   ========================================================================= */
function DivergenceVariant({
  animateOnce,
  prefersReducedMotion,
}: {
  animateOnce: boolean
  prefersReducedMotion: boolean
}) {
  return (
    <svg viewBox="0 0 1200 400" preserveAspectRatio="none" className="w-full h-full">
      <defs>
        <linearGradient id="divGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="divGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Grid de fundo técnico */}
      <g stroke="#1E293B" strokeWidth="1" strokeDasharray="4 8" opacity="0.6">
        <line x1="0" y1="100" x2="1200" y2="100" />
        <line x1="0" y1="200" x2="1200" y2="200" />
        <line x1="0" y1="300" x2="1200" y2="300" />
        <line x1="300" y1="0" x2="300" y2="400" />
        <line x1="600" y1="0" x2="600" y2="400" />
        <line x1="900" y1="0" x2="900" y2="400" />
      </g>

      {/* Linha 1: Previsto (sobe suave) */}
      <path
        d="M 50 250 C 300 250, 500 240, 700 160 C 900 80, 1050 60, 1150 50"
        fill="none"
        stroke="url(#divGrad1)"
        strokeWidth="3"
        strokeDasharray={prefersReducedMotion ? 'none' : '1200'}
        strokeDashoffset={animateOnce || prefersReducedMotion ? '0' : '1200'}
        style={{
          transition: prefersReducedMotion
            ? 'none'
            : 'stroke-dashoffset 2.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Linha 2: Realizado (diverge para baixo) */}
      <path
        d="M 50 250 C 300 250, 500 260, 700 310 C 900 360, 1050 370, 1150 380"
        fill="none"
        stroke="url(#divGrad2)"
        strokeWidth="3"
        strokeDasharray={prefersReducedMotion ? 'none' : '1200'}
        strokeDashoffset={animateOnce || prefersReducedMotion ? '0' : '1200'}
        style={{
          transition: prefersReducedMotion
            ? 'none'
            : 'stroke-dashoffset 2.4s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
        }}
      />

      {/* Ponto inicial de confluência */}
      <circle cx="50" cy="250" r="5" fill="#3B82F6" />
      <circle cx="50" cy="250" r="10" fill="none" stroke="#3B82F6" strokeWidth="1" opacity="0.6" />

      {/* Pontos de chegada divergentes */}
      <circle cx="1150" cy="50" r="5" fill="#3B82F6" />
      <circle cx="1150" cy="380" r="5" fill="#22D3EE" />

      {/* Linha de divergência entre os pontos finais */}
      <line
        x1="1150"
        y1="50"
        x2="1150"
        y2="380"
        stroke="#22D3EE"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        opacity="0.7"
      />
    </svg>
  )
}

/* =========================================================================
   VARIANTE 3: PROCESS (Fluxo BPMN com pulso de luz e mini painel de KPIs)
   Camada 1: Diagnóstico e Visibilidade
   ========================================================================= */
function ProcessVariant({
  isHovered,
  shouldAnimate,
  prefersReducedMotion,
}: {
  isHovered?: boolean
  shouldAnimate: boolean
  prefersReducedMotion: boolean
}) {
  const active = (isHovered !== undefined ? isHovered : shouldAnimate) && !prefersReducedMotion

  return (
    <div className="w-full h-full flex items-center justify-between p-6">
      <svg viewBox="0 0 700 240" className="w-full h-full max-w-3xl mx-auto stroke-[#3B82F6]">
        <defs>
          <linearGradient id="procGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
          <filter id="procGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Start Event Circle */}
        <circle cx="60" cy="120" r="22" fill="#111827" stroke="#3B82F6" strokeWidth="2.5" />
        <circle cx="60" cy="120" r="8" fill="#3B82F6" />

        {/* Arrow 1 */}
        <line x1="82" y1="120" x2="150" y2="120" stroke="#3B82F6" strokeWidth="2" />
        <polygon points="150,116 158,120 150,124" fill="#3B82F6" />

        {/* Task Box 1 */}
        <rect
          x="160"
          y="85"
          width="110"
          height="70"
          rx="6"
          fill="#111827"
          stroke="#3B82F6"
          strokeWidth="2"
        />
        <line x1="175" y1="105" x2="255" y2="105" stroke="#94A3B8" strokeWidth="2" />
        <line x1="175" y1="120" x2="230" y2="120" stroke="#94A3B8" strokeWidth="2" />
        <line x1="175" y1="135" x2="210" y2="135" stroke="#3B82F6" strokeWidth="2" />

        {/* Arrow 2 */}
        <line x1="270" y1="120" x2="330" y2="120" stroke="#3B82F6" strokeWidth="2" />
        <polygon points="330,116 338,120 330,124" fill="#3B82F6" />

        {/* Gateway Diamond */}
        <polygon
          points="370,85 405,120 370,155 335,120"
          fill="#111827"
          stroke="#22D3EE"
          strokeWidth="2"
        />
        <text
          x="370"
          y="126"
          fill="#22D3EE"
          fontSize="18"
          fontWeight="bold"
          textAnchor="middle"
          stroke="none"
        >
          ×
        </text>

        {/* Arrow 3 */}
        <line x1="405" y1="120" x2="465" y2="120" stroke="#22D3EE" strokeWidth="2" />
        <polygon points="465,116 473,120 465,124" fill="#22D3EE" />

        {/* Task Box 2 */}
        <rect
          x="475"
          y="85"
          width="110"
          height="70"
          rx="6"
          fill="#111827"
          stroke="#22D3EE"
          strokeWidth="2"
        />
        <line x1="490" y1="105" x2="570" y2="105" stroke="#94A3B8" strokeWidth="2" />
        <line x1="490" y1="120" x2="550" y2="120" stroke="#94A3B8" strokeWidth="2" />
        <line x1="490" y1="135" x2="530" y2="135" stroke="#22D3EE" strokeWidth="2" />

        {/* Arrow 4 */}
        <line x1="585" y1="120" x2="635" y2="120" stroke="#22D3EE" strokeWidth="2" />
        <polygon points="635,116 643,120 635,124" fill="#22D3EE" />

        {/* End Event Circle */}
        <circle cx="665" cy="120" r="22" fill="#111827" stroke="#22D3EE" strokeWidth="3.5" />

        {/* Pulso de luz animado percorrendo o fluxo */}
        {active && (
          <circle r="5" fill="#22D3EE" filter="url(#procGlow)">
            <animateMotion
              path="M 60 120 L 215 120 L 370 120 L 530 120 L 665 120"
              dur="3.5s"
              repeatCount="indefinite"
            />
          </circle>
        )}
      </svg>
    </div>
  )
}

/* =========================================================================
   VARIANTE 4: CONTROL (Carta de controle Shewhart com dispersão e reta)
   Camada 2: Análise e Modelagem
   ========================================================================= */
function ControlVariant({
  isHovered: _isHovered,
  shouldAnimate: _shouldAnimate,
  prefersReducedMotion: _prefersReducedMotion,
}: {
  isHovered?: boolean
  shouldAnimate: boolean
  prefersReducedMotion: boolean
}) {
  return (
    <svg
      viewBox="0 0 800 320"
      className="w-full h-full max-w-4xl mx-auto"
      preserveAspectRatio="none"
    >
      {/* Linhas de Limites */}
      {/* UCL */}
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
      <text x="755" y="74" fill="#EF4444" fontSize="10" fontFamily="monospace">
        UCL (+3σ)
      </text>

      {/* CL Média */}
      <line
        x1="50"
        y1="160"
        x2="750"
        y2="160"
        stroke="#22D3EE"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        opacity="0.9"
      />
      <text x="755" y="164" fill="#22D3EE" fontSize="10" fontFamily="monospace">
        CL (X̄)
      </text>

      {/* LCL */}
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
      <text x="755" y="254" fill="#EF4444" fontSize="10" fontFamily="monospace">
        LCL (-3σ)
      </text>

      {/* Pontos e linha de controle */}
      <polyline
        points="
          70,165 110,140 150,175 190,130 230,155 270,180 310,145 
          350,160 390,120 430,170 470,150 510,165 550,60 590,140 
          630,155 670,175 710,150
        "
        fill="none"
        stroke="#3B82F6"
        strokeWidth="2.5"
      />

      {/* Pontos normais */}
      {[
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
        [590, 140],
        [630, 155],
        [670, 175],
        [710, 150],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.5" fill="#3B82F6" stroke="#0A0F1C" strokeWidth="1" />
      ))}

      {/* Ponto fora de controle (sinalizado vermelho) */}
      <circle cx="550" cy="60" r="6" fill="#EF4444" />
      <circle
        cx="550"
        cy="60"
        r="11"
        fill="none"
        stroke="#EF4444"
        strokeWidth="1.5"
        opacity="0.8"
      />
    </svg>
  )
}

/* =========================================================================
   VARIANTE 5: RISK (Matriz 5x5 com células acendendo suavemente)
   Camada 3: Governança e Riscos
   ========================================================================= */
function RiskVariant({
  isHovered: _isHovered,
  shouldAnimate: _shouldAnimate,
  prefersReducedMotion: _prefersReducedMotion,
}: {
  isHovered?: boolean
  shouldAnimate: boolean
  prefersReducedMotion: boolean
}) {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="grid grid-cols-5 gap-2 max-w-md w-full aspect-square p-3 bg-[#111827]/80 border border-[#1E293B] rounded-lg">
        {[...Array(25)].map((_, i) => {
          const row = Math.floor(i / 5) // 0 (alta prob) a 4 (baixa prob)
          const col = i % 5 // 0 (baixo imp) a 4 (alto imp)
          const severity = (5 - row) * (col + 1) // 1 a 25

          let bg = 'bg-[#1E293B]/40 border-[#334155]/40 text-[#94A3B8]'
          if (severity >= 16) {
            bg = 'bg-[#EF4444]/25 border-[#EF4444]/40 text-red-300'
          } else if (severity >= 10) {
            bg = 'bg-[#F59E0B]/25 border-[#F59E0B]/40 text-amber-300'
          } else if (severity >= 5) {
            bg = 'bg-[#3B82F6]/20 border-[#3B82F6]/35 text-[#22D3EE]'
          } else {
            bg = 'bg-[#10B981]/20 border-[#10B981]/30 text-emerald-300'
          }

          const hasDot = i === 4 || i === 8 || i === 12 || i === 18 || i === 22

          return (
            <div
              key={i}
              className={`border rounded-sm flex items-center justify-center font-mono text-[9px] relative ${bg}`}
            >
              {hasDot && (
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: severity >= 16 ? '#EF4444' : '#22D3EE',
                    boxShadow: severity >= 16 ? '0 0 8px #EF4444' : '0 0 6px #22D3EE',
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* =========================================================================
   VARIANTE 6: TIMELINE (Linha do tempo com 3 marcos que se acendem em sequência)
   Como Funciona - Animação única ao entrar
   ========================================================================= */
function TimelineVariant({
  animateOnce,
  prefersReducedMotion,
}: {
  animateOnce: boolean
  prefersReducedMotion: boolean
}) {
  return (
    <svg
      viewBox="0 0 1000 240"
      className="w-full h-full max-w-5xl mx-auto"
      preserveAspectRatio="none"
    >
      {/* Linha horizontal conectando os marcos */}
      <line x1="150" y1="120" x2="850" y2="120" stroke="#1E293B" strokeWidth="3" />
      <line
        x1="150"
        y1="120"
        x2="850"
        y2="120"
        stroke="#3B82F6"
        strokeWidth="3"
        strokeDasharray={prefersReducedMotion ? 'none' : '700'}
        strokeDashoffset={animateOnce || prefersReducedMotion ? '0' : '700'}
        style={{
          transition: prefersReducedMotion
            ? 'none'
            : 'stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Marcos 1, 2, 3 */}
      {[
        { cx: 200, label: '01', delay: '0.4s' },
        { cx: 500, label: '02', delay: '1.0s' },
        { cx: 800, label: '03', delay: '1.6s' },
      ].map((m, idx) => (
        <g
          key={idx}
          style={{
            opacity: animateOnce || prefersReducedMotion ? 1 : 0.2,
            transition: prefersReducedMotion ? 'none' : `opacity 0.6s ease ${m.delay}`,
          }}
        >
          {/* Anéis concêntricos */}
          <circle cx={m.cx} cy="120" r="32" fill="#0A0F1C" stroke="#3B82F6" strokeWidth="2" />
          <circle cx={m.cx} cy="120" r="22" fill="#111827" stroke="#22D3EE" strokeWidth="1.5" />
          <text
            x={m.cx}
            y="126"
            fill="#F5F4F0"
            fontSize="14"
            fontFamily="monospace"
            fontWeight="bold"
            textAnchor="middle"
          >
            {m.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

/* =========================================================================
   VARIANTE 7: SCURVE (Curva S que se desenha da esquerda para a direita)
   Faixa final - Desenha e termina próxima ao botão
   ========================================================================= */
function SCurveVariant({
  animateOnce,
  prefersReducedMotion,
}: {
  animateOnce: boolean
  prefersReducedMotion: boolean
}) {
  return (
    <svg viewBox="0 0 1200 400" preserveAspectRatio="none" className="w-full h-full">
      <defs>
        <linearGradient id="scurveArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Área sob a curva */}
      <path
        d="M 50 360 C 350 360, 500 320, 700 160 C 900 30, 1050 40, 1150 40 L 1150 360 Z"
        fill="url(#scurveArea)"
      />

      {/* Curva S principal */}
      <path
        d="M 50 360 C 350 360, 500 320, 700 160 C 900 30, 1050 40, 1150 40"
        fill="none"
        stroke="#22D3EE"
        strokeWidth="3.5"
        strokeDasharray={prefersReducedMotion ? 'none' : '1500'}
        strokeDashoffset={animateOnce || prefersReducedMotion ? '0' : '1500'}
        style={{
          transition: prefersReducedMotion
            ? 'none'
            : 'stroke-dashoffset 2.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Ponto final culminando */}
      <circle cx="1150" cy="40" r="6" fill="#3B82F6" />
      <circle cx="1150" cy="40" r="14" fill="none" stroke="#22D3EE" strokeWidth="2" opacity="0.7" />
    </svg>
  )
}
