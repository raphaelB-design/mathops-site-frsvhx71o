import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { services } from '@/config/servicesData'
import { trackClick } from '@/services/analytics'
import { useDiagnosticModal } from '@/context/DiagnosticModalContext'

export function Services() {
  const { openDiagnostic } = useDiagnosticModal()

  const handleDiagnostic = () => {
    trackClick('diagnostic_open', 'services')
    openDiagnostic()
  }

  return (
    <section className="bg-black py-24 lg:py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 lg:mb-24">
          <p className="text-zinc-500 text-sm tracking-widest uppercase mb-4">Áreas de Atuação</p>
          <h2 className="font-serif text-4xl lg:text-6xl text-white tracking-tight">
            Defesa estratégica em
            <br className="hidden lg:block" />
            todas as frentes penais
          </h2>
        </div>
        <div className="space-y-px bg-white/10">
          {services.map((service) => (
            <Link
              key={service.slug}
              to={`/servicos/${service.slug}`}
              className="group flex items-start gap-6 lg:gap-12 bg-black p-6 lg:p-8 hover:bg-zinc-950 transition-colors duration-300"
            >
              <span className="font-serif text-2xl text-zinc-600 group-hover:text-white transition-colors duration-300">
                {service.number}
              </span>
              <div className="flex-1">
                <h3 className="font-serif text-xl lg:text-2xl text-white mb-2">{service.title}</h3>
                <p className="text-zinc-400 text-sm lg:text-base max-w-2xl">
                  {service.shortDescription}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-white transition-all duration-300 group-hover:translate-x-1 mt-1" />
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
