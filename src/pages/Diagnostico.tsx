import { Helmet } from '@/components/Helmet'
import { Oferta } from '@/components/sections/Oferta'
import { QuoteCTAForm } from '@/components/sections/QuoteCTAForm'
import { FAQ } from '@/components/sections/FAQ'
import { FadeIn } from '@/components/fade-in'

export default function Diagnostico() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-background text-foreground pt-20">
      <Helmet>
        <title>Diagnóstico Estratégico | MathOps Strategy — Oferta, Formulário e FAQ</title>
        <meta
          name="description"
          content="Solicite o Diagnóstico Estratégico: imersão analítica, roadmap com KPIs e escopo, garantia de escopo e alinhamento, formulário de contato e respostas a dúvidas frequentes."
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
