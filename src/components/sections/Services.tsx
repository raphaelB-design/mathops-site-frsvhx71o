import { FadeIn } from '@/components/fade-in'
import { ArrowRight, Clock, Layers } from 'lucide-react'
import { Link } from 'react-router-dom'
import { serviceLayers, diagnosticoEstrategico } from '@/config/servicesData'

interface ServiceCardItem {
  id: string
  name: string
  headline: string
  prazo: string
  entregaveis: string
  layerLabel: string
  layerSlug: string
  link: string
}

export function Services() {
  // Collect the 7 services across both layers + diagnostico
  const allServices: ServiceCardItem[] = [
    // Diagnostico Estrategico (Porta de entrada / Ponto zero)
    {
      id: diagnosticoEstrategico.id,
      name: diagnosticoEstrategico.name,
      headline: diagnosticoEstrategico.headline,
      prazo: diagnosticoEstrategico.deadline,
      entregaveis: diagnosticoEstrategico.deliverables.slice(0, 3).join(', '),
      layerLabel: 'Ponto Zero',
      layerSlug: 'diagnostico-e-visibilidade',
      link: '/diagnostico',
    },
    // Camada 1 services
    ...serviceLayers['diagnostico-e-visibilidade'].services.map((s) => ({
      id: s.id,
      name: s.name,
      headline: s.headline,
      prazo: s.prazo,
      entregaveis: s.modules ? s.modules.map((m) => m.name).join(' · ') : s.entregaveis,
      layerLabel: 'Camada 1',
      layerSlug: 'diagnostico-e-visibilidade',
      link: `/servicos/diagnostico-e-visibilidade?service=${s.id}`,
    })),
    // Camada 2 services
    ...serviceLayers['analise-e-modelagem'].services.map((s) => ({
      id: s.id,
      name: s.name,
      headline: s.headline,
      prazo: s.prazo,
      entregaveis: s.entregaveis,
      layerLabel: 'Camada 2',
      layerSlug: 'analise-e-modelagem',
      link: `/servicos/analise-e-modelagem?service=${s.id}`,
    })),
  ]

  return (
    <section
      id="servicos"
      className="py-24 md:py-32 px-6 md:px-12 w-full bg-white/5 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto w-full">
        <FadeIn>
          <div className="mb-14">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
              Nossas Soluções
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">
                  Matriz de Serviços Estratégicos
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed max-w-2xl">
                  Sete serviços em duas camadas: primeiro enxergar a operação com medição em tempo
                  real, depois modelar decisões com rigor estatístico.
                </p>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Passe o mouse para ver prazo e entregáveis
                </span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 4 columns desktop, 1 column mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {allServices.map((service, index) => (
            <FadeIn key={service.id} delay={60 + index * 40}>
              <Link
                to={service.link}
                className="group relative flex flex-col h-full bg-black/50 border border-white/10 p-6 hover:bg-black/80 hover:border-accent/50 hover:shadow-[0_10px_30px_-10px_rgba(45,95,168,0.25)] transition-all duration-300 rounded-sm overflow-hidden min-h-[300px]"
              >
                {/* Accent top bar */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-accent/40 group-hover:bg-accent transition-colors duration-300" />

                {/* Layer Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 border border-white/10 bg-white/5 text-white/70 rounded-sm uppercase tracking-wider group-hover:border-accent/40 group-hover:text-accent transition-colors">
                    {service.layerLabel}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    {service.prazo.split('(')[0].trim()}
                  </span>
                </div>

                {/* Service Name */}
                <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors leading-snug">
                  {service.name}
                </h3>

                {/* Headline */}
                <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {service.headline}
                </p>

                {/* Hover reveal: Prazo e Principais Entregáveis */}
                <div className="mt-auto pt-4 border-t border-white/10 space-y-2">
                  <div className="transition-all duration-300">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground block mb-1 flex items-center gap-1">
                      <Layers className="w-3 h-3 text-accent" />
                      Entregáveis principais:
                    </span>
                    <p className="font-body text-[11px] text-zinc-300 leading-snug line-clamp-2 group-hover:line-clamp-none transition-all">
                      {service.entregaveis}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-white/50 group-hover:text-white transition-colors pt-2">
                    Acessar serviço
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
