import { FadeIn } from '@/components/fade-in'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Diagnóstico Estratégico',
    subtitle: '2 semanas · R$ 4.500',
    description:
      'Mergulho profundo na sua operação. Identificamos gargalos, mapeamos oportunidades e entregamos um roadmap claro com KPIs definidos. O risco é todo nosso: se não houver fit, devolvemos 100% do valor.',
    link: null as string | null,
    linkLabel: null as string | null,
  },
  {
    number: '02',
    title: 'Roadmap com escopo e KPIs definidos',
    subtitle: 'Saída do diagnóstico',
    description:
      'Com base no diagnóstico, desenhamos o plano de engajamento completo. Cada etapa tem escopo, entregáveis e indicadores de sucesso acordados antes de qualquer implementação.',
    link: null as string | null,
    linkLabel: null as string | null,
  },
  {
    number: '03',
    title: 'Implementação da Visibilidade Operacional',
    subtitle: 'Valor do diagnóstico 100% abatido',
    description:
      'Executamos a primeira camada de solução: mapeamento de processos e painéis executivos que substituem estimativa por medição. O investimento do diagnóstico é integralmente creditado neste escopo.',
    link: '/servicos/diagnostico-e-visibilidade',
    linkLabel: 'Ver Visibilidade Operacional',
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
                  <p className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4">
                    {step.subtitle}
                  </p>
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
