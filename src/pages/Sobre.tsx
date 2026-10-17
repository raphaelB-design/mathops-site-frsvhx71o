import { FadeIn } from '@/components/fade-in'
import { SlideUpMask } from '@/components/slide-up-mask'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Helmet } from '@/components/Helmet'
import heroBg from '@/assets/imagem2026-06-18231310090-99a81.png'

export default function Sobre() {
  return (
    <div className="flex flex-col w-full bg-background min-h-screen text-foreground pb-24">
      <Helmet>
        <title>Sobre a MathOps Strategy | Consultoria Analítica Boutique — São Paulo</title>
        <meta
          name="description"
          content="A MathOps Strategy é uma consultoria boutique que transforma dados em decisões auditáveis. Conheça nossa missão, visão e valores. Diagnóstico Estratégico como porta de entrada."
        />
      </Helmet>
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-black">
          <img
            src={heroBg}
            alt="MathOps Building Close-up"
            fetchPriority="high"
            loading="eager"
            className="w-full h-full object-cover opacity-60 grayscale"
          />
          {/* 1.7 Duotone azul-noite/azul (#0A0F1C -> #3B82F6) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0A0F1C]/90 via-[#0A0F1C]/75 to-[#3B82F6]/35 mix-blend-multiply pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>

        <div className="relative z-10 container px-4 md:px-6 mx-auto text-center">
          <FadeIn>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">
              <SlideUpMask delay={100}>Sobre a MathOps</SlideUpMask>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground font-serif italic">
              Decisões de gestão baseadas em dados que você pode provar.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Manifesto / Mission */}
      <section className="container px-4 md:px-6 mx-auto mt-24 mb-12">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="flex flex-col items-center text-center space-y-4 mb-16">
              <SlideUpMask>
                <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-accent">
                  Manifesto Institucional
                </h2>
              </SlideUpMask>
              <Separator className="w-12 bg-accent/50" />
            </div>

            <div className="space-y-8 text-xl md:text-2xl font-serif leading-relaxed text-muted-foreground">
              <p>
                A MathOps nasceu da convicção de que a excelência operacional não é um privilégio de
                grandes corporações. Empresas de qualquer porte enfrentam decisões complexas que
                exigem mais do que intuição, mas sim evidência estruturada, modelagem rigorosa e
                rastreabilidade total.
              </p>
              <p>
                Atuamos onde a decisão precisa de evidência: indicadores de gestão, controle de
                projetos, melhoria de processos e gestão de riscos. Não substituímos o julgamento do
                gestor; damos a ele base factual.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Core Values: Mission, Vision, Values */}
      <section className="container px-4 md:px-6 mx-auto mt-24">
        <FadeIn>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="premium-card rounded-lg border-t-2 border-t-accent group">
              <CardHeader>
                <CardTitle className="font-display text-2xl uppercase tracking-wider text-[#F5F4F0] group-hover:text-accent transition-colors">
                  Missão
                </CardTitle>
              </CardHeader>
              <CardContent className="font-serif text-[#94A3B8]">
                Entregar inteligência analítica aplicada que transforma dados brutos em vantagem
                competitiva sustentável — com rigor metodológico, rastreabilidade total e foco em
                resultado mensurável.
              </CardContent>
            </Card>

            <Card className="premium-card rounded-lg border-t-2 border-t-accent group">
              <CardHeader>
                <CardTitle className="font-display text-2xl uppercase tracking-wider text-[#F5F4F0] group-hover:text-accent transition-colors">
                  Visão
                </CardTitle>
              </CardHeader>
              <CardContent className="font-serif text-[#94A3B8]">
                Ser referência em consultoria de dados e processos no Brasil, reconhecida pela
                rastreabilidade das entregas e pela capacidade de tornar decisões complexas simples
                de executar.
              </CardContent>
            </Card>

            <Card className="premium-card rounded-lg border-t-2 border-t-accent group">
              <CardHeader>
                <CardTitle className="font-display text-2xl uppercase tracking-wider text-[#F5F4F0] group-hover:text-accent transition-colors">
                  Valores
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 font-serif text-[#94A3B8]">
                <ul className="space-y-2">
                  <li>
                    <span>Rigor antes de velocidade</span>
                  </li>
                  <li>
                    <span>Rastreabilidade&nbsp;</span>
                  </li>
                  <li>
                    <span>Resultado como compromisso</span>
                  </li>
                  <li>
                    <span>Discrição e sigilo como padrão operacional</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}
