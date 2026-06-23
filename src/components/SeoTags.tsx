import { Helmet } from '@/components/Helmet'

export function SeoTags() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'MathOps Strategy',
    url: 'https://mathopsstrategy.com.br',
    logo: 'https://mathopsstrategy.com.br/logo.png',
    description:
      'Consultoria boutique especializada em modelagem matemática, automação de processos e inteligência analítica para PMEs e grandes empresas.',
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
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
    </Helmet>
  )
}
