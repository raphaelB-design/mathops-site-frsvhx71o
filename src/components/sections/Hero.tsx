import { FadeIn } from '@/components/fade-in'
import { SlideUpMask } from '@/components/slide-up-mask'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { AnimatedCounter } from '@/components/animated-counter'
import { useCallback } from 'react'
import { useDiagnosticModal } from '@/context/DiagnosticModalContext'
import { trackClick } from '@/services/analytics'

const stats = {
  main: {
    label: 'LEAN SIX SIGMA',
    value: 'Black Belt',
    sub: 'Metodologia aplicada à operação',
  },
  sub1: {
    label: 'PLATAFORMA',
    value: 'Power BI',
    sub: 'Painéis executivos e modelagem de dados',
  },
  sub2: {
    label: 'RASTREABILIDADE',
    numericValue: 100,
    suffix: '%',
    decimals: 0,
    sub: 'Cálculos entregues com memória auditável',
  },
}

export function Hero() {
  const { openDiagnostic } = useDiagnosticModal()

  const scrollToServices = useCallback(() => {
    document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handleDiagnosticClick = () => {
    trackClick('diagnostic_open', 'hero')
    openDiagnostic()
  }

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100svh-72px)] flex flex-col justify-between px-6 md:px-12 py-16 w-full overflow-hidden bg-background"
    >
      {/* BG */}
      <div className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/15 blur-[140px] rounded-full z-0 pointer-events-none" />

      {/* Top badge */}
      <FadeIn delay={50}>
        <div className="relative z-10 inline-flex items-center gap-2 px-3 py-1.5 border border-white/10 bg-white/5 rounded-full font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
          Dados · Processos · Decisão · São Paulo
        </div>
      </FadeIn>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row gap-16 items-center justify-center my-8 max-w-7xl mx-auto w-full">
        <div className="flex-1 flex flex-col items-start text-left">
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-tight mb-8 text-white max-w-5xl break-words">
            <span className="inline-flex flex-wrap gap-x-3 md:gap-x-4 lg:gap-x-5 gap-y-2 md:gap-y-4 items-center">
              <span className="inline-flex flex-wrap gap-x-3 md:gap-x-4 lg:gap-x-5">
                <SlideUpMask delay={0}>Decisões</SlideUpMask>
                <SlideUpMask delay={50}>de</SlideUpMask>
              </span>
              <SlideUpMask delay={100}>gestão</SlideUpMask>
              <SlideUpMask delay={150}>baseadas</SlideUpMask>
              <SlideUpMask delay={200}>em</SlideUpMask>
              <SlideUpMask delay={250}>
                <em className="text-accent not-italic">dados</em>
              </SlideUpMask>
              <SlideUpMask delay={300}>que</SlideUpMask>
              <SlideUpMask delay={350}>você</SlideUpMask>
              <SlideUpMask delay={400}>pode</SlideUpMask>
              <SlideUpMask delay={450}>provar.</SlideUpMask>
            </span>
          </h1>

          <FadeIn delay={300}>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10">
              Mapeamos seus processos, estruturamos seus indicadores e entregamos painéis em Power
              BI com cada cálculo documentado e auditável. Para gestores que precisam decidir com
              fatos.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={handleDiagnosticClick}
                className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3.5 text-sm font-medium tracking-wide hover:bg-zinc-200 transition-all duration-300 min-h-[44px]"
              >
                Solicitar Diagnóstico Estratégico
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#servicos"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToServices()
                }}
                className="inline-flex items-center justify-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-300 min-h-[44px] px-4 font-mono uppercase tracking-wider"
              >
                Ver serviços
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Stats column */}
        <div className="w-full lg:w-[420px] flex flex-col gap-4 mt-8 lg:mt-0">
          <FadeIn delay={800}>
            <div className="p-8 border border-white/10 bg-black/40 backdrop-blur-xl hover:bg-black/60 hover:border-accent/50 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(45,95,168,0.2)] transition-all duration-500 ease-smooth group rounded-xl w-full">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest block mb-3">
                {stats.main.label}
              </span>
              <span className="font-display text-5xl md:text-6xl font-bold text-white block mb-2 group-hover:text-accent transition-colors duration-500">
                {stats.main.value}
              </span>
              <span className="font-body text-sm text-muted-foreground">{stats.main.sub}</span>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 gap-4">
            <FadeIn delay={900}>
              <div className="p-6 border border-white/10 bg-black/40 backdrop-blur-xl hover:bg-black/60 hover:border-accent/50 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(45,95,168,0.2)] transition-all duration-500 ease-smooth group rounded-xl h-full flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest block mb-2">
                    {stats.sub1.label}
                  </span>
                  <span className="font-display text-3xl md:text-4xl font-bold text-white block mb-2 group-hover:text-accent transition-colors duration-500">
                    {stats.sub1.value}
                  </span>
                </div>
                <span className="font-body text-xs text-muted-foreground mt-2">
                  {stats.sub1.sub}
                </span>
              </div>
            </FadeIn>
            <FadeIn delay={1000}>
              <div className="p-6 border border-white/10 bg-black/40 backdrop-blur-xl hover:bg-black/60 hover:border-accent/50 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(45,95,168,0.2)] transition-all duration-500 ease-smooth group rounded-xl h-full flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest block mb-2">
                    {stats.sub2.label}
                  </span>
                  <span className="font-display text-3xl md:text-4xl font-bold text-white block mb-2 group-hover:text-accent transition-colors duration-500">
                    <AnimatedCounter
                      value={stats.sub2.numericValue}
                      suffix={stats.sub2.suffix}
                      decimals={stats.sub2.decimals}
                      duration={2000}
                    />
                  </span>
                </div>
                <span className="font-body text-xs text-muted-foreground mt-2">
                  {stats.sub2.sub}
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <FadeIn delay={1200}>
        <button
          onClick={scrollToServices}
          className="relative z-10 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-white transition-colors mx-auto min-h-[44px] min-w-[44px] px-3"
        >
          <ChevronDown className="w-4 h-4 animate-bounce" />
          Explorar
        </button>
      </FadeIn>
    </section>
  )
}
