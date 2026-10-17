import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  ReferenceLine,
} from 'recharts'

const auditData = [
  {
    metrica: 'Área Comercial',
    indice: 118.4,
    cor: '#64748b',
    desc: 'Base CRM sem filtro de competência',
  },
  {
    metrica: 'Controladoria',
    indice: 96.2,
    cor: '#64748b',
    desc: 'ERP com critério de faturamento emitido',
  },
  {
    metrica: 'Valor Reconciliado',
    indice: 104.0,
    cor: '#2d5fa8',
    desc: 'Memória auditada com regra única',
  },
]

export function AuditReconciliationChart() {
  return (
    <div
      className="relative w-full bg-black/60 border border-white/10 rounded-xl p-5 md:p-8 backdrop-blur-xl shadow-2xl"
      role="region"
      aria-label="Gráfico de reconciliação de cálculo comparando valores divergentes de duas áreas corporativas e o valor reconciliado final em índice base 100"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 mb-6 gap-3">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 block">
            Auditoria & Governança de Cálculos
          </span>
          <h4 className="font-display text-lg md:text-xl font-bold text-white">
            Reconciliação de Discrepância Entre Áreas
          </h4>
          <p className="font-body text-xs text-muted-foreground mt-1">
            Normalização de indicadores divergentes para uma memória de cálculo única auditável
            (Base 100)
          </p>
        </div>
        <span className="self-start sm:self-center font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-sm bg-accent/20 border border-accent/40 text-accent font-semibold shrink-0">
          Dados ilustrativos
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="p-3 bg-white/[0.03] border border-white/10 rounded-sm">
          <span className="font-mono text-[10px] uppercase text-muted-foreground block">
            Divergência Inicial
          </span>
          <span className="font-display text-xl font-bold text-amber-400">22,2 pts</span>
          <span className="font-mono text-[9px] text-muted-foreground block mt-0.5">
            Comercial (118.4) vs Controladoria (96.2)
          </span>
        </div>
        <div className="p-3 bg-accent/10 border border-accent/30 rounded-sm">
          <span className="font-mono text-[10px] uppercase text-accent font-bold block">
            Valor Reconciliado
          </span>
          <span className="font-display text-xl font-bold text-white">104,0</span>
          <span className="font-mono text-[9px] text-accent block mt-0.5">
            Memória auditada 100% aderente
          </span>
        </div>
        <div className="p-3 bg-white/[0.03] border border-white/10 rounded-sm">
          <span className="font-mono text-[10px] uppercase text-muted-foreground block">
            Discrepância Residual
          </span>
          <span className="font-display text-xl font-bold text-emerald-400">0,0%</span>
          <span className="font-mono text-[9px] text-muted-foreground block mt-0.5">
            Base normalizada sem duplicidade
          </span>
        </div>
      </div>

      <div className="h-64 sm:h-72 w-full" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={auditData} margin={{ top: 20, right: 15, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
            <XAxis dataKey="metrica" stroke="#ffffff70" fontSize={12} tickLine={false} />
            <YAxis domain={[80, 130]} stroke="#ffffff50" fontSize={11} tickLine={false} />
            <ReferenceLine
              y={100}
              stroke="#ffffff30"
              strokeDasharray="3 3"
              label={{
                value: 'Índice Base (100.0)',
                fill: '#ffffff60',
                fontSize: 10,
                position: 'insideTopLeft',
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0a0a0a',
                borderColor: 'rgba(255,255,255,0.15)',
                borderRadius: '4px',
                fontSize: '12px',
                color: '#fff',
              }}
              formatter={(val: any, _name: any, item: any) => [
                `Índice: ${val} (${item.payload.desc})`,
                'Resultado',
              ]}
            />
            <Bar dataKey="indice" radius={[4, 4, 0, 0]}>
              {auditData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.cor} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="font-mono text-[10px] text-muted-foreground mt-4 text-center">
        A auditoria documenta o dicionário de variáveis e elimina duplas contagens entre
        departamentos.
      </p>
    </div>
  )
}
