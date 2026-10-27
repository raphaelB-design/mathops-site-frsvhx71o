import { FadeIn } from '@/components/fade-in'
import { useState } from 'react'
import { ArrowRight, Layers } from 'lucide-react'
import { Link } from 'react-router-dom'
import { serviceLayers, diagnosticoEstrategico } from '@/config/servicesData'
import { SectionBackdrop, SectionBackdropVariant } from '@/components/SectionBackdrop'

interface ServiceCardItem {
  id: string
  name: string
  headline: string
  entregaveis: string
  layerLabel: string
  layerSlug: string
  link: string
  backdropVariant?: SectionBackdropVariant
}

export function Services() {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null)
  // Collect the 9 services across three layers + diagnostico
  const allServices: ServiceCardItem[] = [
    // Diagnostico Estrategico (Porta de entrada / Ponto zero)
    {
      id: diagnosticoEstrategico.id,
      name: diagnosticoEstrategico.name,
      headline: diagnosticoEstrategico.headline,
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
      entregaveis: s.modules ? s.modules.map((m) => m.name).join(', ') : s.entregaveis,
      layerLabel: 'Camada 1',
      layerSlug: 'diagnostico-e-visibilidade',
      backdropVariant: 'process' as SectionBackdropVariant,
      link: `/servicos/diagnostico-e-visibilidade?service=${s.id}`,
    })),
    // Camada 2 services
    ...serviceLayers['analise-e-modelagem'].services.map((s) => ({
      id: s.id,
      name: s.name,
      headline: s.headline,
      entregaveis: s.entregaveis,
      layerLabel: 'Camada 2',
      layerSlug: 'analise-e-modelagem',
      backdropVariant: 'control' as SectionBackdropVariant,
      link: `/servicos/analise-e-modelagem?service=${s.id}`,
    })),
    // Camada 3 services
    ...serviceLayers['governanca-e-riscos'].services.map((s) => ({
      id: s.id,
      name: s.name,
      headline: s.headline,
      entregaveis: s.modules ? s.modules.map((m) => m.name).join(', ') : s.entregaveis,
      layerLabel: 'Camada 3',
      layerSlug: 'governanca-e-riscos',
      backdropVariant: 'risk' as SectionBackdropVariant,
      link: `/servicos/governanca-e-riscos?service=${s.id}`,
    })),
  ]

  return (
    <section
      id="servicos"
      className="relative py-24 md:py-32 px-6 md:px-12 w-full bg-[#0A0F1C] border-t border-[#1E293B] overflow-hidden"
    >
      {/* 1.3 Brilhos radiais suaves (#3B82F6 e #22D3EE, 10-15% de opacidade, blur alto) atrás da grade */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#3B82F6]/12 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[#22D3EE]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
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
                  Nove serviços em três camadas: enxergar a operação, modelar decisões e governar
                  riscos.
                </p>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground"></div>
            </div>
          </div>
        </FadeIn>

        {/* 4 columns desktop, 1 column mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {allServices.map((service, index) => (
            <FadeIn key={service.id} delay={60 + index * 40}>
              <Link
                to={service.link}
                onMouseEnter={() => setHoveredCardId(service.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className="premium-card group relative flex flex-col h-full p-6 rounded-lg overflow-hidden min-h-[300px]"
              >
                {/* 2.3 No hover de cada card, exibir dentro o modelo da sua camada em opacidade baixa */}
                {service.backdropVariant && hoveredCardId === service.id && (
                  <div className="absolute inset-0 pointer-events-none z-0">
                    <SectionBackdrop
                      variant={service.backdropVariant}
                      isHovered={true}
                      opacityClass="opacity-[0.22]"
                    />
                  </div>
                )}

                {/* Accent top bar */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent to-accent2 opacity-50 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                {/* Layer Badge */}
                <div className="relative z-10 flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 border border-[#1E293B] bg-[#0A0F1C]/80 text-[#94A3B8] rounded-sm uppercase tracking-wider group-hover:border-accent/40 group-hover:text-accent2 transition-colors">
                    {service.layerLabel}
                  </span>
                </div>

                {/* Service Name */}
                <h3 className="relative z-10 font-display text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors leading-snug">
                  {service.name}
                </h3>

                {/* Headline */}
                <p className="relative z-10 font-body text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {service.headline}
                </p>

                {/* Hover reveal: Principais Entregáveis */}
                <div className="relative z-10 mt-auto pt-4 border-t border-[#1E293B] space-y-2">
                  <div className="transition-all duration-300">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground block mb-1 flex items-center gap-1">
                      <Layers className="w-3 h-3 text-accent" />
                      Entregáveis principais:
                    </span>
                    <p className="font-body text-[11px] text-[#F5F4F0]/80 leading-snug line-clamp-2 group-hover:line-clamp-none transition-all">
                      {service.entregaveis}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground group-hover:text-accent2 transition-colors pt-2">
                    Acessar serviço
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 text-accent transition-transform" />
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
