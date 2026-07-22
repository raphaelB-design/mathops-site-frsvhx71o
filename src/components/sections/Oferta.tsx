import { FadeIn } from '@/components/fade-in'
import { ArrowUpRight, Check, ShieldCheck } from 'lucide-react'
import { diagnosticoEstrategico } from '@/config/servicesData'
import { useDiagnosticModal } from '@/context/DiagnosticModalContext'
import { trackClick } from '@/services/analytics'

export function Oferta() {
  const { openDiagnostic } = useDiagnosticModal()

  return (
    <section
      id="oferta"
      className="py-24 md:py-32 px-6 md:px-12 w-full bg-white/[0.02] border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto w-full">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
              Porta de Entrada
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              {diagnosticoEstrategico.name}
            </h2>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {diagnosticoEstrategico.headline}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-3 px-6 py-4 bg-accent/10 border border-accent/30 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-accent shrink-0" />
              <p className="font-display text-lg md:text-xl font-bold text-white text-center">
                Sem fit estratégico? Devolvemos 100% do valor. Sem exceções.
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <FadeIn delay={300}>
            <div className="p-8 border border-white/10 bg-black/40">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6 block">
                O que você recebe
              </span>
              <ul className="space-y-4">
                {diagnosticoEstrategico.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="font-body text-sm text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={400}>
            <div className="p-8 border border-white/10 bg-black/40 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6 block">
                  Detalhes
                </span>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center pb-3 border-b border-white/10">
                    <span className="font-body text-sm text-muted-foreground">Investimento</span>
                    <span className="font-display text-lg font-bold text-white">
                      {diagnosticoEstrategico.price}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-white/10">
                    <span className="font-body text-sm text-muted-foreground">Prazo</span>
                    <span className="font-display text-lg font-bold text-white">
                      {diagnosticoEstrategico.deadline}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-white/10">
                    <span className="font-body text-sm text-muted-foreground">Condição</span>
                    <span className="font-display text-sm font-bold text-accent text-right max-w-[220px]">
                      {diagnosticoEstrategico.priceNote}
                    </span>
                  </div>
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                  <span className="text-white font-medium">Público-alvo:</span>{' '}
                  {diagnosticoEstrategico.forWhom}
                </p>
                <p className="font-mono text-xs text-white/40 leading-relaxed">
                  * {diagnosticoEstrategico.note}
                </p>
              </div>
              <button
                onClick={() => {
                  trackClick('diagnostic_open', 'oferta')
                  openDiagnostic()
                }}
                className="group w-full flex items-center justify-center gap-2 bg-white text-black font-mono font-bold uppercase tracking-wider text-sm py-4 px-8 hover:bg-accent hover:text-white transition-colors duration-300 mt-6"
              >
                Solicitar Diagnóstico Estratégico
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
