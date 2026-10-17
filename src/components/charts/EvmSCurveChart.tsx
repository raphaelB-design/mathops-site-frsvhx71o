import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts'

const evmData = [
  { mes: 'M01', planejado: 5, realizado: 4 },
  { mes: 'M02', planejado: 12, realizado: 10 },
  { mes: 'M03', planejado: 22, realizado: 18 },
  { mes: 'M04', planejado: 34, realizado: 29 },
  { mes: 'M05', planejado: 48, realizado: 44 },
  { mes: 'M06', planejado: 62, realizado: 59 },
  { mes: 'M07', planejado: 75, realizado: 74 },
  { mes: 'M08', planejado: 85, realizado: 84 },
  { mes: 'M09', planejado: 92, realizado: 91 },
  { mes: 'M10', planejado: 96, realizado: 95 },
  { mes: 'M11', planejado: 99, realizado: 98 },
  { mes: 'M12', planejado: 100, realizado: 100 },
]

export function EvmSCurveChart() {
  return (
    <div
      className="relative w-full bg-[#111827]/80 border border-[#1E293B] rounded-xl p-5 md:p-8 backdrop-blur-xl shadow-2xl"
      role="region"
      aria-label="Curva S de Earned Value Management comparando avanço acumulado planejado e realizado em percentual ao longo de 12 períodos"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#1E293B] mb-6 gap-3">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#94A3B8] block">
            EVM — Earned Value Management
          </span>
          <h4 className="font-display text-lg md:text-xl font-bold text-[#F5F4F0]">
            Curva S de Avanço Físico-Financeiro
          </h4>
          <p className="font-body text-xs text-[#94A3B8] mt-1">
            Comparativo de avanço acumulado planejado vs. realizado em 12 períodos operacionais
          </p>
        </div>
        <span className="self-start sm:self-center font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-sm bg-[#3B82F6]/15 border border-[#3B82F6]/40 text-[#22D3EE] font-semibold shrink-0">
          Dados ilustrativos
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="p-3 bg-[#0A0F1C]/60 border border-[#1E293B] rounded-sm">
          <span className="font-mono text-[10px] uppercase text-[#94A3B8] block">
            Avanço Realizado
          </span>
          <span className="font-display text-xl font-bold text-[#F5F4F0]">100%</span>
        </div>
        <div className="p-3 bg-[#0A0F1C]/60 border border-[#1E293B] rounded-sm">
          <span className="font-mono text-[10px] uppercase text-[#94A3B8] block">SPI (Prazo)</span>
          <span className="font-display text-xl font-bold text-[#22D3EE]">1,01</span>
        </div>
        <div className="p-3 bg-[#0A0F1C]/60 border border-[#1E293B] rounded-sm">
          <span className="font-mono text-[10px] uppercase text-[#94A3B8] block">CPI (Custo)</span>
          <span className="font-display text-xl font-bold text-[#22D3EE]">1,03</span>
        </div>
        <div className="p-3 bg-[#0A0F1C]/60 border border-[#1E293B] rounded-sm">
          <span className="font-mono text-[10px] uppercase text-[#94A3B8] block">
            Variação Final
          </span>
          <span className="font-display text-xl font-bold text-[#F5F4F0]">0,0 p.p.</span>
        </div>
      </div>

      <div className="h-64 sm:h-72 w-full" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={evmData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
            <defs>
              {/* 1.8 Áreas com degradê vertical (30% -> 0% de opacidade) */}
              <linearGradient id="evmDeviation" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
            <XAxis dataKey="mes" stroke="#94A3B8" fontSize={11} tickLine={false} />
            <YAxis domain={[0, 100]} stroke="#94A3B8" fontSize={11} tickLine={false} unit="%" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0A0F1C',
                borderColor: '#1E293B',
                borderRadius: '6px',
                fontSize: '12px',
                color: '#F5F4F0',
              }}
              formatter={(val: any, name: any) => [
                `${val}%`,
                name === 'planejado' ? 'Planejado' : 'Realizado',
              ]}
            />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: '12px', fontSize: '11px', color: '#94A3B8' }}
            />
            <Area
              type="monotone"
              dataKey="planejado"
              name="Planejado"
              stroke="#22D3EE"
              strokeDasharray="4 4"
              strokeWidth={2}
              fill="url(#evmDeviation)"
            />
            <Line
              type="monotone"
              dataKey="realizado"
              name="Realizado"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ r: 3, fill: '#3B82F6' }}
              activeDot={{ r: 6, fill: '#22D3EE' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="font-mono text-[10px] text-muted-foreground mt-4 text-center">
        Área sombreada destaca o desvio transitório recuperado entre períodos M03 e M07.
      </p>
    </div>
  )
}
