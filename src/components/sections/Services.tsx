import { FadeIn } from '@/components/fade-in'
import { useState } from 'react'
import { Layers, Eye, Cpu, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { serviceLayers } from '@/config/servicesData'
import { SectionBackdrop, SectionBackdropVariant } from '@/components/SectionBackdrop'

interface ServiceCardItem {
  id: string
  name: string
  headline: string
  modulesList: string[]
  layerNumber: 1 | 2 | 3
  layerName: string
  layerSlug: string
  backdropVariant: SectionBackdropVariant
}

const layerMetadata = [
  {
    number: 1,
    title: 'Camada 1 — Enxergar a Operação',
    slug: 'diagnostico-e-visibilidade',
    shortName: 'Visibilidade Operacional',
    icon: Eye,
    colorClasses: {
      badge:
        'border-blue-500/50 bg-blue-500/20 text-blue-300 shadow-[0_0_12px_rgba(59,130,246,0.22)] group-hover:border-blue-400/80 group-hover:bg-blue-500/25 group-hover:text-blue-100 group-hover:shadow-[0_0_18px_rgba(59,130,246,0.38)]',
      dot: 'bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.9)]',
      legendBorder: 'border-blue-500/30 bg-blue-500/5 text-blue-300',
      bullet: 'text-blue-400',
      bar: 'from-blue-500 via-blue-400 to-cyan-400',
    },
  },
  {
    number: 2,
    title: 'Camada 2 — Modelar Decisões',
    slug: 'analise-e-modelagem',
    shortName: 'Análise e Modelagem',
    icon: Cpu,
    colorClasses: {
      badge:
        'border-cyan-400/50 bg-cyan-400/20 text-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.22)] group-hover:border-cyan-300/80 group-hover:bg-cyan-400/25 group-hover:text-cyan-100 group-hover:shadow-[0_0_18px_rgba(34,211,238,0.38)]',
      dot: 'bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.9)]',
      legendBorder: 'border-cyan-500/30 bg-cyan-500/5 text-cyan-300',
      bullet: 'text-cyan-400',
      bar: 'from-cyan-500 via-cyan-400 to-sky-300',
    },
  },
  {
    number: 3,
    title: 'Camada 3 — Governança e Riscos',
    slug: 'governanca-e-riscos',
    shortName: 'Governança e Riscos',
    icon: ShieldCheck,
    colorClasses: {
      badge:
        'border-indigo-400/50 bg-indigo-500/20 text-indigo-200 shadow-[0_0_12px_rgba(129,140,248,0.22)] group-hover:border-indigo-300/80 group-hover:bg-indigo-500/25 group-hover:text-indigo-100 group-hover:shadow-[0_0_18px_rgba(129,140,248,0.38)]',
      dot: 'bg-indigo-300 shadow-[0_0_8px_rgba(165,180,252,0.9)]',
      legendBorder: 'border-indigo-500/30 bg-indigo-500/5 text-indigo-300',
      bullet: 'text-indigo-300',
      bar: 'from-indigo-500 via-indigo-400 to-cyan-400',
    },
  },
] as const

function parseDeliverables(entregaveisText: string): string[] {
  return entregaveisText
    .split(',')
    .map((item) => item.replace(/\.$/, '').trim())
    .filter((item) => item.length > 0)
}

export function Services() {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null)

  // Coleta os 9 serviços estritamente organizados nas três camadas estruturadas
  const allServices: ServiceCardItem[] = [
    // Camada 1: Visibilidade Operacional (3 serviços)
    ...serviceLayers['diagnostico-e-visibilidade'].services.map((s) => ({
      id: s.id,
      name: s.name,
      headline: s.headline,
      modulesList: s.modules
        ? s.modules.map((m) => m.name.trim())
        : parseDeliverables(s.entregaveis),
      layerNumber: 1 as const,
      layerName: 'Camada 1 — Enxergar a Operação',
      layerSlug: 'diagnostico-e-visibilidade',
      backdropVariant: 'process' as SectionBackdropVariant,
    })),
    // Camada 2: Análise e Modelagem (3 serviços)
    ...serviceLayers['analise-e-modelagem'].services.map((s) => ({
      id: s.id,
      name: s.name,
      headline: s.headline,
      modulesList: s.modules
        ? s.modules.map((m) => m.name.trim())
        : parseDeliverables(s.entregaveis),
      layerNumber: 2 as const,
      layerName: 'Camada 2 — Modelar Decisões',
      layerSlug: 'analise-e-modelagem',
      backdropVariant: 'control' as SectionBackdropVariant,
    })),
    // Camada 3: Governança e Riscos (3 serviços: inclui Gestão de Riscos Organizacionais e Transformação Organizacional)
    ...serviceLayers['governanca-e-riscos'].services.map((s) => ({
      id: s.id,
      name: s.name,
      headline: s.headline,
      modulesList: s.modules
        ? s.modules.map((m) => m.name.trim())
        : parseDeliverables(s.entregaveis),
      layerNumber: 3 as const,
      layerName: 'Camada 3 — Governança e Riscos',
      layerSlug: 'governanca-e-riscos',
      backdropVariant: 'risk' as SectionBackdropVariant,
    })),
  ]

  const getLayerColor = (layerNum: 1 | 2 | 3) => {
    return (
      layerMetadata.find((l) => l.number === layerNum)?.colorClasses ||
      layerMetadata[0].colorClasses
    )
  }

  return (
    <section
      id="servicos"
      className="relative py-24 md:py-32 px-6 md:px-12 w-full bg-[#0A0F1C] border-t border-[#1E293B] overflow-hidden"
    >
      {/* Brilhos radiais atmosféricos (#3B82F6 e #22D3EE, 10-15% de opacidade, blur alto) */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[650px] h-[650px] bg-[#3B82F6]/12 blur-[170px] rounded-full pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-16 right-1/4 w-[550px] h-[550px] bg-[#22D3EE]/10 blur-[160px] rounded-full pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Cabeçalho da Seção com espaçamento generoso e alinhamento equilibrado */}
        <FadeIn>
          <div className="max-w-3xl mb-12 md:mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
              Nossas Soluções
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[46px] font-bold text-white tracking-tight mb-5 leading-[1.15]">
              Matriz de Serviços Estratégicos
            </h2>
            <p className="font-body text-base md:text-lg text-[#94A3B8] leading-relaxed">
              Nove serviços em três camadas: enxergar a operação, modelar decisões e governar
              riscos.
            </p>
          </div>
        </FadeIn>

        {/* Faixa/Linha de Legenda das Camadas antes da grade */}
        <FadeIn delay={80}>
          <div
            aria-label="Legenda das camadas da Matriz de Serviços"
            className="mb-10 md:mb-12 p-3 sm:p-4 rounded-xl border border-[#1E293B] bg-[#111827]/60 backdrop-blur-md"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#94A3B8] font-semibold flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                Estrutura em 3 Camadas:
              </span>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {layerMetadata.map((layer) => {
                  const Icon = layer.icon
                  return (
                    <div
                      key={layer.number}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-mono transition-colors ${layer.colorClasses.legendBorder}`}
                    >
                      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                      <span className="font-semibold text-white/90">{layer.title}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Grade de 9 serviços: 3 colunas no desktop, 2 no tablet e 1 no mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {allServices.map((service, index) => {
            const colors = getLayerColor(service.layerNumber)
            const isHovered = hoveredCardId === service.id

            return (
              <FadeIn key={service.id} delay={100 + (index % 3) * 60}>
                <article
                  onMouseEnter={() => setHoveredCardId(service.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  className="premium-card group relative flex flex-col h-full p-6 sm:p-7 rounded-xl overflow-hidden min-h-[380px] bg-[#111827]/80 hover:bg-[#111827]/95 transition-all duration-300"
                >
                  {/* Backdrop animado da camada correspondente no hover com opacidade baixa */}
                  {service.backdropVariant && isHovered && (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300"
                    >
                      <SectionBackdrop
                        variant={service.backdropVariant}
                        isHovered={true}
                        opacityClass="opacity-[0.22]"
                      />
                    </div>
                  )}

                  {/* Barra de acento sutil no topo do card */}
                  <div
                    aria-hidden="true"
                    className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent via-accent2 to-accent opacity-40 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  />

                  {/* Topo do card: Etiqueta/Chip refinado por camada */}
                  <div className="relative z-10 flex items-center justify-between mb-4">
                    <span
                      className={`inline-flex items-center gap-2 font-mono text-xs font-semibold px-3 py-1.5 border rounded-md uppercase tracking-wider backdrop-blur-sm transition-all duration-200 ${colors.badge}`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${colors.dot}`}
                        aria-hidden="true"
                      />
                      <span className="truncate">{service.layerName}</span>
                    </span>
                  </div>

                  {/* Título do Serviço */}
                  <h3 className="relative z-10 font-display text-xl font-bold text-white mb-2.5 group-hover:text-accent2 transition-colors duration-200 leading-snug">
                    {service.name}
                  </h3>

                  {/* Headline do Serviço com contraste aprimorado */}
                  <p className="relative z-10 font-body text-sm text-[#CBD5E1] leading-relaxed mb-6">
                    {service.headline}
                  </p>

                  {/* Bloco de Entregáveis / Módulos estruturado em lista vertical com marcador sutil */}
                  <div className="relative z-10 mt-auto pt-4 border-t border-[#1E293B]/90 space-y-2.5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8] flex items-center gap-1.5 font-semibold">
                      <Layers className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                      Entregáveis principais:
                    </span>

                    <ul className="space-y-1.5 pt-1" aria-label="Módulos e entregáveis">
                      {service.modulesList.map((item, mIdx) => (
                        <li
                          key={mIdx}
                          className="font-body text-xs text-[#F1F5F9]/85 leading-snug flex items-start gap-2 group-hover:text-white transition-colors"
                        >
                          <CheckCircle2
                            className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${colors.bullet} opacity-80`}
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
