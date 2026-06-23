import { FadeIn } from '@/components/fade-in'
import { Search, Calculator, CheckSquare, ArrowRight } from 'lucide-react'

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
    <section id="process" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <FadeIn>
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
            Processo
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Da primeira conversa ao resultado mensurável
          </h2>
        </div>
      </FadeIn>

      <div className="relative">
        {/* Connector line for desktop */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-white/10 -z-10 -translate-y-1/2"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <FadeIn key={step.num} delay={100 + index * 100} className="relative group">
              <div className="h-full bg-background flex flex-col">
                <div className="flex-1 bg-white/5 border border-white/10 p-8 hover:bg-white/[0.07] transition-colors relative overflow-hidden flex flex-col h-full">
                  {/* Step Number Watermark */}
                  <div className="absolute top-4 right-4 font-mono text-5xl font-bold text-accent/20 select-none">
                    {step.num}
                  </div>

                  <div className="mb-6 flex items-center justify-center w-12 h-12 bg-black border border-white/10 rounded-full text-accent group-hover:scale-110 transition-transform">
                    <step.icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-display text-xl font-bold mb-4">{step.title}</h3>

                  <p className="font-body text-muted-foreground leading-relaxed flex-1 mb-8">
                    {step.description}
                  </p>

                  <div className="mt-auto">
                    <span className="font-mono text-xs text-accent">{step.detail}</span>
                  </div>
                </div>

                {/* Arrow connecting cards on desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 w-8 h-8 items-center justify-center bg-black border border-white/10 rounded-full z-10 text-white/50">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
