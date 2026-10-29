import { FadeIn } from '@/components/fade-in'
import { SectionBackdrop } from '@/components/SectionBackdrop'

const pills = [
  'DMAIC · Lean Six Sigma',
  'Dashboards Gerenciais',
  'Controle Estatístico de Processo',
  'Mapeamento BPMN',
  'Earned Value (EVM)',
  'Auditoria de Indicadores',
  'Gestão de Riscos · COSO',
]

export function ValueStatement() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 px-6 md:px-12 w-full bg-[#0F1626] border-y border-[#1E293B] overflow-hidden"
    >
      {/* 2.3 ValueStatement: "divergence" */}
      <SectionBackdrop variant="divergence" opacityClass="opacity-[0.15]" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <FadeIn>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
              Empresas não quebram por falta de esforço. Quebram por decisões que pareciam certas e
              nunca foram testadas com dados.
            </h2>
          </FadeIn>

          <div className="flex flex-col gap-8">
            <FadeIn delay={200}>
              <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed">
                <strong className="text-white font-medium">MathOps Strategy</strong>&nbsp;nasce do
                encontro entre rigor matemático e operação real. Onde antes havia opinião,
                instalamos evidência: auditável, replicável e pronta para acompanhar o crescimento
                da sua empresa.
              </p>
            </FadeIn>
            <FadeIn delay={400}>
              <div className="flex flex-wrap gap-3 mt-4">
                {pills.map((pill, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 border border-[#1E293B] bg-[#111827]/70 backdrop-blur-sm rounded-md font-mono text-xs uppercase tracking-wider text-[#94A3B8] hover:border-accent hover:text-white hover:shadow-[0_0_12px_rgba(59,130,246,0.3)] transition-all cursor-default"
                  >
                    {pill}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
