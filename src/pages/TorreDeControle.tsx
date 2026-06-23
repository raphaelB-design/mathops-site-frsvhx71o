import {
  ArrowLeft,
  CheckCircle2,
  BarChart2,
  AlertTriangle,
  FileText,
  Activity,
  Users,
  Shield,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { FadeIn } from '@/components/fade-in'
import { QuoteCTA } from '@/components/sections/QuoteCTA'

export default function TorreDeControle() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="w-full flex flex-col min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative pt-32 pb-24 md:pt-48 md:pb-32 px-6 md:px-12 flex flex-col items-center text-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-zinc-950 -z-10"></div>
        <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/1920/1080?q=command%20center&color=black&dpr=2')] opacity-20 mix-blend-overlay -z-10 grayscale"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black -z-10"></div>

        <FadeIn className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-xs font-sans tracking-[0.25em] text-zinc-400 hover:text-white transition-colors mb-12 uppercase"
          >
            <ArrowLeft className="w-4 h-4" />
            Retornar ao Hub Central
          </Link>

          <span className="inline-block px-4 py-1.5 mb-8 text-xs font-mono font-bold tracking-widest uppercase bg-white/10 text-white border border-white/20 rounded-full">
            Produto Âncora MathOps
          </span>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium mb-8 tracking-tight leading-[1.1] text-white drop-shadow-xl">
            Torre de Controle Analítico
          </h1>
          <p className="text-lg md:text-2xl text-zinc-300 leading-relaxed max-w-3xl mx-auto mb-16 font-light">
            Terceirize a inteligência de dados e processos da sua empresa com um time de elite — sem
            o custo e a gestão de montar uma área interna.
          </p>

          <button
            onClick={scrollToContact}
            className="group relative inline-flex items-center gap-3 bg-white text-black px-8 py-4 overflow-hidden rounded-sm transition-transform hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-zinc-200 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            <span className="font-mono font-bold text-sm uppercase tracking-wider relative z-10">
              Quero saber mais → Agendar Conversa
            </span>
          </button>
        </FadeIn>
      </div>

      {/* O que é Section */}
      <div className="py-24 px-6 md:px-12 bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-zinc-500 mb-6">
              O que é a Torre de Controle
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl font-serif text-zinc-300 leading-relaxed mb-8">
              A Torre de Controle é o nosso produto de maior impacto estratégico. Em vez de projetos
              pontuais, você contrata um núcleo analítico dedicado que opera mensalmente:
              monitorando KPIs, identificando anomalias, modelando cenários e entregando insights
              acionáveis para C-Level e diretores.
            </p>
            <div className="inline-block px-6 py-3 bg-white/5 border border-white/10 rounded-sm">
              <span className="font-sans text-sm text-zinc-400">
                <strong className="text-white">Ideal para:</strong> C-Levels e diretores que querem
                estrutura analítica de ponta sem gerenciar área técnica.
              </span>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* O que está incluído Section */}
      <div className="py-24 px-6 md:px-12 bg-black border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-white mb-4">
                O que está incluído
              </h2>
              <p className="text-zinc-400 font-sans text-sm uppercase tracking-wider">
                Arsenal analítico completo à sua disposição
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Activity className="w-6 h-6" />,
                  title: 'Monitoramento contínuo de KPIs críticos',
                },
                {
                  icon: <AlertTriangle className="w-6 h-6" />,
                  title: 'Alertas automáticos de anomalias estatísticas',
                },
                {
                  icon: <FileText className="w-6 h-6" />,
                  title: 'Relatórios executivos mensais com variância e tendência',
                },
                {
                  icon: <BarChart2 className="w-6 h-6" />,
                  title: 'Modelagem de cenários sob demanda',
                },
                {
                  icon: <Users className="w-6 h-6" />,
                  title: 'Reunião quinzenal de alinhamento estratégico',
                },
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: 'Documentação e memória de cálculo auditável',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-950 border border-white/5 p-8 hover:border-white/20 transition-colors rounded-sm flex flex-col"
                >
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-serif text-white leading-snug">{item.title}</h3>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Para quem é Section */}
      <div className="py-24 px-6 md:px-12 bg-zinc-950 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-white mb-4">
                Para quem é
              </h2>
              <p className="text-zinc-400 font-sans text-sm uppercase tracking-wider">
                Perfil de fit estratégico
              </p>
            </div>

            <div className="space-y-4">
              {[
                'Empresas com faturamento acima de R$10M/ano',
                'Operações com alta variabilidade ou complexidade de dados',
                'Líderes que tomam decisões de alto impacto sem tempo para análise profunda',
                'Empresas que já tentaram contratar analista interno mas não encontraram o perfil certo',
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 bg-black border border-white/5 p-6 rounded-sm"
                >
                  <CheckCircle2 className="w-6 h-6 text-zinc-400 shrink-0" />
                  <span className="text-lg text-zinc-300 font-light leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Quote Form CTA */}
      <QuoteCTA />
    </div>
  )
}
