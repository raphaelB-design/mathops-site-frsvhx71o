import { FadeIn } from '@/components/fade-in'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { serviceLayers, diagnosticoEstrategico } from '@/config/servicesData'
import { WHATSAPP_URL } from '@/config/constants'
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

                    <div className="flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-wider text-white/50 group-hover:text-white transition-colors mt-auto">
                      Explorar Camada
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            )
          })}
        </div>

        {/* Diagnóstico Estratégico (Porta de Entrada) */}
        <FadeIn delay={300}>
          <div className="mt-16 pt-12 border-t border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 border border-white/10 bg-black/40 relative overflow-hidden">
              {/* Left Column */}
              <div className="p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
                    Porta de Entrada
                  </span>
                  <h3 className="font-display text-3xl md:text-4xl font-bold mb-6">
                    {diagnosticoEstrategico.name}
                  </h3>
                  <p className="font-body text-lg text-muted-foreground leading-relaxed mb-8">
                    {diagnosticoEstrategico.headline}
                  </p>
                </div>

                <div className="border-l-2 border-white/20 pl-4 py-1 mt-4">
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    <span className="text-white font-medium">Público-alvo:</span>{' '}
                    {diagnosticoEstrategico.forWhom}
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="p-8 md:p-12 bg-white/[0.02] border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between">
                <div>
                  <ul className="space-y-4 mb-8">
                    {diagnosticoEstrategico.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span className="font-body text-sm text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="font-mono text-xs text-white/40 mb-8 leading-relaxed">
                    * {diagnosticoEstrategico.note}
                  </p>
                </div>

                <div className="mt-4">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full flex items-center justify-center gap-2 bg-white text-black font-mono font-bold uppercase tracking-wider text-sm py-4 px-8 hover:bg-accent hover:text-white transition-colors duration-300 mb-4"
                  >
                    Iniciar Diagnóstico
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
