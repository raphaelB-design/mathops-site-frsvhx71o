import { FadeIn } from '@/components/fade-in'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { trackClick } from '@/services/analytics'

const diffs = [
  {
    num: '01',
    title: 'Substância antes da Forma',
    desc: 'Dashboards bonitos são fáceis de fazer. O que é raro é um número em que você pode apostar a decisão.',
  },
  {
    num: '02',
    title: 'Autonomia por Design',
    desc: 'Documentamos cada modelo e cada regra para que sua equipe opere com total independência ao final do projeto.',
  },
  {
    num: '03',
    title: 'Indicadores definidos antes de começar',
    desc: 'Todo projeto inicia com KPIs acordados e termina medido pelos mesmos critérios.',
  },
  {
    num: '04',
    title: 'Confidencialidade e LGPD',
    desc: 'NDA assinado antes de qualquer acesso aos dados e tratamento conforme a LGPD.',
  },
]

export function Differentials() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 w-full border-t border-white/10">
      <div className="max-w-7xl mx-auto w-full">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
                Nossos Diferenciais
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold">
                Por que MathOps Strategy?
              </h2>
            </div>
            <Link
              to="/diagnostico"
              onClick={() => {
                trackClick('diagnostic_open', 'differentials')
              }}
              className="shrink-0 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-white transition-colors group"
            >
              Discutir seu cenário
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {diffs.map((diff, idx) => (
            <FadeIn key={idx} delay={idx * 60}>
              <div className="premium-card flex flex-col gap-4 p-8 rounded-lg group h-full">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-muted-foreground group-hover:text-accent2 transition-colors">
                    {diff.num}
                  </span>
                  <div className="w-5 h-[2px] bg-gradient-to-r from-accent to-accent2 group-hover:w-8 transition-all" />
                </div>
                <h3 className="font-display text-xl font-bold group-hover:text-accent transition-colors leading-snug text-[#F5F4F0]">
                  {diff.title}
                </h3>
                <p className="font-body text-[#94A3B8] leading-relaxed text-sm">{diff.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
