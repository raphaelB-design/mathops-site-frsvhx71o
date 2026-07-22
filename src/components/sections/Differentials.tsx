import { FadeIn } from '@/components/fade-in'
import { ArrowUpRight } from 'lucide-react'
import { useDiagnosticModal } from '@/context/DiagnosticModalContext'
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
    title: 'ROI Definido Antes de Começar',
    desc: 'Todo projeto inicia com KPIs financeiros e operacionais acordados. Ao final, você mede exatamente o retorno — com os mesmos critérios matemáticos do início.',
  },
  {
    num: '04',
    title: 'Segurança by Design',
    desc: 'LGPD e GDPR não são uma etapa final — são parte da arquitetura, desde o primeiro dia.',
  },
]

export function Differentials() {
  const { openDiagnostic } = useDiagnosticModal()

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
            <button
              onClick={() => {
                trackClick('diagnostic_open', 'differentials')
                openDiagnostic()
              }}
              className="shrink-0 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-white transition-colors group"
            >
              Discutir seu cenário
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/10">
          {diffs.map((diff, idx) => (
            <FadeIn key={idx} delay={idx * 60}>
              <div className="flex flex-col gap-4 p-8 border-b border-r border-white/10 hover:bg-white/[0.02] transition-colors group last:border-r-0 [&:nth-child(2n)]:border-r-0 [&:nth-last-child(-n+2)]:border-b-0 h-full">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-muted-foreground">{diff.num}</span>
                  <div className="w-5 h-[2px] bg-accent group-hover:w-8 transition-all" />
                </div>
                <h3 className="font-display text-xl font-bold group-hover:text-accent transition-colors leading-snug">
                  {diff.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed text-sm">
                  {diff.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
