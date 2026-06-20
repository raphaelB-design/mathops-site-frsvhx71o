import { FadeIn } from '@/components/fade-in'
import {
  Factory,
  Truck,
  Stethoscope,
  Building2,
  Landmark,
  ShoppingCart,
  Plane,
  Tractor,
  Zap,
} from 'lucide-react'

const industries = [
  {
    icon: Building2,
    name: 'Construção Civil',
    desc: 'Previsibilidade de insumos e cronogramas.',
    image: 'https://img.usecurling.com/p/600/400?q=architecture&color=black',
  },
  {
    icon: Factory,
    name: 'Manufatura',
    desc: 'Otimização de OEE e controle de refugo.',
    image: 'https://img.usecurling.com/p/600/400?q=factory&color=black',
  },
  {
    icon: Stethoscope,
    name: 'Saúde',
    desc: 'Gestão de leitos e predição de altas.',
    image: 'https://img.usecurling.com/p/600/400?q=hospital&color=black',
  },
  {
    icon: Truck,
    name: 'Logística',
    desc: 'Roteirização inteligente e malha otimizada.',
    image: 'https://img.usecurling.com/p/600/400?q=logistics&color=black',
  },
  {
    icon: Landmark,
    name: 'Finanças',
    desc: 'Modelos de crédito e análise de risco.',
    image: 'https://img.usecurling.com/p/600/400?q=finance&color=black',
  },
  {
    icon: ShoppingCart,
    name: 'Varejo',
    desc: 'Precificação dinâmica e controle de estoque.',
    image: 'https://img.usecurling.com/p/600/400?q=retail&color=black',
  },
  {
    icon: Plane,
    name: 'Aviação',
    desc: 'Otimização de malha aérea e manutenção preditiva.',
    image: 'https://img.usecurling.com/p/600/400?q=aviation&color=black',
  },
  {
    icon: Tractor,
    name: 'Agronegócio/Agropecuária',
    desc: 'Previsão de safra e otimização logística no campo.',
    image: 'https://img.usecurling.com/p/600/400?q=agriculture&color=black',
  },
  {
    icon: Zap,
    name: 'Energia & Utilities',
    desc: 'Focado em previsão de demanda, smart grids e eficiência de recursos.',
    image: 'https://img.usecurling.com/p/600/400?q=energy&color=black',
  },
]

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
          {industries.map((ind, idx) => {
            const Icon = ind.icon
            return (
              <FadeIn key={ind.name} delay={100 + idx * 100}>
                <div className="relative overflow-hidden p-8 border border-white/10 bg-black flex flex-col gap-6 cursor-default group h-full min-h-[320px]">
                  {/* Background Image Layer with Gradient Overlay */}
                  <div className="absolute inset-0 z-0 opacity-30 group-hover:opacity-60 transition-opacity duration-700 ease-in-out">
                    <img
                      src={ind.image}
                      alt={ind.name}
                      className="w-full h-full object-cover grayscale scale-100 group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    {/* Gradient Overlay for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
                  </div>

                  <div className="relative z-10 w-12 h-12 flex items-center justify-center bg-black/50 border border-white/20 text-white group-hover:text-accent group-hover:border-accent/50 transition-colors backdrop-blur-sm shadow-xl">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="relative z-10 mt-auto pt-8">
                    <h3 className="font-display text-2xl font-bold mb-3 text-white drop-shadow-md group-hover:text-white transition-colors">
                      {ind.name}
                    </h3>
                    <p className="font-body text-sm text-gray-300 drop-shadow-sm leading-relaxed group-hover:text-gray-200 transition-colors">
                      {ind.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
