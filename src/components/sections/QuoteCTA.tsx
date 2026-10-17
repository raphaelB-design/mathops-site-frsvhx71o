import { FadeIn } from '@/components/fade-in'
import { QuoteCTAForm } from '@/components/sections/QuoteCTAForm'

export function QuoteCTA() {
  return (
    <section className="w-full">
      <div className="py-24 md:py-32 px-6 md:px-12 bg-background border-t border-white/10">
        <div className="max-w-2xl mx-auto w-full pb-32 lg:pb-12">
          <FadeIn>
            <div className="mb-12 text-center">
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
                Solicitar Diagnóstico
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
                Vamos conversar sobre seu desafio
              </h2>
              <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Preencha o formulário e nossa equipe entrará em contato em até 48 horas.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <QuoteCTAForm />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
