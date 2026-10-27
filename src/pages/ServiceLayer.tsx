import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link, Navigate, useSearchParams } from 'react-router-dom'
import { trackClick } from '@/services/analytics'
import { serviceLayers, ServiceDetail } from '@/config/servicesData'
import { FadeIn } from '@/components/fade-in'
import { AnimatedCounter } from '@/components/animated-counter'
import { useScrollLock } from '@/hooks/use-scroll-lock'
import { EvmSCurveChart } from '@/components/charts/EvmSCurveChart'
import { CepControlChart } from '@/components/charts/CepControlChart'
import { AuditReconciliationChart } from '@/components/charts/AuditReconciliationChart'
import { RiskHeatMapChart } from '@/components/charts/RiskHeatMapChart'
import {
  ArrowRight,
  AlertTriangle,
  Layers,
  Zap,
  Crosshair,
  Network,
  ChevronRight,
} from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { cn } from '@/lib/utils'
import { Helmet } from '@/components/Helmet'
import { SectionBackdrop, SectionBackdropVariant } from '@/components/SectionBackdrop'

const cleanText = (text: string | undefined) => {
  if (!text) return ''
  return text.replace(/: onde a matemática muda o resultado da sua operação\?/g, '.')
}

function MetricAnimator({ value }: { value: string }) {
  const parts: React.ReactNode[] = []
  let currentText = ''

  for (let i = 0; i < value.length; i++) {
    const char = value[i]
    const isDigit = /[0-9]/.test(char)
    const isMinus = char === '-' || char === '−'

    // Check if minus is a negative sign: must be followed by a digit, and NOT preceded by a digit
    const isNegativeSign =
      isMinus &&
      i + 1 < value.length &&
      /[0-9]/.test(value[i + 1]) &&
      (i === 0 || !/[0-9]/.test(value[i - 1]))

    if (isDigit || isNegativeSign) {
      if (currentText) {
        parts.push(<span key={parts.length}>{currentText}</span>)
        currentText = ''
      }

      let numStr = char === '−' ? '-' : char
      while (i + 1 < value.length && /[0-9]/.test(value[i + 1])) {
        numStr += value[i + 1]
        i++
      }

      parts.push(
        <AnimatedCounter key={parts.length} value={parseInt(numStr, 10)} duration={2000} />,
      )
    } else {
      currentText += char
    }
  }

  if (currentText) {
    parts.push(<span key={parts.length}>{currentText}</span>)
  }

  return <>{parts}</>
}

export default function ServiceLayer() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null)

  useScrollLock(!!selectedService)

  const layer = slug ? serviceLayers[slug] : undefined

  useEffect(() => {
    setSelectedService(null)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  useEffect(() => {
    const serviceParam = searchParams.get('service')
    if (serviceParam && layer) {
      const found = layer.services.find((s) => s.id === serviceParam)
      if (found) {
        setSelectedService(found)
      }
    }
  }, [searchParams, layer])

  if (!slug || !layer) {
    return <Navigate to="/" replace />
  }

  const anchorService =
    layer.anchor && layer.anchorProductId
      ? layer.services.find((s) => s.id === layer.anchorProductId)
      : null

  const renderServiceChart = (serviceId: string) => {
    switch (serviceId) {
      case 'controle-projetos-obra-evm':
        return (
          <div className="w-full my-8">
            <EvmSCurveChart />
          </div>
        )
      case 'monitoramento-estatistico-operacao':
        return (
          <div className="w-full my-8">
            <CepControlChart />
          </div>
        )
      case 'memorias':
        return (
          <div className="w-full my-8">
            <AuditReconciliationChart />
          </div>
        )
      case 'gestao-riscos-organizacionais':
        return (
          <div className="w-full my-8">
            <RiskHeatMapChart />
          </div>
        )
      default:
        return null
    }
  }

  const layerCharts =
    slug === 'diagnostico-e-visibilidade'
      ? [
          {
            id: 'controle-projetos-obra-evm',
            title: 'Demonstração Prática — Controle de Projetos',
            subtitle:
              'Visualização analítica de avanço físico-financeiro com detecção de desvio e índices de desempenho.',
            component: <EvmSCurveChart />,
          },
          {
            id: 'monitoramento-estatistico-operacao',
            title: 'Demonstração Prática — Monitoramento Estatístico da Operação',
            subtitle:
              'Carta de controle estatístico de processo (CEP) com limites 3σ e sinalização imediata de causa especial.',
            component: <CepControlChart />,
          },
        ]
      : slug === 'analise-e-modelagem'
        ? [
            {
              id: 'memorias',
              title: 'Demonstração Prática — Auditoria de Memórias de Cálculo',
              subtitle:
                'Reconciliação e normalização de métricas divergentes entre áreas corporativas para uma base única.',
              component: <AuditReconciliationChart />,
            },
          ]
        : slug === 'governanca-e-riscos'
          ? [
              {
                id: 'gestao-riscos-organizacionais',
                title: 'Demonstração Prática — Gestão de Riscos Organizacionais',
                subtitle:
                  'Matriz de calor de probabilidade e impacto 5x5 com categorização e monitoramento de controles COSO.',
                component: <RiskHeatMapChart />,
              },
            ]
          : []

  const serviceParam = searchParams.get('service')
  const currentService = serviceParam ? layer.services.find((s) => s.id === serviceParam) : null

  const pageTitle = currentService
    ? `${currentService.name} | ${layer.title} | MathOps Strategy`
    : slug === 'diagnostico-e-visibilidade'
      ? `${layer.title} | MathOps Strategy — Gestão EVM e Controle Estatístico (CEP)`
      : slug === 'analise-e-modelagem'
        ? `${layer.title} | MathOps Strategy — Auditoria de Cálculos e Modelagem de Custos`
        : slug === 'governanca-e-riscos'
          ? `${layer.title} | MathOps Strategy — Governança e Gestão de Riscos (COSO)`
          : `${layer.title} | MathOps Strategy`

  const pageDescription = currentService
    ? `${currentService.headline} Mapeamento de maturidade, arquitetura organizacional, desdobramento estratégico Hoshin e governança.`
    : slug === 'diagnostico-e-visibilidade'
      ? 'Mapeamento de processos, painéis executivos em Power BI, curvas S de avanço físico-financeiro (EVM) e cartas de controle estatístico (CEP) para decisões em tempo real.'
      : slug === 'analise-e-modelagem'
        ? 'Auditoria de memórias de cálculo com reconciliação de discrepâncias entre áreas, metodologia Lean Six Sigma e modelagem estatística de custos.'
        : slug === 'governanca-e-riscos'
          ? 'Estruturação da gestão de riscos organizacionais, transformação organizacional, apetite a risco, modelo das três linhas e monitoramento da efetividade dos controles.'
          : layer.description

  return (
    <div className="w-full flex flex-col min-h-screen bg-black text-white">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      {/* Cinematic Hero */}
      <div className="relative pt-40 pb-32 md:pt-56 md:pb-40 px-6 md:px-12 flex flex-col items-center text-center overflow-hidden border-b border-[#1E293B] bg-[#0A0F1C]">
        {/* 1.7 Duotone azul-noite/azul (#0A0F1C -> #3B82F6) a 60% de opacidade */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src={layer.heroImage || 'https://img.usecurling.com/p/1920/600?q=abstract'}
            alt={layer.title}
            className="w-full h-full object-cover grayscale opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0A0F1C]/90 via-[#0A0F1C]/75 to-[#3B82F6]/35 mix-blend-multiply pointer-events-none" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1C]/60 via-[#0A0F1C]/40 to-[#0A0F1C] -z-10"></div>

        {/* 2.3 Páginas de camada (/servicos/...): no topo, o modelo da respectiva camada */}
        <SectionBackdrop
          variant={
            (slug === 'diagnostico-e-visibilidade'
              ? 'process'
              : slug === 'analise-e-modelagem'
                ? 'control'
                : 'risk') as SectionBackdropVariant
          }
          opacityClass="opacity-[0.16]"
        />

        <FadeIn className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/15 bg-white/5 rounded-full font-mono text-[10px] uppercase tracking-widest text-white/50 mb-8">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Camada {layer.layerNumber} de 3
            </div>
          </FadeIn>

          <Breadcrumb className="mb-10 md:mb-12 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <BreadcrumbList className="flex flex-wrap justify-center gap-2 sm:gap-4 items-center">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="text-muted-foreground hover:text-white transition-colors">
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="w-3 h-3 text-white/40" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    to="/#services"
                    className="text-muted-foreground hover:text-white transition-colors"
                  >
                    Serviços
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="w-3 h-3 text-white/40" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white font-bold drop-shadow-md">
                  {layer.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-tight mb-6 text-white drop-shadow-xl text-center">
            {layer.title}
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-center">
            {cleanText(layer.headline)}
          </p>
        </FadeIn>
      </div>

      {/* Performance Metrics Strip */}
      {layer.metrics && layer.metrics.length > 0 && (
        <div className="w-full border-b border-white/10 bg-white/[0.02]">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-3 divide-x divide-white/10 border-x border-white/10">
              {layer.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="py-8 md:py-12 px-4 md:px-8 flex flex-col items-center justify-center text-center"
                >
                  <div className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4">
                    <MetricAnimator value={metric.value} />
                  </div>
                  <div className="font-mono text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest text-white/40 max-w-[200px] leading-relaxed">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Service Fit & Investment Block */}
      <div className="w-full border-b border-white/10 py-20 md:py-32">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div
            className={cn(
              'grid grid-cols-1 gap-16 lg:gap-24',
              layer.prerequisiteNote && 'lg:grid-cols-2',
            )}
          >
            {/* Context (Left) */}
            <FadeIn>
              <div className="flex flex-col h-full justify-center items-start">
                <div className="inline-block px-3 py-1.5 bg-white/5 border border-white/10 font-mono text-[10px] font-bold uppercase tracking-widest text-accent mb-8">
                  Indicação de Fit
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-white font-medium leading-tight mb-8">
                  {cleanText(layer.problemStatement)}
                </h2>
                <p className="font-sans text-lg md:text-xl text-zinc-400 leading-relaxed font-light">
                  {cleanText(layer.forWhom)}
                </p>
              </div>
            </FadeIn>

            {/* Prerequisite Note (Right) */}
            {layer.prerequisiteNote && (
              <FadeIn delay={200}>
                <div className="flex flex-col h-full justify-center items-start border-l border-white/10 pl-8 lg:pl-12">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/30 font-mono text-[10px] font-bold uppercase tracking-widest text-accent mb-6 rounded-sm">
                    Pré-requisito
                  </div>
                  <p className="font-serif text-2xl md:text-3xl text-white/90 font-light leading-snug italic">
                    {layer.prerequisiteNote}
                  </p>
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </div>

      {/* Editorial Grid Area */}
      <div className="px-6 md:px-12 py-20 max-w-[1600px] mx-auto w-full flex-1">
        <FadeIn delay={200}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 border-b border-white/10 pb-8">
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-white/60"></div>
              <h2 className="text-xl md:text-2xl font-serif tracking-widest text-white uppercase">
                Nossas Soluções Estratégicas
              </h2>
            </div>
            <p className="text-zinc-500 font-sans text-sm tracking-wider uppercase max-w-sm">
              Explore nossa matriz de serviços especializados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {layer.services.map((service) => (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={cn(
                  'group relative cursor-pointer overflow-hidden rounded-sm transition-all duration-500 bg-zinc-950 border border-white/10 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]',
                  'aspect-[4/3]',
                )}
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0A0F1C]/90 via-[#0A0F1C]/70 to-[#3B82F6]/35 mix-blend-multiply pointer-events-none" />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/50 flex flex-col justify-end p-4 sm:p-6 md:p-8">
                  <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
                    <div>
                      <h3 className="text-white font-serif text-sm sm:text-lg md:text-xl lg:text-2xl font-medium mb-1 md:mb-2 drop-shadow-2xl break-words leading-snug">
                        {service.name}
                      </h3>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
                      <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-zinc-200 font-light leading-snug break-words drop-shadow-sm">
                        {cleanText(service.headline)}
                      </p>

                      {service.modules && service.modules.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-widest text-white/70 drop-shadow-sm">
                            {service.modules.length} módulos
                          </span>
                        </div>
                      )}

                      {service.implementationPhase && (
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-widest text-white/70 drop-shadow-sm">
                            Projeto em 2 fases
                          </span>
                        </div>
                      )}

                      <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs font-sans text-white uppercase tracking-widest pt-2 md:pt-4">
                        <div className="flex items-center gap-2 text-[9px] md:text-xs font-mono uppercase tracking-widest text-white/80 group-hover:text-white transition-colors drop-shadow-sm">
                          Ver detalhes
                          <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Integrated Charts Section for this Layer */}
        {layerCharts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-white/10 space-y-20">
            <FadeIn>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div className="flex items-center gap-4">
                  <div className="h-px w-12 bg-accent"></div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold block mb-1">
                      Modelagem e Visualização Analítica
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif tracking-widest text-white uppercase">
                      Painéis e Modelos dos Serviços
                    </h3>
                  </div>
                </div>
                <p className="text-zinc-500 font-sans text-sm tracking-wider uppercase max-w-sm">
                  Exemplos práticos da metodologia aplicada à rotina da sua empresa.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 gap-16">
              {layerCharts.map((chartItem) => (
                <FadeIn key={chartItem.id}>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
                      <div>
                        <h4 className="font-serif text-lg md:text-xl text-white font-medium">
                          {chartItem.title}
                        </h4>
                        <p className="text-xs md:text-sm text-zinc-400 font-light mt-1">
                          {chartItem.subtitle}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          const target = layer.services.find((s) => s.id === chartItem.id)
                          if (target) setSelectedService(target)
                        }}
                        className="self-start sm:self-center inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                      >
                        Ver detalhes do serviço
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {chartItem.component}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Anchor Product Section */}
      {anchorService && (
        <div className="w-full bg-white/[0.03] border-t border-white/10 py-20 md:py-32">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <FadeIn>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                <div className="order-2 lg:order-1">
                  <div className="inline-block px-3 py-1.5 bg-white/5 border border-white/10 font-mono text-[10px] font-bold uppercase tracking-widest text-accent mb-8">
                    Produto Âncora
                  </div>

                  <h2 className="font-serif text-4xl md:text-5xl text-white font-medium leading-tight mb-8">
                    {anchorService.name}
                  </h2>

                  <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed font-light mb-10 border-l-2 border-white/20 pl-6 italic">
                    "{cleanText(anchorService.headline)}"
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-4">
                        Entregáveis
                      </h4>
                      <ul className="space-y-3">
                        {anchorService.entregaveis?.split(',').map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-zinc-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                            <span className="leading-relaxed text-sm">{item.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-4">
                        Perfil de Fit
                      </h4>
                      <p className="text-zinc-300 leading-relaxed text-sm">{anchorService.fit}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedService(anchorService)}
                    className="flex items-center gap-2 text-white font-mono text-xs uppercase tracking-widest hover:text-accent transition-colors group mt-6"
                  >
                    Ver especificações técnicas completas
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="order-1 lg:order-2">
                  <div className="aspect-[3/4] w-full max-w-md mx-auto lg:max-w-none relative border border-white/10">
                    <img
                      src={anchorService.image}
                      alt={anchorService.name}
                      className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-luminosity opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      )}

      {/* Details Sheet / Drawer */}
      <Sheet open={!!selectedService} onOpenChange={(open) => !open && setSelectedService(null)}>
        <SheetContent
          data-scroll-lock-ignore
          className="bg-zinc-950 border-l border-white/10 text-white sm:max-w-xl md:max-w-2xl overflow-y-auto p-0 shadow-2xl h-screen max-h-screen scrollbar-dark"
        >
          {selectedService && (
            <div className="flex flex-col">
              {/* Header Image */}
              <div className="relative h-[35vh] min-h-[350px] w-full shrink-0">
                <img
                  src={selectedService.image}
                  alt={selectedService.name}
                  className="w-full h-full object-cover opacity-50 grayscale mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent pointer-events-none"></div>
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true"></div>

                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                  <SheetHeader>
                    <SheetTitle className="text-4xl md:text-5xl font-serif text-white font-medium leading-[1.1] mb-2 drop-shadow-xl">
                      {selectedService.name}
                    </SheetTitle>
                  </SheetHeader>
                </div>
              </div>

              {/* Content Body */}
              <div className="px-8 md:px-12 py-10 bg-zinc-950">
                <SheetDescription className="text-lg md:text-xl text-zinc-300 leading-relaxed font-light mb-8 border-l-2 border-white/20 pl-6 italic">
                  "{cleanText(selectedService.headline)}"
                </SheetDescription>

                <div className="space-y-10">
                  {selectedService.dor && (
                    <DetailSection
                      icon={<AlertTriangle />}
                      title="O problema"
                      color="text-zinc-400"
                    >
                      {cleanText(selectedService.dor)}
                    </DetailSection>
                  )}

                  {/* Integrated Chart inside Service Details Drawer */}
                  {renderServiceChart(selectedService.id) && (
                    <div>
                      <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-accent mb-4 flex items-center gap-4">
                        <span className="w-8 h-8 rounded-full border border-accent/40 flex items-center justify-center bg-accent/10 text-accent">
                          <Zap className="w-4 h-4" />
                        </span>
                        Demonstração Visual do Serviço
                      </h4>
                      <div className="pl-0 sm:pl-12">{renderServiceChart(selectedService.id)}</div>
                    </div>
                  )}

                  {selectedService.entregaveis &&
                    !selectedService.modules &&
                    !selectedService.implementationPhase && (
                      <DetailSection icon={<Layers />} title="O que você recebe" color="text-white">
                        <ul className="space-y-4">
                          {selectedService.entregaveis.split(',').map((item, i) => (
                            <li key={i} className="flex items-start gap-4 text-zinc-300">
                              <div className="w-1 h-1 rounded-full bg-white/40 mt-2.5 shrink-0" />
                              <span className="leading-relaxed">{item.trim()}</span>
                            </li>
                          ))}
                        </ul>
                      </DetailSection>
                    )}

                  {selectedService.fit && (
                    <DetailSection icon={<Crosshair />} title="Para quem é" color="text-zinc-300">
                      {selectedService.fit}
                    </DetailSection>
                  )}

                  {selectedService.metodologia && (
                    <DetailSection icon={<Zap />} title="Como fazemos" color="text-zinc-400">
                      {selectedService.metodologia}
                    </DetailSection>
                  )}

                  {selectedService.tecnicos &&
                    !selectedService.modules &&
                    !selectedService.implementationPhase && (
                      <DetailSection
                        icon={<Network />}
                        title="Especificações Técnicas"
                        color="text-zinc-300"
                      >
                        {selectedService.tecnicos}
                      </DetailSection>
                    )}
                </div>

                {selectedService.modules && selectedService.modules.length > 0 && (
                  <div className="mt-10">
                    <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-zinc-500 mb-6 flex items-center gap-4">
                      <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                        <Layers className="w-4 h-4 text-zinc-400" />
                      </span>
                      Módulos Disponíveis
                    </h4>
                    <div className="space-y-4 pl-12">
                      {selectedService.modules.map((mod, i) => (
                        <div
                          key={i}
                          className="border border-white/10 bg-white/[0.02] p-6 rounded-sm space-y-2"
                        >
                          <h5 className="font-serif text-lg text-white font-medium">{mod.name}</h5>
                          <p className="text-zinc-300 leading-relaxed font-light text-sm">
                            <strong className="text-white/80 font-normal">Entregáveis: </strong>
                            {mod.entregaveis.replace(/^Entregáveis:\s*/i, '')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedService.implementationPhase && (
                  <div className="mt-10">
                    <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-zinc-500 mb-6 flex items-center gap-4">
                      <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                        <Network className="w-4 h-4 text-zinc-400" />
                      </span>
                      Como começamos
                    </h4>
                    <div className="pl-12 space-y-6">
                      <div className="border border-white/10 bg-white/[0.02] p-6 rounded-sm">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center font-mono text-xs font-bold text-accent">
                            1
                          </div>
                          <h5 className="font-serif text-lg text-white font-medium">
                            Fase 1 — Implantação
                          </h5>
                        </div>
                        <p className="text-zinc-300 leading-relaxed font-light text-sm mb-4 italic">
                          {cleanText(selectedService.implementationPhase.headline)}
                        </p>
                        <div className="space-y-3">
                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">
                              Entregáveis
                            </span>
                            <p className="text-zinc-300 text-sm leading-relaxed">
                              {selectedService.implementationPhase.entregaveis}
                            </p>
                          </div>
                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">
                              Especificações Técnicas
                            </span>
                            <p className="text-zinc-300 text-sm leading-relaxed">
                              {selectedService.implementationPhase.tecnicos}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <div className="w-px h-8 bg-white/20"></div>
                      </div>
                      <div className="border border-accent/30 bg-accent/[0.03] p-6 rounded-sm">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center font-mono text-xs font-bold text-accent">
                            2
                          </div>
                          <h5 className="font-serif text-lg text-white font-medium">
                            Fase 2 — Operação Contínua
                          </h5>
                        </div>
                        <p className="text-zinc-300 leading-relaxed font-light text-sm mb-4 italic">
                          {cleanText(selectedService.headline)}
                        </p>
                        <div className="space-y-3">
                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">
                              Entregáveis
                            </span>
                            <p className="text-zinc-300 text-sm leading-relaxed">
                              {selectedService.entregaveis}
                            </p>
                          </div>
                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">
                              Especificações Técnicas
                            </span>
                            <p className="text-zinc-300 text-sm leading-relaxed">
                              {selectedService.tecnicos}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-16 pt-8 border-t border-white/10"></div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Final Conversion CTA Section */}
      <div className="w-full relative overflow-hidden bg-accent text-white py-24 md:py-32">
        {/* Technical Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
            backgroundSize: '2rem 2rem',
          }}
        ></div>

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
          <FadeIn>
            <div className="inline-block px-3 py-1.5 bg-black/20 border border-white/20 font-mono text-[10px] font-bold uppercase tracking-widest text-white mb-8 rounded-sm backdrop-blur-sm">
              Próximo passo
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-medium leading-tight mb-6 max-w-3xl mx-auto drop-shadow-lg">
              O diagnóstico não custa nada.
              <br className="hidden sm:block" /> A ausência dele, sim.
            </h2>

            <p className="font-sans text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto font-light">
              Agende uma conversa técnica de 30 minutos com nossos arquitetos de soluções.
              Entenderemos seu cenário operacional e avaliaremos o fit estratégico.
            </p>

            <Link
              to="/diagnostico"
              onClick={() => {
                trackClick('diagnostic_open', 'service_layer')
              }}
              className="btn-primary-gradient group inline-flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-sm py-4 px-8 rounded-sm shadow-lg"
            >
              Solicitar Diagnóstico Estratégico
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <div className="mt-8 font-mono text-[10px] uppercase tracking-widest text-white/60">
              NDA disponível · Reunião de 30 min · Sem compromisso
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Cross-layer Navigation Grid */}
      <div className="w-full bg-black border-t border-white/10 py-20 md:py-32">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="flex items-center gap-4 mb-12 md:mb-16">
              <div className="h-px w-12 bg-white/60"></div>
              <h3 className="font-mono text-xs md:text-sm uppercase tracking-widest text-white">
                Outras Camadas Estratégicas
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {Object.entries(serviceLayers).map(([key, otherLayer]) => {
                const isActive = key === slug
                return isActive ? (
                  <div
                    key={key}
                    className="group flex flex-col p-6 md:p-8 border border-white/20 bg-white/[0.03] opacity-80 cursor-default transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/20" />
                    <div className="flex items-center justify-between mb-6">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-white">
                        Camada {otherLayer.layerNumber}
                      </div>
                      <div className="px-2 py-1 bg-white/10 text-white font-mono text-[9px] uppercase tracking-wider rounded-sm backdrop-blur-sm">
                        Você está aqui
                      </div>
                    </div>
                    <h4 className="font-serif text-xl md:text-2xl text-white font-medium mb-4">
                      {otherLayer.title}
                    </h4>
                    <p className="font-sans text-sm text-zinc-400 font-light leading-relaxed line-clamp-2 mb-8 flex-1">
                      {cleanText(otherLayer.problemStatement)}
                    </p>

                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500 mt-auto">
                      Camada Atual
                    </div>
                  </div>
                ) : (
                  <Link
                    key={key}
                    to={`/servicos/${key}`}
                    className="group flex flex-col p-6 md:p-8 border border-white/10 bg-zinc-950 hover:bg-white/[0.02] hover:border-white/30 transition-all duration-300"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-6 group-hover:text-white/70 transition-colors">
                      Camada {otherLayer.layerNumber}
                    </div>
                    <h4 className="font-serif text-xl md:text-2xl text-white font-medium mb-4 group-hover:text-white/90 transition-colors">
                      {otherLayer.title}
                    </h4>
                    <p className="font-sans text-sm text-zinc-400 font-light leading-relaxed line-clamp-2 mb-8 flex-1">
                      {cleanText(otherLayer.problemStatement)}
                    </p>

                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white mt-auto">
                      Explorar
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}

function DetailSection({
  icon,
  title,
  children,
  color = 'text-white',
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
  color?: string
}) {
  return (
    <div className="group">
      <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-zinc-500 mb-4 flex items-center gap-4">
        <span
          className={cn(
            'w-8 h-8 rounded-full border border-white/10 flex items-center justify-center [&>svg]:w-4 [&>svg]:h-4 bg-white/5',
            color,
          )}
        >
          {icon}
        </span>
        {title}
      </h4>
      <div className="text-zinc-300 leading-relaxed font-light text-base md:text-lg pl-12">
        {children}
      </div>
    </div>
  )
}
