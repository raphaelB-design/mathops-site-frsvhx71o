import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { industries } from '@/config/industriesData'
import { trackClick } from '@/services/analytics'
import { useDiagnosticModal } from '@/context/DiagnosticModalContext'

export function Industries() {
  const { openDiagnostic } = useDiagnosticModal()

  const handleDiagnostic = () => {
    trackClick('diagnostic_open', 'industries')
    openDiagnostic()
  }

  return (
    <section className="bg-zinc-950 py-24 lg:py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 lg:mb-24">
          <p className="text-zinc-500 text-sm tracking-widest uppercase mb-4">Indústrias</p>
          <h2 className="font-serif text-4xl lg:text-6xl text-white tracking-tight">
            Setores que dominamos
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              to={`/industrias/${industry.slug}`}
              className="group bg-zinc-950 p-8 hover:bg-black transition-colors duration-300 flex flex-col"
            >
              <h3 className="font-serif text-xl text-white mb-3">{industry.title}</h3>
              <p className="text-zinc-400 text-sm flex-1">{industry.shortDescription}</p>
              <span className="inline-flex items-center gap-2 text-zinc-500 text-xs mt-4 group-hover:text-white transition-colors duration-300">
                Explorar
                <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-16 text-center">
          <button
            onClick={handleDiagnostic}
            className="group inline-flex items-center gap-2 bg-white text-black px-8 py-4 text-sm font-medium tracking-wide hover:bg-zinc-200 transition-all duration-300"
          >
            Solicitar Diagnóstico Estratégico
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  )
}
