import { FadeIn } from '@/components/fade-in'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { trackClick } from '@/services/analytics'

export function FinalCallout() {
  return (
    <section className="w-full py-20 md:py-28 px-6 md:px-12 bg-accent text-white border-t border-white/10 relative overflow-hidden">
      {/* Subtle technical pattern */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: '2rem 2rem',
        }}
      />

      <div className="max-w-5xl mx-auto w-full text-center relative z-10">
        <FadeIn>
          <span className="inline-block px-3 py-1 bg-black/20 border border-white/20 font-mono text-[10px] font-bold uppercase tracking-widest text-white mb-6 rounded-sm backdrop-blur-sm">
            Próximo Passo
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium leading-tight mb-4 drop-shadow-md">
            Comece pelo Diagnóstico Estratégico
          </h2>
          <p className="font-sans text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
            Roadmap com escopo e KPIs. Garantia de devolução.
          </p>
          <Link
            to="/diagnostico"
            onClick={() => trackClick('diagnostic_open', 'home_final_callout')}
            className="group inline-flex items-center gap-2 bg-white text-black font-mono font-bold uppercase tracking-wider text-sm py-4 px-8 hover:bg-black hover:text-white transition-colors duration-300 rounded-sm shadow-xl min-h-[44px]"
          >
            Solicitar Diagnóstico Estratégico
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <div className="mt-6 font-mono text-[10px] uppercase tracking-widest text-white/70">
            NDA disponível · Reunião de 30 min · Sem compromisso
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
