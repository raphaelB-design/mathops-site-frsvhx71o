import { FadeIn } from '@/components/fade-in'

const steps = [
  {
    letter: 'D',
    name: 'Define',
    desc: 'Mapeamento estratégico do problema, definição de escopo (Project Charter) e alinhamento de KPIs vitais para o negócio.',
  },
  {
    letter: 'M',
    name: 'Measure',
    desc: 'Coleta cirúrgica de dados brutos, validação de sistemas de medição e estabelecimento de baselines (As-Is).',
  },
  {
    letter: 'A',
    name: 'Analyze',
    desc: 'Aplicação de inferência estatística para identificar a causa-raiz (root cause) da ineficiência ou da variabilidade.',
  },
  {
    letter: 'I',
    name: 'Implement',
    desc: 'Desenvolvimento e injeção da solução matemática/sistêmica no ambiente de produção com testes A/B.',
  },
  {
    letter: 'C',
    name: 'Control',
    desc: 'Criação de Dashboards, rotinas automatizadas e CEP (Controle Estatístico de Processo) para garantir sustentação.',
  },
]

export function Methodology() {
  return (
    <section id="methodology" className="py-24 md:py-32 px-6 md:px-12 w-full bg-white/5">
      <div className="max-w-4xl mx-auto w-full">
        <FadeIn>
          <div className="mb-20 text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
              Ciclo de Execução
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Metodologia DMAIC</h2>
            <p className="font-body text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
              Adaptamos o principal framework de engenharia de qualidade industrial para o
              ecossistema de dados corporativos.
            </p>
          </div>
        </FadeIn>

        <div className="relative">
          {/* Vertical Line precisely positioned 1.1rem (approx 18px from center of a 36px icon if container is absolute left-0) */}
          <div className="absolute top-0 bottom-0 left-[1.125rem] w-px bg-white/10 hidden md:block" />

          <div className="flex flex-col gap-12 relative z-10">
            {steps.map((step, idx) => (
              <FadeIn key={step.letter} delay={idx * 150}>
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start group">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-background border border-accent text-accent font-display font-bold text-lg flex-shrink-0 group-hover:bg-accent group-hover:text-white transition-colors relative md:ml-0">
                    {step.letter}
                  </div>
                  <div className="flex-1 bg-white/[0.03] border border-white/5 p-6 md:p-8 rounded-lg hover:border-white/20 transition-colors">
                    <h3 className="font-display text-2xl font-bold mb-3">{step.name}</h3>
                    <p className="font-body text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
