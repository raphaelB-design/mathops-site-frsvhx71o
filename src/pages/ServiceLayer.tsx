import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { serviceLayers, ServiceDetail } from '@/config/servicesData'
import { FadeIn } from '@/components/fade-in'
import { WHATSAPP_URL } from '@/config/constants'
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Info,
  AlertTriangle,
  Layers,
  Zap,
  Crosshair,
  Clock,
  Network,
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

const layerOverlayColors: Record<string, string> = {
  'diagnostico-e-visibilidade': 'rgba(30, 58, 95, 0.50)',
  'analise-e-modelagem': 'rgba(45, 27, 105, 0.50)',
  'solucao-e-recorrencia': 'rgba(92, 58, 0, 0.50)',
  'inteligencia-artificial': 'rgba(45, 95, 168, 0.50)',
}

export default function ServiceLayer() {
  const { slug } = useParams()
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null)

  if (!slug || !serviceLayers[slug]) {
    return <Navigate to="/" replace />
  }

  const layer = serviceLayers[slug]

  const anchorService =
    layer.anchor && layer.anchorProductId
      ? layer.services.find((s) => s.id === layer.anchorProductId)
      : null

  return (
    <div className="w-full flex flex-col min-h-screen bg-black text-white">
      {/* Cinematic Hero */}
      <div className="relative pt-40 pb-32 md:pt-56 md:pb-40 px-6 md:px-12 flex flex-col items-center text-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-zinc-950 -z-10"></div>
        <img
          src={
            layer.heroImage ||
            'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80'
          }
          alt={layer.title}
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay -z-10 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black -z-10"></div>

        <FadeIn className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/15 bg-white/5 rounded-full font-mono text-[10px] uppercase tracking-widest text-white/50 mb-8">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Camada {layer.layerNumber} de 4
            </div>
          </FadeIn>

          <Breadcrumb className="mb-10 md:mb-12 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <BreadcrumbList className="flex flex-wrap justify-center gap-2 sm:gap-4 items-center">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="text-muted-foreground hover:text-white transition-colors">
                    [ HOME ]
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/20">/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    to="/#services"
                    className="text-muted-foreground hover:text-white transition-colors"
                  >
                    [ SERVIÇOS ]
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/20">/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white font-bold drop-shadow-md">
                  [ {layer.title} ]
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-tight mb-6 text-white drop-shadow-xl text-center">
            {layer.title}
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-center">
            {layer.headline}
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
                    {metric.value}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Context (Left) */}
            <FadeIn>
              <div className="flex flex-col h-full justify-center items-start">
                <div className="inline-block px-3 py-1.5 bg-white/5 border border-white/10 font-mono text-[10px] font-bold uppercase tracking-widest text-accent mb-8">
                  Indicação de Fit
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-white font-medium leading-tight mb-8">
                  {layer.problemStatement}
                </h2>
                <p className="font-sans text-lg md:text-xl text-zinc-400 leading-relaxed font-light">
                  {layer.forWhom}
                </p>
              </div>
            </FadeIn>

            {/* Investment Card (Right) */}
            <FadeIn delay={200}>
              <div className="bg-zinc-900/50 border border-white/10 p-8 md:p-12 h-full flex flex-col justify-center">
                <div className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-4">
                  Investimento estimado
                </div>
                <div className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                  {layer.investmentFrom}
                </div>
                <p className="font-sans text-sm md:text-base text-zinc-400 leading-relaxed mb-10">
                  Proposta detalhada após diagnóstico inicial. Projetos pontuais ou retainer
                  conforme necessidade.
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between bg-white text-black px-6 py-4 font-mono font-bold text-sm uppercase tracking-wider hover:bg-zinc-200 transition-colors group mb-4"
                >
                  Agendar Assessment Estratégico
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <div className="text-center font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                  Confidencial · Sem compromisso
                </div>
              </div>
            </FadeIn>
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
                  className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
                />

                <div
                  className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-0"
                  style={{
                    backgroundColor: slug
                      ? layerOverlayColors[slug] || 'transparent'
                      : 'transparent',
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20 flex flex-col justify-end p-6 md:p-10">
                  <div className="space-y-4">
                    <div>
                      {service.prazo && (
                        <div className="inline-flex items-center gap-1.5 bg-white/15 border border-white/20 backdrop-blur-sm px-3 py-1 rounded-sm text-[10px] font-mono uppercase tracking-widest text-white/80 mb-3">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{service.prazo}</span>
                        </div>
                      )}
                      <h3 className="text-white font-serif text-2xl md:text-3xl lg:text-4xl font-medium mb-2 drop-shadow-2xl">
                        {service.name}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm md:text-base text-zinc-300 font-light line-clamp-2 md:line-clamp-3">
                        {service.headline}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-white uppercase tracking-widest pt-2">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                          Ver detalhes completos
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
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
                    "{anchorService.headline}"
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

                      {anchorService.prazo && (
                        <div className="mt-8">
                          <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-4">
                            Timeframe
                          </h4>
                          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 text-sm text-white">
                            <Clock className="w-4 h-4 text-zinc-400" />
                            <span>{anchorService.prazo}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedService(anchorService)}
                    className="flex items-center gap-2 text-white font-mono text-xs uppercase tracking-widest hover:text-accent transition-colors group"
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
                      className="absolute inset-0 w-full h-full object-cover grayscale opacity-70"
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
        <SheetContent className="bg-zinc-950 border-l border-white/10 text-white sm:max-w-xl md:max-w-2xl overflow-y-auto p-0 shadow-2xl flex flex-col">
          {selectedService && (
            <div className="flex flex-col min-h-full">
              {/* Header Image */}
              <div className="relative h-[35vh] min-h-[350px] w-full shrink-0">
                <img
                  src={selectedService.image}
                  alt={selectedService.name}
                  className="w-full h-full object-cover opacity-50 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"></div>

                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                  <SheetHeader>
                    <SheetTitle className="text-4xl md:text-5xl font-serif text-white font-medium leading-[1.1] mb-2 drop-shadow-xl">
                      {selectedService.name}
                    </SheetTitle>
                    {selectedService.prazo && (
                      <div className="inline-flex items-center gap-1.5 border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/50 mt-3">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{selectedService.prazo}</span>
                      </div>
                    )}
                  </SheetHeader>
                </div>
              </div>

              {/* Content Body */}
              <div className="px-8 md:px-12 py-10 flex-1 bg-zinc-950">
                <SheetDescription className="text-lg md:text-xl text-zinc-300 leading-relaxed font-light mb-8 border-l-2 border-white/20 pl-6 italic">
                  "{selectedService.headline}"
                </SheetDescription>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 font-mono font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors mb-12"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Solicitar Assessment
                </a>

                <div className="space-y-10">
                  {selectedService.dor && (
                    <DetailSection
                      icon={<AlertTriangle />}
                      title="O Ponto de Falha"
                      color="text-zinc-400"
                    >
                      {selectedService.dor}
                    </DetailSection>
                  )}

                  {selectedService.entregaveis && (
                    <DetailSection
                      icon={<Layers />}
                      title="Artefatos Entregáveis"
                      color="text-white"
                    >
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

                  {selectedService.tecnicos && (
                    <DetailSection
                      icon={<Network />}
                      title="Especificações Técnicas"
                      color="text-zinc-300"
                    >
                      {selectedService.tecnicos}
                    </DetailSection>
                  )}

                  {selectedService.metodologia && (
                    <DetailSection
                      icon={<Zap />}
                      title="Metodologia Aplicada"
                      color="text-zinc-400"
                    >
                      {selectedService.metodologia}
                    </DetailSection>
                  )}

                  {selectedService.fit && (
                    <DetailSection
                      icon={<Crosshair />}
                      title="Perfil de Fit Ideal"
                      color="text-zinc-300"
                    >
                      {selectedService.fit}
                    </DetailSection>
                  )}

                  {selectedService.prazo && (
                    <DetailSection icon={<Clock />} title="Timeframe Estimado" color="text-white">
                      {selectedService.prazo}
                    </DetailSection>
                  )}
                </div>

                <div className="mt-16 pt-8 border-t border-white/10">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-white text-black px-8 py-5 font-mono font-bold text-sm uppercase tracking-wider hover:bg-zinc-200 transition-colors rounded-sm"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Solicitar Assessment
                  </a>
                </div>
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
              Entenderemos seu cenário operacional e avaliaremos o fit estratégico sem compromisso.
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-white text-accent px-8 py-5 font-mono font-bold text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors duration-300 group rounded-sm shadow-xl"
            >
              Agendar Conversa Estratégica
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {Object.entries(serviceLayers)
                .filter(([key]) => key !== slug)
                .map(([key, otherLayer]) => (
                  <Link
                    key={key}
                    to={`/servicos/${key}`}
                    className="group flex flex-col p-8 border border-white/10 bg-zinc-950 hover:bg-white/[0.02] hover:border-white/30 transition-all duration-300"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-6 group-hover:text-white/70 transition-colors">
                      Camada {otherLayer.layerNumber}
                    </div>
                    <h4 className="font-serif text-2xl md:text-3xl text-white font-medium mb-4 group-hover:text-accent transition-colors">
                      {otherLayer.title}
                    </h4>
                    <p className="font-sans text-sm md:text-base text-zinc-400 font-light leading-relaxed line-clamp-2 mb-8 flex-1">
                      {otherLayer.problemStatement}
                    </p>

                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white mt-auto">
                      Explorar
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
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
