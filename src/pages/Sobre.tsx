import { FadeIn } from '@/components/fade-in'
import { SlideUpMask } from '@/components/slide-up-mask'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'

export default function Sobre() {
  return (
    <div className="flex flex-col w-full bg-background min-h-screen text-foreground pb-24">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-black">
          <img
            src="https://img.usecurling.com/p/1920/1080?q=law%20firm%20office&color=black"
            alt="MathOps Office"
            width={1920}
            height={1080}
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
              Defendendo o patrimônio e a liberdade com excelência, discrição e precisão estratégica
              incomparáveis.
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
                A MathOps nasceu da convicção de que a advocacia criminal de alto nível exige mais
                do que conhecimento técnico; exige uma compreensão profunda das dinâmicas de poder,
                dos mercados financeiros e da preservação de reputações.
              </p>
              <p>
                Atuamos no limiar das decisões mais críticas que um indivíduo ou corporação pode
                enfrentar, garantindo que nossos clientes naveguem por crises complexas com
                segurança e estratégia.
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
                Prover defesa criminal artesanal e estratégica, blindando o patrimônio, a liberdade
                e a reputação de nossos clientes com máximo rigor técnico e discrição absoluta.
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm rounded-none border-t-2 border-t-accent hover:bg-white/10 transition-all duration-500 ease-smooth hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.1)] hover:border-white/20">
              <CardHeader>
                <CardTitle className="font-display text-2xl uppercase tracking-wider">
                  Visão
                </CardTitle>
              </CardHeader>
              <CardContent className="font-serif text-muted-foreground">
                Ser o escritório de referência na América Latina para resoluções de crises penais
                complexas e crimes do colarinho branco, ditando os padrões de excelência na
                advocacia boutique.
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
                    <span>Sigilo Inquebrantável</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>Rigor Analítico</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>Lealdade Absoluta</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>Combate Estratégico</span>
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
