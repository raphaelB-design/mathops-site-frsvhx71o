import { Building2, Cog } from 'lucide-react'

export const industriesData = {
  'construcao-civil': {
    slug: 'construcao-civil',
    icon: Building2,
    name: 'Construção Civil',
    desc: 'Controle de custo e prazo de obras com Earned Value, curva S e indicadores executivos.',
    details:
      'Na construção civil, a margem se perde entre o orçado e o realizado. A MathOps implanta controle orientado a dados: curva de avanço planejado vs. realizado, indicadores de custo e prazo (EVM), reconciliação entre orçamento, medições e ERP e painéis executivos para a gestão da obra. Cada desvio fica visível, explicado e documentado.',
    image: 'https://img.usecurling.com/p/1200/800?q=construction',
    thumbnail: 'https://img.usecurling.com/p/600/400?q=construction',
    imageAlt: 'Canteiro de obras de construção civil',
    featured: true,
  },
  'operacoes-industria': {
    slug: 'operacoes-industria',
    icon: Cog,
    name: 'Operações & Indústria',
    desc: 'Diagnóstico e visibilidade operacional, controle de projetos e melhoria de processos para operações que precisam medir antes de decidir.',
    details:
      'Operações de qualquer setor compartilham o mesmo desafio: decidir sobre dados confiáveis. A MathOps mapeia processos, implanta painéis executivos, controla projetos com indicadores de prazo e custo e aplica melhoria estruturada de processos, sempre com documentação auditável de cada cálculo.',
    image: 'https://img.usecurling.com/p/1200/800?q=industrial%20operations',
    thumbnail: 'https://img.usecurling.com/p/600/400?q=industrial%20operations',
    imageAlt: 'Operações industriais e processos produtivos',
    featured: true,
  },
} as const

export const industriesList = Object.values(industriesData).filter((ind) => ind.featured)

export const nonFeaturedIndustries = Object.values(industriesData).filter((ind) => !ind.featured)

export const allIndustriesList = Object.values(industriesData)
