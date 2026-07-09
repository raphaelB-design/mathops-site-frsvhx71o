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
        id: 'modelagem',
        name: 'Modelagem Preditiva & Estatística Aplicada',
        image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80',
        headline:
          'A matemática da antecipação. Projete cenários críticos e ancore suas decisões em probabilidade, não em estimativa.',
        dor: 'Navegação às cegas: incerteza crônica no provisionamento de estoque, precificação dinâmica e projeções de M&A.',
        entregaveis:
          'Algoritmos Preditivos, Análise de Variância (ANOVA), Simulações Estocásticas (Monte Carlo / What-if).',
        tecnicos: 'Regressão Múltipla, Séries Temporais (ARIMA), Testes de Hipótese Rigorosos.',
        fit: 'Empresas lidando com alta volatilidade de demanda e necessidade de planejamento estratégico preciso.',
        prazo: '4 a 12 semanas.',
      },
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
      {
        id: 'analise',
        name: 'Avaliação Analítica de Processos',
        image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
        headline:
          'Isolamento estatístico das causas de perda. Identificamos onde a margem se desfaz, e por quê.',
        dor: 'Perda recorrente de capital e matéria-prima sem causa identificada.',
        entregaveis:
          'Mapeamento de Desperdícios, Análise de Causa Raiz, Matriz de Priorização de Melhorias.',
        tecnicos:
          'Metodologia Six Sigma, Análise A3, Diagrama de Ishikawa, Cartas de Controle de Processo.',
        fit: 'Indústrias e operações de larga escala enfrentando quebra de margem inexplicável.',
        prazo: '3 a 6 semanas.',
        metodologia: 'Aplicações híbridas de Six Sigma: Modelos A3 ou DMAIC adaptativos.',
      },
    ],
  },
  'solucao-e-recorrencia': {
    title: 'Solução e Automação',
    headline: 'Automação estruturada. Infraestrutura sustentável para escala operacional contínua.',
    description:
      'Reduza a dependência manual com um núcleo de dados que evolui continuamente ao lado do seu time.',
    heroImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80',
    layerNumber: 3,
    investmentFrom: 'a partir de R$ 35.000 ou retainer mensal',
    metrics: [
      { value: 'SLA', label: 'Contrato de nível de serviço contínuo' },
      { value: 'DevOps', label: 'Sustentação técnica contínua' },
      { value: 'Sob demanda', label: 'Evolução arquitetural contínua' },
    ],
    anchor: true,
    anchorProductId: 'torre',
    forWhom:
      'Para líderes que entendem o valor da inteligência analítica mas não querem — nem devem — gerenciar uma área técnica interna. Um núcleo de dados operando como extensão do seu board, com SLA definido e evolução contínua.',
    problemStatement:
      'Sua operação já provou que dados importam. Agora precisa que eles funcionem sem depender de ninguém.',
    services: [
      {
        id: 'automacao',
        name: 'Hiperautomação de Fluxos',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
        headline:
          'A força de trabalho invisível. Delegação de processos repetitivos para agentes de software de alta precisão.',
        dor: 'Equipes de alta remuneração presas a tarefas operacionais manuais de conciliação e transcrição de dados.',
        entregaveis: 'Arquitetura RPA, Agentes em Python, Ecossistema Power Apps.',
        tecnicos:
          'Automação Python (Selenium/Pandas), Power Automate Integrado, Orquestração de APIs.',
        fit: 'Operações com alto volume de tarefas repetitivas, baseadas em regras claras e sujeitas a erro humano.',
        prazo: '4 a 10 semanas.',
      },
      {
        id: 'torre',
        name: 'Torre de Controle Analítico (TCA)',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
        headline:
          'Seu núcleo de inteligência terceirizado. O produto âncora para operações que exigem elite analítica sem overhead de RH.',
        dor: 'Incapacidade de recrutar, reter e gerenciar talentos sêniores de dados internamente.',
        entregaveis:
          'Gestão Contínua de Dados, Sustentação de Painéis, Evolução Arquitetural Sob Demanda.',
        tecnicos:
          'SLA de Alta Disponibilidade, Monitoramento Proativo de Servidores, DevOps de Dados Contínuo.',
        fit: 'Board Executivo que necessita de excelência técnica imediata, sem o fardo de reter talentos raros de engenharia de dados.',
        prazo: 'Recorrente (SLA contínuo).',
        implementationPhase: {
          id: 'power-bi',
          name: 'Arquitetura Corporativa de BI',
          image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80',
          headline:
            'O sistema nervoso da sua empresa. Uma fundação de Business Intelligence modelada para escalar sem degradação de performance.',
          dor: 'Colapso de performance: painéis lentos, arquiteturas fragmentadas e incapacidade de escala.',
          entregaveis:
            'Data Warehouse Otimizado, Modelos Tabulares Escaláveis, Governança de Acessos.',
          tecnicos:
            'ETL em Nuvem (Azure/AWS), Modelagem Dimensional Avançada, Otimização de Performance DAX.',
          fit: 'Organizações com volume massivo de dados sofrendo com lentidão e indisponibilidade de relatórios.',
          prazo: '8 a 16 semanas.',
        },
      },
    ],
  },
  'inteligencia-artificial': {
    title: 'Preparação para IA',
    headline: 'Prontidão validada. A fundação de dados necessária antes de investir em IA.',
    description:
      'Antes de vender IA para você, verificamos se ela vai funcionar. A maior parte dos projetos falha porque a base de dados não sustentava o modelo.',
    heroImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1920&q=80',
    layerNumber: 4,
    investmentFrom: 'a partir de R$ 22.000',
    metrics: [
      { value: '3–6sem', label: 'Para diagnóstico completo de prontidão' },
      { value: 'Data Quality', label: 'Assessment aplicado à base existente' },
      { value: 'Roadmap', label: 'Plano de adoção antes de qualquer aporte' },
    ],
    anchor: true,
    anchorProductId: 'ai-readiness',
    forWhom:
      'Para C-levels sob pressão de adotar IA sem ter certeza se a infraestrutura de dados suporta isso. O diagnóstico de prontidão é a checagem que antes do aporte, não a promessa que vem depois dele.',
    problemStatement:
      'Antes de investir em IA, descubra se sua empresa está pronta para recebê-la.',
    services: [
      {
        id: 'ai-readiness',
        name: 'Diagnóstico de Prontidão para IA',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
        headline:
          'Avaliação rigorosa antes do aporte. Se a base não sustenta o modelo, dizemos com todas as letras, e mostramos o que falta.',
        dor: 'Pressão do board para adotar Inteligência Artificial sem infraestrutura de dados ou casos de uso validados.',
        entregaveis:
          'Stress-test de Infraestrutura, Matriz de Viabilidade de Negócio, Roadmap de Adoção C-Level.',
        tecnicos:
          'Assessment de Qualidade de Dados (Data Quality), Análise de Débito Técnico, Mapeamento de Casos de Uso (NLP/Visão Computacional).',
        fit: 'C-Levels buscando validação pragmática antes de aportar capital em iniciativas de Machine Learning.',
        prazo: '3 a 6 semanas.',
      },
      {
        id: 'governanca',
        name: 'Governança de Dados',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
        headline: 'A base que sustenta qualquer modelo. Sem dado confiável, não há IA confiável.',
        dor: 'Dado ruim entra, decisão ruim sai. Bases desorganizadas produzem modelos que não se pode confiar.',
        entregaveis:
          'Dicionário de Dados Corporativo, Políticas de Acesso Restrito, Padrões de Higiene e Qualidade.',
        tecnicos:
          'Master Data Management (MDM), Linhagem de Dados (Data Lineage), Catalogação de Metadados.',
        fit: 'Empresas que acumularam dados não estruturados por anos e agora precisam normalizá-los para treinamento de modelos.',
        prazo: '6 a 12 semanas.',
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
