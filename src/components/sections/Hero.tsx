import { FadeIn } from '@/components/fade-in'
import { ArrowDown } from 'lucide-react'

export function Hero() {
  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100svh-72px)] flex flex-col justify-center px-6 md:px-12 py-20 w-full overflow-hidden bg-background"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 blur-[120px] rounded-full z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 flex flex-col items-start text-left">
          <FadeIn delay={100}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/10 bg-white/5 rounded-full mb-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              Decision Intelligence Framework
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight mb-8 text-[#ffffff]">
              &nbsp;Transformando{' '}
              <span className="text-accent italic pr-4">
                complexidade&nbsp;<span className="text-white not-italic">em Estratégia</span>
                <span className="text-white not-italic">.</span>
                <br />
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={500}>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
              A arquitetura analítica para operações complexas. Aplicamos modelagem estatística
              avançada e engenharia de dados para erradicar a intuição do processo decisório.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() =>
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="bg-white text-black px-8 py-4 font-display font-semibold text-base hover:bg-accent hover:text-white transition-colors"
              >
                Agendar Diagnóstico
              </button>
              <button
                onClick={scrollToNext}
                className="px-8 py-4 font-display font-semibold text-base border border-white/10 hover:bg-white/5 transition-colors flex items-center justify-center gap-2 group"
              >
                Explorar Método{' '}
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          </FadeIn>
        </div>

        <div className="w-full lg:w-[400px] flex flex-col gap-4">
          <FadeIn delay={700}>
            <div className="p-6 border border-white/10 bg-black/40 backdrop-blur-md flex flex-col gap-2 hover:border-accent/50 transition-colors">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                Qualidade de Processo
              </span>
              <span className="font-display text-5xl font-bold text-white">4.8σ</span>
              <span className="font-body text-sm text-muted-foreground">
                Nível Six Sigma alcançado
              </span>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 gap-4">
            <FadeIn delay={800}>
              <div className="p-6 border border-white/10 bg-black/40 backdrop-blur-md flex flex-col gap-2 hover:border-accent/50 transition-colors h-full">
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                  Tempo de Decisão
                </span>
                <span className="font-display text-4xl font-bold text-white">-38%</span>
              </div>
            </FadeIn>
            <FadeIn delay={900}>
              <div className="p-6 border border-white/10 bg-black/40 backdrop-blur-md flex flex-col gap-2 hover:border-accent/50 transition-colors h-full">
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                  Precisão de Cálculo
                </span>
                <span className="font-display text-4xl font-bold text-white">100%</span>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
