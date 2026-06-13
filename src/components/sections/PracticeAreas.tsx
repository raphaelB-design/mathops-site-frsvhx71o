import { ArrowRight } from 'lucide-react'
import { FadeIn } from '@/components/fade-in'

const areas = [
  {
    id: '01',
    title: 'Direito Penal Econômico',
    desc: 'Defesa em crimes contra o sistema financeiro, ordem tributária e lavagem de capitais.',
  },
  {
    id: '02',
    title: 'Tribunal do Júri',
    desc: 'Atuação artesanal e estratégica em plenário para defesas complexas contra a vida.',
  },
  {
    id: '03',
    title: 'Crimes Cibernéticos',
    desc: 'Representação técnica em investigações de fraudes digitais e violações de dados.',
  },
  {
    id: '04',
    title: 'Compliance Penal',
    desc: 'Auditorias preventivas e implementação de matrizes de risco corporativo.',
  },
  {
    id: '05',
    title: 'Habeas Corpus',
    desc: 'Medidas emergenciais perante Tribunais Superiores (STJ e STF) para restituição da liberdade.',
  },
]

export function PracticeAreas() {
  return (
    <section id="areas" className="py-[120px] px-6 md:px-12 max-w-7xl mx-auto w-full">
      <FadeIn>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-16">
          002 · Áreas de Atuação
        </p>
      </FadeIn>

      <div className="flex flex-col w-full">
        {areas.map((area, index) => (
          <FadeIn key={area.id} delay={index * 150}>
            <div className="group flex flex-col md:flex-row md:items-center border-t border-border py-10 md:py-12 cursor-pointer transition-colors duration-500">
              {/* Number */}
              <div className="font-mono text-sm text-muted-foreground mb-4 md:mb-0 md:w-32">
                {area.id}
              </div>

              {/* Title */}
              <div className="flex-1 pr-8">
                <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-white group-hover:text-accent transition-colors duration-500 leading-none">
                  {area.title}
                </h3>
              </div>

              {/* Description & Icon */}
              <div className="hidden md:flex flex-1 items-center justify-between pl-8">
                <p className="font-body text-lg text-muted-foreground max-w-sm">{area.desc}</p>
                <div className="transform translate-x-0 group-hover:translate-x-6 transition-transform duration-500 ease-smooth">
                  <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-accent transition-colors duration-500" />
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
        {/* Final border */}
        <div className="border-t border-border w-full" />
      </div>
    </section>
  )
}
