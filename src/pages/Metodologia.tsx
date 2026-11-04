import { Methodology as DMAIC } from '@/components/sections/Methodology'
import { FadeIn } from '@/components/fade-in'
import { SlideUpMask } from '@/components/slide-up-mask'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Differentials } from '@/components/sections/Differentials'
import { Helmet } from '@/components/Helmet'
import { VideoBackdrop } from '@/components/VideoBackdrop'
import { ControlChartLive } from '@/components/ControlChartLive'

export default function Metodologia() {
  return (
    <div className="w-full flex flex-col">
      <Helmet>
        <title>Metodologia & Diferenciais | MathOps Strategy — DMAIC, Modelagem e Processos</title>
        <meta
          name="description"
          content="Conheça a metodologia da MathOps Strategy: DMAIC, controle estatístico de processo, auditoria de cálculos e gestão de riscos, com confidencialidade e conformidade com a LGPD."
        />
      </Helmet>
      {/* Methodology Page Hero */}
      <section className="relative pt-32 pb-16 px-6 md:px-12 w-full overflow-hidden bg-background">
        <VideoBackdrop name="06-fluxos-de-luz" opacity={0.35} />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/15 blur-[120px] rounded-full z-0 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto w-full text-center mt-12 mb-12">
          <FadeIn delay={100}>
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-6 block">
              O Caminho do Resultado
            </span>
          </FadeIn>
          <h1 className="font-display font-bold text-4xl md:text-6xl leading-[0.95] tracking-tight mb-8 text-white flex flex-col items-center gap-y-2">
            <span className="flex flex-wrap justify-center gap-x-4">
              <SlideUpMask delay={200}>Nossa</SlideUpMask>
              <SlideUpMask delay={300}>
                <em className="text-accent not-italic">Metodologia</em>
              </SlideUpMask>
            </span>
          </h1>
          <FadeIn delay={400}>
            <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Transformamos complexidade analítica em clareza estratégica através de um processo
              rigoroso e transparente.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Process Section */}
      <HowItWorks />

      {/* DMAIC Section */}
      <DMAIC />

      {/* Modelagem Matemática + Estatística Avançada — seção unificada em duas colunas */}
      <section className="py-24 px-6 md:px-12 w-full bg-[#0A0F1C] relative overflow-hidden">
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12">
            {/* Coluna esquerda — Estruturando o Caos */}
            <div className="flex flex-col gap-6">
              <FadeIn>
                <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
                  Modelagem Matemática
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
                  Estruturando o Caos
                </h2>
                <p className="font-body text-muted-foreground text-lg leading-relaxed">
                  Cada decisão começa por um modelo explícito: premissas documentadas, fórmulas
                  rastreáveis e cenários comparáveis. Antes de recomendar uma mudança, mostramos o
                  cálculo que a sustenta.
                </p>
              </FadeIn>

              {/* Cartão com a constelação (vídeo limitado ao cartão) */}
              <FadeIn delay={120} className="flex-1 flex">
                <div className="relative w-full min-h-[260px] md:min-h-[320px] rounded-xl overflow-hidden border border-[#1E293B]">
                  <VideoBackdrop
                    name="04-constelacao-marca"
                    opacity={0.35}
                    objectPosition="right center"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(ellipse at center, rgba(10,15,28,0) 0%, rgba(10,15,28,0.35) 70%, rgba(10,15,28,0.7) 100%)',
                    }}
                  />
                </div>
              </FadeIn>
            </div>

            {/* Coluna direita — Separando o Sinal do Ruído */}
            <div className="flex flex-col gap-6">
              <FadeIn delay={100}>
                <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
                  Estatística Avançada
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
                  Separando o Sinal do Ruído
                </h2>
                <div className="flex flex-col gap-6 font-body text-muted-foreground text-lg leading-relaxed">
                  <p>
                    Em mercados saturados de dados, a maioria das empresas reage a anomalias
                    estatísticas como se fossem tendências reais. Nossa camada de inteligência
                    estatística garante que cada insight extraído tenha validade comprobatória.
                  </p>
                  <p>
                    Aplicamos Controle Estatístico de Processo (CEP), análise de variância e cartas
                    de controle para separar variação normal de desvio real e identificar a causa
                    raiz antes de agir.
                  </p>
                </div>
              </FadeIn>

              {/* Cartão com a carta de controle viva (100% da largura da coluna) */}
              <FadeIn delay={220} className="flex-1 flex">
                <div className="relative w-full min-h-[260px] md:min-h-[320px] rounded-xl overflow-hidden border border-[#1E293B] bg-[#111827]/40">
                  <ControlChartLive className="opacity-[0.55]" />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(ellipse at center, rgba(10,15,28,0) 40%, rgba(10,15,28,0.45) 100%)',
                    }}
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Differentials Section (ao final de metodologia) */}
      <Differentials />
    </div>
  )
}
