import { FadeIn } from '@/components/fade-in'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { serviceLayers } from '@/config/servicesData'

export function Services() {
  const layers = Object.entries(serviceLayers).map(([slug, layer]) => ({
    id: slug,
    title: layer.title,
    desc: layer.description,
    prerequisiteNote: layer.prerequisiteNote,
  }))

  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-12 w-full bg-white/5">
      <div className="max-w-7xl mx-auto w-full">
        <FadeIn>
          <div className="mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
              Nossas Soluções
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Camadas Estratégicas
            </h2>
            <FadeIn delay={200}>
              <p className="font-body text-muted-foreground leading-relaxed flex-1 mb-8">
                Substitua tarefas manuais por inteligência aplicada — e tenha um núcleo analítico
                dedicado, sem o custo de montá-lo internamente.
              </p>
            </FadeIn>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {layers.map((layer, index) => (
            <FadeIn key={layer.id} delay={100 + index * 50}>
              <Link to={`/servicos/${layer.id}`} className="group block h-full">
                <div className="flex flex-col h-full bg-black/40 border border-white/10 p-8 hover:bg-white/[0.03] hover:border-white/20 transition-colors relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-white/40 transition-all duration-300"></div>

                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 border border-white/10 bg-white/5 text-white/70 rounded-sm uppercase tracking-wider">
                      Camada {index + 1}
                    </span>
                    {layer.id === 'inteligencia-artificial' && (
                      <span className="font-mono text-[10px] font-bold px-2 py-1 bg-white text-black rounded-sm uppercase tracking-wider">
                        Novo
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white mb-4">{layer.title}</h3>

                  <p className="font-body text-muted-foreground leading-relaxed flex-1 mb-8">
                    {layer.desc}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-wider text-white/50 group-hover:text-white transition-colors mt-auto">
                    Ver serviços desta camada
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
