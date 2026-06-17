import { FadeIn } from '@/components/fade-in'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { serviceLayers } from '@/config/servicesData'

export function Services() {
  const layers = Object.entries(serviceLayers).map(([slug, layer]) => ({
    id: slug,
    title: layer.title,
    desc: layer.description,
  }))

  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-12 w-full bg-white/5">
      <div className="max-w-7xl mx-auto w-full">
        <FadeIn>
          <div className="mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
              Nossas Soluções
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Camadas Estratégicas</h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {layers.map((layer, index) => (
            <FadeIn key={layer.id} delay={100 + index * 50}>
              <Link to={`/servicos/${layer.id}`} className="group block h-full">
                <div className="flex flex-col h-full bg-black/40 border border-white/10 p-8 hover:bg-white/[0.03] transition-colors relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-0 bg-accent group-hover:h-full transition-all duration-300"></div>

                  <div className="font-mono text-xl font-bold text-white/20 group-hover:text-accent transition-colors mb-6">
                    0{index + 1}.
                  </div>

                  <h3 className="font-display text-2xl font-bold group-hover:text-accent transition-colors mb-4">
                    {layer.title}
                  </h3>

                  <p className="font-body text-muted-foreground leading-relaxed flex-1 mb-8">
                    {layer.desc}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-wider text-white/50 group-hover:text-white transition-colors mt-auto">
                    Explorar Camada
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
