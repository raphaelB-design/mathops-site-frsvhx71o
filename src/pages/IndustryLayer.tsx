import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { industries } from '@/config/industriesData'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { trackClick } from '@/services/analytics'
import { useDiagnosticModal } from '@/context/DiagnosticModalContext'
import { FloatingContactWidget } from '@/components/FloatingContactWidget'

export default function IndustryLayer() {
  const { slug } = useParams()
  const { openDiagnostic } = useDiagnosticModal()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  const industry = industries.find((i) => i.slug === slug)

  const handleDiagnostic = (origin: string) => {
    trackClick('diagnostic_open', origin)
    openDiagnostic()
  }

  if (!slug || !industry) {
    return <Navigate to="/" replace />
  }

  const otherIndustries = industries.filter((i) => i.slug !== slug)

  return (
    <div className="bg-black min-h-screen pt-20">
      <section className="py-24 lg:py-32 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors duration-300 mb-12 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Início
          </Link>
          <p className="text-zinc-500 text-sm tracking-widest uppercase mb-4">
            Especialidade Setorial
          </p>
          <h1 className="font-serif text-4xl lg:text-6xl text-white tracking-tight mb-8">
            {industry.title}
          </h1>
          <p className="text-zinc-400 text-lg lg:text-xl leading-relaxed mb-12 max-w-2xl">
            {industry.description}
          </p>
          <button
            onClick={() => handleDiagnostic('industry_layer_hero')}
            className="group inline-flex items-center gap-2 bg-white text-black px-8 py-4 text-sm font-medium tracking-wide hover:bg-zinc-200 transition-all duration-300 mb-16"
          >
            Solicitar Diagnóstico Estratégico
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      <section className="py-24 border-t border-white/10 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl text-white mb-12">Principais Desafios</h2>
          <div className="space-y-6">
            {industry.challenges.map((challenge, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                <p className="text-zinc-300 text-base lg:text-lg">{challenge}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {otherIndustries.length > 0 && (
        <section className="py-24 border-t border-white/10 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-2xl text-white mb-12">Explore Outras Indústrias</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
              {otherIndustries.map((ind) => (
                <Link
                  key={ind.slug}
                  to={`/industrias/${ind.slug}`}
                  className="group bg-black p-8 hover:bg-zinc-900 transition-colors duration-300 flex flex-col"
                >
                  <h3 className="font-serif text-xl text-white mb-3">{ind.title}</h3>
                  <p className="text-zinc-400 text-sm flex-1">{ind.shortDescription}</p>
                  <span className="inline-flex items-center gap-2 text-zinc-500 text-xs mt-4 group-hover:text-white transition-colors duration-300">
                    Explorar
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24 border-t border-white/10 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl lg:text-4xl text-white tracking-tight mb-6">
            Pronto para conversar?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Solicite um diagnóstico estratégico e entenda como podemos ajudar.
          </p>
          <button
            onClick={() => handleDiagnostic('industry_layer_cta')}
            className="group inline-flex items-center gap-2 bg-white text-black px-8 py-4 text-sm font-medium tracking-wide hover:bg-zinc-200 transition-all duration-300"
          >
            Solicitar Diagnóstico Estratégico
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      <FloatingContactWidget />
    </div>
  )
}
