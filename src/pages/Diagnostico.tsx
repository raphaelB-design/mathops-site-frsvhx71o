import { Helmet } from '@/components/Helmet'
import { Oferta } from '@/components/sections/Oferta'
import { QuoteCTAForm } from '@/components/sections/QuoteCTAForm'
import { FAQ } from '@/components/sections/FAQ'
import { FadeIn } from '@/components/fade-in'

export default function Diagnostico() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-background text-foreground pt-20">
      <Helmet>
        <title>Diagnóstico Estratégico | MathOps Strategy — Ponto Zero de Avaliação</title>
        <meta
          name="description"
          content="Solicite o Diagnóstico Estratégico da MathOps Strategy: 2 semanas de imersão, roadmap analítico com escopo e KPIs definidos e garantia de devolução de 100% caso não haja fit."
        />
      </Helmet>

      {/* 1. Seção da oferta */}
      <Oferta />

      {/* 2. Formulário de contato */}
      <section
        id="formulario-diagnostico"
        className="w-full py-24 md:py-32 px-6 md:px-12 bg-black border-t border-white/10"
      >
        <div className="max-w-2xl mx-auto w-full">
          <FadeIn>
            <div className="mb-12 text-center">
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
                Solicitar Diagnóstico
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 text-white">
                Vamos conversar sobre seu desafio
              </h2>
              <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Preencha o formulário e nossa equipe entrará em contato em até 48 horas para agendar
                a conversa técnica de 30 minutos.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <QuoteCTAForm />
          </FadeIn>
        </div>
      </section>

      {/* 3. Dúvidas Frequentes */}
      <FAQ />
    </div>
  )
}
