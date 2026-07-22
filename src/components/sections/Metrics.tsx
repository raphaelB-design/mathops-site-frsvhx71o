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
    <section id="numeros" className="py-24 md:py-32 px-6 md:px-12 w-full">
      <div className="max-w-7xl mx-auto w-full">
        <FadeIn>
          <SlideUpMask>
            <h2 className="sr-only">Prova de Método</h2>
          </SlideUpMask>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {commitments.map((item, idx) => (
            <FadeIn key={idx} delay={idx * 150}>
              <div className="relative flex flex-col gap-4 p-8 bg-white/5 border border-white/10 group overflow-hidden h-full hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.1)] hover:border-white/20 transition-all duration-500 ease-smooth">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 group-hover:bg-accent/20 transition-colors duration-500">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <div className="flex flex-col gap-1 mt-auto">
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={600}>
          <p className="font-body text-sm text-muted-foreground max-w-2xl mx-auto text-center mt-12 leading-relaxed">
            Não publicamos números que não podemos provar. É o mesmo padrão que aplicamos aos seus.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
