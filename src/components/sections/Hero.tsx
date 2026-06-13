import { FadeIn } from '@/components/fade-in'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-end pb-24 px-6 md:px-12 w-full overflow-hidden bg-black"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
        <img
          src="https://img.usecurling.com/p/1920/1080?q=modern%20dashboard&color=black"
          alt="Modern Dashboard Visualization"
          className="w-full h-full object-cover grayscale opacity-50 scale-105 animate-float"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <FadeIn delay={200}>
              <p className="font-mono text-xs md:text-sm uppercase tracking-widest text-muted-foreground mb-6 md:mb-8 flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                Inteligência Decisória Baseada em Dados
              </p>
            </FadeIn>

            <FadeIn delay={400}>
              <h1 className="font-display text-4xl md:text-6xl lg:text-[6.5rem] uppercase leading-[0.9] tracking-tight text-white mb-8 text-shadow-sm">
                Suas decisões são tão confiáveis quanto os dados por trás delas?
              </h1>
            </FadeIn>

            <FadeIn delay={600}>
              <div className="space-y-6 max-w-3xl">
                <p className="font-body text-xl md:text-2xl text-muted-foreground leading-relaxed">
                  Unimos o rigor metodológico do{' '}
                  <strong className="text-white font-medium">Lean Six Sigma</strong> à{' '}
                  <strong className="text-white font-medium">modelagem matemática</strong> e
                  arquitetura de <strong className="text-white font-medium">BI</strong> para
                  transformar complexidade em resultados mensuráveis.
                </p>
                <div className="border-l-2 border-white pl-4 py-2 mt-8">
                  <p className="font-mono text-sm md:text-base text-white uppercase tracking-wider leading-relaxed">
                    "Não vendemos relatórios, dashboards ou consultoria — entregamos clareza,
                    inteligência e confiança."
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-8 lg:pb-4">
            <FadeIn delay={800}>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="border border-white/10 bg-black/40 p-5 backdrop-blur-md hover:bg-white/5 transition-colors duration-300">
                  <p className="font-mono text-xs text-muted-foreground mb-2">Tempo de Decisão</p>
                  <p className="font-display text-3xl md:text-4xl text-white">-38%</p>
                </div>
                <div className="border border-white/10 bg-black/40 p-5 backdrop-blur-md hover:bg-white/5 transition-colors duration-300">
                  <p className="font-mono text-xs text-muted-foreground mb-2">
                    Qualidade de Processo
                  </p>
                  <p className="font-display text-3xl md:text-4xl text-white">4.8σ</p>
                </div>
                <div className="border border-white/10 bg-black/40 p-5 backdrop-blur-md hover:bg-white/5 transition-colors duration-300 col-span-2 lg:col-span-1">
                  <p className="font-mono text-xs text-muted-foreground mb-2">
                    Precisão de Cálculo
                  </p>
                  <p className="font-display text-3xl md:text-4xl text-white">Absoluta</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={1000}>
              <div className="flex flex-wrap gap-2">
                {['Lean Six Sigma', 'DMAIC', 'PMBOK', 'ISO 9001', 'LGPD'].map((cert) => (
                  <span
                    key={cert}
                    className="px-3 py-1.5 border border-white/20 text-[10px] uppercase font-mono text-muted-foreground rounded-full hover:border-white hover:text-white transition-colors cursor-default"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
