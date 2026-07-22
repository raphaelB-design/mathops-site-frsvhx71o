// NOTA: métricas numéricas de resultado (ROI, uptime, redução %) só devem ser reintroduzidas quando lastreadas por um case público documentado. Até lá, usar métricas de método/processo.

export interface ServiceDetail {
  id: string
  name: string
  image: string
  headline: string
  dor: string
  entregaveis: string
  tecnicos: string
  fit: string
  prazo: string
  metodologia?: string
  modules?: Array<{ name: string; entregaveis: string; prazo: string }>
  implementationPhase?: ServiceDetail
}

export interface ServiceLayer {
  title: string
  headline: string
  description: string
  heroImage: string
  layerNumber: number
  investmentFrom: string
  metrics: Array<{ value: string; label: string }>
  anchor: boolean
  anchorProductId?: string
  forWhom: string
  problemStatement: string
  prerequisiteNote?: string
  services: ServiceDetail[]
}

export const serviceLayers: Record<string, ServiceLayer> = {
  'diagnostico-e-visibilidade': {
    title: 'Visibilidade Operacional',
    headline:
      'A base factual que sua operação ainda não tem. Elimine zonas de sombra e obtenha o diagnóstico real da sua empresa.',
    description:
      'Mapeamento de processos e painéis executivos que substituem estimativa por medição.',
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80',
    layerNumber: 1,
    investmentFrom: 'a partir de R$ 18.000',
    metrics: [
      { value: '2–6sem', label: 'Da imersão ao painel ao vivo' },
      { value: 'Power BI', label: 'Plataforma dos painéis entregues' },
      { value: 'BPMN 2.0', label: 'Padrão de modelagem aplicado' },
    ],
    anchor: false,
    forWhom:
      'Para operações que cresceram mais rápido do que sua capacidade de enxergar. Empresas com dados existentes mas sem governança, relatórios manuais desatualizados e gestores tomando decisões sem visibilidade em tempo real.',
    problemStatement: 'Você tem dados. Falta a estrutura para enxergá-los.',
    prerequisiteNote:
      'Este pacote é uma possível saída do Diagnóstico Estratégico, não um substituto dele.',
    services: [
      {
        id: 'diagnostico-e-visibilidade-operacional',
        name: 'Diagnóstico e Visibilidade Operacional',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
        headline:
          'Engenharia reversa da sua operação, com visibilidade executiva em tempo real para sustentar a decisão.',
        dor: 'Processos sem padrão, retrabalho constante e dependência de poucas pessoas-chave. A decisão executiva é tomada sobre relatórios manuais já desatualizados no momento em que chegam à mesa.',
        entregaveis: 'Ver módulos.',
        tecnicos: 'Ver módulos.',
        fit: 'Empresas que cresceram mais rápido do que sua capacidade de enxergar a própria operação, e precisam de governança sem um investimento inicial pesado.',
        prazo: '2 a 8 semanas (depende do módulo contratado).',
        modules: [
          {
            name: 'Mapeamento AS IS/TO BE',
            entregaveis: 'Imersão de Diagnóstico, Topologia AS IS, Arquitetura TO BE.',
            prazo: '2 a 6 semanas',
          },
          {
            name: 'Observatório de Dados (Painel Power BI)',
            entregaveis:
              'Integração Power BI, Centralização de KPIs C-Level, Painel Analítico de Alta Fidelidade.',
            prazo: '3 a 8 semanas',
          },
        ],
      },
    ],
  },
  'analise-e-modelagem': {
    title: 'Análise e Modelagem',
    headline:
      'Previsibilidade projetada. Algoritmos e modelos estatísticos para antecipar cenários de mercado.',
    description:
      'Transforme dados em modelos preditivos e identifique perdas que hoje não aparecem no relatório.',
    heroImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1920&q=80',
    layerNumber: 2,
    investmentFrom: 'a partir de R$ 25.000',
    metrics: [
      { value: 'ARIMA', label: 'Metodologia de séries temporais aplicada' },
      { value: 'Six Sigma', label: 'Padrão de qualidade metodológica' },
      { value: 'Monte Carlo', label: 'Simulação de cenários críticos' },
    ],
    anchor: false,
    forWhom:
      'Para equipes de gestão que já têm visibilidade dos dados, mas ainda dependem de estimativas ou planilhas para planejar estoque, precificação e expansão. O problema não é falta de dados, é falta de modelo que os transforme em decisão.',
    problemStatement: 'Seus dados existem. O modelo que os transforma em previsão, ainda não.',
    services: [
      {
        id: 'memorias',
        name: 'Auditoria de Memórias de Cálculo',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
        headline:
          'Auditoria dos cálculos que sustentam seus indicadores. Elimine a divergência de números entre áreas.',
        dor: 'Áreas diferentes calculam a mesma métrica de formas diferentes, e o balanço herda a divergência.',
        entregaveis:
          'Documentação de Fórmulas Matemáticas, Validação de Cálculos Críticos, Relatório de Discrepâncias.',
        tecnicos:
          'Auditoria Matemática Estrutural, Reconciliação de Base de Dados, Normalização de Métricas.',
        fit: 'Estruturas corporativas com divergências em reports financeiros ou KPIs departamentais.',
        prazo: '1 a 3 semanas.',
      },
    ],
  },
}

export const diagnosticoEstrategico = {
  id: 'diagnostico-estrategico',
  name: 'Diagnóstico Estratégico',
  tagline: 'O primeiro passo de qualquer engajamento MathOps.',
  price: 'R$ 4.500',
  priceNote: 'Valor fixo. Sem variação de escopo.',
  sequencePosition: 'Ponto zero',
  deadline: '2 semanas',
  headline:
    'Antes de propor uma solução, precisamos entender o problema com precisão. O Diagnóstico Estratégico é a única forma de garantir que o engajamento subsequente seja desenhado para o seu cenário real, não para um template.',
  deliverables: [
    'Relatório de Diagnóstico Analítico (documento auditável)',
    'Mapa de Gargalos e Oportunidades Prioritárias',
    'Roadmap de Engajamento com escopo e KPIs definidos',
    'Sessão de apresentação ao time de gestão (90 min)',
  ],
  forWhom:
    'Para líderes que precisam de clareza antes de comprometer orçamento. O diagnóstico responde uma pergunta: onde a matemática muda o resultado da sua operação?',
  guarantee:
    'Se ao final do diagnóstico concluirmos que não há fit estratégico, devolvemos 100% do valor. Sem exceções.',
  note: 'O valor do Diagnóstico Estratégico é integralmente abatido do investimento no engajamento completo.',
}
