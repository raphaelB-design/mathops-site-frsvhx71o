import { useState } from 'react'

interface RiskItem {
  id: string
  code: string
  name: string
  category: string
  probability: number // 1 to 5 (Y axis: 5 top, 1 bottom)
  impact: number // 1 to 5 (X axis: 1 left, 5 right)
  status: string
  mitigation: string
}

const risksData: RiskItem[] = [
  {
    id: 'r1',
    code: 'R1',
    name: 'Divergência nas memórias contábeis de fechamento',
    category: 'Financeiro',
    probability: 2,
    impact: 4,
    status: 'Controlado',
    mitigation: 'Reconciliação automatizada e dupla checagem',
  },
  {
    id: 'r2',
    code: 'R2',
    name: 'Indisponibilidade do ERP por falha de infraestrutura',
    category: 'Operacional',
    probability: 2,
    impact: 5,
    status: 'Em mitigação',
    mitigation: 'Redundância em nuvem e plano de continuidade',
  },
  {
    id: 'r3',
    code: 'R3',
    name: 'Não conformidade com exigências regulatórias setoriais',
    category: 'Compliance',
    probability: 3,
    impact: 5,
    status: 'Atenção Crítica',
    mitigation: 'Auditoria de conformidade periódica e trilha de evidências',
  },
  {
    id: 'r4',
    code: 'R4',
    name: 'Gargalo operacional por dependência de pessoa-chave',
    category: 'Processos',
    probability: 4,
    impact: 3,
    status: 'Em mitigação',
    mitigation: 'Documentação BPMN e capacitação cruzada de equipes',
  },
  {
    id: 'r5',
    code: 'R5',
    name: 'Atraso em compras críticas de suprimentos',
    category: 'Suprimentos',
    probability: 3,
    impact: 3,
    status: 'Monitorado',
    mitigation: 'Acordos SLA com múltiplos fornecedores homologados',
  },
  {
    id: 'r6',
    code: 'R6',
    name: 'Vazamento ou perda de integridade de dados operacionais',
    category: 'Segurança',
    probability: 1,
    impact: 5,
    status: 'Controlado',
    mitigation: 'Controles de acesso restrito, criptografia e logs auditáveis',
  },
  {
    id: 'r7',
    code: 'R7',
    name: 'Oscilação imprevista em custos de transporte',
    category: 'Estratégico',
    probability: 4,
    impact: 2,
    status: 'Monitorado',
    mitigation: 'Revisão periódica de contratos e monitoramento de indicadores de custo',
  },
]

// 5x5 matrix cell background colors:
// Score = probability * impact (1 to 25)
// 1-4: Low (green), 5-9: Moderate (yellow/lime), 10-14: High (amber/orange), 15-25: Extreme (red)
function getCellColorClass(prob: number, imp: number): string {
  const score = prob * imp
  if (score >= 15) {
    return 'bg-red-500/25 border-red-500/50 text-red-300 hover:bg-red-500/35'
  }
  if (score >= 10) {
    return 'bg-amber-500/25 border-amber-500/50 text-amber-300 hover:bg-amber-500/35'
  }
  if (score >= 5) {
    return 'bg-[#3B82F6]/20 border-[#3B82F6]/40 text-[#22D3EE] hover:bg-[#3B82F6]/30'
  }
  return 'bg-[#22D3EE]/15 border-[#22D3EE]/30 text-[#22D3EE] hover:bg-[#22D3EE]/25'
}

export function RiskHeatMapChart() {
  const [selectedRisk, setSelectedRisk] = useState<RiskItem | null>(risksData[2])

  const probabilityLabels = [
    { value: 5, label: '5 - Muito Alta' },
    { value: 4, label: '4 - Alta' },
    { value: 3, label: '3 - Média' },
    { value: 2, label: '2 - Baixa' },
    { value: 1, label: '1 - Muito Baixa' },
  ]

  const impactLabels = [
    { value: 1, label: '1 · Mínimo' },
    { value: 2, label: '2 · Menor' },
    { value: 3, label: '3 · Moderado' },
    { value: 4, label: '4 · Maior' },
    { value: 5, label: '5 · Crítico' },
  ]

  return (
    <div
      className="relative w-full bg-[#111827]/80 border border-[#1E293B] rounded-xl p-5 md:p-8 backdrop-blur-xl shadow-2xl"
      role="region"
      aria-label="Matriz de calor de riscos 5x5 com probabilidade e impacto demonstrando posicionamento de riscos mapeados"
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#1E293B] mb-6 gap-3">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#94A3B8] block">
            Governança · Gestão de Riscos (COSO)
          </span>
          <h4 className="font-display text-lg md:text-xl font-bold text-[#F5F4F0]">
            Matriz de Probabilidade × Impacto (5×5)
          </h4>
          <p className="font-body text-xs text-[#94A3B8] mt-1">
            Distribuição e priorização de riscos operacionais e estratégicos conforme apetite a
            risco
          </p>
        </div>
        <span className="self-start sm:self-center font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-sm bg-[#3B82F6]/15 border border-[#3B82F6]/40 text-[#22D3EE] font-semibold shrink-0">
          Dados ilustrativos
        </span>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="p-3 bg-[#0A0F1C]/60 border border-[#1E293B] rounded-sm">
          <span className="font-mono text-[10px] uppercase text-[#94A3B8] block">
            Riscos Mapeados
          </span>
          <span className="font-display text-xl font-bold text-[#F5F4F0]">{risksData.length}</span>
        </div>
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-sm">
          <span className="font-mono text-[10px] uppercase text-red-300 block">
            Risco Crítico / Extremo
          </span>
          <span className="font-display text-xl font-bold text-red-400">
            {risksData.filter((r) => r.probability * r.impact >= 15).length} (Ação Imediata)
          </span>
        </div>
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-sm">
          <span className="font-mono text-[10px] uppercase text-amber-300 block">
            Risco Alto / Moderado
          </span>
          <span className="font-display text-xl font-bold text-amber-400">
            {
              risksData.filter((r) => {
                const score = r.probability * r.impact
                return score >= 5 && score < 15
              }).length
            }
          </span>
        </div>
        <div className="p-3 bg-[#22D3EE]/10 border border-[#22D3EE]/30 rounded-sm">
          <span className="font-mono text-[10px] uppercase text-[#22D3EE] block">
            Risco Baixo / Tolerável
          </span>
          <span className="font-display text-xl font-bold text-[#22D3EE]">
            {risksData.filter((r) => r.probability * r.impact < 5).length}
          </span>
        </div>
      </div>

      {/* Heatmap Matrix & Risk Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Heatmap Matrix 5x5 */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
              Eixo Vertical: Probabilidade (1 a 5)
            </span>
            <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
              <span className="inline-block w-2.5 h-2.5 rounded-xs bg-emerald-500/40 border border-emerald-500/60" />
              <span>Baixo</span>
              <span className="inline-block w-2.5 h-2.5 rounded-xs bg-yellow-500/40 border border-yellow-500/60" />
              <span>Médio</span>
              <span className="inline-block w-2.5 h-2.5 rounded-xs bg-amber-500/40 border border-amber-500/60" />
              <span>Alto</span>
              <span className="inline-block w-2.5 h-2.5 rounded-xs bg-red-500/50 border border-red-500/70" />
              <span>Crítico</span>
            </div>
          </div>

          <div className="border border-white/15 bg-zinc-950 p-2 sm:p-4 rounded-lg">
            {/* Rows from Prob 5 down to Prob 1 */}
            <div className="space-y-1.5 sm:space-y-2">
              {probabilityLabels.map((prob) => (
                <div key={prob.value} className="flex items-center gap-2">
                  <div className="w-16 sm:w-24 shrink-0 font-mono text-[10px] sm:text-[11px] text-zinc-400 text-right pr-2">
                    {prob.label}
                  </div>
                  <div className="grid grid-cols-5 gap-1.5 sm:gap-2 flex-1">
                    {[1, 2, 3, 4, 5].map((imp) => {
                      const risksInCell = risksData.filter(
                        (r) => r.probability === prob.value && r.impact === imp,
                      )
                      const cellColor = getCellColorClass(prob.value, imp)

                      return (
                        <div
                          key={`cell-${prob.value}-${imp}`}
                          className={`relative h-12 sm:h-14 border rounded-sm p-1 flex flex-wrap items-center justify-center gap-1 transition-all ${cellColor}`}
                        >
                          {risksInCell.map((risk) => {
                            const isSelected = selectedRisk?.id === risk.id
                            return (
                              <button
                                key={risk.id}
                                onClick={() => setSelectedRisk(risk)}
                                aria-label={`${risk.code}: ${risk.name}`}
                                className={`font-mono text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded shadow-md transition-transform ${
                                  isSelected
                                    ? 'bg-white text-black ring-2 ring-accent scale-110'
                                    : 'bg-black/80 text-white border border-white/30 hover:scale-105'
                                }`}
                              >
                                {risk.code}
                              </button>
                            )
                          })}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Impact Labels */}
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10">
              <div className="w-16 sm:w-24 shrink-0 font-mono text-[10px] text-zinc-500 text-right pr-2">
                Impacto →
              </div>
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2 flex-1">
                {impactLabels.map((imp) => (
                  <div
                    key={imp.value}
                    className="font-mono text-[9px] sm:text-[11px] text-center text-zinc-400 truncate"
                  >
                    {imp.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Risk Card Detail */}
        <div className="lg:col-span-4 flex flex-col h-full bg-white/[0.03] border border-white/15 p-5 rounded-lg">
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold mb-2">
            Detalhamento do Risco Selecionado
          </span>

          {selectedRisk ? (
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-sm font-bold px-2 py-0.5 bg-accent/20 border border-accent/40 text-accent rounded-sm">
                    {selectedRisk.code}
                  </span>
                  <span
                    className={`font-mono text-[10px] px-2 py-0.5 rounded-xs border uppercase tracking-wider ${
                      selectedRisk.probability * selectedRisk.impact >= 15
                        ? 'bg-red-500/20 text-red-300 border-red-500/40'
                        : selectedRisk.probability * selectedRisk.impact >= 10
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    }`}
                  >
                    {selectedRisk.status}
                  </span>
                </div>

                <h5 className="font-serif text-base text-white font-medium leading-snug mb-1">
                  {selectedRisk.name}
                </h5>
                <span className="font-mono text-[10px] text-zinc-400 block mb-3">
                  Categoria: {selectedRisk.category}
                </span>

                <div className="grid grid-cols-3 gap-2 p-2.5 bg-black/40 border border-white/10 rounded-sm mb-4">
                  <div>
                    <span className="font-mono text-[9px] text-zinc-500 block uppercase">
                      Prob.
                    </span>
                    <span className="font-mono text-xs font-bold text-white">
                      {selectedRisk.probability}/5
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-zinc-500 block uppercase">
                      Impacto
                    </span>
                    <span className="font-mono text-xs font-bold text-white">
                      {selectedRisk.impact}/5
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-zinc-500 block uppercase">
                      Severidade
                    </span>
                    <span className="font-mono text-xs font-bold text-accent">
                      {selectedRisk.probability * selectedRisk.impact} / 25
                    </span>
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 block mb-1">
                    Medida de Mitigação / Controle COSO:
                  </span>
                  <p className="font-body text-xs text-zinc-300 leading-relaxed bg-black/30 p-2.5 border border-white/5 rounded-sm">
                    {selectedRisk.mitigation}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10">
                <span className="font-mono text-[10px] text-zinc-500 block">
                  Clique nos botões R1 a R7 na matriz para inspecionar cada controle associado.
                </span>
              </div>
            </div>
          ) : (
            <p className="font-body text-xs text-zinc-400 my-auto text-center">
              Selecione um risco na matriz ao lado para visualizar os detalhes e controles.
            </p>
          )}
        </div>
      </div>

      <p className="font-mono text-[10px] text-muted-foreground mt-4 text-center">
        Matriz de calor conforme metodologia MGR e estrutura COSO das três linhas de defesa.
      </p>
    </div>
  )
}
