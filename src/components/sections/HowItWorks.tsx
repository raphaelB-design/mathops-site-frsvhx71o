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
    <section className="py-24 bg-white text-black border-t border-black/10">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <FadeIn>
          <div className="mb-16 md:mb-24">
            <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-6">Como Funciona</h2>
            <div className="w-16 h-1 bg-black"></div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {steps.map((step) => (
            <FadeIn key={step.num}>
              <div className="flex flex-col h-full border-t border-black/20 pt-8">
                <div className="mb-6">
                  <step.icon className="w-8 h-8 text-black mb-6" strokeWidth={1} />
                  <h3 className="text-2xl font-serif mb-4 tracking-tight">{step.title}</h3>
                  <p className="text-black/70 leading-relaxed mb-8">{step.description}</p>
                </div>
                <div className="mt-auto">
                  <span className="inline-block border border-black/20 text-black/80 text-xs font-semibold px-3 py-1.5 uppercase tracking-widest">
                    {step.detail}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
