import { FadeIn } from '@/components/fade-in'
import { SlideUpMask } from '@/components/slide-up-mask'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { AnimatedCounter } from '@/components/animated-counter'
import { useNavigate } from 'react-router-dom'
import { WHATSAPP_URL } from '@/config/constants'

const stats = [
  {
    value: 4.8,
    suffix: 'σ',
    decimals: 1,
    label: 'Qualidade de Processo',
    sub: 'Nível Six Sigma sustentado',
  },
  {
    value: -38,
    suffix: '%',
    decimals: 0,
    label: 'Tempo de Decisão',
    sub: 'Redução média no tempo de decisão de nossos clientes',
  },
  {
    value: 100,
    suffix: '%',
    decimals: 0,
    label: 'Rastreabilidade',
    sub: 'Memória de cálculo auditável',
  },
]

export function Hero() {
  const navigate = useNavigate()
  const scrollToServices = () =>
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })

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
          Decision Intelligence · São Paulo, Brasil
        </div>
      </FadeIn>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row gap-16 items-center justify-center my-8 max-w-7xl mx-auto w-full">
        <div className="flex-1 flex flex-col items-start text-left">
          <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-tight mb-8 text-white max-w-5xl break-words">
            <span className="inline-flex flex-wrap gap-x-3 md:gap-x-4 lg:gap-x-5 gap-y-2 md:gap-y-4 items-center">
              <span className="inline-flex whitespace-nowrap gap-x-3 md:gap-x-4 lg:gap-x-5">
                <SlideUpMask delay={200}>Rigor</SlideUpMask>
                <SlideUpMask delay={300}>
                  <em className="text-accent not-italic">matemático</em>
                </SlideUpMask>
              </span>
              <SlideUpMask delay={400}>para</SlideUpMask>
              <SlideUpMask delay={500}>decisões</SlideUpMask>
              <SlideUpMask delay={600}>que</SlideUpMask>
              <SlideUpMask delay={700}>não</SlideUpMask>
              <SlideUpMask delay={800}>podem</SlideUpMask>
              <SlideUpMask delay={900}>errar.</SlideUpMask>
            </span>
          </h1>

          <FadeIn delay={600}>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10">
              Construímos a ponte entre o que sua operação sente e o que ela pode provar. Modelagem,
              automação e dados, não para substituir seu julgamento, mas para blindá-lo.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <button
                onClick={() =>
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="bg-white text-black px-8 py-4 font-display font-semibold text-base hover:bg-accent hover:text-white transition-all duration-500 ease-smooth hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(45,95,168,0.3)] flex items-center gap-2 group"
              >
                Agendar Diagnóstico&nbsp;
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500 ease-smooth" />
              </button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 font-display font-semibold text-base border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all duration-500 ease-smooth hover:-translate-y-1 flex items-center justify-center gap-2 group"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Falar com Especialista
              </a>
              <button
                onClick={() => {
                  window.scrollTo(0, 0)
                  navigate('/metodologia')
                }}
                className="px-8 py-4 font-display font-semibold text-base border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all duration-500 ease-smooth hover:-translate-y-1 flex items-center justify-center gap-2 group"
              >
                Conhecer Nossa Metodologia
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500 ease-smooth" />
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Stats column */}
        <div className="w-full lg:w-[420px] flex flex-col gap-4 mt-8 lg:mt-0">
          <FadeIn delay={800}>
            <div className="p-8 border border-white/10 bg-black/40 backdrop-blur-xl hover:bg-black/60 hover:border-accent/50 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(45,95,168,0.2)] transition-all duration-500 ease-smooth group rounded-xl w-full">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest block mb-3">
                {stats[0].label}
              </span>
              <span className="font-display text-5xl md:text-6xl font-bold text-white block mb-2 group-hover:text-accent transition-colors duration-500">
                <AnimatedCounter
                  value={stats[0].value}
                  suffix={stats[0].suffix}
                  decimals={stats[0].decimals}
                />
              </span>
              <span className="font-body text-sm text-muted-foreground">{stats[0].sub}</span>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 gap-4">
            {stats.slice(1).map((s, i) => (
              <FadeIn key={i} delay={900 + i * 100}>
                <div className="p-6 border border-white/10 bg-black/40 backdrop-blur-xl hover:bg-black/60 hover:border-accent/50 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(45,95,168,0.2)] transition-all duration-500 ease-smooth group rounded-xl h-full flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest block mb-2">
                      {s.label}
                    </span>
                    <span className="font-display text-3xl md:text-4xl font-bold text-white block mb-2 group-hover:text-accent transition-colors duration-500">
                      <AnimatedCounter value={s.value} suffix={s.suffix} decimals={s.decimals} />
                    </span>
                  </div>
                  <span className="font-body text-xs text-muted-foreground mt-2">{s.sub}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <FadeIn delay={1200}>
        <button
          onClick={scrollToServices}
          className="relative z-10 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-white transition-colors mx-auto"
        >
          <ChevronDown className="w-4 h-4 animate-bounce" />
          Explorar
        </button>
      </FadeIn>
    </section>
  )
}
