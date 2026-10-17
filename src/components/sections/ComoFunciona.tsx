import { FadeIn } from '@/components/fade-in'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Diagnóstico Estratégico',
    subtitle: 'Roadmap e KPIs',
    description:
      'Mapeamos processos e indicadores e entregamos um roadmap com escopo e KPIs definidos. Se não houver fit, devolvemos 100% do valor.',
    link: '/diagnostico',
    linkLabel: 'Conhecer Diagnóstico',
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
    <section
      id="como-funciona"
      className="py-24 md:py-32 px-6 md:px-12 w-full bg-white/[0.02] border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto w-full">
        <FadeIn>
          <div className="mb-16 text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
              Como Funciona
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-white">
              Do diagnóstico à visibilidade
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Um caminho claro e sem ambiguidades. Cada etapa com escopo definido e resultado
              mensurável.
            </p>
          </div>
        </FadeIn>

        {/* 3 passos lado a lado (horizontal no desktop, vertical no celular) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <FadeIn key={step.number} delay={index * 150}>
              <div className="flex flex-col h-full p-8 bg-black/40 border border-white/10 rounded-sm relative group hover:border-white/20 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-5xl lg:text-6xl font-bold text-white/10 group-hover:text-accent/40 transition-colors duration-500">
                    {step.number}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 bg-white/5 border border-white/10 rounded-sm text-muted-foreground">
                    {step.subtitle}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-3">{step.title}</h3>

                <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                  {step.description}
                </p>

                {step.link && step.linkLabel && (
                  <Link
                    to={step.link}
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors group/link mt-auto pt-4 border-t border-white/5"
                  >
                    {step.linkLabel}
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
