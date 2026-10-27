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
  prazo?: string
  metodologia?: string
  modules?: Array<{ name: string; entregaveis: string; prazo?: string }>
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
      { value: 'KPIs', label: 'Indicadores executivos centralizados' },
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
        modules: [
          {
            name: 'Mapeamento AS IS/TO BE',
            entregaveis: 'Imersão de Diagnóstico, Topologia AS IS, Arquitetura TO BE.',
          },
          {
            name: 'Observatório de Dados (Painel Power BI)',
            entregaveis:
              'Integração Power BI, Centralização de KPIs C-Level, Painel Analítico de Alta Fidelidade.',
          },
        ],
      },
      {
        id: 'controle-projetos-obra-evm',
        name: 'Controle de Projetos',
        image: 'https://img.usecurling.com/p/800/600?q=construction%20project',
        headline: 'Previsibilidade de prazo e custo em projetos físicos',
        dor: 'Implantação de controle orientado a dados (curva de avanço planejado vs. realizado, indicadores de custo e prazo) para obras e projetos de execução longa',
        entregaveis:
          'Curva planejado vs. realizado, indicadores de custo e prazo, análise de variações',
        tecnicos: 'Earned Value Management, curva S, análise de variâncias',
        fit: 'Obras e projetos de execução longa',
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
      },
    ],
  },
  'analise-e-modelagem': {
    title: 'Análise e Modelagem',
    headline: 'Modelos estatísticos e auditoria de cálculo para decisões que se sustentam.',
    description: 'Auditoria de cálculos, melhoria de processos e modelos estatísticos de custo.',
    heroImage: 'https://img.usecurling.com/p/1920/600?q=abstract',
    layerNumber: 2,
    metrics: [
      { value: 'DMAIC', label: 'Metodologia Lean Six Sigma aplicada' },
      { value: 'Regressão', label: 'Modelagem estatística de custos' },
      { value: 'Auditoria', label: 'Validação de memórias de cálculo' },
    ],
    anchor: false,
    forWhom:
      'Para equipes de gestão que já têm visibilidade dos dados, mas ainda dependem de estimativas ou planilhas para planejar estoque, custos e expansão. O problema não é falta de dados, é falta de modelo que os transforme em decisão.',
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
      },
    ],
  },
  'governanca-e-riscos': {
    title: 'Governança e Riscos',
    headline: 'Riscos identificados, medidos e controlados, com evidência para a alta gestão.',
    description:
      'Estruturação da gestão de riscos organizacionais, do apetite a risco ao monitoramento da efetividade dos controles.',
    heroImage: 'https://img.usecurling.com/p/1920/600?q=risk%20management',
    layerNumber: 3,
    metrics: [
      { value: 'COSO', label: 'Referencial de controles internos' },
      { value: '3 Linhas', label: 'Modelo de governança aplicado' },
      { value: 'MGR', label: 'Metodologia de Gestão de Riscos' },
    ],
    anchor: false,
    forWhom:
      'Para diretorias, conselhos e áreas de controladoria e compliance que precisam de uma gestão de riscos estruturada, documentada e auditável.',
    problemStatement:
      'Todo negócio corre riscos. O problema é não saber quais, quanto e se os controles funcionam.',
    services: [
      {
        id: 'gestao-riscos-organizacionais',
        name: 'Gestão de Riscos Organizacionais',
        image: 'https://img.usecurling.com/p/800/600?q=risk%20compliance',
        headline: 'Do apetite a risco à efetividade dos controles.',
        dor: 'Riscos tratados de forma informal, sem critério de priorização, sem dono definido e sem evidência de que os controles existentes funcionam.',
        entregaveis: 'Ver módulos.',
        tecnicos:
          'COSO, modelo das três linhas, matriz de probabilidade e impacto, indicadores-chave de risco.',
        fit: 'Organizações que precisam estruturar ou amadurecer sua gestão de riscos para a alta gestão, auditoria ou órgãos de controle.',
        modules: [
          {
            name: 'Níveis de apetite a riscos organizacionais',
            entregaveis:
              'Declaração de apetite a risco, limites de tolerância por categoria e critérios de aceitação aprovados pela alta gestão.',
          },
          {
            name: 'Gerenciamento e monitoramento de riscos organizacionais',
            entregaveis:
              'Matriz de riscos, responsáveis definidos, indicadores-chave de risco e painel de monitoramento.',
          },
          {
            name: 'Metodologia de Gestão de Riscos (MGR)',
            entregaveis:
              'Metodologia documentada: identificação, análise, avaliação, tratamento e comunicação de riscos, com papéis e fluxos.',
          },
          {
            name: 'Medidas de controle e mitigação de riscos',
            entregaveis:
              'Plano de tratamento com controles propostos, responsáveis e critérios de verificação.',
          },
          {
            name: 'Evolução dos níveis de risco e efetividade dos controles',
            entregaveis:
              'Acompanhamento periódico do risco residual e avaliação da efetividade das medidas implementadas.',
          },
        ],
      },
      {
        id: 'transformacao-organizacional',
        name: 'Transformação Organizacional e Gestão Estratégica',
        image: 'https://img.usecurling.com/p/800/600?q=strategy%20corporate',
        headline:
          'Alinhamento da estrutura corporativa e execução estratégica orientada a indicadores.',
        dor: 'Estruturas com papéis sobrepostos, desalinhamento entre metas corporativas e rotina operacional, falta de governança e ausência de acompanhamento formal da estratégia.',
        entregaveis: 'Ver módulos.',
        tecnicos:
          'Método Hoshin Kanri, modelo de três linhas de governança, matriz de responsabilidades, integração com ERP.',
        fit: 'Organizações em processo de reestruturação, crescimento acelerado ou profissionalização da gestão que necessitam de governança integrada e desdobramento claro de metas.',
        modules: [
          {
            name: 'Diagnóstico de maturidade',
            entregaveis:
              'Relatório técnico de maturidade da gestão, mapeamento de lacunas organizacionais e matriz de prontidão institucional.',
          },
          {
            name: 'Arquitetura organizacional',
            entregaveis:
              'Organograma funcional, mapa de responsabilidade, matriz de alçadas decisórias e estruturação do modelo de três linhas de governança.',
          },
          {
            name: 'Desdobramento estratégico Hoshin',
            entregaveis:
              'Matriz Hoshin Kanri estruturada com desdobramento de diretrizes corporativas até indicadores operacionais por gestão.',
          },
          {
            name: 'Painel de gestão integrado ao ERP',
            entregaveis:
              'Painel executivo de acompanhamento de indicadores conectado e sincronizado às fontes de dados do ERP corporativo.',
          },
          {
            name: 'Governança do programa com gates anuais',
            entregaveis:
              'Rito de governança formalizado, critérios de avaliação de gates anuais e relatórios de acompanhamento de marcos da estratégia.',
          },
          {
            name: 'Gestão da mudança',
            entregaveis:
              'Plano de comunicação estruturado, plano de engajamento dos líderes e protocolo de transição cultural dos processos.',
          },
        ],
      },
    ],
  },
}

export const diagnosticoEstrategico = {
  id: 'diagnostico-estrategico',
  name: 'Diagnóstico Estratégico',
  tagline: 'O primeiro passo antes de qualquer engajamento.',
  sequencePosition: 'Ponto zero',
  headline:
    'Diagnóstico que mapeia onde a matemática e os dados mudam o resultado da operação antes de avançar para etapas maiores.',
  deliverables: [
    'Relatório de Diagnóstico Analítico (documento auditável)',
    'Mapa de Gargalos e Oportunidades Prioritárias',
    'Roadmap de Engajamento com escopo e KPIs definidos',
    'Sessão de apresentação ao time de gestão (90 min)',
  ],
  forWhom:
    'Para líderes que precisam de clareza antes de avançar para novos projetos. O diagnóstico responde uma pergunta: onde os dados mudam o resultado da sua operação?',
  guarantee: 'Garantia de escopo: KPIs e entregáveis acordados antes de começar o trabalho.',
  note: 'O valor do Diagnóstico Estratégico é integralmente abatido do investimento no engajamento completo.',
}
