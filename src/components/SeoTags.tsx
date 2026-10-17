import { Helmet } from '@/components/Helmet'

export function SeoTags() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'MathOps Strategy',
    url: 'https://www.mathops.com.br',
    logo: 'https://www.mathops.com.br/og-image.png',
    description:
      'Consultoria especializada em Diagnóstico Estratégico e Visibilidade Operacional. Modelagem matemática, processos e inteligência analítica para PMEs e grandes empresas.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'São Paulo',
      addressRegion: 'SP',
      addressCountry: 'BR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+55-11-99155-3336',
      contactType: 'customer service',
      availableLanguage: 'Portuguese',
    },
    sameAs: ['https://www.linkedin.com/company/mathops-strategy'],
  }

  return (
    <Helmet>
      <title>MathOps Strategy | Consultoria em Dados, Processos e Indicadores de Gestão</title>
      <meta
        name="description"
        content="Decisões de gestão baseadas em dados. Painel executivo, 7 serviços em grade, metodologia clara, garantias e Diagnóstico Estratégico em São Paulo."
      />
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
    </Helmet>
  )
}
