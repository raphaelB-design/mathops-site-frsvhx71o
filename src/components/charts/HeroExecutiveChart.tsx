import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

const executiveTrendData = [
  { month: 'M01', valor: 78 },
  { month: 'M02', valor: 81 },
  { month: 'M03', valor: 80 },
  { month: 'M04', valor: 85 },
  { month: 'M05', valor: 84 },
  { month: 'M06', valor: 89 },
  { month: 'M07', valor: 91 },
  { month: 'M08', valor: 90 },
  { month: 'M09', valor: 94 },
  { month: 'M10', valor: 95 },
  { month: 'M11', valor: 97 },
  { month: 'M12', valor: 98 },
]

export function HeroExecutiveChart() {
  return (
    <div
      className="relative w-full bg-black/60 border border-white/10 rounded-xl p-5 md:p-6 backdrop-blur-xl shadow-2xl"
      role="region"
      aria-label="Painel executivo com KPIs de prazo, custo e qualidade e linha de tendência histórica de 12 meses"
    >
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 block">
            Painel Executivo C-Level
          </span>
          <h4 className="font-display text-base font-bold text-white">
            Performance Operacional Consolidada
          </h4>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-sm bg-accent/20 border border-accent/40 text-accent font-semibold">
          Dados ilustrativos
        </span>
      </div>

      {/* 3 KPIs */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="p-3 bg-white/[0.03] border border-white/10 rounded-sm">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block">
            Prazo
          </span>
          <span className="font-display text-xl sm:text-2xl font-bold text-white">96,4%</span>
          <span className="font-mono text-[9px] text-emerald-400 block mt-0.5">+4.2 p.p.</span>
        </div>
        <div className="p-3 bg-white/[0.03] border border-white/10 rounded-sm">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block">
            Custo
          </span>
          <span className="font-display text-xl sm:text-2xl font-bold text-white">98,1%</span>
          <span className="font-mono text-[9px] text-emerald-400 block mt-0.5">+2.8 p.p.</span>
        </div>
        <div className="p-3 bg-white/[0.03] border border-white/10 rounded-sm">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block">
            Qualidade
          </span>
          <span className="font-display text-xl sm:text-2xl font-bold text-white">99,3%</span>
          <span className="font-mono text-[9px] text-emerald-400 block mt-0.5">+1.5 p.p.</span>
        </div>
      </div>

      {/* 12-month Trend Line */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Evolução de Eficiência Global (12 meses)
          </span>
          <span className="font-mono text-[10px] text-accent font-medium">Meta: 95%</span>
        </div>
        <div className="h-40 w-full" aria-hidden="true">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={executiveTrendData}
              margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
              <XAxis dataKey="month" stroke="#ffffff50" fontSize={10} tickLine={false} />
              <YAxis
                domain={[70, 100]}
                stroke="#ffffff50"
                fontSize={10}
                tickLine={false}
                unit="%"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0a0a0a',
                  borderColor: 'rgba(255,255,255,0.15)',
                  borderRadius: '4px',
                  fontSize: '11px',
                  color: '#fff',
                }}
                formatter={(val: any) => [`${val}%`, 'Índice']}
                labelStyle={{ color: '#888' }}
              />
              <Line
                type="monotone"
                dataKey="valor"
                stroke="#2d5fa8"
                strokeWidth={2.5}
                dot={{ r: 2.5, fill: '#2d5fa8', strokeWidth: 1 }}
                activeDot={{ r: 5, fill: '#60a5fa' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
