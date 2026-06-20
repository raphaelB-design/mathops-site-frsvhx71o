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
} from 'lucide-react'

const industries = [
  { icon: Building2, name: 'Construção Civil', desc: 'Previsibilidade de insumos e cronogramas.' },
  { icon: Factory, name: 'Manufatura', desc: 'Otimização de OEE e controle de refugo.' },
  { icon: Stethoscope, name: 'Saúde', desc: 'Gestão de leitos e predição de altas.' },
  { icon: Truck, name: 'Logística', desc: 'Roteirização inteligente e malha otimizada.' },
  { icon: Landmark, name: 'Finanças', desc: 'Modelos de crédito e análise de risco.' },
  { icon: ShoppingCart, name: 'Varejo', desc: 'Precificação dinâmica e controle de estoque.' },
  { icon: Plane, name: 'Aviação', desc: 'Otimização de malha aérea e manutenção preditiva.' },
  {
    icon: Tractor,
    name: 'Agronegócio/Agropecuária',
    desc: 'Previsão de safra e otimização logística no campo.',
  },
]

export function Industries() {
  return (
    <section
      id="industries"
      className="py-24 md:py-32 px-6 md:px-12 w-full border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto w-full">
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
                <div className="p-8 border border-white/10 bg-white/5 flex flex-col gap-6 hover:bg-white/10 transition-colors cursor-default group">
                  <div className="w-12 h-12 flex items-center justify-center bg-black/50 border border-white/10 text-white group-hover:text-accent transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold mb-2">{ind.name}</h3>
                    <p className="font-body text-sm text-muted-foreground">{ind.desc}</p>
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
