import { FadeIn } from '@/components/fade-in'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Diagnóstico Estratégico',
    subtitle: '2 semanas',
    description:
      'Em 2 semanas mapeamos processos e indicadores e entregamos um roadmap com escopo e KPIs definidos. Se não houver fit, devolvemos 100% do valor.',
    link: null as string | null,
    linkLabel: null as string | null,
  },
  {
    number: '02',
    title: 'Implementação',
    subtitle: 'Valor do diagnóstico abatido',
    description:
      'Executamos a camada de solução definida no roadmap: mapeamento de processos, painéis executivos ou modelos estatísticos. O valor do diagnóstico é abatido deste escopo.',
    link: '/servicos/diagnostico-e-visibilidade',
    linkLabel: 'Ver Visibilidade Operacional',
  },
  {
    number: '03',
    title: 'Acompanhamento',
    subtitle: 'Autonomia e medição',
    description:
      'Medimos os resultados contra os mesmos KPIs definidos no diagnóstico e entregamos toda a documentação para sua equipe operar com autonomia.',
    link: null as string | null,
    linkLabel: null as string | null,
  },
]

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="py-24 md:py-32 px-6 md:px-12 w-full bg-white/5">
      <div className="max-w-5xl mx-auto w-full">
        <FadeIn>
          <div className="mb-16 text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
              Como Funciona
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Do diagnóstico à visibilidade
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Um caminho claro e sem ambiguidades. Cada etapa com escopo definido e resultado
              mensurável.
            </p>
          </div>
        </FadeIn>

        <div className="flex flex-col gap-0">
          {steps.map((step, index) => (
            <FadeIn key={step.number} delay={index * 150}>
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 group">
                <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-2 shrink-0">
                  <span className="font-display text-6xl md:text-7xl font-bold text-white/10 group-hover:text-accent/30 transition-colors duration-500">
                    {step.number}
                  </span>
                </div>

                <div className="flex-1 pb-12 border-b border-white/10 last:border-b-0">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                    {step.title}
                  </h3>

                  <p className="font-body text-base text-muted-foreground leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                  {step.link && step.linkLabel && (
                    <Link
                      to={step.link}
                      className="inline-flex items-center gap-2 mt-4 font-mono text-xs uppercase tracking-widest text-white/50 hover:text-accent transition-colors group/link"
                    >
                      {step.linkLabel}
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
