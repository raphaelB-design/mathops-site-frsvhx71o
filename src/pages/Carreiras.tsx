import { FadeIn } from '@/components/fade-in'
import { SlideUpMask } from '@/components/slide-up-mask'
import { CandidateForm } from '@/components/CandidateForm'
import { ArrowUpRight, BookOpen, Heart, Shield, TrendingUp, Users, Zap } from 'lucide-react'

// ─── Data ──────────────────────────────────────────────────────────────────────
const values = [
  {
    icon: Zap,
    title: 'Rigor sem burocracia',
    desc: 'Entregamos metodologia de ponta sem camadas de aprovação que engessam o trabalho técnico.',
  },
  {
    icon: BookOpen,
    title: 'Aprendizado constante',
    desc: 'Cada projeto expõe você a um setor diferente, um problema novo e uma abordagem que ainda não usou.',
  },
  {
    icon: TrendingUp,
    title: 'Impacto mensurável',
    desc: 'Você vê em números o resultado do seu trabalho — em R$ recuperados, processos otimizados, decisões aceleradas.',
  },
  {
    icon: Users,
    title: 'Time pequeno, entrega grande',
    desc: 'Sem hierarquia desnecessária. Sua voz importa desde o primeiro dia.',
  },
  {
    icon: Heart,
    title: 'Autonomia real',
    desc: 'Você define como vai resolver o problema. Confiamos na sua metodologia.',
  },
  {
    icon: Shield,
    title: 'Segurança e transparência',
    desc: 'Contratos claros, remuneração honesta e feedback direto — sem jogos políticos.',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Carreiras() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 px-6 md:px-12 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <FadeIn>
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-6 block">
              Carreiras · MathOps Strategy
            </span>
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight mb-6 flex flex-wrap gap-x-3 gap-y-2">
              <SlideUpMask delay={100}>Construa coisas</SlideUpMask>
              <SlideUpMask delay={200}>
                <span className="text-accent italic">que importam</span>
                <span className="text-white">.</span>
              </SlideUpMask>
            </h1>
            <p className="font-body text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
              Na MathOps, você vai resolver problemas reais de empresas reais&nbsp; com matemáticos,
              estatisticos, especialistas em processos e autonomia técnica e impacto
              mensurável.&nbsp;
            </p>
            <div className="flex flex-col sm:flex-row gap-4"></div>
          </FadeIn>
        </div>
      </section>

      {/* ── Stats ── */}

      {/* ── Values ── */}
      <section className="py-24 px-6 md:px-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
              Nossa Cultura
            </span>
            <div className="font-display text-3xl md:text-4xl font-bold mb-16">
              <SlideUpMask>Por que trabalhar na MathOps?</SlideUpMask>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-white/10">
            {values.map((v, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div className="p-8 border-b border-r border-white/10 hover:bg-white/[0.04] hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.05)] transition-all duration-500 ease-smooth group flex flex-col gap-4 h-full [&:nth-child(3n)]:border-r-0 [&:nth-last-child(-n+3)]:border-b-0 relative before:absolute before:inset-0 before:ring-1 before:ring-white/0 hover:before:ring-white/20 before:transition-all before:duration-500 before:ease-smooth before:z-10">
                  <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-accent/40 transition-colors">
                    <v.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-display text-lg font-bold group-hover:text-accent transition-colors">
                    {v.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}

      {/* ── Spontaneous / Form ── */}
      <section id="candidatura" className="py-24 px-6 md:px-12 scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
                Candidatura Espontânea
              </span>
              <div className="font-display text-3xl md:text-4xl font-bold mb-4">
                <SlideUpMask>Faça parte do time</SlideUpMask>
              </div>
              <p className="text-muted-foreground">
                Não temos vagas abertas no momento, mas mantemos um banco de talentos ativo. Se o
                seu perfil fizer sentido para um projeto futuro, entraremos em contato.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="p-8 border border-white/10 bg-white/[0.02] rounded-xl">
              <CandidateForm />
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
