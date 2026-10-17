import { FadeIn } from '@/components/fade-in'
import { SlideUpMask } from '@/components/slide-up-mask'
import { FileText, GitBranch, Database, ShieldCheck } from 'lucide-react'

const commitments = [
  {
    icon: FileText,
    title: 'Memória de cálculo auditável',
    description: 'em 100% das entregas',
  },
  {
    icon: GitBranch,
    title: 'Documentação BPMN 2.0',
    description: 'de todos os processos mapeados',
  },
  {
    icon: Database,
    title: 'Dicionário de dados',
    description: 'entregue junto com cada painel',
  },
  {
    icon: ShieldCheck,
    title: 'Garantia de devolução',
    description: 'de 100% no Diagnóstico se não houver fit',
  },
]

export function Metrics() {
  return (
    /* 1.5 SEÇÃO CLARA: GARANTIAS - Fundo #F5F4F0; títulos #0A0F1C; textos #475569; ícones #3B82F6. Sem fundo gráfico (2.3). */
    <section
      id="numeros"
      className="py-24 md:py-32 px-6 md:px-12 w-full bg-[#F5F4F0] border-y border-[#E2E8F0]"
    >
      <div className="max-w-7xl mx-auto w-full">
        <FadeIn>
          <SlideUpMask>
            <h2 className="sr-only">Prova de Método</h2>
          </SlideUpMask>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {commitments.map((item, idx) => (
            <FadeIn key={idx} delay={idx * 150}>
              {/* Cards brancos com borda #E2E8F0 e sombra suave */}
              <div className="relative flex flex-col gap-4 p-8 bg-white border border-[#E2E8F0] shadow-sm rounded-lg group overflow-hidden h-full hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#3B82F6] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/20 group-hover:bg-[#3B82F6]/20 transition-colors duration-300">
                  <item.icon className="w-5 h-5 text-[#3B82F6]" />
                </div>
                <div className="flex flex-col gap-1 mt-auto">
                  <h3 className="font-display text-lg font-bold text-[#0A0F1C] group-hover:text-[#3B82F6] transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#475569] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={600}>
          <p className="font-body text-sm text-[#475569] max-w-2xl mx-auto text-center mt-12 leading-relaxed">
            Cada entrega documentada para que sua equipe use, audite e evolua com autonomia.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
