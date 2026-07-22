import { Helmet } from '@/components/Helmet'

export function SeoTags() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'MathOps Strategy',
    url: 'https://www.mathops.com.br',
    logo: 'https://www.mathops.com.br/og-image.png',
    description:
      'Consultoria boutique especializada em Diagnóstico Estratégico e Visibilidade Operacional. Modelagem matemática, automação de processos e inteligência analítica para PMEs e grandes empresas.',
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
      <title>
        MathOps Strategy | Diagnóstico Estratégico e Visibilidade Operacional — São Paulo
      </title>
      <meta
        name="description"
        content="Diagnóstico Estratégico a partir de R$ 4.500 e Visibilidade Operacional com painéis executivos em tempo real. Consultoria boutique em modelagem matemática e inteligência analítica. São Paulo, Brasil."
      />
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
    </Helmet>
  )
}
