import { FadeIn } from '@/components/fade-in'
import { ArrowUpRight, ChevronDown } from 'lucide-react'

const stats = [
  { value: '4.8σ', label: 'Qualidade de Processo', sub: 'Nível Six Sigma alcançado' },
  { value: '−38%', label: 'Tempo de Decisão', sub: 'Redução média em clientes' },
  { value: '100%', label: 'Rastreabilidade', sub: 'Memória de cálculo auditável' },
]

export function Hero() {
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
          <FadeIn delay={200}>
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[0.92] tracking-tight mb-8 text-white">
              Transforme&nbsp;
              <span className="text-accent italic">complexidade</span>
              <br />
              <span className="text-white">em Estratégia.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={400}>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10">
              Modelagem estatística avançada, automação de processos e engenharia de dados para
              erradicar a intuição do processo decisório. Resultados verificáveis, metodologia
              auditável.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() =>
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="bg-white text-black px-8 py-4 font-display font-semibold text-base hover:bg-accent hover:text-white transition-colors flex items-center gap-2 group"
              >
                Agendar Diagnóstico Gratuito
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <button
                onClick={scrollToServices}
                className="px-8 py-4 font-display font-semibold text-base border border-white/15 hover:border-white/30 hover:bg-white/5 transition-colors flex items-center justify-center gap-2 group"
              >
                Ver Portfólio de Serviços
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Stats column */}
        <div className="w-full lg:w-[360px] flex flex-col gap-3">
          <FadeIn delay={600}>
            <div className="p-6 border border-white/10 bg-black/50 backdrop-blur-md hover:border-accent/40 transition-colors group">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-2">
                {stats[0].label}
              </span>
              <span className="font-display text-5xl font-bold text-white block mb-1 group-hover:text-accent transition-colors">
                {stats[0].value}
              </span>
              <span className="font-body text-xs text-muted-foreground">{stats[0].sub}</span>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 gap-3">
            {stats.slice(1).map((s, i) => (
              <FadeIn key={i} delay={700 + i * 80}>
                <div className="p-5 border border-white/10 bg-black/50 backdrop-blur-md hover:border-accent/40 transition-colors group h-full">
                  <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-2">
                    {s.label}
                  </span>
                  <span className="font-display text-3xl font-bold text-white block mb-1 group-hover:text-accent transition-colors">
                    {s.value}
                  </span>
                  <span className="font-body text-xs text-muted-foreground">{s.sub}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <FadeIn delay={1000}>
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
