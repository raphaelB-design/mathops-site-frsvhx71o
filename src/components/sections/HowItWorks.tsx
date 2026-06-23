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
    <section className="py-24 bg-zinc-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <FadeIn key={step.num} delay={i * 0.2}>
              <div className="flex flex-col border-l border-zinc-200 pl-8 h-full">
                <step.icon className="w-8 h-8 mb-6 text-zinc-900" strokeWidth={1.5} />
                <h3 className="text-xl font-serif font-medium text-zinc-900 mb-4">{step.title}</h3>
                <p className="text-zinc-600 leading-relaxed mb-6 flex-grow">{step.description}</p>
                <span className="text-sm font-medium text-zinc-900 uppercase tracking-wider">
                  {step.detail}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
