import { Building2, Cog } from 'lucide-react'

export const industriesData = {
  'construcao-civil': {
    slug: 'construcao-civil',
    icon: Building2,
    name: 'Construção Civil',
    desc: 'Otimização de logística de canteiros, gestão de suprimentos e modelagem matemática para cronogramas de grandes obras.',
    details:
      'Na construção civil, a eficiência do canteiro de obras dita a margem de lucro. A MathOps aplica modelagem matemática (Programação Linear e Inteira Mista) para otimizar a alocação de recursos, sequenciamento de tarefas (PERT/CPM avançado) e gestão de suprimentos just-in-time. Ao invés de cronogramas estáticos, criamos modelos de simulação estocástica para mitigar o tempo ocioso de maquinário pesado e equipes, reduzindo drasticamente custos indiretos, atrasos sistêmicos e garantindo o fluxo contínuo de materiais críticos.',
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
