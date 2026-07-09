export interface Industry {
  slug: string
  title: string
  shortDescription: string
  description: string
  challenges: string[]
}

export const industries: Industry[] = [
  {
    slug: 'financeiro',
    title: 'Setor Financeiro',
    shortDescription: 'Defesa especializada para instituições financeiras e fintechs.',
    description:
      'Atuamos na defesa de instituições financeiras, fintechs e profissionais do setor, com profundo conhecimento da regulação bancária e dos riscos penais específicos do mercado financeiro.',
    challenges: [
      'Crimes contra o sistema financeiro',
      'Lavagem de dinheiro',
      'Operações não autorizadas',
      'Irregularidades em relatórios',
    ],
  },
  {
    slug: 'saude',
    title: 'Setor de Saúde',
    shortDescription: 'Proteção jurídica para hospitais, clínicas e profissionais de saúde.',
    description:
      'Defendemos hospitais, clínicas, laboratórios e profissionais de saúde em processos criminais relacionados ao exercício profissional, erros médicos e questões regulatórias.',
    challenges: [
      'Responsabilidade médica',
      'Irregularidades em procedimentos',
      'Fraudes em planos de saúde',
      'Descumprimento de normas sanitárias',
    ],
  },
  {
    slug: 'tecnologia',
    title: 'Setor de Tecnologia',
    shortDescription: 'Especialização em crimes digitais e proteção de dados.',
    description:
      'Atuamos na defesa de empresas de tecnologia e seus gestores em casos envolvendo crimes digitais, violação de dados, propriedade intelectual e questões de cibersegurança.',
    challenges: [
      'Crimes cibernéticos',
      'Violação de dados',
      'Pirataria digital',
      'Fraudes eletrônicas',
    ],
  },
  {
    slug: 'energia',
    title: 'Setor de Energia',
    shortDescription: 'Assessoria para o setor de energia e infraestrutura.',
    description:
      'Prestamos assessoria criminal a empresas do setor de energia, petróleo, gás e infraestrutura, tratando de questões ambientais, licenciamentos e operações complexas.',
    challenges: [
      'Crimes ambientais',
      'Irregularidades em licenciamentos',
      'Corrupção em contratos públicos',
      'Descumprimento de normas regulatórias',
    ],
  },
  {
    slug: 'imobiliario',
    title: 'Setor Imobiliário',
    shortDescription: 'Defesa para o setor imobiliário e da construção civil.',
    description:
      'Defendemos empresas do setor imobiliário e da construção civil em questões penais relacionadas a incorporações, fraudes em contratos e irregularidades em obras.',
    challenges: [
      'Fraudes em incorporação',
      'Irregularidades em obras',
      'Crimes contra o consumidor',
      'Lavagem de dinheiro imobiliária',
    ],
  },
]
