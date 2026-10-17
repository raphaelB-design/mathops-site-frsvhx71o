import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts'

// 25 pontos, média 50.0, UCL 62.0, LCL 38.0. Ponto 18 = 65.5 (fora do limite superior, vermelho)
const cepData = [
  { p: '1', valor: 49.2, anomaly: false },
  { p: '2', valor: 51.5, anomaly: false },
  { p: '3', valor: 48.0, anomaly: false },
  { p: '4', valor: 52.8, anomaly: false },
  { p: '5', valor: 50.1, anomaly: false },
  { p: '6', valor: 47.4, anomaly: false },
  { p: '7', valor: 53.2, anomaly: false },
  { p: '8', valor: 49.8, anomaly: false },
  { p: '9', valor: 51.0, anomaly: false },
  { p: '10', valor: 48.6, anomaly: false },
  { p: '11', valor: 52.1, anomaly: false },
  { p: '12', valor: 50.4, anomaly: false },
  { p: '13', valor: 47.9, anomaly: false },
  { p: '14', valor: 54.0, anomaly: false },
  { p: '15', valor: 51.2, anomaly: false },
  { p: '16', valor: 49.0, anomaly: false },
  { p: '17', valor: 53.5, anomaly: false },
  { p: '18', valor: 65.5, anomaly: true }, // Ponto fora do limite superior (> 62.0)
  { p: '19', valor: 52.4, anomaly: false },
  { p: '20', valor: 48.8, anomaly: false },
  { p: '21', valor: 50.6, anomaly: false },
  { p: '22', valor: 49.5, anomaly: false },
  { p: '23', valor: 51.8, anomaly: false },
  { p: '24', valor: 48.2, anomaly: false },
  { p: '25', valor: 50.0, anomaly: false },
]

export function CepControlChart() {
  const UCL = 62.0
  const CL = 50.0
  const LCL = 38.0

  return (
    <div
      className="relative w-full bg-[#111827]/80 border border-[#1E293B] rounded-xl p-5 md:p-8 backdrop-blur-xl shadow-2xl"
      role="region"
      aria-label="Carta de controle estatístico de processo com 25 observações, limites superior e inferior, e 1 anomalia destacada"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#1E293B] mb-6 gap-3">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#94A3B8] block">
            CEP — Controle Estatístico de Processo
          </span>
          <h4 className="font-display text-lg md:text-xl font-bold text-[#F5F4F0]">
            Carta de Controle Shewhart (X̄)
          </h4>
          <p className="font-body text-xs text-[#94A3B8] mt-1">
            25 amostras sequenciais com limites de controle estatístico (±3σ) e detecção de causa
            especial
          </p>
        </div>
        <span className="self-start sm:self-center font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-sm bg-[#3B82F6]/15 border border-[#3B82F6]/40 text-[#22D3EE] font-semibold shrink-0">
          Dados ilustrativos
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="p-3 bg-[#0A0F1C]/60 border border-[#1E293B] rounded-sm">
          <span className="font-mono text-[10px] uppercase text-[#94A3B8] block">LCS (+3σ)</span>
          <span className="font-display text-lg font-bold text-red-400">62,0</span>
        </div>
        <div className="p-3 bg-[#0A0F1C]/60 border border-[#1E293B] rounded-sm">
          <span className="font-mono text-[10px] uppercase text-[#94A3B8] block">
            Linha Média (CL)
          </span>
          <span className="font-display text-lg font-bold text-[#F5F4F0]">50,0</span>
        </div>
        <div className="p-3 bg-[#0A0F1C]/60 border border-[#1E293B] rounded-sm">
          <span className="font-mono text-[10px] uppercase text-[#94A3B8] block">LCI (-3σ)</span>
          <span className="font-display text-lg font-bold text-red-400">38,0</span>
        </div>
        <div className="p-3 bg-[#0A0F1C]/60 border border-red-500/30 bg-red-500/5 rounded-sm">
          <span className="font-mono text-[10px] uppercase text-red-300 block">
            Anomalias Detectadas
          </span>
          <span className="font-display text-lg font-bold text-red-400">1 (Amostra #18)</span>
        </div>
      </div>

      <div className="h-64 sm:h-72 w-full" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={cepData} margin={{ top: 15, right: 15, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
            <XAxis dataKey="p" stroke="#94A3B8" fontSize={11} tickLine={false} />
            <YAxis domain={[35, 70]} stroke="#94A3B8" fontSize={11} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0A0F1C',
                borderColor: '#1E293B',
                borderRadius: '6px',
                fontSize: '12px',
                color: '#F5F4F0',
              }}
              formatter={(val: any, _name: any, item: any) => [
                `${val} ${item.payload.anomaly ? '(Fora do limite!)' : ''}`,
                'Valor Amostral',
              ]}
              labelFormatter={(label) => `Amostra #${label}`}
            />
            {/* Reference Lines */}
            <ReferenceLine
              y={UCL}
              stroke="#ef4444"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{
                value: 'LCS (62.0)',
                fill: '#ef4444',
                fontSize: 10,
                position: 'insideTopRight',
              }}
            />
            <ReferenceLine
              y={CL}
              stroke="#22D3EE"
              strokeDasharray="2 2"
              strokeWidth={1.5}
              label={{
                value: 'Média (50.0)',
                fill: '#22D3EE',
                fontSize: 10,
                position: 'insideTopRight',
              }}
            />
            <ReferenceLine
              y={LCL}
              stroke="#ef4444"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{
                value: 'LCI (38.0)',
                fill: '#ef4444',
                fontSize: 10,
                position: 'insideBottomRight',
              }}
            />
            <Line
              type="linear"
              dataKey="valor"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={(props: any) => {
                const { cx, cy, payload } = props
                if (payload.anomaly) {
                  return (
                    <g key={`dot-${payload.p}`}>
                      <circle cx={cx} cy={cy} r={6} fill="#ef4444" stroke="#fff" strokeWidth={2} />
                      <circle
                        cx={cx}
                        cy={cy}
                        r={10}
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth={1.5}
                        opacity={0.7}
                      />
                    </g>
                  )
                }
                return <circle key={`dot-${payload.p}`} cx={cx} cy={cy} r={2.5} fill="#3B82F6" />
              }}
              activeDot={{ r: 5, fill: '#22D3EE' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-[#1E293B] font-mono text-[10px] text-[#94A3B8]">
        <span>
          Legenda: Linha azul = medições de processo · Linhas pontilhadas = limites estatísticos
        </span>
        <span className="text-red-400 font-semibold">
          Ponto #18: Desvio sinalizado para contenção imediata
        </span>
      </div>
    </div>
  )
}
