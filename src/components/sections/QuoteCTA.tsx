import { FadeIn } from '@/components/fade-in'

export function QuoteCTA() {
  return (
    <section id="contact" className="w-full">
      {/* Quote Area */}
      <div className="py-24 md:py-32 px-6 md:px-12 bg-white text-black text-center flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
              "Dados sem um modelo matemático rigoroso são apenas ruído estatístico caro."
            </h2>
            <p className="font-mono text-sm uppercase tracking-widest text-black/60 font-bold">
              — Chief Data Strategist, MathOps
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-24 md:py-32 px-6 md:px-12 bg-accent text-white text-center flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Inicie sua Transformação Analítica
            </h2>
            <p className="font-body text-xl text-white/80 mb-12">
              Agende uma reunião técnica confidencial. Analisaremos seu cenário atual e
              estruturaremos um roadmap direto ao ponto, sem compromisso.
            </p>
            <a
              href="mailto:strategy@mathops.com.br"
              className="bg-white text-accent px-10 py-5 font-display font-bold text-lg hover:bg-black hover:text-white transition-colors duration-300 shadow-xl inline-block"
            >
              Falar com um Especialista
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
