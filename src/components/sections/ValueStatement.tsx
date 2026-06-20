import { FadeIn } from '@/components/fade-in'

const pills = [
  'DMAIC Framework',
  'Estatística Descritiva',
  'Simulações de Monte Carlo',
  'Arquitetura Data Lake',
  'Machine Learning',
]

export function ValueStatement() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <FadeIn>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
            Empresas não quebram por falta de esforço. Quebram por decisões que pareciam certas e
            nunca foram testadas.
          </h2>
        </FadeIn>

        <div className="flex flex-col gap-8">
          <FadeIn delay={200}>
            <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed">
              <strong className="text-white font-medium">MathOps Strategy</strong>&nbsp;nasce do
              encontro entre rigor matemático e operação real. Onde antes havia opinião, instalamos
              evidência: auditável, replicável, escalável em qualquer escala que sua empresa decida
              crescer.
            </p>
          </FadeIn>
          <FadeIn delay={400}>
            <div className="flex flex-wrap gap-3 mt-4">
              {pills.map((pill, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 border border-white/10 bg-white/5 rounded-md font-mono text-xs uppercase tracking-wider text-muted-foreground hover:bg-accent hover:text-white hover:border-accent transition-all cursor-default"
                >
                  {pill}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
