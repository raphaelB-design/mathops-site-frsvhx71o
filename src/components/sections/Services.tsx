import { FadeIn } from '@/components/fade-in'
import { ArrowRight } from 'lucide-react'

export interface ServiceItem {
  id: string
  title: string
  desc: string
  tags: string[]
}

const services: ServiceItem[] = [
  {
    id: '01',
    title: 'Modelagem Matemática',
    desc: 'Simuladores de cenários complexos, precificação dinâmica e otimização de malha logística usando algoritmos preditivos.',
    tags: ['Monte Carlo', 'Pesquisa Operacional'],
  },
  {
    id: '02',
    title: 'Automação & Process Mining',
    desc: 'Mapeamento profundo de gargalos invisíveis e implementação de rotinas robotizadas para tarefas de alto volume.',
    tags: ['BPMN 2.0', 'RPA'],
  },
  {
    id: '03',
    title: 'Business Intelligence Estrutural',
    desc: 'Construção de Data Lakes e Pipelines (ETL) robustos alimentando Dashboards executivos em tempo real.',
    tags: ['Data Warehouse', 'Power BI'],
  },
  {
    id: '04',
    title: 'Lean Six Sigma Ops',
    desc: 'Auditoria e reestruturação de processos corporativos focada na eliminação brutal de desperdícios e variabilidade.',
    tags: ['DMAIC', 'VSM'],
  },
  {
    id: '05',
    title: 'Análise Prescritiva Avançada',
    desc: 'Algoritmos que não apenas prevêem o que vai acontecer, mas recomendam exatamente a melhor ação a ser tomada.',
    tags: ['Machine Learning', 'AI'],
  },
  {
    id: '06',
    title: 'Governança Analítica',
    desc: 'Estruturação de políticas de acesso, compliance de dados e catalogação sistêmica do conhecimento corporativo.',
    tags: ['LGPD', 'Data Catalog'],
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-12 w-full bg-white/5">
      <div className="max-w-7xl mx-auto w-full">
        <FadeIn>
          <div className="mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
              Catálogo de Serviços
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Capacidades Analíticas</h2>
          </div>
        </FadeIn>

        <div className="flex flex-col border-t border-white/10">
          {services.map((service, index) => (
            <FadeIn key={service.id} delay={100 + index * 50}>
              <div className="group flex flex-col md:flex-row gap-6 md:gap-12 py-10 md:py-12 border-b border-white/10 hover:bg-white/[0.02] transition-colors cursor-pointer px-4 -mx-4 md:px-6 md:-mx-6">
                <div className="font-mono text-2xl font-bold text-muted-foreground group-hover:text-accent transition-colors w-16">
                  {service.id}.
                </div>
                <div className="flex-1 flex flex-col gap-4">
                  <h3 className="font-display text-2xl md:text-3xl font-bold group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono uppercase bg-black/50 border border-white/10 px-2 py-1 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <p className="font-body text-muted-foreground leading-relaxed max-w-sm">
                    {service.desc}
                  </p>
                  <ArrowRight className="w-8 h-8 text-white/20 group-hover:text-accent group-hover:translate-x-2 transition-all duration-300 hidden md:block" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
