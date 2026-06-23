import { FadeIn } from '@/components/fade-in'
import { Search, Calculator, CheckSquare } from 'lucide-react'

const steps = [
  {
    num: '01',
    title: '01 · Diagnóstico',
    icon: Search,
    description:
      'Entendemos o problema real — não os sintomas. Uma conversa estruturada de 60 minutos para mapear o desafio, os dados disponíveis e o impacto esperado.',
    detail: 'Sem custo. Sem compromisso.',
  },
  {
    num: '02',
    title: '02 · Proposta com ROI Definido',
    icon: Calculator,
    description:
      'Entregamos uma proposta técnica com escopo, prazo, metodologia e KPIs financeiros definidos antes de qualquer contrato ser assinado.',
    detail: 'Você aprova o que vai medir.',
  },
  {
    num: '03',
    title: '03 · Execução e Entrega',
    icon: CheckSquare,
    description:
      'Executamos com entregas parciais validadas. Ao final, você recebe o modelo, a documentação completa e a autonomia para operar sem depender de nós.',
    detail: 'Memória de cálculo auditável.',
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 px-6 md:px-12 w-full bg-background relative overflow-hidden">
      <div className="max-w-4xl mx-auto w-full relative z-10">
        <FadeIn>
          <div className="mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
              O Processo
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              Como trabalhamos
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <FadeIn key={step.num} delay={i * 100}>
                <div className="flex flex-col gap-4 bg-white/5 border border-white/10 p-8 h-full transition-colors hover:border-white/20">
                  <Icon className="w-8 h-8 text-accent mb-4" />
                  <h3 className="font-display text-xl font-bold text-white">{step.title}</h3>
                  <p className="font-body text-muted-foreground leading-relaxed flex-1">
                    {step.description}
                  </p>
                  <p className="font-mono text-xs text-accent mt-4">{step.detail}</p>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
