import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { industriesData, industriesList, allIndustriesList } from '@/config/industriesData'
import { FadeIn } from '@/components/fade-in'
import { ArrowLeft } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { FloatingContactWidget } from '@/components/FloatingContactWidget'

export default function IndustryLayer() {
  const { slug } = useParams()

  // Auto-scroll to top when slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  if (!slug || !(slug in industriesData)) {
    return <Navigate to="/" replace />
  }

  const layer = industriesData[slug as keyof typeof industriesData]
  const otherIndustries = allIndustriesList
    .filter((ind) => ind.slug !== slug)
    .sort((a, b) => {
      if (a.featured === b.featured) return 0
      return a.featured ? -1 : 1
    })

  const Icon = layer.icon

  return (
    <div className="w-full flex flex-col min-h-screen bg-background relative">
      {/* Spotlight Hero Section */}
      <section className="relative w-full min-h-[60vh] flex items-center bg-black overflow-hidden border-b border-white/10 pt-16 md:pt-0">
        <div className="absolute inset-0 z-0">
          <img
            src={layer.image}
            alt={layer.name}
            className="w-full h-full object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 md:via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24">
          <FadeIn>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-wider text-muted-foreground hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para Início
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-accent/10 border border-accent/20 flex items-center justify-center text-accent backdrop-blur-sm shadow-xl">
                <Icon className="w-8 h-8" />
              </div>
              <span className="font-mono text-sm uppercase tracking-widest text-accent font-bold">
                Especialidade Setorial
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 max-w-4xl drop-shadow-2xl text-white">
              {layer.name}
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mb-6 leading-relaxed font-body drop-shadow-md">
              {layer.desc}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Deep Dive Details Section */}
      <section className="py-24 px-6 md:px-12 bg-background border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 text-white">
              A Matemática na {layer.name}
            </h2>
            <div className="text-xl leading-relaxed text-white/80 font-body space-y-6">
              <p>{layer.details}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Netflix-style Carousel */}
      <section className="py-24 px-6 md:px-12 bg-black border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="font-display text-3xl font-bold mb-10 text-white">
              Explore Outras Indústrias
            </h2>
          </FadeIn>

          <Carousel
            opts={{
              align: 'start',
              dragFree: true,
            }}
            className="w-full relative"
          >
            <CarouselContent className="-ml-4">
              {otherIndustries.map((ind) => (
                <CarouselItem
                  key={ind.slug}
                  className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <Link
                    to={`/industrias/${ind.slug}`}
                    className="block relative group overflow-hidden aspect-[4/3] bg-background border border-white/10 rounded-sm"
                  >
                    <img
                      src={ind.thumbnail}
                      alt={ind.name}
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-90 transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-500" />

                    <div className="absolute bottom-0 left-0 p-5 z-10 w-full transform translate-y-0 transition-transform duration-500">
                      <div className="flex items-center gap-3 mb-2 text-white">
                        <ind.icon className="w-5 h-5 group-hover:text-accent transition-colors" />
                        <h3 className="font-display font-bold text-lg md:text-xl drop-shadow-md">
                          {ind.name}
                        </h3>
                      </div>
                      <p className="text-sm text-white/60 line-clamp-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100 hidden md:block">
                        {ind.desc}
                      </p>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden lg:block">
              <CarouselPrevious className="-left-12 bg-black/80 hover:bg-black border-white/20 text-white w-12 h-12" />
              <CarouselNext className="-right-12 bg-black/80 hover:bg-black border-white/20 text-white w-12 h-12" />
            </div>
          </Carousel>
        </div>
      </section>

      <FloatingContactWidget />
    </div>
  )
}
