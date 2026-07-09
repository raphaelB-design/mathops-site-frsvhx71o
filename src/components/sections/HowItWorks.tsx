import { FadeIn } from '@/components/fade-in'

const steps = [
  {
    number: '01',
    title: 'Diagnóstico Analítico',
    description:
      'Mapeamento rigoroso e exaustivo das variáveis. Coletamos e estruturamos os dados que compõem o cenário, isolando fatos de ruídos e identificando os pontos críticos.',
  },
  {
    number: '02',
    title: 'Modelagem Estratégica',
    description:
      'Desenvolvimento de teses baseadas em premissas sólidas e lógica inquestionável. Estruturamos os argumentos de forma sistemática para prever cenários e desenhar defesas.',
  },
  {
    number: '03',
    title: 'Execução Precisa',
    description:
      'Implementação da estratégia com precisão impecável. Cada movimento é calculado e executado no momento exato para maximizar a assertividade e garantir o resultado.',
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 px-6 md:px-12 w-full bg-background relative overflow-hidden">
      <div className="max-w-4xl mx-auto w-full relative z-10">
        <FadeIn>
          <div className="mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
              Nosso Processo
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
              A Engenharia do Resultado
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <FadeIn key={step.number} delay={index * 100}>
              <div className="flex flex-col gap-4 relative h-full">
                <div className="font-mono text-5xl text-white/10 font-bold mb-2">{step.number}</div>
                <h3 className="font-display text-xl text-white font-bold">{step.title}</h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-8 w-12 h-[1px] bg-white/10" />
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
