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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black -z-10"></div>
        <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/1920/1080?q=texture&color=black&dpr=1')] opacity-10 mix-blend-overlay -z-10"></div>

        <FadeIn className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Retornar ao Hub Central
          </Link>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-8xl font-bold mb-6 tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
            {layer.title}
          </h1>
          <p className="text-xl md:text-3xl text-zinc-400 leading-relaxed max-w-4xl mx-auto mb-16 font-light">
            {layer.headline}
          </p>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 bg-white text-black px-8 py-4 overflow-hidden rounded-sm transition-transform hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-zinc-200 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            <Play className="w-5 h-5 fill-current relative z-10" />
            <span className="font-mono font-bold text-sm uppercase tracking-wider relative z-10">
              Engajar Especialista
            </span>
          </a>
        </FadeIn>
      </div>

      {/* Netflix Style Grid Area */}
      <div className="px-6 md:px-12 py-20 max-w-[1600px] mx-auto w-full flex-1">
        <FadeIn delay={200}>
          <div className="flex items-center gap-4 mb-10">
            <div className="h-6 w-1.5 bg-red-600 rounded-sm"></div>
            <h2 className="text-xl md:text-2xl font-bold font-display uppercase tracking-widest text-zinc-100">
              Títulos Originais MathOps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {layer.services.map((service, idx) => (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="group relative cursor-pointer overflow-hidden rounded-md transition-all duration-500 hover:scale-[1.03] hover:z-10 hover:ring-1 hover:ring-white/20 hover:shadow-[0_0_50px_rgba(255,255,255,0.07)] bg-zinc-900 aspect-[16/10] md:aspect-[16/9]"
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110 opacity-60 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col justify-end p-6 md:p-8 transition-opacity duration-500">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <h3 className="text-white font-serif text-2xl md:text-3xl font-bold mb-3 drop-shadow-xl">
                      {service.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 group-hover:text-white transition-colors duration-300 uppercase tracking-widest opacity-0 group-hover:opacity-100">
                      <Info className="w-4 h-4" />
                      <span>Explorar Especificações</span>
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
        <SheetContent className="bg-zinc-950/95 backdrop-blur-xl border-l border-white/10 text-white sm:max-w-xl md:max-w-2xl overflow-y-auto p-0 shadow-2xl">
          {selectedService && (
            <div className="flex flex-col min-h-full">
              {/* Header Image */}
              <div className="relative h-[35vh] min-h-[300px] w-full shrink-0">
                <img
                  src={selectedService.image}
                  alt={selectedService.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"></div>

                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <SheetHeader>
                    <SheetTitle className="text-4xl md:text-5xl font-serif text-white font-bold leading-tight">
                      {selectedService.name}
                    </SheetTitle>
                  </SheetHeader>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-8 flex-1 bg-zinc-950">
                <SheetDescription className="text-xl md:text-2xl text-zinc-300 leading-relaxed font-light mb-12">
                  "{selectedService.headline}"
                </SheetDescription>

                <div className="space-y-10">
                  {selectedService.dor && (
                    <DetailSection
                      icon={<AlertTriangle />}
                      title="O Ponto de Falha"
                      color="text-red-500"
                    >
                      {selectedService.dor}
                    </DetailSection>
                  )}

                  {selectedService.entregaveis && (
                    <DetailSection
                      icon={<Layers />}
                      title="Artefatos Entregáveis"
                      color="text-emerald-500"
                    >
                      <ul className="space-y-3">
                        {selectedService.entregaveis.split(',').map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-zinc-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 mt-2 shrink-0" />
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
                      color="text-blue-500"
                    >
                      {selectedService.tecnicos}
                    </DetailSection>
                  )}

                  {selectedService.metodologia && (
                    <DetailSection
                      icon={<Zap />}
                      title="Metodologia Aplicada"
                      color="text-purple-500"
                    >
                      {selectedService.metodologia}
                    </DetailSection>
                  )}

                  {selectedService.fit && (
                    <DetailSection
                      icon={<Crosshair />}
                      title="Perfil de Fit Ideal"
                      color="text-amber-500"
                    >
                      {selectedService.fit}
                    </DetailSection>
                  )}

                  {selectedService.prazo && (
                    <DetailSection
                      icon={<Clock />}
                      title="Timeframe Estimado"
                      color="text-zinc-400"
                    >
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
      <h4 className="font-mono text-sm uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-3">
        <span
          className={cn('w-5 h-5 flex items-center justify-center [&>svg]:w-4 [&>svg]:h-4', color)}
        >
          {icon}
        </span>
        {title}
      </h4>
      <div className="text-zinc-300 leading-relaxed text-lg pl-8">{children}</div>
    </div>
  )
}
