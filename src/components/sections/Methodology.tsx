import { FadeIn } from '@/components/fade-in'

const steps = [
  {
    phase: '1',
    title: 'Imersão & Mapeamento',
    desc: 'Diagnóstico da infraestrutura de dados atual, mapeamento de processos (As-Is) e definição dos KPIs estratégicos do negócio.',
  },
  {
    phase: '2',
    title: 'Modelagem Matemática',
    desc: 'Desenvolvimento dos algoritmos, equações de rentabilidade e estruturação das regras de negócio que guiarão as decisões.',
  },
  {
    phase: '3',
    title: 'Engenharia de Dados & BI',
    desc: 'Construção da arquitetura, pipelines, integração de sistemas e design das interfaces analíticas de visualização (Dashboards).',
  },
  {
    phase: '4',
    title: 'Automação & Escalabilidade',
    desc: 'Implantação de rotinas automatizadas, governança de dados, documentação técnica e capacitação da equipe interna.',
  },
]

export function Methodology() {
  return (
    <section id="methodology" className="py-[120px] px-6 md:px-12 w-full bg-white text-black">
      <div className="max-w-7xl mx-auto w-full">
        <FadeIn>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-24">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-black/60 mb-6 font-bold">
                Framework · MathOps
              </p>
              <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tight max-w-2xl leading-[0.9]">
                Nossa Metodologia
              </h2>
            </div>
            <p className="font-body text-xl text-black/70 max-w-sm mt-8 lg:mt-0 leading-relaxed">
              Uma abordagem sistemática, escalável e cientificamente comprovada para transformação
              de dados.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {steps.map((step, index) => (
            <FadeIn key={step.phase} delay={index * 150}>
              <div className="relative h-full flex flex-col group">
                <div className="mb-6 flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-black text-white font-mono text-xl rounded-full group-hover:scale-110 transition-transform duration-500">
                    {step.phase}
                  </div>
                  <div className="h-px bg-black/10 flex-1 ml-4" />
                </div>
                <h3 className="font-display text-3xl mb-4 leading-tight">{step.title}</h3>
                <p className="font-body text-black/70 leading-relaxed">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
