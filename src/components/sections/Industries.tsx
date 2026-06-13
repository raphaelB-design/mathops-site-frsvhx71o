import { FadeIn } from '@/components/fade-in'

const sectors = [
  'Indústria',
  'Logística',
  'Agronegócio',
  'Construção Civil',
  'Varejo',
  'Saúde',
  'Finanças',
  'Energia',
  'Telecom',
]

export function Industries() {
  return (
    <section className="py-[120px] px-6 md:px-12 w-full bg-black relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/20" />
        <div className="absolute top-0 left-2/4 w-[1px] h-full bg-white/20" />
        <div className="absolute top-0 left-3/4 w-[1px] h-full bg-white/20" />
      </div>

      <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center relative z-10">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-16">
            Verticais · Especialização Setorial
          </p>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {sectors.map((sector) => (
              <div
                key={sector}
                className="px-8 py-4 border border-white/20 bg-black hover:bg-white hover:text-black transition-all duration-500 cursor-default"
              >
                <span className="font-display text-2xl md:text-3xl uppercase tracking-wider">
                  {sector}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
