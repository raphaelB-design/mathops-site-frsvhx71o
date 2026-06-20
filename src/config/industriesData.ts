import {
  Factory,
  Truck,
  Stethoscope,
  Building2,
  Landmark,
  ShoppingCart,
  Plane,
  Sprout,
  Zap,
} from 'lucide-react'

export const industriesData = {
  'construcao-civil': {
    slug: 'construcao-civil',
    icon: Building2,
    name: 'Construção Civil',
    desc: 'Otimização de logística de canteiros, gestão de suprimentos e modelagem matemática para cronogramas de grandes obras.',
    details:
      'Na construção civil, a eficiência do canteiro de obras dita a margem de lucro. A MathOps aplica modelagem matemática para otimizar a alocação de recursos, sequenciamento de tarefas e gestão de suprimentos just-in-time, reduzindo atrasos e custos excessivos.',
    image: 'https://img.usecurling.com/p/1200/800?q=construction&color=black',
    thumbnail: 'https://img.usecurling.com/p/600/400?q=construction&color=black',
  },
  manufatura: {
    slug: 'manufatura',
    icon: Factory,
    name: 'Manufatura',
    desc: 'Otimização de OEE e controle de refugo.',
    details:
      'Aumente o Overall Equipment Effectiveness (OEE) com algoritmos que preveem falhas antes que ocorram. Nossa abordagem matemática para a manufatura foca na manutenção preditiva, redução de sucata e sequenciamento ótimo de produção.',
    image: 'https://img.usecurling.com/p/1200/800?q=factory&color=black',
    thumbnail: 'https://img.usecurling.com/p/600/400?q=factory&color=black',
  },
  saude: {
    slug: 'saude',
    icon: Stethoscope,
    name: 'Saúde',
    desc: 'Gestão de leitos e predição de altas.',
    details:
      'Em hospitais, um leito ocioso ou a falta dele custa vidas e recursos. Aplicamos modelos estocásticos para previsão de demanda no pronto-socorro, otimização de escalas médicas e gestão inteligente da rotatividade de leitos.',
    image: 'https://img.usecurling.com/p/1200/800?q=hospital&color=black',
    thumbnail: 'https://img.usecurling.com/p/600/400?q=hospital&color=black',
  },
  logistica: {
    slug: 'logistica',
    icon: Truck,
    name: 'Logística',
    desc: 'Roteirização inteligente e malha otimizada.',
    details:
      'Da primeira à última milha, a matemática resolve o clássico problema do caixeiro viajante em escala colossal. Roteirização dinâmica, consolidação de cargas e otimização de malha de distribuição para reduzir o custo de frete em dois dígitos.',
    image: 'https://img.usecurling.com/p/1200/800?q=logistics&color=black',
    thumbnail: 'https://img.usecurling.com/p/600/400?q=logistics&color=black',
  },
  financas: {
    slug: 'financas',
    icon: Landmark,
    name: 'Finanças',
    desc: 'Modelos de crédito e análise de risco.',
    details:
      'O mercado financeiro respira dados. A MathOps desenvolve modelos avançados de credit scoring, detecção de fraudes em tempo real e otimização de portfólios utilizando aprendizado de máquina e estatística bayesiana profunda.',
    image: 'https://img.usecurling.com/p/1200/800?q=finance&color=black',
    thumbnail: 'https://img.usecurling.com/p/600/400?q=finance&color=black',
  },
  varejo: {
    slug: 'varejo',
    icon: ShoppingCart,
    name: 'Varejo',
    desc: 'Precificação dinâmica e controle de estoque.',
    details:
      'Maximize as margens com algoritmos de precificação dinâmica que respondem à elasticidade da demanda e aos movimentos da concorrência. Otimizamos a alocação de estoque entre centros de distribuição e lojas físicas para evitar rupturas e excessos.',
    image: 'https://img.usecurling.com/p/1200/800?q=retail&color=black',
    thumbnail: 'https://img.usecurling.com/p/600/400?q=retail&color=black',
  },
  aviacao: {
    slug: 'aviacao',
    icon: Plane,
    name: 'Aviação',
    desc: 'Otimização de malha aérea e manutenção preditiva.',
    details:
      'Companhias aéreas operam em margens finíssimas onde a matemática é a diferença entre lucro e prejuízo. Otimizamos o crew scheduling (escala de tripulação), o planejamento da malha aérea (network planning) e a gestão de yield.',
    image: 'https://img.usecurling.com/p/1200/800?q=aviation&color=black',
    thumbnail: 'https://img.usecurling.com/p/600/400?q=aviation&color=black',
  },
  agronegocio: {
    slug: 'agronegocio',
    icon: Sprout,
    name: 'Agronegócio',
    desc: 'Previsão de safra e otimização logística no campo.',
    details:
      'Modelos preditivos que cruzam dados meteorológicos, topográficos e históricos para estimativa precisa de safra. Além disso, otimizamos as rotas de maquinário no campo e a logística de escoamento para os portos.',
    image: 'https://img.usecurling.com/p/1200/800?q=agriculture&color=black',
    thumbnail: 'https://img.usecurling.com/p/600/400?q=agriculture&color=black',
  },
  energia: {
    slug: 'energia',
    icon: Zap,
    name: 'Energia & Utilities',
    desc: 'Focado em previsão de demanda, smart grids e eficiência de recursos.',
    details:
      'A transição energética exige precisão. Implementamos modelos para previsão de demanda e geração renovável, otimização do despacho hidrotérmico e algoritmos para balanceamento de smart grids em tempo real.',
    image: 'https://img.usecurling.com/p/1200/800?q=energy&color=black',
    thumbnail: 'https://img.usecurling.com/p/600/400?q=energy&color=black',
  },
} as const

export const industriesList = Object.values(industriesData)
