import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { serviceLayers, ServiceDetail } from '@/config/servicesData'
import { FadeIn } from '@/components/fade-in'
import { WHATSAPP_URL } from '@/config/constants'
import {
  ArrowLeft,
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
import { cn } from '@/lib/utils'

export default function ServiceLayer() {
  const { slug } = useParams()
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null)

  if (!slug || !serviceLayers[slug]) {
    return <Navigate to="/" replace />
  }

  const layer = serviceLayers[slug]

  return (
    <div className="w-full flex flex-col min-h-screen bg-black text-white">
      {/* Cinematic Hero */}
      <div className="relative pt-32 pb-24 md:pt-48 md:pb-32 px-6 md:px-12 flex flex-col items-center text-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-zinc-950 -z-10"></div>
        <img
          src="https://img.usecurling.com/p/1920/1080?q=technology%20architecture&color=black&dpr=2"
          alt="Diagnosis and Visibility"
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay -z-10 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black -z-10"></div>

        <FadeIn className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-xs font-sans tracking-[0.25em] text-zinc-400 hover:text-white transition-colors mb-16 uppercase"
          >
            <ArrowLeft className="w-4 h-4" />
            Retornar ao Hub Central
          </Link>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-8xl font-medium mb-8 tracking-tight leading-[1.1] text-white drop-shadow-xl">
            {layer.title}
          </h1>
          <p className="text-lg md:text-2xl text-zinc-300 leading-relaxed max-w-3xl mx-auto font-light">
            {layer.headline}
          </p>
        </FadeIn>
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
            {layer.services.map((service, idx) => (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={cn(
                  'group relative cursor-pointer overflow-hidden rounded-sm transition-all duration-500 bg-zinc-950 border border-white/10 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]',
                  idx === 0 && layer.services.length % 2 !== 0
                    ? 'md:col-span-2 lg:col-span-2 aspect-[16/9] md:aspect-[21/9]'
                    : 'aspect-[4/3] lg:aspect-[16/11]',
                )}
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col justify-end p-6 md:p-10">
                  <div className="space-y-4">
                    <h3 className="text-white font-serif text-2xl md:text-3xl lg:text-4xl font-medium mb-2 drop-shadow-2xl">
                      {service.name}
                    </h3>

                    <div className="space-y-4">
                      <p className="text-sm md:text-base text-zinc-300 font-light line-clamp-2 md:line-clamp-3">
                        {service.headline}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-white uppercase tracking-widest pt-2">
                        {service.prazo && (
                          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-sm backdrop-blur-sm">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{service.prazo}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-sm backdrop-blur-sm">
                          <Info className="w-3.5 h-3.5" />
                          <span>Especificações</span>
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
                  className="w-full h-full object-cover opacity-70 mix-blend-screen"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"></div>

                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                  <SheetHeader>
                    <SheetTitle className="text-4xl md:text-5xl font-serif text-white font-medium leading-[1.1] mb-2 drop-shadow-xl">
                      {selectedService.name}
                    </SheetTitle>
                  </SheetHeader>
                </div>
              </div>

              {/* Content Body */}
              <div className="px-8 md:px-12 py-10 flex-1 bg-zinc-950">
                <SheetDescription className="text-lg md:text-xl text-zinc-300 leading-relaxed font-light mb-14 border-l-2 border-white/20 pl-6 italic">
                  "{selectedService.headline}"
                </SheetDescription>

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
