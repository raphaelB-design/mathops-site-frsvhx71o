// Gráficos secundários do painel executivo: barras por área e gauge de capacidade.
// Dados fictícios (ilustrativos). Animam na entrada quando `animate` vira true; depois,
// com `live` ativo, oscilam suavemente em torno do valor-base. Com reduzir movimento
// mostram direto o estado final.
import { waveOffset } from '@/components/charts/executive-live'

const AREA_ADHERENCE = [
  { label: 'Operações', value: 97, amp: 1.2, period: 6.5 },
  { label: 'Finanças', value: 94, amp: 1.6, period: 8.2 },
  { label: 'Comercial', value: 91, amp: 1.0, period: 7.1 },
  { label: 'Logística', value: 88, amp: 2.0, period: 9.4 },
]

const CAPACITY_VALUE = 87
const CAPACITY_AMP = 1.0
const CAPACITY_PERIOD = 11
const CAPACITY_TARGET = 85
const GAUGE_R = 36
const GAUGE_C = 2 * Math.PI * GAUGE_R

interface ChartProps {
  animate: boolean
  reducedMotion: boolean
  live: boolean
  elapsed: number
}

export function AreaAdherenceBars({ animate, reducedMotion, live, elapsed }: ChartProps) {
  const showFinal = reducedMotion || animate
  return (
    <div className="p-4 bg-[#0A0F1C]/60 border border-[#1E293B] rounded-sm group-hover:border-accent/30 transition-colors">
      <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8] block mb-3">
        Aderência por Área (%)
      </span>
      <div className="flex flex-col gap-3">
        {AREA_ADHERENCE.map((item, i) => {
          const current = live
            ? item.value + waveOffset(elapsed, item.period, item.amp)
            : item.value
          return (
            <div key={item.label} className="flex flex-col gap-1">
              <div className="flex items-center justify-between font-mono text-[10px] text-[#94A3B8]">
                <span>{item.label}</span>
                <span className="text-[#F5F4F0]">{Math.round(current)}%</span>
              </div>
              <div className="h-1.5 w-full bg-[#1E293B] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-accent2 sweep-move-bars"
                  style={{
                    width: showFinal ? `${current.toFixed(2)}%` : '0%',
                    transition: reducedMotion
                      ? 'none'
                      : live
                        ? 'width 0.5s ease-out'
                        : `width 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${300 + i * 150}ms`,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function CapacityGauge({ animate, reducedMotion, live, elapsed }: ChartProps) {
  const showFinal = reducedMotion || animate
  const current = live
    ? CAPACITY_VALUE + waveOffset(elapsed, CAPACITY_PERIOD, CAPACITY_AMP)
    : CAPACITY_VALUE
  const offset = showFinal ? GAUGE_C * (1 - current / 100) : GAUGE_C
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
              className={reducedMotion ? undefined : 'sweep-move-gauge'}
              style={{
                transition: reducedMotion
                  ? 'none'
                  : live
                    ? 'stroke-dashoffset 0.5s ease-out'
                    : 'stroke-dashoffset 1.6s cubic-bezier(0.16, 1, 0.3, 1) 400ms',
              }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-display text-lg font-bold text-[#F5F4F0]">
            {Math.round(current)}%
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
