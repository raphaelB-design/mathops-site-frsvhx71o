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
    heroImage: 'https://img.usecurling.com/p/1920/600?q=abstract',
    layerNumber: 1,
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
        image: 'https://img.usecurling.com/p/800/600?q=abstract',
        headline: 'Engenharia reversa da sua operação',
        dor: 'Mapeamento de processos (AS IS/TO BE) e construção de painel executivo em Power BI, substituindo relatório manual por medição em tempo real',
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
      {
        id: 'controle-projetos-obra-evm',
        name: 'Controle de Projetos e Obras (EVM)',
        image: 'https://img.usecurling.com/p/800/600?q=construction%20project',
        headline: 'Previsibilidade de prazo e custo em projetos físicos',
        dor: 'Implantação de controle orientado a dados (curva de avanço planejado vs. realizado, indicadores de custo e prazo) para obras e projetos de execução longa',
        entregaveis:
          'Curva planejado vs. realizado, indicadores de custo e prazo, análise de variações',
        tecnicos: 'Earned Value Management, curva S, análise de variâncias',
        fit: 'Obras e projetos de execução longa',
        prazo: '4 a 8 semanas',
      },
      {
        id: 'monitoramento-estatistico-operacao',
        name: 'Monitoramento Estatístico da Operação',
        image: 'https://img.usecurling.com/p/800/600?q=statistical%20chart',
        headline: 'Detecção precoce de anomalias operacionais',
        dor: 'Rotina de monitoramento estatístico (controle de processo, limites de variação) para identificar desvios antes que se tornem falha sistêmica',
        entregaveis:
          'Rotina de monitoramento em produção, cartas de controle com limites de variação, relatório periódico de desvios',
        tecnicos: 'Controle Estatístico de Processo (CEP), cartas de controle',
        fit: 'Operações com risco de desvio virar falha sistêmica',
        prazo: '3 a 6 semanas',
      },
    ],
  },
  'analise-e-modelagem': {
    title: 'Análise e Modelagem',
    headline:
      'Previsibilidade projetada. Algoritmos e modelos estatísticos para antecipar cenários de mercado.',
    description:
      'Transforme dados em modelos preditivos e identifique perdas que hoje não aparecem no relatório.',
    heroImage: 'https://img.usecurling.com/p/1920/600?q=abstract',
    layerNumber: 2,
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
        image: 'https://img.usecurling.com/p/800/600?q=abstract',
        headline: 'Elimine a divergência de números entre áreas',
        dor: 'Auditoria estrutural dos cálculos que sustentam indicadores, com documentação de fórmulas, validação crítica e relatório de discrepâncias',
        entregaveis:
          'Documentação de Fórmulas Matemáticas, Validação de Cálculos Críticos, Relatório de Discrepâncias.',
        tecnicos:
          'Auditoria Matemática Estrutural, Reconciliação de Base de Dados, Normalização de Métricas.',
        fit: 'Estruturas corporativas com divergências em reports financeiros ou KPIs departamentais.',
        prazo: '1 a 3 semanas.',
      },
      {
        id: 'lean-six-sigma-processos',
        name: 'Lean Six Sigma & Melhoria de Processos',
        image: 'https://img.usecurling.com/p/800/600?q=lean%20process',
        headline: 'Redução de retrabalho e padronização de processo',
        dor: 'Aplicação de metodologia Lean Six Sigma (DMAIC) para mapear, medir e eliminar causas de ineficiência em processos operacionais',
        entregaveis: 'Mapa de processo, plano de ação priorizado, padrão documentado',
        tecnicos: 'DMAIC, mapeamento de fluxo de valor, controle estatístico de processo',
        fit: 'Operações com retrabalho recorrente',
        prazo: '6 a 12 semanas',
      },
      {
        id: 'modelagem-estatistica-custos',
        name: 'Modelagem Estatística de Custos',
        image: 'https://img.usecurling.com/p/800/600?q=data%20analytics',
        headline: 'Decisão de custo baseada em modelo, não em estimativa',
        dor: 'Construção de modelo estatístico próprio para projeção e dimensionamento de custos em cenários de reestruturação ou planejamento',
        entregaveis: 'Modelo documentado, projeções por cenário, memória de cálculo do modelo',
        tecnicos: 'Regressão múltipla, ANOVA, simulação de cenários',
        fit: 'Empresas em reestruturação ou planejamento',
        prazo: '4 a 8 semanas',
      },
    ],
  },
}

export const diagnosticoEstrategico = {
  id: 'diagnostico-estrategico',
  name: 'Diagnóstico Estratégico',
  tagline: 'O primeiro passo antes de qualquer engajamento.',
  sequencePosition: 'Ponto zero',
  deadline: '2 semanas',
  headline:
    'Diagnóstico de prazo fixo que mapeia onde a matemática e os dados mudam o resultado da operação antes de comprometer orçamento maior.',
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
