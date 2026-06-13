import { FadeIn } from '@/components/fade-in'
import { ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-[160px] px-6 md:px-12 w-full bg-white text-black flex justify-center text-center">
      <div className="max-w-5xl w-full flex flex-col items-center">
        <FadeIn>
          <h2 className="font-display text-5xl md:text-7xl lg:text-[6rem] uppercase leading-[0.9] tracking-tight mb-8">
            Pronto para transformar dados em vantagem competitiva?
          </h2>
        </FadeIn>

        <FadeIn delay={200}>
          <p className="font-body text-xl md:text-2xl text-black/70 mb-16 max-w-3xl mx-auto leading-relaxed">
            Agende uma sessão técnica para mapearmos as ineficiências da sua operação e desenharmos
            um roadmap focado em resultados tangíveis.
          </p>
        </FadeIn>

        <FadeIn delay={400}>
          <button className="group relative inline-flex items-center justify-center px-10 py-6 font-mono text-sm uppercase tracking-widest font-bold bg-black text-white overflow-hidden transition-all duration-300 hover:scale-105">
            <span className="relative z-10 flex items-center gap-4">
              Agendar Diagnóstico Estratégico Gratuito
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-neutral-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
          </button>
        </FadeIn>
      </div>
    </section>
  )
}
