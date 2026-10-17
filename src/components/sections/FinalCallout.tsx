import { FadeIn } from '@/components/fade-in'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { trackClick } from '@/services/analytics'
import { SectionBackdrop } from '@/components/SectionBackdrop'

export function FinalCallout() {
  return (
    <section className="relative w-full py-20 md:py-28 px-6 md:px-12 bg-[#0A0F1C] text-white border-t border-[#1E293B] overflow-hidden">
      {/* 1.3 Brilhos radiais suaves (#3B82F6 e #22D3EE, 10-15% de opacidade, blur alto) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#3B82F6]/14 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-4 right-1/4 w-[400px] h-[300px] bg-[#22D3EE]/10 blur-[140px] rounded-full pointer-events-none" />

      {/* 2.3 Faixa final: "scurve", terminando próxima ao botão */}
      <SectionBackdrop variant="scurve" opacityClass="opacity-[0.18]" />

      <div className="max-w-5xl mx-auto w-full text-center relative z-10">
        <FadeIn>
          <span className="inline-block px-3 py-1 bg-[#111827]/80 border border-[#1E293B] font-mono text-[10px] font-bold uppercase tracking-widest text-accent2 mb-6 rounded-sm backdrop-blur-sm">
            Próximo Passo
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 text-[#F5F4F0]">
            Comece pelo Diagnóstico Estratégico
          </h2>
          <p className="font-body text-base sm:text-lg md:text-xl text-[#94A3B8] max-w-2xl mx-auto mb-8 leading-relaxed">
            Roadmap com escopo e KPIs. Tudo acordado antes de começar.
          </p>
          <Link
            to="/diagnostico"
            onClick={() => trackClick('diagnostic_open', 'home_final_callout')}
            className="btn-primary-gradient group inline-flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-sm py-4 px-8 rounded-sm shadow-xl min-h-[44px]"
          >
            Solicitar Diagnóstico Estratégico
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <div className="mt-6 font-mono text-[10px] uppercase tracking-widest text-[#94A3B8]/70">
            NDA disponível · Reunião de 30 min · Sem compromisso
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
