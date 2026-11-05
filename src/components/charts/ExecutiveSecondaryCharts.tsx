// Gráficos secundários do painel executivo: barras por área e gauge de capacidade.
// Dados fictícios (ilustrativos). Animam quando `animate` vira true; com reduzir movimento
// mostram direto o estado final.

const AREA_ADHERENCE = [
  { label: 'Operações', value: 97 },
  { label: 'Finanças', value: 94 },
  { label: 'Comercial', value: 91 },
  { label: 'Logística', value: 88 },
]

const CAPACITY_VALUE = 87
const CAPACITY_TARGET = 85
const GAUGE_R = 36
const GAUGE_C = 2 * Math.PI * GAUGE_R

interface ChartProps {
  animate: boolean
  reducedMotion: boolean
}

export function AreaAdherenceBars({ animate, reducedMotion }: ChartProps) {
  const showFinal = reducedMotion || animate
  return (
    <div className="p-4 bg-[#0A0F1C]/60 border border-[#1E293B] rounded-sm group-hover:border-accent/30 transition-colors">
      <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8] block mb-3">
        Aderência por Área (%)
      </span>
      <div className="flex flex-col gap-3">
        {AREA_ADHERENCE.map((item, i) => (
          <div key={item.label} className="flex flex-col gap-1">
            <div className="flex items-center justify-between font-mono text-[10px] text-[#94A3B8]">
              <span>{item.label}</span>
              <span className="text-[#F5F4F0]">{item.value}%</span>
            </div>
            <div className="h-1.5 w-full bg-[#1E293B] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent to-accent2"
                style={{
                  width: showFinal ? `${item.value}%` : '0%',
                  transition: reducedMotion
                    ? 'none'
                    : `width 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${300 + i * 150}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function CapacityGauge({ animate, reducedMotion }: ChartProps) {
  const showFinal = reducedMotion || animate
  const offset = showFinal ? GAUGE_C * (1 - CAPACITY_VALUE / 100) : GAUGE_C
  return (
    <div className="p-4 bg-[#0A0F1C]/60 border border-[#1E293B] rounded-sm group-hover:border-accent/30 transition-colors flex flex-col">
      <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8] block mb-3">
        Capacidade Utilizada
      </span>
      <div className="flex items-center gap-4">
        <div className="relative w-24 h-24 shrink-0" aria-hidden="true">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r={GAUGE_R} fill="none" stroke="#1E293B" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r={GAUGE_R}
              fill="none"
              stroke="#2EB8A6"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={GAUGE_C}
              strokeDashoffset={offset}
              style={{
                transition: reducedMotion
                  ? 'none'
                  : 'stroke-dashoffset 1.6s cubic-bezier(0.16, 1, 0.3, 1) 400ms',
              }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-display text-lg font-bold text-[#F5F4F0]">
            {CAPACITY_VALUE}%
          </span>
        </div>
        <div className="flex flex-col gap-1 font-mono text-[10px] text-[#94A3B8]">
          <span>Utilização média da capacidade operacional</span>
          <span className="text-accent2">Meta: {CAPACITY_TARGET}%</span>
        </div>
      </div>
    </div>
  )
}
