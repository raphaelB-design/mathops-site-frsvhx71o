import { FadeIn } from '@/components/fade-in'
import { SlideUpMask } from '@/components/slide-up-mask'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'
import heroBg from '@/assets/imagem2026-06-18231310090-99a81.png'

export default function Sobre() {
  return (
    <div className="flex flex-col w-full bg-background min-h-screen text-foreground pb-24">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-black">
          <img
            src={heroBg}
            alt="MathOps Building Close-up"
            fetchPriority="high"
            loading="eager"
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>

        <div className="relative z-10 container px-4 md:px-6 mx-auto text-center">
          <FadeIn>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">
              <SlideUpMask delay={100}>Sobre a MathOps</SlideUpMask>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground font-serif italic">
              Construímos a ponte entre o que sua operação sente e o que ela pode provar.
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
                Atuamos no limiar das decisões mais críticas que uma operação pode enfrentar:
                precificação, planejamento de capacidade, governança de dados e automação de
                processos. Não substituímos o julgamento do gestor; blindamos ele com matemática.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Core Values: Mission, Vision, Values */}
      <section className="container px-4 md:px-6 mx-auto mt-24">
        <FadeIn>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm rounded-none border-t-2 border-t-accent hover:bg-white/10 transition-all duration-500 ease-smooth hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.1)] hover:border-white/20">
              <CardHeader>
                <CardTitle className="font-display text-2xl uppercase tracking-wider">
                  Missão
                </CardTitle>
              </CardHeader>
              <CardContent className="font-serif text-muted-foreground">
                Entregar inteligência analítica aplicada que transforma dados brutos em vantagem
                competitiva sustentável — com rigor metodológico, rastreabilidade total e foco em
                resultado mensurável.
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm rounded-none border-t-2 border-t-accent hover:bg-white/10 transition-all duration-500 ease-smooth hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.1)] hover:border-white/20">
              <CardHeader>
                <CardTitle className="font-display text-2xl uppercase tracking-wider">
                  Visão
                </CardTitle>
              </CardHeader>
              <CardContent className="font-serif text-muted-foreground">
                Ser a referência em consultoria analítica boutique no Brasil, reconhecida pela
                qualidade Six Sigma dos nossos modelos e pela capacidade de tornar decisões
                complexas simples de executar.
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm rounded-none border-t-2 border-t-accent hover:bg-white/10 transition-all duration-500 ease-smooth hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.1)] hover:border-white/20">
              <CardHeader>
                <CardTitle className="font-display text-2xl uppercase tracking-wider">
                  Valores
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 font-serif text-muted-foreground">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>Rigor antes de velocidade</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>Rastreabilidade total (memória de cálculo auditável)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>Resultado como compromisso, não promessa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
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
