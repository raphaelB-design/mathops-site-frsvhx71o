import { FadeIn } from '@/components/fade-in'

const metrics = [
  { value: '100%', label: 'Decisões Baseadas em Dados' },
  { value: '42+', label: 'Projetos Auditados e Otimizados' },
  { value: '98.5/100', label: 'Score de Eficiência Operacional' },
  { value: 'Até 30%', label: 'Redução de Custos Operacionais' },
]

export function Metrics() {
  return (
    <section className="py-24 px-6 md:px-12 w-full bg-white text-black">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 lg:divide-x divide-black/10">
          {metrics.map((metric, idx) => (
            <FadeIn key={idx} delay={idx * 150}>
              <div className="flex flex-col lg:px-10 first:pl-0 last:pr-0">
                <h3 className="font-display text-5xl md:text-6xl font-bold tracking-tighter mb-4">
                  {metric.value}
                </h3>
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-black/60 leading-relaxed">
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
