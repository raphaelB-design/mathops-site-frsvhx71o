export interface ServiceDetail {
  id: string
  name: string
  image: string
  headline: string
  dor?: string
  entregaveis?: string
  tecnicos?: string
  fit?: string
  prazo?: string
  metodologia?: string
}

export interface ServiceLayer {
  title: string
  headline: string
  description: string
  services: ServiceDetail[]
}

export const serviceLayers: Record<string, ServiceLayer> = {
  'diagnostico-e-visibilidade': {
    title: 'Diagnóstico e Visibilidade',
    headline:
      'A arquitetura da verdade absoluta. Elimine zonas de sombra e extraia o DNA operacional da sua empresa.',
    description:
      'Mapeamento profundo e inteligência de painéis que substituem o achismo empírico por evidências irrefutáveis.',
    services: [
      {
        id: 'mapeamento-processos',
        name: 'Mapeamento Estrutural AS IS / TO BE',
        image: 'https://img.usecurling.com/p/800/600?q=blueprint%20architecture&color=gray&dpr=2',
        headline:
          'Engenharia reversa da sua operação. Identificamos gargalos invisíveis e projetamos a eficiência em seu estado da arte.',
        dor: 'Sintomas de entropia operacional: despadronização endêmica, retrabalho sistêmico e dependência crítica de capital humano centralizado.',
        entregaveis: 'Imersão de Diagnóstico, Topologia AS IS, Arquitetura TO BE.',
        tecnicos: 'Modelagem BPMN 2.0, Matriz de Gargalos, Roadmap de Implementação Executiva.',
        fit: 'Corporações em fase de tração escalonável sofrendo de "débito operacional".',
        prazo: '2 a 6 semanas.',
      },
      {
        id: 'dashboard-diagnostico',
        name: 'Observatório de Dados Estratégicos',
        image: 'https://img.usecurling.com/p/800/600?q=dashboard%20screen&color=gray&dpr=2',
        headline:
          'Visibilidade executiva em tempo real. Uma camada de observabilidade instaurada em semanas, sem disrupção da infraestrutura atual.',
        dor: 'Governança baseada em latência de informações. Relatórios manuais obsoletos que induzem decisões executivas ao erro.',
        entregaveis:
          'Integração Power BI, Centralização de KPIs C-Level, Painel Analítico de Alta Fidelidade.',
        fit: 'Operações que demandam governança imediata com otimização de capital investido inicial.',
        prazo: '3 a 8 semanas.',
      },
    ],
  },
  'analise-e-modelagem': {
    title: 'Análise e Modelagem',
    headline:
      'Previsibilidade projetada. Algoritmos e modelos estatísticos para dominar o futuro de mercado.',
    description:
      'Transforme dados inertes em ativos preditivos e estanque perdas financeiras submersas em sua cadeia de valor.',
    services: [
      {
        id: 'modelagem',
        name: 'Modelagem Preditiva & Estatística Aplicada',
        image: 'https://img.usecurling.com/p/800/600?q=complex%20mathematics&color=gray&dpr=2',
        headline:
          'A matemática da antecipação. Projete cenários críticos e ancore suas decisões em probabilidade avançada.',
        dor: 'Navegação às cegas: incerteza crônica no provisionamento de estoque, precificação dinâmica e projeções de M&A.',
        entregaveis:
          'Algoritmos Preditivos, Análise de Variância (ANOVA), Simulações Estocásticas (What-if).',
        prazo: '4 a 12 semanas.',
      },
      {
        id: 'memorias',
        name: 'Engenharia de Memórias de Cálculo',
        image: 'https://img.usecurling.com/p/800/600?q=legal%20documents&color=gray&dpr=2',
        headline:
          'Auditoria e blindagem matemática. Imunize a governança corporativa contra assimetria de cálculos internos.',
        dor: 'Silos departamentais divergindo estruturalmente no cálculo de métricas vitais de balanço.',
        prazo: '1 a 3 semanas.',
      },
      {
        id: 'analise',
        name: 'Auditoria Analítica de Processos',
        image: 'https://img.usecurling.com/p/800/600?q=industrial%20engineering&color=gray&dpr=2',
        headline:
          'Exposição cirúrgica de perdas financeiras. Isolamos e neutralizamos ineficiências com rigor estatístico.',
        dor: 'Drenagem crônica de capital/matéria-prima sem lastro probatório da raiz do problema.',
        metodologia: 'Aplicações híbridas de Six Sigma: Modelos A3 ou DMAIC adaptativos.',
      },
    ],
  },
  'solucao-e-recorrencia': {
    title: 'Solução e Recorrência',
    headline: 'Automação autônoma. Infraestruturas definitivas para escala operacional irrestrita.',
    description:
      'Erradique a dependência manual. Terceirize a carga cognitiva analítica para nossa inteligência sistêmica.',
    services: [
      {
        id: 'power-bi',
        name: 'Arquitetura Corporativa de BI',
        image: 'https://img.usecurling.com/p/800/600?q=data%20center%20server&color=gray&dpr=2',
        headline:
          'O sistema nervoso da sua empresa. Uma fundação de Business Intelligence modelada para suportar trilhões de linhas.',
        dor: 'Colapso de performance: painéis lentos, arquiteturas fragmentadas e incapacidade de escala.',
      },
      {
        id: 'automacao',
        name: 'Hiperautomação de Fluxos',
        image: 'https://img.usecurling.com/p/800/600?q=robotic%20arm&color=gray&dpr=2',
        headline:
          'A força de trabalho invisível. Delegação de processos repetitivos para agentes de software de alta precisão.',
        entregaveis: 'Arquitetura RPA, Agentes em Python, Ecossistema Power Apps.',
      },
      {
        id: 'torre',
        name: 'Torre de Controle Analítico (TCA)',
        image: 'https://img.usecurling.com/p/800/600?q=control%20room%20screens&color=gray&dpr=2',
        headline:
          'Seu núcleo de inteligência terceirizado. O produto âncora para operações que exigem elite analítica sem overhead de RH.',
        fit: 'Board Executivo que necessita de excelência técnica imediata, sem o fardo de reter talentos raros de engenharia de dados.',
      },
    ],
  },
  'inteligencia-artificial': {
    title: 'Inteligência Artificial',
    headline: 'Prontidão computacional. A fundação necessária para a nova era cognitiva.',
    description:
      'Não construa sobre areia. Validamos sua maturidade algorítmica e forjamos o alicerce de dados exigido por modelos de IA.',
    services: [
      {
        id: 'ai-readiness',
        name: 'Auditoria de Prontidão IA (AI Readiness)',
        image:
          'https://img.usecurling.com/p/800/600?q=artificial%20intelligence%20brain&color=gray&dpr=2',
        headline:
          'Proteção contra hype. Avaliação contundente para garantir que seu investimento em IA gere ROI, não frustração.',
        entregaveis:
          'Stress-test de Infraestrutura, Matriz de Viabilidade de Negócio, Roadmap de Adoção C-Level.',
      },
      {
        id: 'governanca',
        name: 'Governança Estrita de Dados',
        image: 'https://img.usecurling.com/p/800/600?q=cyber%20security%20lock&color=gray&dpr=2',
        headline:
          'Higiene algorítmica. A espinha dorsal inegociável para sustentar a implementação de Machine Learning.',
        dor: 'O paradoxo "Garbage in, garbage out": lagos de dados poluídos gerando alucinações algorítmicas.',
      },
    ],
  },
}
