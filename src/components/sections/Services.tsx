import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { Layers, Eye, Cpu, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react'
import { serviceLayers } from '@/config/servicesData'
import { SectionBackdrop, SectionBackdropVariant } from '@/components/SectionBackdrop'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

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
    shortName: 'Enxergar a Operação',
    description:
      'Elimine zonas de sombra com medição em tempo real e engenharia reversa de processos.',
    icon: Eye,
    colorClasses: {
      badge:
        'border-accent/40 bg-accent/15 text-blue-200 group-hover:border-accent/70 group-hover:bg-accent/20 group-hover:text-blue-100',
      dot: 'bg-accent',
      legendBorder: 'border-accent/30 bg-accent/5 text-blue-200',
      bullet: 'text-accent',
      bar: 'from-accent via-accent/80 to-accent2',
      indicator: 'bg-accent',
      indicatorGlow: 'shadow-[0_0_12px_rgba(61,99,221,0.5)]',
      textActive: 'text-blue-200',
    },
  },
  {
    number: 2,
    title: 'Camada 2 — Modelar Decisões',
    slug: 'analise-e-modelagem',
    shortName: 'Modelar Decisões',
    description:
      'Modelos estatísticos e auditoria de cálculos para decisões sólidas e previsíveis.',
    icon: Cpu,
    colorClasses: {
      badge:
        'border-accent2/40 bg-accent2/15 text-teal-200 group-hover:border-accent2/70 group-hover:bg-accent2/20 group-hover:text-teal-100',
      dot: 'bg-accent2',
      legendBorder: 'border-accent2/30 bg-accent2/5 text-teal-200',
      bullet: 'text-accent2',
      bar: 'from-accent2 via-accent2/80 to-sky-300',
      indicator: 'bg-accent2',
      indicatorGlow: 'shadow-[0_0_12px_rgba(46,184,166,0.5)]',
      textActive: 'text-teal-200',
    },
  },
  {
    number: 3,
    title: 'Camada 3 — Governança e Riscos',
    slug: 'governanca-e-riscos',
    shortName: 'Governança e Riscos',
    description: 'Do apetite a risco à efetividade dos controles e execução estratégica auditável.',
    icon: ShieldCheck,
    colorClasses: {
      badge:
        'border-indigo-400/40 bg-indigo-500/15 text-indigo-200 group-hover:border-indigo-300/70 group-hover:bg-indigo-500/20 group-hover:text-indigo-100',
      dot: 'bg-indigo-300',
      legendBorder: 'border-indigo-500/30 bg-indigo-500/5 text-indigo-300',
      bullet: 'text-indigo-300',
      bar: 'from-indigo-500 via-indigo-400 to-accent2',
      indicator: 'bg-indigo-400',
      indicatorGlow: 'shadow-[0_0_12px_rgba(129,140,248,0.5)]',
      textActive: 'text-indigo-200',
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
  const [highlightedCardId, setHighlightedCardId] = useState<string | null>(null)
  const [activeLayerNumber, setActiveLayerNumber] = useState<1 | 2 | 3>(1)
  const location = useLocation()
  const prefersReducedMotion = useReducedMotion()

  const layer1Ref = useRef<HTMLDivElement>(null)
  const layer2Ref = useRef<HTMLDivElement>(null)
  const layer3Ref = useRef<HTMLDivElement>(null)

  // IntersectionObserver para detectar a camada ativa no desktop e scroll (threshold 0.5)
  useEffect(() => {
    const refs = [
      { number: 1 as const, el: layer1Ref.current },
      { number: 2 as const, el: layer2Ref.current },
      { number: 3 as const, el: layer3Ref.current },
    ]

    const validElements = refs.filter(
      (item): item is { number: 1 | 2 | 3; el: HTMLDivElement } => item.el !== null,
    )
    if (validElements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const found = validElements.find((item) => item.el === entry.target)
            if (found) {
              setActiveLayerNumber(found.number)
            }
          }
        })
      },
      {
        threshold: 0.5,
      },
    )

    validElements.forEach((item) => observer.observe(item.el))

    return () => {
      observer.disconnect()
    }
  }, [])

  // Efeito para rolar e destacar card quando a página for carregada ou quando mudar o hash
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash
      if (!hash) return

      const rawId = hash.replace('#', '')
      const targetElement =
        document.getElementById(rawId) || document.getElementById(`servico-${rawId}`)

      if (targetElement) {
        setHighlightedCardId(rawId)
        targetElement.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'center',
        })
      }
    }

    if (location.hash) {
      handleHash()
      const t1 = setTimeout(handleHash, 80)
      const t2 = setTimeout(handleHash, 280)
      const clearTimer = setTimeout(() => {
        setHighlightedCardId(null)
      }, 2500)

      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
        clearTimeout(clearTimer)
      }
    }
  }, [location.hash, location.pathname, prefersReducedMotion])

  // Ouvinte adicional de hashchange para quando clicar em serviços repetidamente dentro da própria Home
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash
      if (!hash) return

      const rawId = hash.replace('#', '')
      const targetElement =
        document.getElementById(rawId) || document.getElementById(`servico-${rawId}`)

      if (targetElement) {
        setHighlightedCardId(rawId)
        targetElement.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'center',
        })
        setTimeout(() => {
          setHighlightedCardId(null)
        }, 2500)
      }
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [prefersReducedMotion])

  // Organização dos 9 serviços divididos estritamente nas 3 camadas
  const layer1Services: ServiceCardItem[] = serviceLayers[
    'diagnostico-e-visibilidade'
  ].services.map((s) => ({
    id: s.id,
    name: s.name,
    headline: s.headline,
    modulesList: s.modules ? s.modules.map((m) => m.name.trim()) : parseDeliverables(s.entregaveis),
    layerNumber: 1 as const,
    layerName: 'Camada 1 — Enxergar a Operação',
    layerSlug: 'diagnostico-e-visibilidade',
    backdropVariant: 'process' as SectionBackdropVariant,
  }))

  const layer2Services: ServiceCardItem[] = serviceLayers['analise-e-modelagem'].services.map(
    (s) => ({
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
    }),
  )

  const layer3Services: ServiceCardItem[] = serviceLayers['governanca-e-riscos'].services.map(
    (s) => ({
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
    }),
  )

  const layersGroup = [
    {
      meta: layerMetadata[0],
      services: layer1Services,
      ref: layer1Ref,
      backdropVariant: 'process' as SectionBackdropVariant,
    },
    {
      meta: layerMetadata[1],
      services: layer2Services,
      ref: layer2Ref,
      backdropVariant: 'control' as SectionBackdropVariant,
    },
    {
      meta: layerMetadata[2],
      services: layer3Services,
      ref: layer3Ref,
      backdropVariant: 'risk' as SectionBackdropVariant,
    },
  ]

  const handleNavClick = (layerNum: 1 | 2 | 3) => {
    const targetRef = layerNum === 1 ? layer1Ref : layerNum === 2 ? layer2Ref : layer3Ref
    if (targetRef.current) {
      targetRef.current.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <section
      id="servicos"
      className="relative py-24 md:py-32 px-6 md:px-12 w-full bg-[#0A0F1C] border-t border-[#1E293B] overflow-hidden"
    >
      {/* Brilhos radiais atmosféricos */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[650px] h-[650px] bg-accent/12 blur-[170px] rounded-full pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-16 right-1/4 w-[550px] h-[550px] bg-accent2/10 blur-[160px] rounded-full pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Cabeçalho da Seção */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
            Nossas Soluções
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-[46px] font-bold text-white tracking-tight mb-5 leading-[1.15]">
            Matriz de Serviços Estratégicos
          </h2>
          <p className="font-body text-base md:text-lg text-[#94A3B8] leading-relaxed">
            Nove serviços em três camadas: enxergar a operação, modelar decisões e governar riscos.
          </p>
        </div>

        {/* Faixa/Linha de Legenda das Camadas antes da narrativa */}
        <div
          aria-label="Legenda das camadas da Matriz de Serviços"
          className="mb-12 md:mb-16 p-3 sm:p-4 rounded-xl border border-[#1E293B] bg-[#111827]/60 backdrop-blur-md"
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
                  <button
                    key={layer.number}
                    type="button"
                    onClick={() => handleNavClick(layer.number)}
                    className={cn(
                      'inline-flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-mono transition-all cursor-pointer',
                      layer.colorClasses.legendBorder,
                      activeLayerNumber === layer.number && 'ring-1 ring-white/30',
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                    <span className="font-semibold text-white/90">{layer.title}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* LAYOUT CONTAINER:
            - Desktop (lg+): grid de duas colunas com índice sticky à esquerda e blocos de narrativa à direita
            - Mobile (<lg): layout empilhado tradicional sem sticky
        */}
        <div className="services-story-container lg:grid lg:grid-cols-12 lg:gap-12 relative items-start">
          {/* COLUNA ESQUERDA (DESKTOP STICKY top-24) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24 z-20 self-start">
            <div className="p-6 rounded-2xl border border-[#1E293B] bg-[#0E1626]/85 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute -top-12 -right-12 w-32 h-32 bg-accent/15 blur-2xl rounded-full pointer-events-none"
              />

              <div className="flex items-center gap-2 mb-6">
                <span className="font-mono text-[11px] uppercase tracking-widest text-accent font-bold">
                  Navegação de Camadas
                </span>
              </div>

              {/* Trilho de progresso e botões das camadas */}
              <div className="relative pl-6 space-y-8">
                {/* Linha vertical de progresso */}
                <div
                  aria-hidden="true"
                  className="absolute left-2 top-2 bottom-2 w-0.5 bg-[#1E293B] rounded-full overflow-hidden"
                >
                  <div
                    className={cn(
                      'scroll-story-timeline-fill w-full bg-gradient-to-b from-accent via-accent2 to-indigo-400 transition-all duration-400 ease-smooth',
                      prefersReducedMotion ? 'transition-none' : '',
                    )}
                    style={{
                      height:
                        activeLayerNumber === 1 ? '33%' : activeLayerNumber === 2 ? '66%' : '100%',
                    }}
                  />
                </div>

                {layerMetadata.map((layer) => {
                  const isActive = activeLayerNumber === layer.number
                  const Icon = layer.icon

                  return (
                    <button
                      key={layer.number}
                      type="button"
                      onClick={() => handleNavClick(layer.number)}
                      className={cn(
                        'group/nav relative text-left w-full transition-all duration-400 ease-smooth flex flex-col gap-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-lg p-2 -ml-2',
                        isActive ? 'opacity-100' : 'opacity-40 hover:opacity-75',
                        prefersReducedMotion && '!opacity-100 !transition-none',
                      )}
                    >
                      {/* Marcador no trilho */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute -left-6 top-3 w-4 h-4 rounded-full border-2 border-[#0A0F1C] flex items-center justify-center transition-all duration-400 ease-smooth',
                          isActive
                            ? `${layer.colorClasses.indicator} ${layer.colorClasses.indicatorGlow} scale-110`
                            : 'bg-[#1E293B]',
                          prefersReducedMotion && '!transition-none',
                        )}
                      >
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>

                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#94A3B8] tracking-wider uppercase">
                          0{layer.number}
                        </span>
                        <Icon
                          className={cn(
                            'w-4 h-4 transition-colors',
                            isActive ? layer.colorClasses.bullet : 'text-zinc-500',
                          )}
                        />
                        <span
                          className={cn(
                            'font-display text-base font-bold transition-colors leading-snug',
                            isActive ? 'text-white' : 'text-zinc-400 group-hover/nav:text-zinc-200',
                          )}
                        >
                          {layer.shortName}
                        </span>
                      </div>

                      <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2 pl-6">
                        {layer.description}
                      </p>

                      <div className="pl-6 pt-1 flex items-center gap-1 text-[11px] font-mono text-accent/80 font-medium">
                        <span>Ver serviços</span>
                        <ChevronRight className="w-3 h-3 group-hover/nav:translate-x-0.5 transition-transform" />
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Rodapé do card sticky */}
              <div className="mt-8 pt-5 border-t border-[#1E293B]/80 flex items-center justify-between text-xs text-[#94A3B8] font-mono"></div>
            </div>
          </aside>

          {/* COLUNA DIREITA:
              No Desktop (lg+), cada camada é um bloco de ~90vh com transição de opacidade (ativa 1, inativas 0.35).
              No Mobile (<lg), blocos normais empilhados com opacity 1 e sem sticky.
          */}
          <div className="lg:col-span-8 flex flex-col gap-16 lg:gap-24">
            {layersGroup.map((layerGroup) => {
              const layerNum = layerGroup.meta.number
              const isActive = activeLayerNumber === layerNum
              const colors = layerGroup.meta.colorClasses
              const Icon = layerGroup.meta.icon

              return (
                <div
                  key={layerNum}
                  ref={layerGroup.ref}
                  data-layer-number={layerNum}
                  className={cn(
                    'relative rounded-2xl p-6 sm:p-8 lg:p-10 border transition-all duration-400 ease-smooth',
                    // Altura aproximada no desktop para scroll storytelling
                    'lg:min-h-[88vh] lg:flex lg:flex-col lg:justify-between',
                    // Transição de opacidade e destaque da camada
                    isActive
                      ? 'opacity-100 border-[#1E293B] bg-[#111827]/40 shadow-xl'
                      : 'lg:opacity-35 opacity-100 border-[#1E293B]/60 bg-[#111827]/20 hover:opacity-75',
                    // prefers-reduced-motion desliga transição e força opacidade total
                    prefersReducedMotion && '!opacity-100 !transition-none',
                  )}
                >
                  {/* Backdrop temático SVG da camada ativo quando a camada está ativa */}
                  <div
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-0 pointer-events-none z-0 rounded-2xl overflow-hidden transition-opacity duration-400 ease-smooth',
                      isActive ? 'opacity-100' : 'opacity-15',
                      prefersReducedMotion && '!opacity-60 !transition-none',
                    )}
                  >
                    <SectionBackdrop
                      variant={layerGroup.backdropVariant}
                      isHovered={isActive}
                      opacityClass={isActive ? 'opacity-[0.22]' : 'opacity-[0.10]'}
                    />
                  </div>

                  {/* Header da Camada */}
                  <div className="relative z-10 mb-8 sm:mb-10">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={cn(
                          'inline-flex items-center gap-2 font-mono text-xs font-semibold px-3 py-1.5 border rounded-md uppercase tracking-wider backdrop-blur-sm',
                          colors.badge,
                        )}
                      >
                        <span className={cn('w-2 h-2 rounded-full shrink-0', colors.dot)} />
                        <span>0{layerNum}</span>
                      </span>
                      <div className="flex items-center gap-2 text-white/90 font-mono text-xs font-semibold">
                        <Icon className="w-4 h-4 text-accent" />
                        <span>{layerGroup.meta.title}</span>
                      </div>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                      {layerGroup.meta.shortName}
                    </h3>
                    <p className="font-body text-sm sm:text-base text-[#94A3B8] max-w-2xl leading-relaxed">
                      {layerGroup.meta.description}
                    </p>
                  </div>

                  {/* Cards dos serviços desta camada (3 cards por camada) */}
                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 my-auto">
                    {layerGroup.services.map((service, sIndex) => {
                      const isHovered = hoveredCardId === service.id
                      const globalIndex = (layerNum - 1) * 3 + sIndex

                      const isHighlighted =
                        highlightedCardId === service.id ||
                        highlightedCardId === `servico-${service.id}` ||
                        (globalIndex === 0 &&
                          (highlightedCardId === 'diagnostico-estrategico' ||
                            highlightedCardId === 'servico-diagnostico-estrategico'))

                      const mainCardId =
                        globalIndex === 0
                          ? 'servico-diagnostico-estrategico'
                          : `servico-${service.id}`

                      return (
                        <article
                          key={service.id}
                          id={mainCardId}
                          onMouseEnter={() => setHoveredCardId(service.id)}
                          onMouseLeave={() => setHoveredCardId(null)}
                          className={cn(
                            'premium-card group relative flex flex-col h-full p-5 sm:p-6 rounded-xl overflow-hidden min-h-[360px] bg-[#111827]/85 hover:bg-[#111827]/95 transition-all duration-300 scroll-mt-28',
                            isHighlighted && 'card-highlight-active',
                          )}
                        >
                          {/* Âncoras invisíveis adicionais para suportar IDs diretos e compatibilidade */}
                          <span
                            id={service.id}
                            className="sr-only scroll-mt-28"
                            aria-hidden="true"
                          />
                          <span
                            id={`servico-${service.id}`}
                            className="sr-only scroll-mt-28"
                            aria-hidden="true"
                          />
                          {globalIndex === 0 && (
                            <span
                              id="diagnostico-estrategico"
                              className="sr-only scroll-mt-28"
                              aria-hidden="true"
                            />
                          )}

                          {/* Backdrop individual do card no hover */}
                          {service.backdropVariant && isHovered && (
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300"
                            >
                              <SectionBackdrop
                                variant={service.backdropVariant}
                                isHovered={true}
                                opacityClass="opacity-[0.25]"
                              />
                            </div>
                          )}

                          {/* Barra de acento sutil no topo do card */}
                          <div
                            aria-hidden="true"
                            className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent via-accent2 to-accent opacity-40 group-hover:opacity-100 transition-opacity duration-300 z-10"
                          />

                          {/* Topo do card: Chip refinado por camada */}
                          <div className="relative z-10 flex items-center justify-between mb-3.5">
                            <span
                              className={cn(
                                'inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold px-2.5 py-1 border rounded-md uppercase tracking-wider backdrop-blur-sm transition-all duration-200',
                                colors.badge,
                              )}
                            >
                              <span
                                className={cn('w-1.5 h-1.5 rounded-full shrink-0', colors.dot)}
                              />
                              <span className="truncate">{layerGroup.meta.shortName}</span>
                            </span>
                          </div>

                          {/* Título do Serviço */}
                          <h4 className="relative z-10 font-display text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-accent2 transition-colors duration-200 leading-snug">
                            {service.name}
                          </h4>

                          {/* Headline do Serviço */}
                          <p className="relative z-10 font-body text-xs sm:text-sm text-[#CBD5E1] leading-relaxed mb-5">
                            {service.headline}
                          </p>

                          {/* Bloco de Entregáveis / Módulos */}
                          <div className="relative z-10 mt-auto pt-3.5 border-t border-[#1E293B]/90 space-y-2">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8] flex items-center gap-1.5 font-semibold">
                              <Layers className="w-3 h-3 text-accent" aria-hidden="true" />
                              Entregáveis principais:
                            </span>

                            <ul className="space-y-1.5 pt-0.5" aria-label="Módulos e entregáveis">
                              {service.modulesList.map((item, mIdx) => (
                                <li
                                  key={mIdx}
                                  className="font-body text-xs text-[#F1F5F9]/85 leading-snug flex items-start gap-1.5 group-hover:text-white transition-colors"
                                >
                                  <CheckCircle2
                                    className={cn(
                                      'w-3.5 h-3.5 mt-0.5 shrink-0 opacity-80',
                                      colors.bullet,
                                    )}
                                    aria-hidden="true"
                                  />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </article>
                      )
                    })}
                  </div>

                  {/* Rodapé sutil de cada camada */}
                  <div className="relative z-10 mt-8 pt-4 border-t border-[#1E293B]/60 flex items-center justify-between text-xs text-[#94A3B8]">
                    <button
                      type="button"
                      onClick={() =>
                        handleNavClick(layerNum < 3 ? ((layerNum + 1) as 1 | 2 | 3) : 1)
                      }
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-accent hover:text-white transition-colors"
                    >
                      <span>{layerNum < 3 ? 'Próxima camada' : 'Voltar ao topo'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
