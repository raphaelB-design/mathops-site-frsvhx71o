import { FadeIn } from '@/components/fade-in'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { serviceLayers } from '@/config/servicesData'
import { cn } from '@/lib/utils'

const layerColors = [
  {
    border: 'border-blue-500/30',
    accent: 'text-blue-400',
    badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  {
    border: 'border-violet-500/30',
    accent: 'text-violet-400',
    badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  },
  {
    border: 'border-amber-500/30',
    accent: 'text-amber-400',
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
  {
    border: 'border-accent/30',
    accent: 'text-accent',
    badge: 'bg-accent/10 text-accent border-accent/20',
  },
]

// Safelist dynamic hover and background classes for Tailwind
// group-hover:text-blue-400 group-hover:text-violet-400 group-hover:text-amber-400 group-hover:text-accent
// bg-blue-400 bg-violet-400 bg-amber-400 bg-accent

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
          {layers.map((layer, index) => {
            const color = layerColors[Math.min(index, layerColors.length - 1)]
            const hoverAccentClass = color.accent.replace('text-', 'group-hover:text-')
            const bgAccentClass = color.accent.replace('text-', 'bg-')

            return (
              <FadeIn key={layer.id} delay={100 + index * 50}>
                <Link to={`/servicos/${layer.id}`} className="group block h-full">
                  <div
                    className={cn(
                      'flex flex-col h-full bg-black/40 border p-8 hover:bg-white/[0.03] transition-colors relative overflow-hidden',
                      color.border,
                    )}
                  >
                    <div
                      className={cn(
                        'absolute top-0 left-0 w-1 h-0 group-hover:h-full transition-all duration-300',
                        bgAccentClass,
                      )}
                    ></div>

                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <span
                        className={cn(
                          'font-mono text-xs font-bold px-2.5 py-1 border rounded-sm uppercase tracking-wider',
                          color.badge,
                        )}
                      >
                        Camada {index + 1}
                      </span>
                      {layer.id === 'inteligencia-artificial' && (
                        <span className="font-mono text-[10px] font-bold px-2 py-1 bg-white text-black rounded-sm uppercase tracking-wider">
                          Novo
                        </span>
                      )}
                    </div>

                    <h3
                      className={cn(
                        'font-display text-2xl font-bold transition-colors mb-4',
                        hoverAccentClass,
                      )}
                    >
                      {layer.title}
                    </h3>

                    <p className="font-body text-muted-foreground leading-relaxed flex-1 mb-8">
                      {layer.desc}
                    </p>

                    {layer.prerequisiteNote && null}

                    <div className="flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-wider text-white/50 group-hover:text-white transition-colors mt-auto">
                      Ver serviços desta camada
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
