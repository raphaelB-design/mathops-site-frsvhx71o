import { FadeIn } from '@/components/fade-in'

const metrics = [
  { value: '40+', label: 'Infraestruturas de Dados Entregues' },
  { value: '100%', label: 'Taxa de Retorno (ROI) em 12 meses' },
  { value: '4.8σ', label: 'Score de Eficiência em Processos' },
  { value: '30M+', label: 'Em custos operacionais reduzidos' },
]

export function Metrics() {
  return (
    <section id="numeros" className="py-24 md:py-32 px-6 md:px-12 w-full">
      <div className="max-w-7xl mx-auto w-full">
        <FadeIn>
          <h2 className="sr-only">Nossos Números</h2>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, idx) => (
            <FadeIn key={idx} delay={idx * 150}>
              <div className="relative flex flex-col gap-4 p-8 bg-white/5 border border-white/10 group overflow-hidden h-full">
                {/* Accent Top Border Hover Effect */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <h3 className="font-display text-4xl md:text-5xl font-bold text-white group-hover:text-accent transition-colors">
                  {metric.value}
                </h3>
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground leading-relaxed mt-auto">
                  {metric.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
