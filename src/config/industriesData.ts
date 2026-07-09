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
      'Na construção civil, a eficiência do canteiro de obras dita a margem de lucro. A MathOps aplica modelagem matemática (Programação Linear e Inteira Mista) para otimizar a alocação de recursos, sequenciamento de tarefas (PERT/CPM avançado) e gestão de suprimentos just-in-time. Ao invés de cronogramas estáticos, criamos modelos de simulação estocástica para mitigar o tempo ocioso de maquinário pesado e equipes, reduzindo drasticamente custos indiretos, atrasos sistêmicos e garantindo o fluxo contínuo de materiais críticos.',
    image: 'https://img.usecurling.com/p/1200/800?q=construction',
    thumbnail: 'https://img.usecurling.com/p/600/400?q=construction',
    imageAlt: 'Canteiro de obras de construção civil',
    featured: true,
  },
  manufatura: {
    slug: 'manufatura',
    icon: Factory,
    name: 'Manufatura',
    desc: 'Otimização de OEE e controle de refugo.',
    details:
      'Aumente o Overall Equipment Effectiveness (OEE) com algoritmos que preveem falhas antes que ocorram. Nossa abordagem matemática para a manufatura foca na manutenção preditiva através de Machine Learning, redução de sucata via controle estatístico de processo avançado e sequenciamento ótimo de produção (Heurísticas de Job Shop Scheduling). Maximizamos o rendimento das linhas de montagem equilibrando setups de máquinas e restrições de capacidade em tempo real.',
    image: 'https://img.usecurling.com/p/1200/800?q=factory',
    thumbnail: 'https://img.usecurling.com/p/600/400?q=factory',
    imageAlt: 'Linha de produção em uma fábrica de manufatura',
    featured: true,
  },
  saude: {
    slug: 'saude',
    icon: Stethoscope,
    name: 'Saúde',
    desc: 'Gestão de leitos e predição de altas.',
    details:
      'Em hospitais, um leito ocioso ou a falta dele custa vidas e recursos. Aplicamos modelos estocásticos baseados em Teoria das Filas para previsão de demanda no pronto-socorro, otimização de escalas médicas restritas e gestão inteligente da rotatividade de leitos (Bed Management). Nossos algoritmos ajudam a minimizar o tempo de espera de pacientes e a maximizar a utilização de salas cirúrgicas de alto custo.',
    image: 'https://img.usecurling.com/p/1200/800?q=hospital',
    thumbnail: 'https://img.usecurling.com/p/600/400?q=hospital',
    imageAlt: 'Profissionais de saúde em ambiente hospitalar',
    featured: false,
  },
  logistica: {
    slug: 'logistica',
    icon: Truck,
    name: 'Logística',
    desc: 'Algoritmos de alta performance para redes complexas: roteirização dinâmica e simulação estocástica para redução drástica de custos operacionais.',
    details:
      'Da primeira à última milha, a matemática resolve o clássico problema do caixeiro viajante em escala colossal. Implementamos heurísticas avançadas de Roteirização Dinâmica com Janelas de Tempo (VRPTW), consolidação de cargas 3D (Bin Packing) e otimização de malha de distribuição (Facility Location Problem). Nossos modelos respondem a variáveis reais de trânsito e capacidades, reduzindo o custo de frete e emissões de carbono em dois dígitos.',
    image: 'https://img.usecurling.com/p/1200/800?q=logistics',
    thumbnail: 'https://img.usecurling.com/p/600/400?q=logistics',
    imageAlt: 'Frota de caminhões de logística',
    featured: false,
  },
  financas: {
    slug: 'financas',
    icon: Landmark,
    name: 'Finanças',
    desc: 'Matemática financeira de ponta para gestão de ativos: algoritmos de trade, análise de risco sistêmico e motores de antifraude inteligentes.',
    details:
      'O mercado financeiro respira dados. A MathOps desenvolve modelos avançados de credit scoring não-linear, detecção de fraudes em tempo real utilizando grafos e otimização de portfólios baseada em fronteira eficiente de Markowitz e estatística bayesiana profunda. Substituímos matrizes de risco baseadas em intuição por rigor quantitativo, garantindo maior rentabilidade ajustada ao risco e adequação regulatória estrita.',
    image: 'https://img.usecurling.com/p/1200/800?q=finance',
    thumbnail: 'https://img.usecurling.com/p/600/400?q=finance',
    imageAlt: 'Ambiente corporativo de finanças e gráficos',
    featured: false,
  },
  varejo: {
    slug: 'varejo',
    icon: ShoppingCart,
    name: 'Varejo',
    desc: 'Data Science no coração do consumo: hiper-personalização em tempo real e motores de recomendação baseados em comportamento profundo do cliente.',
    details:
      'Maximize as margens com algoritmos de precificação dinâmica que respondem de maneira ótima à elasticidade da demanda, sazonalidade e aos movimentos da concorrência (Game Theory). Otimizamos a alocação de estoque multi-escalão (Multi-Echelon Inventory Optimization) entre centros de distribuição e centenas de lojas físicas, garantindo o balanceamento perfeito para minimizar rupturas de gôndola e markdown excessivo de produtos.',
    image: 'https://img.usecurling.com/p/1200/800?q=retail',
    thumbnail: 'https://img.usecurling.com/p/600/400?q=retail',
    imageAlt: 'Corredores de um supermercado de varejo',
    featured: true,
  },
  aviacao: {
    slug: 'aviacao',
    icon: Plane,
    name: 'Aviação',
    desc: 'Otimização de malha aérea e manutenção preditiva.',
    details:
      'Companhias aéreas operam em margens finíssimas onde a matemática é a diferença entre lucro e prejuízo. Otimizamos o crew scheduling (escala de tripulação) respeitando rigorosas normas regulatórias, o planejamento da malha aérea (Network Planning) e a gestão dinâmica de yield (Revenue Management). Modelos de Programação Linear de larga escala garantem a rápida reacomodação de voos em cenários de disrupção operacional (A-CDM).',
    image: 'https://img.usecurling.com/p/1200/800?q=aviation',
    thumbnail: 'https://img.usecurling.com/p/600/400?q=aviation',
    imageAlt: 'Aviões comerciais em operação',
    featured: false,
  },
  agronegocio: {
    slug: 'agronegocio',
    icon: Sprout,
    name: 'Agronegócio',
    desc: 'Inteligência Artificial aplicada à precisão do campo: modelos preditivos de safra e visão computacional para otimização de colheita e produtividade.',
    details:
      'Modelos preditivos que cruzam dados meteorológicos, topográficos e históricos para estimativa precisa de safra e detecção de anomalias fenológicas. Além disso, formulamos algoritmos complexos para otimizar rotas de maquinário autônomo no campo (Path Planning) e a logística de escoamento para silos e portos, sincronizando a colheita com a capacidade de secagem e transporte rodoviário/ferroviário.',
    image: 'https://img.usecurling.com/p/1200/800?q=harvester%20field',
    thumbnail: 'https://img.usecurling.com/p/600/400?q=harvester%20field',
    imageAlt: 'Colheitadeira moderna operando em campo de agronegócio',
    featured: true,
  },
  energia: {
    slug: 'energia',
    icon: Zap,
    name: 'Energia & Utilities',
    desc: 'Modelagem avançada para redes inteligentes: previsão de carga, otimização de despacho e monitoramento preditivo para infraestrutura crítica.',
    details:
      'A transição energética exige precisão e resiliência. Implementamos modelos matemáticos para previsão estocástica de demanda e de geração intermitente (eólica/solar), otimização não-linear do despacho hidrotérmico e algoritmos para balanceamento de smart grids em tempo real. Nossa matemática garante a confiabilidade do sistema elétrico minimizando o acionamento de usinas termelétricas custosas e a perda de energia na transmissão.',
    image: 'https://img.usecurling.com/p/1200/800?q=energy',
    thumbnail: 'https://img.usecurling.com/p/600/400?q=energy',
    imageAlt: 'Instalações de energia renovável',
    featured: false,
  },
} as const

export const industriesList = Object.values(industriesData).filter((ind) => ind.featured)

export const nonFeaturedIndustries = Object.values(industriesData).filter((ind) => !ind.featured)

export const allIndustriesList = Object.values(industriesData)
