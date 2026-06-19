import { FadeIn } from '@/components/fade-in'
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
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight mb-6">
              Construa coisas <span className="text-accent italic">que importam</span>
              <span className="text-white">.</span>
            </h1>
            <p className="font-body text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
              Na MathOps, você vai resolver problemas reais de empresas reais&nbsp; com matemáticos,
              estatisticos, especialistas em processos e autonomia técnica e impacto
              mensurável.&nbsp;
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() =>
                  document.getElementById('candidatura')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="bg-white text-black px-8 py-4 font-display font-semibold text-base hover:bg-accent hover:text-white transition-colors flex items-center gap-2 group w-fit"
              >
                Ver Vagas Abertas
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <a
                href="mailto:talentos@mathops.com.br"
                className="px-8 py-4 font-display font-semibold text-base border border-white/15 hover:border-white/30 hover:bg-white/5 transition-colors flex items-center justify-center gap-2 w-fit"
              >
                Candidatura Espontânea
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-12 px-6 md:px-12 bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-y md:divide-y-0 divide-white/10">
          {[
            { val: '4', label: 'Vagas abertas agora' },
            { val: '100%', label: 'Remoto ou híbrido' },
            { val: 'PJ', label: 'Modelo de contratação' },
            { val: 'SP', label: 'Sede em São Paulo' },
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="px-6 py-6 first:pl-0 flex flex-col gap-1 group hover:bg-white/[0.02] transition-colors">
                <span className="font-display text-3xl md:text-4xl font-bold text-white group-hover:text-accent transition-colors">
                  {s.val}
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-24 px-6 md:px-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
              Nossa Cultura
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-16">
              Por que trabalhar na MathOps?
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-white/10">
            {values.map((v, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div className="p-8 border-b border-r border-white/10 hover:bg-white/[0.02] transition-colors group flex flex-col gap-4 h-full [&:nth-child(3n)]:border-r-0 [&:nth-last-child(-n+3)]:border-b-0">
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
      <section className="py-24 px-6 md:px-12 bg-white/[0.02] border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
              Processo Seletivo
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-16">
              Simples, transparente e rápido.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {[
              {
                step: '01',
                title: 'Candidatura',
                desc: 'Envie currículo e, se quiser, portfólio ou exemplos de trabalho. Lemos tudo.',
                time: 'Dia 0',
              },
              {
                step: '02',
                title: 'Bate-papo inicial',
                desc: 'Call de 30 min com alguém do time para entender seu histórico e o que você está buscando.',
                time: 'Até 5 dias',
              },
              {
                step: '03',
                title: 'Desafio técnico',
                desc: 'Problema real de consultoria para resolver no seu tempo. Sem prova cronometrada.',
                time: '3–5 dias',
              },
              {
                step: '04',
                title: 'Entrevista final',
                desc: 'Conversa técnica + cultural com os sócios. Feedback honesto em até 48h.',
                time: 'Até 7 dias',
              },
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="relative p-8 border-r border-b md:border-b-0 border-white/10 last:border-r-0 group hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-start justify-between mb-6">
                    <span className="font-mono text-4xl font-bold text-white/10 group-hover:text-accent/20 transition-colors">
                      {p.step}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">{p.time}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold mb-3 group-hover:text-accent transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  {i < 3 && (
                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-4 h-4 border border-white/10 bg-background rotate-45" />
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Spontaneous / Form ── */}
      <section id="candidatura" className="py-24 px-6 md:px-12 scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
                Candidatura Espontânea
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Faça parte do time
              </h2>
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
