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
  return null
}
