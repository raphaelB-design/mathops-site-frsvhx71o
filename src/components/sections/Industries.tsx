import { FadeIn } from '@/components/fade-in'
import { industriesList } from '@/config/industriesData'
import { Link } from 'react-router-dom'

export function Industries() {
  return (
    <section
      id="industries"
      className="py-24 md:py-32 px-6 md:px-12 w-full border-t border-white/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
                Aplicações Setoriais
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold">
                Experiência Cross-Industry
              </h2>
            </div>
            <p className="font-body text-lg text-muted-foreground max-w-sm">
              A matemática não pergunta a que setor você pertence. Os mesmos princípios que otimizam
              uma linha de produção otimizam a jornada de um paciente ou o caixa de um banco.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industriesList.map((ind, idx) => {
            const Icon = ind.icon
            return (
              <FadeIn key={ind.name} delay={100 + idx * 100}>
                <Link to={`/industrias/${ind.slug}`} className="block h-full">
                  <div className="relative overflow-hidden p-8 border border-white/10 bg-black flex flex-col gap-6 cursor-pointer group h-full min-h-[320px]">
                    {/* Background Image Layer with Gradient Overlay */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <img
                        src={ind.thumbnail}
                        alt={ind.name}
                        className="w-full h-full object-cover opacity-50 group-hover:opacity-80 grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110 transition-all duration-700 ease-in-out"
                      />
                      {/* Gradient Overlay for Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                      {/* Radial Glow on Hover */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    </div>

                    <div className="relative z-10 w-12 h-12 flex items-center justify-center bg-black/60 border border-white/20 text-white group-hover:text-accent group-hover:border-accent/50 transition-colors backdrop-blur-md shadow-xl">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="relative z-10 mt-auto pt-8">
                      <h3 className="font-display text-2xl font-bold mb-3 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:text-white transition-colors">
                        {ind.name}
                      </h3>
                      <p className="font-body text-sm text-gray-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-relaxed group-hover:text-white transition-colors font-medium">
                        {ind.desc}
                      </p>
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
