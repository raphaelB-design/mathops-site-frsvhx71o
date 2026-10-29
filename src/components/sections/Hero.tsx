import { FadeIn } from '@/components/fade-in'
import { SlideUpMask } from '@/components/slide-up-mask'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { AnimatedCounter } from '@/components/animated-counter'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { trackClick } from '@/services/analytics'
import { HeroExecutiveChart } from '@/components/charts/HeroExecutiveChart'
import { SectionBackdrop } from '@/components/SectionBackdrop'

const statsCards = [
  {
    label: 'LEAN SIX SIGMA',
    value: 'Lean Six Sigma',
    isNumeric: false,
    sub: 'Metodologia DMAIC aplicada em projetos reais',
  },
  {
    label: 'VISIBILIDADE',
    value: 'Dashboards',
    isNumeric: false,
    sub: 'Painéis executivos e modelagem de dados',
  },
  {
    label: 'RASTREABILIDADE',
    numericValue: 100,
    suffix: '%',
    decimals: 0,
    isNumeric: true,
    sub: 'Cálculos entregues com memória auditável',
  },
]

export function Hero() {
  const scrollToServices = useCallback(() => {
    document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section
      id="hero"
      className="relative flex flex-col justify-between px-6 md:px-12 pt-16 pb-12 w-full overflow-hidden bg-[#0A0F1C]"
    >
      {/* 2.3 Hero: "executive" ao fundo + 1.3 grade com opacidade levemente maior */}
      <div className="absolute inset-0 z-0 opacity-[0.10] pointer-events-none bg-[linear-gradient(to_right,#3B82F6_1px,transparent_1px),linear-gradient(to_bottom,#3B82F6_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* 1.3 Brilhos radiais suaves (#3B82F6 e #22D3EE, 10-15% opacidade, blur alto) */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3B82F6]/15 blur-[150px] rounded-full z-0 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/3 w-[500px] h-[500px] bg-[#22D3EE]/12 blur-[140px] rounded-full z-0 pointer-events-none" />

      {/* 2.3 Executive backdrop */}
      <SectionBackdrop variant="executive" opacityClass="opacity-[0.16]" />

      {/* Top badge */}
      <FadeIn delay={50}>
        <div className="relative z-10 inline-flex items-center gap-2 px-3 py-1.5 border border-white/10 bg-white/5 rounded-full font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
          Dados · Processos · Decisão
        </div>
      </FadeIn>

      {/* Main content: Hero Title/CTA on left, Executive Panel on right */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-between my-8 max-w-7xl mx-auto w-full">
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
                <em className="text-accent not-italic">dados.</em>
              </SlideUpMask>
            </span>
          </h1>

          <FadeIn delay={300}>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10">
              Mapeamos seus processos, estruturamos seus indicadores e entregamos dashboards
              interativos com cada cálculo documentado e auditável. Para gestores que precisam
              decidir com fatos.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4">
              <Link
                to="/diagnostico"
                onClick={() => trackClick('diagnostic_open', 'hero')}
                className="btn-primary-gradient inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium tracking-wide rounded-sm min-h-[44px]"
              >
                Solicitar Diagnóstico Estratégico
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#servicos"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToServices()
                }}
                className="btn-secondary-dark inline-flex items-center justify-center gap-2 text-sm min-h-[44px] px-4 font-mono uppercase tracking-wider rounded-sm"
              >
                Ver serviços
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Executive Mini Panel */}
        <div className="w-full lg:w-[480px] shrink-0">
          <FadeIn delay={400}>
            <HeroExecutiveChart />
          </FadeIn>
        </div>
      </div>

      {/* Horizontal Strip of the 3 Original Stats Cards */}
      <div className="relative z-10 w-full max-w-7xl mx-auto mt-8 pt-8 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {statsCards.map((stat, idx) => (
            <FadeIn key={stat.label} delay={500 + idx * 100}>
              <div className="premium-card p-6 rounded-xl h-full flex flex-col justify-between group">
                <div>
                  <span className="font-mono text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest block mb-2 group-hover:text-accent2 transition-colors">
                    {stat.label}
                  </span>
                  <span className="font-display text-3xl md:text-4xl font-bold text-white block mb-2 group-hover:text-accent transition-colors duration-300">
                    {stat.isNumeric ? (
                      <AnimatedCounter
                        value={stat.numericValue!}
                        suffix={stat.suffix}
                        decimals={stat.decimals}
                        duration={2000}
                      />
                    ) : (
                      stat.value
                    )}
                  </span>
                </div>
                <span className="font-body text-xs text-muted-foreground mt-2">{stat.sub}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <FadeIn delay={800}>
        <button
          onClick={scrollToServices}
          className="relative z-10 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-white transition-colors mx-auto mt-8 min-h-[44px] min-w-[44px] px-3"
        >
          <ChevronDown className="w-4 h-4 animate-bounce" />
          Explorar
        </button>
      </FadeIn>
    </section>
  )
}
