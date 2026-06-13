import { FadeIn } from '@/components/fade-in'
import { ArrowRight } from 'lucide-react'

const pillars = [
  {
    id: '01',
    title: 'Excelência Operacional',
    desc: 'Mapeamento de fluxo de valor (VSM), identificação de gargalos e otimização de processos críticos através do método DMAIC.',
  },
  {
    id: '02',
    title: 'Inteligência de Cálculo',
    desc: 'Modelagem matemática preditiva e prescritiva, simuladores de cenários e algoritmos de precificação dinâmica.',
  },
  {
    id: '03',
    title: 'Inteligência de Dados',
    desc: 'Estruturação de Data Lakes, pipelines ETL, arquitetura de dados corporativos e painéis analíticos (Dashboards) avançados.',
  },
  {
    id: '04',
    title: 'Análise Crítica',
    desc: 'Auditoria de dados, governança, adequação à LGPD e inteligência competitiva para embasamento de decisões estratégicas.',
  },
]

export function Solutions() {
  return (
    <section id="solutions" className="py-[120px] px-6 md:px-12 max-w-7xl mx-auto w-full bg-black">
      <FadeIn>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-16">
          Pillars · Soluções de Inteligência
        </p>
      </FadeIn>

      <div className="flex flex-col w-full">
        {pillars.map((pillar, index) => (
          <FadeIn key={pillar.id} delay={index * 150}>
            <div className="group flex flex-col md:flex-row md:items-start border-t border-white/10 py-10 md:py-16 cursor-pointer transition-colors duration-500 hover:bg-white/[0.02] -mx-6 px-6 md:-mx-12 md:px-12">
              <div className="font-mono text-sm text-muted-foreground mb-4 md:mb-0 md:w-32 pt-2">
                {pillar.id}
              </div>
              <div className="flex-1 md:pr-12">
                <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-white group-hover:translate-x-4 transition-transform duration-500 leading-none mb-6">
                  {pillar.title}
                </h3>
              </div>
              <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-center">
                <p className="font-body text-lg text-muted-foreground max-w-md mb-6 md:mb-0 leading-relaxed">
                  {pillar.desc}
                </p>
                <div className="transform translate-x-0 group-hover:translate-x-4 transition-transform duration-500 hidden md:block">
                  <ArrowRight className="w-8 h-8 text-white/30 group-hover:text-white transition-colors duration-500" />
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
        <div className="border-t border-white/10 w-full" />
      </div>
    </section>
  )
}
